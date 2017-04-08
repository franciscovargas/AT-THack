from tensorflow.contrib.factorization.python.ops import gmm
import tensorflow as tf
import numpy
from sklearn import datasets
from sklearn.decomposition import PCA
from multiprocessing import Pool


def main(test_k=3):
    # import iris to test GMM
    iris = datasets.load_iris()
    X = iris.data.astype(numpy.float32)
    Y = iris.target
    # g = gmm.GMM(test_k)
    # g.fit(input_fn= lambda:(tf.constant(X), None),  max_steps=300)
    # print(list(g.predict_assignments(lambda:tf.constant(X))))
    g = MixtureModelOptimiser(X)
    g.elbow_method()
    print("FITTED")


class MixtureModelOptimiser(object):


    def __init__(self, X):
        self.n, self.dim = X.shape
        self.X = X
        # hacky bound setting for elbow method
        self.alpha = 3
        if self.n > 20:
            self.alpha = 10

        self.k_max = int(self.n / float(self.alpha))


    @staticmethod
    def agg_dist(clusters, centroids):
        """
        Finds intra cluster agregate distance
        for each cluster and sums them up
        as an overal measure of dispersion 
        in the clustering.
        """
        euc_dists = list()
        for i, clut in enumerate(clusters):

            cent = centroids[i]
            # Matrix mult way:
            z =  clut - cent
            # Take advantage of matrix mult in numpy
            # to avoid slow loops in python
            # when calculating the cluster inter aggregate distances
            dist_all = numpy.diag(numpy.dot(z, z.T))
            # this check here checks the method above is correct
            # Although providing proof is easy.
            assert dist_all.all() >= 0
            # sum up and append aggregate distances
            euc_dists.append(numpy.sum(dist_all))

        return numpy.sum(euc_dists)

    def elbow_iteration(self, k):
        g = gmm.GMM(k)
        g.fit(input_fn= lambda:(tf.constant(self.X), None),  max_steps=300)
        cent = list(g.clusters())
        print(cent)
        assignments =list(g.predict_assignments(lambda:tf.constant(self.X)))
        print(assignments, len(assignments), self.X.shape)
        clusters = [[]] * (max(assignments) + 1)
        # clusters[0] = [1]
        [clusters[el].append(self.X[i]) for i, el in enumerate(assignments)]
        print(clusters)
        print(self.agg_dist(clusters, cent))

    def elbow_method(self):
        scores = list()
        p = Pool(4)
        ks = range(2, self.k_max)
        p.map(self.elbow_iteration, ks)
            
            # print(list(g.predict_assignments(lambda:tf.constant(X))))


if __name__ == '__main__':
    main()