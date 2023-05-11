from flask import Flask, request, render_template
import requests
import time
import threading

app = Flask(__name__)
lock = threading.Lock()

@app.route('/')
def home():
    return render_template('checker.html')

@app.route('/process')
def process_req():
    gate = request.args.get('gate') or 'vbv'
    with lock:
        if gate == 'vbv':
            url = 'http://127.0.0.1:5001/vbv?cc='+request.args.get('cc')
            r1 = requests.get(url)
            return r1.text
        if gate == 'auth':
            url = 'http://127.0.0.1:5001/auth?cc='+request.args.get('cc')
            r1 = requests.get(url)
            return r1.text
        if gate == 'spamxx':
            url = 'http://127.0.0.1:5001/spamxx?cc='+request.args.get('cc')
            r1 = requests.get(url)
            return r1.text
        
app.run(host='0.0.0.0',port='5000')
