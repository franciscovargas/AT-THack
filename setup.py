from setuptools import setup, find_packages
from codecs import open
from os import path
from pip.req import parse_requirements

here = path.abspath(path.dirname(__file__))
install_reqs = parse_requirements(here + '/requirements.txt', session=False)
reqs = [str(ir.req) for ir in install_reqs]

# Get the long description from the relevant file
with open(path.join(here, 'README.md'), encoding='utf-8') as f:
    long_description = f.read()

setup(
    name='AT&THACK',
    version='1.0',
    description='IoT Labling Platform',
    long_description=long_description,
    url='https://github.com/franciscovargas/AT-THack.git',
    author='Francisco Vargas',
    author_email='vargfran@gmail.com',
    license='MIT',
    keywords='IoT ML timeseries',
    install_requires=reqs,
)