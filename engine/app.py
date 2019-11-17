import sys
from flask import Flask, render_template, request, json
from spell_checker import analyze
from spell_corrector import correction

app = Flask(__name__, template_folder='../templates', static_folder='../static')


@app.route("/")
def hello():
    return render_template('index.html')


@app.route("/check-spell/<text>", methods=['GET'])
def check_spell(text):
    return json.dumps(analyze(text))


@app.route("/spell-correct/<text>", methods=['GET'])
def check_correct(text):
    return json.dumps(correction(text))


if __name__ == "__main__":
    # TODO: dl
    app.run(debug=True, host='127.0.0.1', port=5000)
