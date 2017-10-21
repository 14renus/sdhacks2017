import genomelink
from flask import Flask, render_template, request, redirect, session, url_for
app = Flask(__name__)



@app.route('/callback')
def callback():
    report = genomelink.Report.fetch(name='alcohol-drinking-behavior',
                                     population='european',
                                     token='GENOMELINKTEST')

    if report.summary['text'] == None:
        return "Field does not exist"
    return report.summary['text']

@app.route('/reportADB')
def reportADB():
    report = genomelink.Report.fetch(name='alcohol-drinking-behavior',
                                     population='european',
                                     token='GENOMELINKTEST')

    if report.summary['text'] == None:
        return "Field does not exist"
    return report.summary['text']

@app.route('/form')
def form():
    return render_template('form.html')

@app.route('/')
def index():
    return render_template('template.html')


if __name__ == '__main__':
   app.run(debug = True)