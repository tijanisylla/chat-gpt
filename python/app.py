import os
from dotenv import load_dotenv, find_dotenv
import openai
from flask import Flask, request, jsonify
from flask_cors import CORS

# load the environment variables from the .env file (which is not included in the repo for security reasons)
load_dotenv(find_dotenv())
# get the API key from the .env file
openai.api_key = os.getenv("OPENAI_API_KEY")
model = "text-davinci-003"
app = Flask(__name__)
CORS(app)


@app.route('/api', methods=['POST'])
def gpt3():
    # get the data from the request (the data is in JSON format)
    data = request.get_json(force=True)
    message = data['message']
    response = openai.Completion.create(
        model=model,
        prompt=message,
        max_tokens=3000,
        temperature=0.9,
    )
    print(response.choices[0].text)
    # send back the response to the client
    return jsonify({
        "message": response.choices[0].text,

    })


@app.route('/test', methods=['GET'])
def health():
    return jsonify({
        "message": "ok"
    })


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000, debug=True)
