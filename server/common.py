
import numpy as np
import matplotlib.pyplot as plt
plt.style.use('ggplot')

from IPython import embed


def makeplot(data, smooth=1, maxv=None):
    fig = plt.figure(1, figsize=(16, 8))
    ax_1 = fig.add_subplot(111)

    x = [n[0] for n in sorted(data)]
    y = [n[1] for n in sorted(data)]

    ax_1.plot(x, y)

    ax_1.set_xlabel('Time')
    ax_1.set_ylabel('Value')
    ax_1.legend(loc=0)

    plt.show()


def equalize(times, step=0.1):
    results = []
    last_val = times[0][1]
    start_time = times[0][0]
    end_time = times[-1][0]

    target_idx = 0
    for t in range(1, int(float(end_time - start_time) / step)):
        acc_val = []
        while (target_idx < len(times) and times[target_idx][0] < start_time + step * t):
            acc_val.append(times[target_idx][1])
            target_idx += 1

        if len(acc_val):
            last_val = np.mean(acc_val)
            results.append((start_time + step * t, last_val))
        else:
            results.append((start_time + step * t, last_val))

    return results
