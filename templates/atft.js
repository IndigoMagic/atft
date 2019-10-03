var host = "192.168.1.1"
document.getElementById("btn1").addEventListener("click", makeCode);

var qrcode = new QRCode(document.getElementById("qrcode1"), {
    width: 200,
    height: 200
});
// 二维码生成
function makeCode() {
    var elText = document.getElementById("text1");
    elText.select(); // 选中文本
    document.execCommand("copy"); // 执行浏览器复制命令
    // alert("复制成功");
    if (!elText.value) {
        alert("Input a text");
        elText.focus();
        return;
    }
    qrcode.makeCode(elText.value);
}

var qrcodeofmy = new QRCode(document.getElementById("qrcodeofmy"), {
    width: 100,
    height: 100
});

// 生成本机IP的二维码
qrcodeofmy.makeCode(host)

document.getElementById("btn1").addEventListener("click", send_data);
// 发送data到服务端 
function send_data() {

    data_to_py = {
        "text": {
            "text1": document.getElementById("text1").value,
            // "text2": "",
        },
        "img": {
            "img1": img_base64,
        }
    }
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$")
    console.log(data_to_py)
    var httpRequest = new XMLHttpRequest();//第一步：创建需要的对象
    httpRequest.open('POST', host + 'savedata/', true); //第二步：打开连接/***发送json格式文件必须设置请求头 ；如下 - */
    httpRequest.setRequestHeader("Content-type", "application/json");//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
    httpRequest.send(JSON.stringify(data_to_py));//发送请求 将json写入send中
    // 获取数据后的处理程序
    httpRequest.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
            var json = httpRequest.responseText;//获取到服务端返回的数据
            console.log(json);
        }
    };

}

// 文件上载操作
window.onload = function () {
    var input = document.getElementById("demo_input"); //上传文件
    var result = document.getElementById("result"); //这里展示base64文本
    var img_area = document.getElementById("img_area"); //展示图片

    if (typeof (FileReader) === 'undefined') {
        result.innerHTML = "抱歉，你的浏览器不支持 FileReader，请使用现代浏览器操作！";
        input.setAttribute('disabled', 'disabled'); //设置input，就是那个上传按钮不能被点击
    }

    else {
        input.addEventListener('change', readFile, false); //设置读取文件的冒泡事件监听
    }
}

function readFile() {
    var file = this.files[0];

    //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件   
    // if (!/image\/\w+/.test(file.type)) {
    //     alert("请确保文件为图像类型");
    //     return false;
    // }

    var reader = new FileReader();
    reader.readAsDataURL(file); //这个 result 为 DataURL, DataURL 可直接 赋值给 img.src 
    console.log("嘤嘤嘤~~~~");
    reader.onload = function (e) {
        // result.innerHTML = this.result; //在textarea展示base64文档
        // alert(this.result)
        img_base64 = this.result
        img_area.innerHTML = '<div class="sitetip"></div><img src="' + this.result + '" alt="" />';
        // 展示图片
    }
}