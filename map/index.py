#!/usr/bin/python3
from os import environ


""" Starts a Flash Open Democracy """
from flask import Flask, render_template
app = Flask(__name__)

@app.route('/demo', strict_slashes=False)
def hbnb():
    return render_template('index.html')

@app.route('/', strict_slashes=False)
def index():
    return render_template('landing.html')

@app.route('/about', strict_slashes=False)
def about():
    return render_template('about.html')

if __name__ == "__main__":
    """ Main Function """
    host = environ.get('ODEM_API_HOST')
    port = environ.get('ODEM_API_PORT')
    if not host:
        host = '0.0.0.0'
    if not port:
        port = '6005'
    app.run(host=host, port=port, threaded=True, debug=False)