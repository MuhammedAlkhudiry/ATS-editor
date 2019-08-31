import sys
from flask import Flask, render_template, request, json
from spell_checker import analyze

app = Flask(__name__, template_folder='../templates', static_folder='../static')


@app.route("/")
def hello():
    return render_template('index.html')


@app.route("/check-spell/<text>", methods=['GET'])
def words(text):
    return json.dumps(analyze(text))


if __name__ == "__main__":
    # TODO: dl
    app.run(debug=True, host='127.0.0.1', port=5000)
