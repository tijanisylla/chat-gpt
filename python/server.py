import os
from dotenv import load_dotenv, find_dotenv
import openai
from flask import Flask, request, jsonify
from flask_cors import CORS


load_dotenv(find_dotenv()) # load the environment variables from the .env file (which is not included in the repo for security reasons)
openai.api_key = os.getenv("OPENAI_API_KEY") # get the API key from the .env file

app = Flask(__name__, static_folder='../build', static_url_path='/')
cors = CORS(app) 
# enable CORS (Cross-Origin Resource Sharing) so that the client can make requests to the server
@app.route('/api', methods=['POST'])
def gpt3():
    data = request.get_json(force=True) # get the data from the request (the data is in JSON format) 
    message = data['message']
    response = openai.Completion.create(
      model="text-davinci-003",
      prompt=message,
      max_tokens=3000,
      temperature=0.9,
    )
    print (response.choices[0].text)
    # send back the response to the client
    return jsonify({
      "message" : response.choices[0].text,
      "created" : response.created
      })


if __name__ == '__main__':
    
    app.debug = True
    app.run( host='0.0.0.0',port=5050) # debug=True allows for hot reloading of the server when you make changes to the code (very useful) 
# localhost:5050/api
# Path: python/requirements.txt
# openai==0.2.0
# flask==1.1.2
