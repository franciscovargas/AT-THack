from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import os
import urllib

import tensorflow as tf
import numpy as np


class Classifier:

    def __init__(self, n_features, n_classes, hidden_units):
        # Specify that all features have real-value data
        feature_columns = [tf.contrib.layers.real_valued_column("", dimension=n_features)]
        
        self.classifier = tf.contrib.learn.DNNClassifier(feature_columns=feature_columns,
                                                    hidden_units=hidden_units,
                                                    n_classes=n_classes,
                                                    model_dir="/tmp/iris_model")
        pass

    def fit(self, training_file):
        # Load datasets.
        training_set = tf.contrib.learn.datasets.base.load_csv_with_header(
                filename=training_file,
                target_dtype=np.int,
                features_dtype=np.float32)



        # Build 3 layer DNN with 10, 20, 10 units respectively.
        # Define the training inputs
        def get_train_inputs():
            x = tf.constant(training_set.data)
            y = tf.constant(training_set.target)

            return x, y

        # Fit model.
        self.classifier.fit(input_fn=get_train_inputs, steps=2000)

    def predict(self, datapoint):

        # Classify two new flower samples.
        def new_samples():
            return np.array(datapoint, dtype=np.float32)

        return list(classifier.predict(input_fn=new_samples))

