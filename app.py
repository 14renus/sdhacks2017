import genomelink
from flask import Flask, render_template, request, redirect, session, url_for, jsonify
app = Flask(__name__)

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
#test demo with eye color
@app.route('/callback')
def callback():
    #feature = 'alcohol-drinking-behavior'
    feature = 'eye-color'
    report = genomelink.Report.fetch(name=feature,
                                     population='european',
                                     token='GENOMELINKTEST')

    return report.summary['text']

#grab alcohol data
@app.route('/reportADB')
def reportADB():
    authorize_url = genomelink.OAuth.authorize_url(scope=['report:alcohol-drinking-behavior'])
    report = genomelink.Report.fetch(name='alcohol-drinking-behavior',
                                     population='european',
                                     token='GENOMELINKTEST')

    if report.summary['text'] == None:
        return "Field does not exist"
    return report.summary['text']

# test sending to js app
# https://stackoverflow.com/questions/46204047/calling-a-javascript-function-from-flask-python
@app.route('/get_json_test')
def get_json():
    return jsonify(firstname='renu',
                   lastname='singh')

@app.route('/form')
def form():
    return render_template('form.html')

@app.route('/')
def index():
    return render_template('template.html')


if __name__ == '__main__':
   app.run(debug = True)