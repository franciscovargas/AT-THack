import datetime
import time

from collections import defaultdict
from common import equalize
from IPython import embed


def q():
    import os
    os._exit(0)


class Device:

    def __init__(self, device):
        self.device = device
        # self.streams = self.load_streams(device)

    def show_streams(self):
        streams = []
        for stream in self.device.streams():
            streams.append(stream.data['name'])

        return streams

    def convert_to_seconds(self, utc):
        extracted_datetime = datetime.datetime.strptime(
            utc, "%Y-%m-%dT%H:%M:%S.%fZ")

        # seconds = time.mktime(extracted_datetime.timetuple())

        return extracted_datetime.timestamp()

    def load_streams(self, keyname='myPhone'):
        def process_stream(stream):
            data = {}
            for val in stream['values']:
                utc = val['timestamp']
                extracted_datetime = self.convert_to_seconds(utc)
                # seconds = time.mktime(extracted_datetime.timetuple())

                data[extracted_datetime] = val['value']

            return data

        processed_streams = {}
        for stream in self.device.streams():
            name = stream.data['name']
            print(name)
            if keyname not in name:
                continue

            if name not in processed_streams:
                processed_streams[name] = process_stream(stream.values())

        return processed_streams

    def load_sparse_data(self):
        data = defaultdict(list)
        vals = self.device.values()['values']
        embed()
        for val in vals:
            seconds = self.convert_to_seconds(val['timestamp'])
            streams = list(val['values'].items())
            for stream in streams:
                data[stream[0]].append((seconds, stream[1]))

        for key in data:
            data[key].sort()

        return data

    def split_on(self, data, splitter):
        parts = self.get_splits(splitter)

        # split on parts
        for part in parts:
            res_dict = {}
            for key, val in data.items():
                found = []
                for n in val:
                    if n[0] > part[0] and n[0] < part[1]:
                        found.append(val)

                res_dict[key] = list(sorted(found))

            yield res_dict

    def load_stuff(self):
        streams = self.load_streams()
        onoff = list(sorted(streams['myPhone_falling'].items()))
        splits = self.get_splits(onoff)

        buckets = []
        for split in splits:
            bucket = self.get_bucket(streams, split[0], split[1])

            equalized = {}
            for k, v in bucket.items():
                if not len(v):
                    continue

                equalized[k] = equalize(v)

            buckets.append(equalized)

        return buckets

    def load_recent(self, last_n=20):
        streams = self.load_streams()

        sensors = {}
        for key, val in streams.items():
            if not len(val):
                continue

            sorted_data = [(k, v) for k, v in sorted(val.items())]
            equalized_data = equalize(sorted_data)

            sensors[key] = equalized_data[-last_n:]

        return sensors

    def get_splits(self, splitter):
        # find parts
        parts = []
        start = splitter[0][0]
        last = splitter[0][0]

        for n in splitter[1:]:
            if n[0] - last > 3:
                parts.append((start, last))
                start = n[0]
            last = n[0]

        parts.append((start, splitter[-1][0]))

        return parts

    def get_bucket(self, streams, fromv, tov):
        cropped_streams = {}
        for key, val in streams.items():
            found = []
            for v_time, v_val in val.items():
                if v_time >= fromv and v_time <= tov:
                    found.append((v_time, v_val))

            cropped_streams[key] = list(sorted(found))

        return cropped_streams

    # def train_load_matrix(self):
    #     sparse_data = self.load_sparse_data()
    #     splitted = list(self.split_on(
    #         sparse_data, sparse_data['myPhone_falling']))
    #
    #     splitted_result = []
    #     for split in splitted:
    #         equalized_data = {}
    #         for key, val in sparse_data.items():
    #             equalized_data[key] = equalize(val)
    #
    #         splitted_result.append(equalized_data)
    #
    #     return splitted_result
    #
    # def load_matrix(self):
    #     sparse_data = self.load_sparse_data()
    #
    #     equalized_data = {}
    #     for key, val in sparse_data.items():
    #         equalized_data[key] = equalize(val)
    #
    #     return equalized_data
