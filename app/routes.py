from flask import render_template
from app import app

@app.route('/')
@app.route('/index')
def index():
    #return render_template('index.html', title='home', user=user)
    return render_template('index-bootstrap.html', title='home', user=user)

@app.route('/pushing')
def pushing():
    return render_template('index.html', title='pushing', user=user)

user = {'username': 'Eric'}