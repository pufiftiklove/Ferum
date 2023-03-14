# Flask - библиотека для создания веб-сервера
from flask import Flask, request, render_template
from datetime import datetime
import json
#import threading
app = Flask(__name__)
DATA_FILE = "data_001.json"

#

# Загружаем сообщения из файла
def load_messages():
  # json_file = open(DATA_FILE, "r")
  # json_file.close()
  with open(DATA_FILE, "r", encoding="utf8") as json_file:
    data = json.load(json_file)  # data = {"all_messages":  [] }
    return data["all_messages"]




all_messages = load_messages()  # При старте сервера, загружаем сообщения из файла в переменную



# Сохраняем сообщения в файл
def save_messages():
  with open(DATA_FILE, "w", encoding="utf8") as json_file:
    data = {"all_messages": all_messages}
    json.dump(data, json_file)


# Сохраним сообщения в файл (JSON)


@app.route("/")
def hello_world():
  return render_template("form.html")


# API для получения сообщений
# /get_messages => {"messages": [...]}


@app.route("/get_messages")
def get_messages():
  
  return {"messages": all_messages}

#


def add_message(image_users, id_sender,  id, text):
  # time: подставить автоматически
  
  new_message = {
    "image_users": image_users,
    "id_sender": id_sender,
    "id_user": id,
    "text": text,
    "time": datetime.now().strftime("%H:%M"),
  }
  # append - добавить элемент в список
  all_messages.append(new_message)
  save_messages()  # Сохраняем в файл

@app.route("/del_message")
def del_message():
  global all_messages
  im = int(request.args["im"])
  with open("data_001.json", encoding="utf8") as file:
    dict_ = json.load(file)
    print(im)
  dict_["all_messages"][im]["image_users"]=""
  dict_["all_messages"][im]["text"]=""
  dict_["all_messages"][im]["id_sender"]=""
  dict_["all_messages"][im]["id_user"]=""
  dict_["all_messages"][im]["time"]=""
  all_messages = load_messages()
  
  
  with open("data_001.json", "w", encoding="utf8") as file:
    json.dump(dict_, file, ensure_ascii=False)

  
# API для отправки сообщений /send_message?sender=Mike&text=Hello
@app.route("/send_message")
def send_message():
  image_users = request.args["image_users"]
  id_sender = request.args["id_sender"]# ToDO: error here, sender vs name
  id = request.args["id_user"]
  text = request.args["text"]
  add_message(image_users, id_sender, id, text)
  return {"result": True}




  
app.run(host="0.0.0.0", port=44372)
