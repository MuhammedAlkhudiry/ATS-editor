import sys
from flask import Flask, render_template, request, json

app = Flask(__name__)

@app.route("/")
def hello():
    return render_template('index.html')


@app.route("/words/<content>", methods=['GET'])
def words(content):
    return json.dumps(len(content))


if __name__ == "__main__":
    # TODO: dl
    app.run(debug=True, host='127.0.0.1', port=5000)
