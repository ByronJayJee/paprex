from flask import Flask, request
from flask_cors import CORS
from flask_restful import Resource, Api
from json import dumps
import json

import time

import server.user_def_utils.test_mod as tmod
import server.task_answer_formatting.task_answer_formatting as taf

## Using code from https://github.com/narenaryan/Salary-API as starting template

app = Flask(__name__, static_folder='../client/paprex-client/build', static_url_path='/')
api = Api(app)

#app.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy   dog'
#app.config['CORS_HEADERS'] = 'Content-Type

CORS(app, origins="*")

class hello_server(Resource):
    def get(self):
        return {'text': 'Connected to PaPreX Server!'}

class lassa_test(Resource):
    def post(self):
        json_out, html_out = taf.preload_answers_html_output('test_data/lassa_answer_from_qa.json')
        return {'body': html_out, 'body_json': json_out}

class time_call(Resource):
    def get(self):
        return {'time': time.time()}

class Hello_World(Resource):
    def get(self):
        # Return string Hello World
        return {'Hello':  'world!',
        'also': tmod.hello_world_mod()}

class Hey_You(Resource):
    def get(self, user_name):
        # Return string Hello World
        return {'Hello':  user_name}

class postJsonHandler(Resource):
    def post(self):
        '''
        Json used for testing==
        { 
            "device":"TemperatureSensor", 
            "value":"20", 
            "timestamp":"25/01/2017 10:10:05" 
        }
        '''
        #print (request.is_json)
        #print (request.get_data())
        #print (request.get_json(force=True))
        content = request.get_json()
        #print (content['post'])
        return 'JSON posted'

@app.route('/')
def index():
    return app.send_static_file('index.html')


api.add_resource(hello_server, '/api/helloserver')
api.add_resource(lassa_test, '/api/lassa_test')
api.add_resource(time_call, '/api/time')
api.add_resource(Hello_World, '/api/helloworld')
api.add_resource(postJsonHandler, '/api/json')
api.add_resource(Hey_You, '/api/hey/<string:user_name>')


if __name__ == '__main__':
     app.run()
     #app.run(port='5002')
