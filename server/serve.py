from flask import Flask
app = Flask(__name__)

from m2x.client import M2XClient
from flask import json
from device import Device
from common import makeplot
from push import push_send
import pprint


pp = pprint.PrettyPrinter(indent=4)


client = M2XClient(key='c25425b2b76dd3bbad2b7fbf348a802b')


def p(data):
    pp.pprint(data)


def get_device(name):
    for device in client.devices():
        if 'name' in device.data and device.data['name'] == name:
            return device


def test():
    dev = Device(get_device('LVTesty'))

    import ipdb
    ipdb.set_trace()


@app.route("/train")
def get_train():
    dev = Device(get_device('LVTesty'))

    return json.dumps(dev.load_stuff())


@app.route("/")
def hello():
    dev = Device(get_device('LVTesty'))

    return json.dumps(dev.load_recent())


@app.route("/push")
def push():
    push_send()
    return "Done"


if __name__ == "__main__":
    # test()
    app.run(host='0.0.0.0', port=5123)
