from flask import Flask, render_template
import socket
import json
from flask import request, jsonify, send_from_directory
import os
import time
# 这是获取当前脚本运行的机器的IP
backup_file_path = "./backup_data.json"


def write_json_in_file(backup_file_path, json_data):
    with open(backup_file_path, "w", encoding='utf-8') as f:
        json.dump(json_data, f, ensure_ascii=False)
        print("写入json文件完成...")


def read_json_in_file(backup_file_path):
    if os.stat(backup_file_path).st_size == 0:
        data_from_file = {
            "text": [],
            "img": [],
            "filenamelist": []
        }
    else:
        with open(backup_file_path, "r+", encoding='utf-8') as f:
            data_from_file = json.load(f)
    return data_from_file


def get_host_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
        print(ip)
    except:
        ip = input("请输入你的IP地址（格式如：192.168.12.13）")
    finally:
        s.close()
    return ip


myip = get_host_ip()
app = Flask(__name__, static_folder="./templates")
app.debug = True
UPLOAD_FOLDER = 'uploadfiles'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER  # 设置文件上传的目标文件夹
basedir = os.path.abspath(os.path.dirname(__file__))  # 获取当前项目的绝对路径


def get_filelist(uppath):
    if os.path.exists(uppath):
        filedir = os.listdir(uppath)
    else:
        os.mkdir(uppath)
        filedir = os.listdir(uppath)
    return filedir


global data

data = {
    "text": [],
    "img": [],
    "filenamelist": []
}

cishu = 0
@app.route('/')
def index():
    global cishu  # 判断第几次请求的全局变量计数器，做全局变量测试用的
    # ip_frompy = {"ip":"http://"+myip+":5000/"} # 获取本机真实的IP
    cishu += 1
    print("这是第%s次请求" % cishu)
    print(data)
    return render_template("demo.html")


@app.route("/savedata/", methods=["POST"])
def get_code():
    global data
    data = request.json
    print("%s  ----------from js" % data)
    write_json_in_file(backup_file_path, data)
    return jsonify(data)


@app.route("/getdata/", methods=["GET"])
def send_code():
    print("有人来要了个data")
    filelistforjs = get_filelist(UPLOAD_FOLDER)
    data["filenamelist"] = filelistforjs
    return jsonify(data)


@app.route("/getdatafrombackup/", methods=["GET"])
def getdatafrombackup():
    data = read_json_in_file(backup_file_path)
    print("data已经从备份文件中读取出来")
    print(data)
    return jsonify(data)


@app.route("/uploadfile/", methods=["POST"])
def get_file():
    file_dir = os.path.join(basedir, app.config['UPLOAD_FOLDER'])  # 拼接成合法文件夹地址
    if not os.path.exists(file_dir):
        os.makedirs(file_dir)  # 文件夹不存在就创建
    # 从表单的file字段获取文件，myfile为该表单的name值
    filelistfromjs = request.files.getlist("file")
    filenamelist = []
    for i in filelistfromjs:
        f = i  # 从表单的file字段获取文件，myfile为该表单的name值
        if f:  # 判断是否是允许上传的文件类型
            fname = f.filename
            # ext = fname.rsplit('.', 1)[1]  # 获取文件后缀
            new_filename = fname  # 修改文件名
            f.save(os.path.join(file_dir, new_filename))  # 保存文件到upload目录
            filenamelist.append(new_filename)
            msg = {"code": 1, "errmsg": "上传成功"}
        else:
            msg = {"code": 0, "errmsg": "上传失败"}
    msg["filenamelist"] = filenamelist
    return jsonify(msg)


@app.route("/downloadfile/<path:filename>", methods=["GET"])
def send_file(filename):
    # 这里是下在目录，从工程的根目录写起，比如你要下载static/js里面的js文件，这里就要写“static/js”
    dirpath = os.path.join(app.root_path, 'uploadfiles')
    # as_attachment=True 一定要写，不然会变成打开，而不是下载
    return send_from_directory(dirpath, filename, as_attachment=True)


if __name__ == '__main__':
    app.run(host=myip, port=5000)
