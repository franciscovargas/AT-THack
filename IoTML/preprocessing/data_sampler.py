import abc
import numpy # TODO: migrate np to tf maybe
import tensorflow as tf


def rolling_window(vector, size, func=None, channels=6):
    """
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
        print(_,idx)
        # sub_vector = tf.slice(vector,[0, idx], [ channels, size])
        sub_vector = tf.slice(vector,[0, idx], [ channels, size])

        return sub_vector

    # Make a seq containing the init idx of every segment
    segment_init_indices = numpy.arange(vector.shape[-1] - size + 1) #.astype(numpy.float32)
    
    # recursively slide using MapReduce styled recurrence.

    x= numpy.zeros((channels,size)).astype(numpy.float32)

    result = tf.scan(stride_update,
                     segment_init_indices,
                     initializer=x,
                     parallel_iterations=1)

    return result

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


if __name__ == '__main__':
    x = numpy.arange(100).reshape(10,10).astype(numpy.float32)
    d = rolling_window(x,1)
    with tf.Session() as sess:
        print(d.eval())