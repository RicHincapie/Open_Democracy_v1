#!/usr/bin/python3
""" Starts a Flash Open Democracy """
from flask import Flask, render_template
app = Flask(__name__)

@app.route('/demo', strict_slashes=False)
def hbnb():
    return render_template('index.html')

if __name__ == "__main__":
    """ Main Function """
    app.run(host='0.0.0.0', port=5002)