import abc
from contextlib import contextmanager
import numpy
import tensorflow as tf


def tf_session(func):
    def func_wrapper(*args, **kwargs):
        with tf.Session()as sess:
            return func(*args, **kwargs)
    return func_wrapper


def rolling_window(vector, size, func=None, channels=6):
    """
    Static method for slicing classes

    :param input_vector: Ideally a tensor needs testing atm just a vector
    vector MUST BE A FLOAT OR YOU WILL DIE 

    maps tensor of form:
        (number of samples, channels of each sample, time series/ sequence lenght)

    to tensor of form:
        (number of samples, channels of each sample, time series/ sequence lenght - window_size +1, window_size)

    Alternatively channels may be batches however thats a bad idea unless things are architectured smartly
    using swap under high virtual mem needs.

    :return: Sliding transform  func on input_vector
    """
    def stride_update(_, idx):
        # Extract vector for this particular permutation
        # print(idx.eval(),size)
        # sub_vector = vector[:,:,idx:idx + size] 

        # sub_vector = tf.slice(vector,[0, idx], [ channels, size])
        sub_vector = tf.slice(vector,[0, idx], [ channels, size])

        return sub_vector

    # Make a seq containing the init idx of every segment
    segment_init_indices = numpy.arange(vector.shape[-1] - size + 1) #.astype(numpy.float32)
    
    # recursively slide using MapReduce styled recurrence.

    x= numpy.zeros((channels,size)).astype(numpy.float32)

    result = tf.scan(stride_update,
                     segment_init_indices,
                     initializer=x)

    return tf.transpose(result, perm=[0,1,2]) # redundant easier to visualize swapping 0 and 1


class BaseTimeSeriesSlicer(object):
    """
    Base Class ADT behaviour specification
    for time windowing. To be extended by
    fixed window sample generation  and adaptive
    windows if time allows.

    This data structure slices in place and maintains
    a single sliced data_structure (ndarray design matrix)
    in memory, with the ability to concatenate time-series
    incoming from a stream.
    """
    __metaclass__ = abc.ABCMeta

    @abc.abstractproperty
    def data(self):
        """
        Retunrs ndarray indexable design
        matrix data struct 
        """
        pass

    @abc.abstractmethod
    def slice_series(self):
        """
        for every t, in self.raw_init_series
        a vector x[t-w], x[t-w+1], x[t-w+2], ..., x[t] (self.w)
        is generated (ignoring channells and sensors for simplicity
        in explanation).
        """
        pass

    @abc.abstractmethod
    def insert_segment(self, time_segement,
                       start_time, end_time):
        """
        This method assumes that the min(t) in time_segment
        follows shortly after max(t) in self.data.

        overlap flag to handle
        """
        pass


class FixedTimeSeriesSlicer(BaseTimeSeriesSlicer):

    NOVERLAP_TOLERANCE = 10 # tolerance to incorporate a new adjacent stream

    def __init__(self, init_data_stream, window,
                 start_timestamp, end_timestamp, interval):
        """
        Just go instance.data to get the sliced tensor
        """
        self.init_data_stream = init_data_stream
        self.window = window
        self.start_timestamp = start_timestamp
        self.end_timestamp = end_timestamp
        self.interval = interval
        self.channels, self.time_steps = self.init_data_stream.shape
        self._data = None

    @property
    def data(self):
        if self._data is None:
            self.init_data_stream = None # freeing memory
            return self.slice_series()
        return self._data

    def slice_series(self):
        return rolling_window(self.init_data_stream,
                              self.window, func=None,
                              channels=self.channels).eval()


    def insert_segment(self, time_segement,
                       start_time, end_time):
        if (start_time - self.start_timestamp).minutes < self.NOVERLAP_TOLERANCE:
            overlap_data = self.data[-1,:,:]  # matrix to concatenate with incoming stream



if __name__ == '__main__':
    x = numpy.arange(100).reshape(10,10).astype(numpy.float32)
    print(x, x.shape)
    d = rolling_window(x,4, channels=10)

    @tf_session
    def tst_cntxt(d):
        return d.eval()

    dd = tst_cntxt(d)
    # print(dd)
    print (dd[-1,:,:], dd.shape)