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


def main():
    app = Flask(__name__)
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    app.route('/test', methods=['GET'])

    def test():
        return jsonify({
            "message": "Hello World!"
        })

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
        if response.choices[0].text == "":
            return jsonify({
                "message": "I don't know what to say. Try asking me something else.",

            })
        return jsonify({
            "message": response.choices[0].text,

        })

    return app


if __name__ == '__main__':
    app = main()
    app.run(host='0.0.0.0', port=8080)
    # localhost:8000/api
    # Path: python/requirements.txt
    # openai==0.2.0
    # flask==1.1.2
