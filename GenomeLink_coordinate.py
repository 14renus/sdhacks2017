import genomelink
from flask import Flask, render_template, request, redirect, session, url_for
app = Flask(__name__)

@app.route('')
def index():
    report = genomelink.Report.fetch(name='alcohol-drinking-behavior',
                                     population='european',
                                     token='GENOMELINKTEST')

    if report.summary['text'] == None:
        return "Field does not exist"
    return report.summary['text']



if __name__ == '__main__':
   app.run(debug = True)