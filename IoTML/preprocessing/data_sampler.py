import abc
import numpy # TODO: migrate np to tf maybe


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
 