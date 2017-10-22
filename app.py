import genomelink
import json
import requests
from flask import Flask, render_template, request, redirect, session, url_for, jsonify
app = Flask(__name__)


#test demo with eye color
@app.route('/ADB')
def ADB():
    feature = 'alcohol-drinking-behavior'
    #feature = 'eye-color'
    report = genomelink.Report.fetch(name=feature,
                                     population='european',
                                     token='GENOMELINKTEST')

    return report.summary['text']

#grab alcohol data
@app.route('/form')
def reportADB():
    authorize_url = genomelink.OAuth.authorize_url(scope=['report:alcohol-drinking-behavior'])

    # Fetching a protected resource using an OAuth2 token if exists.
    reports = []
    if session.get('oauth_token'):
        reports.append(genomelink.Report.fetch(name='alcohol-drinking-behavior', population='european', token=session['oauth_token']))

    return render_template('form.html', authorize_url=authorize_url, reports=reports)

    #return report
    #if report.summary['text'] == None:
    #return "Field does not exist"
    #return report.summary['text']
@app.route('/callback')
def callback():
    # The user has been redirected back from the provider to your registered
    # callback URL. With this redirection comes an authorization code included
    # in the request URL. We will use that to obtain an access token.
    token = genomelink.OAuth.token(request_url=request.url)

    # At this point you can fetch protected resources but lets save
    # the token and show how this is done from a persisted token in index page.
    session['oauth_token'] = token
    return redirect(url_for('reportADB'))

@app.route('/testADB')
def help():
    token = 'GENOMELINKTEST'
    headers = {'Authorization': 'Bearer {}'.format(token)}

    phenotype = 'eye-color'
    population = 'european'
    report_url = 'https://genomicexplorer.io/v1/reports/{}?population={}'.format(phenotype, population)
    response = requests.get(report_url, headers=headers)
    data = response.json()
    print(json.dumps(data))


# test sending to js app
# https://stackoverflow.com/questions/46204047/calling-a-javascript-function-from-flask-python
@app.route('/get_json_test')
def get_json():
    return jsonify(firstname='renu',
                   lastname='singh')

#@app.route('/form')
#def form():
    #return render_template('form.html')

@app.route('/')
def index():
    return render_template('template.html')


if __name__ == '__main__':
   # This allows us to use a plain HTTP callback.
    import os
    os.environ['DEBUG'] = "1"
    os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

    # Run local server on port 5000.
    app.secret_key = os.urandom(24)
    app.run(debug = True)