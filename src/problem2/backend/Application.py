from flask import Flask;
from flask_cors import CORS;
from Controller import blueprint;

def create_app():
  app = Flask(__name__); CORS(app)
  app.register_blueprint(blueprint)
  return app

app: Flask = create_app()
if (__name__ == "__main__"):
  app.run(host="0.0.0.0", port=8080)