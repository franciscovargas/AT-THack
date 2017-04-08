import numpy as np
import tensorflow as tf
import os

class Classifier:
    def __init__(self, model_name='export'):
        self.sess = tf.Session()
        saver = tf.train.import_meta_graph('export/{}.meta'.format(model_name))
        saver.restore(self.sess, 'export/{}'.format(model_name))
        self.graph = tf.get_default_graph() 
        
        # Find the correct tensors for inputs/outputs
        self.input_op = self.graph.get_operation_by_name('input').outputs[0]        
        self.predictions_op = self.graph.get_operation_by_name('output/predictions').outputs[0]
        
    def transform_input(self, api_input):
        input_vector = np.asarray([api_input])
        return input_vector

    def transform_output(self, graph_output):
        api_output = {'prediction': [str(x) for x in graph_output]}
        return api_output

    def classify_request(self, payload):
        input_vector = self.transform_input(payload) 
        
        # Make prediction
        prediction = self.sess.run(
            [self.predictions_op], 
            feed_dict = {
                self.input_op: input_vector})
        
        result = self.transform_output(prediction)
        return True, result
