
console.log("start!!!!!!!!!!!!!!!!!")
var domain = document.domain;
console.log(domain)
host = "http://"+domain+":5000/"
function get_data() {
    console.log("页面加载之初步就请求来data数据")
    var httpRequest = new XMLHttpRequest();//第一步：创建需要的对象
    console.log(host);
    console.log(host + 'getdata/');
    httpRequest.open('GET', host + 'getdata/', true); //第二步：打开连接/***发送json格式文件必须设置请求头 ；如下 - */
    httpRequest.setRequestHeader("Content-type", "application/json");//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
    httpRequest.send();//发送请求 将json写入send中
    // 获取数据后的处理程序
    httpRequest.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
            var data_form_server_text = httpRequest.responseText;//获取到服务端返回的数据
            console.log(typeof(data_form_server_text))
            console.log(data_form_server_text);
            var data_form_server = JSON.parse(data_form_server_text)

            if (data_form_server.text.length < 1) {
                var tpl_start = `<div class="text_box">
                <textarea name="texttocode" id="text1" class="text" cols="40" rows="7" placeholder="请输入文本！"
                autofocus>`+`</textarea><div id="qrcode1" class="qrcode"></div>
                <div class="btn_copy_text" id="btn1">Copy<br>and<br>QR</div>
                </div>`
                console.log("啥也没有~")
                var box_big = document.getElementsByClassName("container")[0];
                console.log(box_big)
                box_big.insertAdjacentHTML('beforeend', tpl_start)
            }
            for (i = 0; i < data_form_server.text.length; i++) {
                console.log(data_form_server.text[i])
                // 要把遍历出来的数据传到页面的对应位置
                var tpl_start = `<div class="text_box">
                <textarea name="texttocode" id="text1" class="text" cols="40" rows="7" placeholder="请输入文本！"
                autofocus>`+data_form_server.text[i]+`</textarea><div id="qrcode1" class="qrcode"></div>
                <div class="btn_copy_text" id="btn1">Copy<br>and<br>QR</div>
                </div>`
                console.log("这是第"+i+"次循环")
                var box_big = document.getElementsByClassName("container")[0];
                console.log(box_big)
                box_big.insertAdjacentHTML('beforeend', tpl_start)

            }
            addclick();
        }
    };

}

get_data();


var tpl = `<div class="text_box">
<textarea name="texttocode" id="text1" class="text" cols="40" rows="7" placeholder="请输入文本！"
    autofocus></textarea><div id="qrcode1" class="qrcode"></div>
<div class="btn_copy_text" id="btn1">Copy<br>and<br>QR</div>
</div>`

// 增删节点
function addbox() {
    var box_big = document.getElementsByClassName("container")[0];
    console.log(box_big)
    box_big.insertAdjacentHTML('beforeend', tpl)
    removeclick();
    addclick();
    send_data();
}

document.getElementById("btnadd").addEventListener("click", addbox);

function delbox() {
    var main = document.getElementsByClassName("container")[0];
    var box = document.getElementsByClassName("text_box")[document.getElementsByClassName("text_box").length - 1];
    main.removeChild(box);
    console.log("del a text_box OK")
    send_data();
}

document.getElementById("btndel").addEventListener("click", delbox);



function addclick() {
    for (let index = 0; index < document.getElementsByClassName("btn_copy_text").length; index++) {
        document.getElementsByClassName("btn_copy_text")[index].addEventListener("click", makeCodes(index));
        document.getElementsByClassName("btn_copy_text")[index].addEventListener("click", send_data);
        console.log("现在给第"+index+"个按钮加点击事件")
    }
}

function removeclick(){
    for (let index = 0; index < document.getElementsByClassName("btn_copy_text").length; index++) {
        document.getElementsByClassName("btn_copy_text")[index].removeEventListener("click", makeCodes(index));
        document.getElementsByClassName("btn_copy_text")[index].removeEventListener("click", send_data);
        console.log("现在删除第"+index+"个按钮的点击事件")
    }
}

// addclick();

function get_every_text(){
    for (let index = 0; index < document.getElementsByClassName("text").length; index++) {
        var textvalue =  document.getElementsByClassName("text")[index].value;
        console.log(textvalue)

    }
}

get_every_text();


// 二维码生成
function makeCodes(index) {
    return function(){
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        // console.log(index);
        // 获取胸弟元素的 值 TODO
        var main = document.getElementById("container").children[index];
        main.children[1].innerHTML = ""
        var qrcode = new QRCode(main.children[1], {
            width: 156,
            height: 156
        });
        var elText = main.children[0];
        var input = main.children[0]
        copyText(elText.value,input)
        // elText.select(); // 选中文本
        // document.execCommand("copy"); // 执行浏览器复制命令
        // alert("复制成功");
        if (!elText.value) {
            alert("Input a text");
            elText.focus();
            return;
        }
        qrcode.makeCode(elText.value);
    }
    
}

function copyText(text,input) {
    // 数字没有 .length 不能执行selectText 需要转化成字符串
    console.log("进入copyText")
    console.log(text)
    const textString = text.toString();
    if (!input) {
        input = document.createElement('input');
        input.id = "copy-input";
        input.readOnly = "readOnly";        // 防止ios聚焦触发键盘事件
        input.style.position = "absolute";
        input.style.left = "-1000px";
        input.style.zIndex = "-1000";
        document.body.appendChild(input)
    }


    input.value = textString;
    // ios必须先选中文字且不支持 input.select();
    selectText(input, 0, textString.length);
    if (document.execCommand('copy')) {
        document.execCommand('copy');
        alert('已复制到粘贴板');
    } else {
        console.log('不兼容');
    }
    input.blur();
    // input自带的select()方法在苹果端无法进行选择，所以需要自己去写一个类似的方法
    // 选择文本。createTextRange(setSelectionRange)是input方法
    function selectText(textbox, startIndex, stopIndex) {
        console.log("进入selectText")
        if (textbox.createTextRange) {//ie
            const range = textbox.createTextRange();
            range.collapse(true);
            range.moveStart('character', startIndex);//起始光标
            range.moveEnd('character', stopIndex - startIndex);//结束光标
            range.select();//不兼容苹果
        } else {//firefox/chrome
            textbox.setSelectionRange(startIndex, stopIndex);
            textbox.focus();
        }
    }

};

var qrcodeofmy = new QRCode(document.getElementById("qrcodeofmy"), {
    width: 100,
    height: 100
});

// 生成本机IP的二维码
qrcodeofmy.makeCode(host)

// 发送data到服务端 
function send_data() {
    var text_list = []

    for (let index = 0; index < document.getElementsByClassName("text").length; index++) {
        var textvalue =  document.getElementsByClassName("text")[index].value;
        console.log(textvalue)
        text_list.push(textvalue)
    }

    data_to_py = {
            "text": text_list
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
