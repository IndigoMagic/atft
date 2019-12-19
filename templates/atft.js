
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
                console.log("啥也没有~加一个")
                var box_big = document.getElementsByClassName("container")[0];
                console.log(box_big)
                box_big.insertAdjacentHTML('beforeend', tpl_start)
            } else {
            document.getElementById("container").innerHTML = "";
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
        }

        if (data_form_server.img.length < 1) {
            console.log("没有图片")
        } else {
        document.getElementById("previewImg").innerHTML = "";
        for (i = 0; i < data_form_server.img.length; i++) {
            console.log(data_form_server.img[i])
            // 要把遍历出来的数据传到页面的对应位置
            var img_start = `<img class="imgbox" width="200" src=`+data_form_server.img[i]+`>`
            console.log("这是第"+i+"次循环")
            var box_big = document.getElementById("previewImg");
            console.log(box_big)
            box_big.insertAdjacentHTML('beforeend', img_start)
        }
    
    }
    img_base64_list = data_form_server.img
            addclick();
        }
    };

}

get_data();

function get_data_from_backup(){
    console.log("页面加载之初步就请求来data数据")
    var httpRequest = new XMLHttpRequest();//第一步：创建需要的对象
    httpRequest.open('GET', host + 'getdatafrombackup/', true); //第二步：打开连接,发送json格式文件必须设置请求头 ；如下 - */
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
                console.log("啥也没有~加一个")
                var box_big = document.getElementsByClassName("container")[0];
                console.log(box_big)
                box_big.insertAdjacentHTML('beforeend', tpl_start)
            } else {
            document.getElementById("container").innerHTML = "";
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
        }

        if (data_form_server.img.length < 1) {
            console.log("没有图片")
        } else {
        document.getElementById("previewImg").innerHTML = "";
        for (i = 0; i < data_form_server.img.length; i++) {
            console.log(data_form_server.img[i])
            // 要把遍历出来的数据传到页面的对应位置
            var img_start = `<img class="imgbox" width="200" src=`+data_form_server.img[i]+`>`
            console.log("这是第"+i+"次循环")
            var box_big = document.getElementById("previewImg");
            console.log(box_big)
            box_big.insertAdjacentHTML('beforeend', img_start)
        }
    
    }
    img_base64_list = data_form_server.img
            addclick();
            send_data();
        }
    };
}
document.getElementById("get_data_from_backup").addEventListener("click", get_data_from_backup)

function lunxun(){
    var text_list_ = []
    for (let index = 0; index < document.getElementsByClassName("text").length; index++) {
        var textvalue =  document.getElementsByClassName("text")[index].value;
        text_list_.push(textvalue)
    }
    function get_data_only(text_l) {
        console.log("轮询校验数据")
        var httpRequest = new XMLHttpRequest();//第一步：创建需要的对象
        httpRequest.open('GET', host + 'getdata/', true); //第二步：打开连接/***发送json格式文件必须设置请求头 ；如下 - */
        httpRequest.setRequestHeader("Content-type", "application/json");//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
        httpRequest.send();//发送请求 将json写入send中
        // 获取数据后的处理程序
        httpRequest.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
                var data_form_server_text = httpRequest.responseText;//获取到服务端返回的数据
                var data_form_server = JSON.parse(data_form_server_text)
                if (text_l.toString() != data_form_server.text.toString() ) {
                    console.log("数据不一致，重新请求生成页面")
                    location.reload();
                } else {
                    console.log("数据一致，无需处理")
                }
            }
        };

    }
    get_data_only(text_list_);
}
// var lx = setInterval(function(){ lunxun() }, 100000);
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
        // document.getElementsByClassName("btn_copy_text")[index].addEventListener("click", makeCodes(index));
        var bct = document.getElementsByClassName("btn_copy_text")[index];
        var $bct_jq = $(bct)
        $bct_jq.on("click", makeCodes(index));

        document.getElementsByClassName("btn_copy_text")[index].addEventListener("click", send_data);
        console.log("现在给第"+index+"个按钮加点击事件")
    }
}

function removeclick(){
    for (let index = 0; index < document.getElementsByClassName("btn_copy_text").length; index++) {
        // document.getElementsByClassName("btn_copy_text")[index].removeEventListener("click", makeCodes(index));
        
        var bct = document.getElementsByClassName("btn_copy_text")[index];
        var $bct_jq = $(bct)
        // $bct_jq.on("click", makeCodes(index));
        $bct_jq.off('click');
        document.getElementsByClassName("btn_copy_text")[index].removeEventListener("click", send_data);
        console.log("现在删除第"+index+"个按钮的点击事件")
    }
}

// 二维码生成
function makeCodes(index) {
    return function(){
        console.log("进入生成二维码")
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
        if (!elText.value) {
            alert("Input a text");
            elText.focus();
            return;
        }
        copyText(elText.value,input)
        // elText.select(); // 选中文本
        // document.execCommand("copy"); // 执行浏览器复制命令
        // alert("复制成功");

        qrcode.makeCode(elText.value);
    }
    
}

function copyText(text,input) {
    // 数字没有 .length 不能执行selectText 需要转化成字符串
    console.log("进入copyText")
    console.log("这是"+text)
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
        console.log("兼容！！")
        alert('已复制到粘贴板');
    } else {
        console.log('不兼容');
    }
    input.blur();
    console.log("失焦完成，copy结束！！")
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
            console.log("//ie")
        } else {//firefox/chrome
            textbox.setSelectionRange(startIndex, stopIndex);
            textbox.focus();
            console.log("//firefox/chrome")
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
    console.log("开始准备发送数据到服务端")
    var text_list = []

    for (let index = 0; index < document.getElementsByClassName("text").length; index++) {
        var textvalue =  document.getElementsByClassName("text")[index].value;
        console.log(textvalue)
        console.log("$$$$$$$$")
        text_list.push(textvalue)
    }
    console.log(text_list)
    console.log("$$$$$$$$")
    console.log(typeof(text_list))


    data_to_py = {
            "text": text_list,
            "img":img_base64_list
        }
    
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


$('#picture').on('change', function(){
    var imgFiles = $(this)[0].files

    for (i=0;i<imgFiles.length;i++){
        filePath = imgFiles[i].name
        fileFormat = filePath.split('.')[filePath.split('.').length -1].toLowerCase()  
        console.log(filePath)
        console.log(fileFormat)
        src = window.URL.createObjectURL(imgFiles[i])
        // if( !fileFormat.match(/png|jpg|gif|jpeg/) ) {  
        //     alert('上传错误,文件格式必须为：png/jpg/jpeg')
        //     // return 
        //     break  
        // }

        var reader = new FileReader();
        reader.readAsDataURL(imgFiles[i]); //这个 result 为 DataURL, DataURL 可直接 赋值给 img.src 
        reader.onload = function (e) {
            img_base64 = this.result
            img_base64_list.push(img_base64)
            console.log(img_base64_list)
            send_data();
        }

        var preview = document.getElementById("previewImg")
        var img = document.createElement('img')
        img.width = 200
        // img.height = 200
        img.src = src
        img.className = "imgbox"
        preview.appendChild(img)
    }
})

document.getElementById("del_pic").addEventListener("click", delpic);
function delpic (){
    var preview = document.getElementById("previewImg")
    var img = document.getElementsByClassName('imgbox')[document.getElementsByClassName("imgbox").length - 1];
    console.log(document.getElementsByClassName("imgbox").length)
    console.log(document.getElementsByClassName("imgbox"))
    if (document.getElementsByClassName("imgbox").length < 1) {
        console.log("没有你删啥？");
    } else {
        preview.removeChild(img)
        // delete img_base64_list[img_base64_list.length - 1];
        img_base64_list.length = img_base64_list.length -1;
        console.log("del a Pic OK");
        send_data();
    }

}