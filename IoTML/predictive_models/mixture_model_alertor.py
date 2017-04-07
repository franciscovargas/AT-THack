from tensorflow.contrib.factorization.python.ops import gmm
import tensorflow as tf
import numpy
from sklearn import datasets
from sklearn.decomposition import PCA


def main(test_k=3):
	# import iris to test GMM
	iris = datasets.load_iris()
	X = iris.data.astype(numpy.float32)
	Y = iris.target
	g = gmm.GMM(test_k)
	g.fit(input_fn= lambda:(tf.constant(X), None) )
	print(dir(g))
	print(g.predict(X))
	print("FITTED")


if __name__ == '__main__':
	main()