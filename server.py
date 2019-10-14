from flask import Flask,render_template
import socket
import json
from flask import request, jsonify
# 这是获取当前脚本运行的机器的IP
def get_host_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(('www.baidu.com', 0))
        ip = s.getsockname()[0]
        print(ip)
        print("haha")
    except:
        ip = "127.0.0.1"
    finally:
        s.close()
    return ip
myip = get_host_ip()
app = Flask(__name__,static_folder="./templates")
app.debug = True

global data
# data = {
#     "text":{
#         "text1":"",
#     },
#         "img":{
#         "img1":"",
#         # "img2":"base64",        
#     }
# }

data = {
    "text":["111","222","333"]
}

cishu = 0
@app.route('/')
def index():
    global cishu  # 判断第几次请求的全局变量计数器，做全局变量测试用的
    ip_frompy = {"ip":"http://"+myip+":5000/"} # 获取本机真实的IP
    cishu += 1
    print("这是第%s次请求"% cishu)
    print(data)
    return render_template("QRcode.html",ip_forjs=ip_frompy)
@app.route("/savedata/",methods=["POST"])
def get_code():
    global data
    data = request.json
    print("%s  ----------from js"% data)
    return data

@app.route("/getdata/",methods=["GET"])
def send_code():
    print("有人来要了个data")
    return data

if __name__ == '__main__':
    app.run(host=myip, port=5000)