//封装一个代替getElementById()的方法
function byId(id) {
    return typeof (id) === "string" ? document.getElementById(id) : id;
}
//console.log(byId("main"));
//console.log(document.getElementById("main"));

//全局变量
var index = 0,
    timer = null,
    pics = byId("banner").getElementsByTagName("div"),
    dots = byId("dots").getElementsByTagName("span"),
    prev = byId("prev"),
    next = byId("next"),
    len = pics.length;
//console.log(len)
function slideImg() {
    var main = byId("main");
    //滑过清除定时器，离开继续
    main.onmouseover = function () {
        //清除定时器
        if (timer) clearInterval(timer);
    }
    main.onmouseout = function () {
        timer = setInterval(function () {
            index++;
            if (index >= len) {
                index = 0;
            }
            //切换图片
            changImg()
        },2000)
    }
    //自动在main上触发鼠标离开事件
    main.onmouseout();

    //遍历所有圆点，并且绑定点击事件，点击圆点切换图片
    for (var d = 0; d < len; d++) {
        //给索引span添加一个id属性，值为d，作为当前的索引
        dots[d].id = d;
        dots[d].onclick = function () {
            //改变index为当前span的索引
            index = this.id;    
            //调用changImg，实现切换图片
            changImg()
            //alert(d);//3 错误的
        }
    }

    //下-张
    next.onclick = function () {
        index++;
        if (index >= len) {
            index = 0;
            //console.log(index)
        }
        changImg();
    }
    //上-张
    prev.onclick = function () {
        index--;
        if (index < 0) index = len-1;
        changImg();
    }
}

//切换图片
function changImg() {
    //遍历banner下所有的div，将其隐藏
    for (var i = 0; i < len; i++) {
        pics[i].style.display = "none";
        dots[i].className = "";
    }
    
    //根据index索引找到当前div和dots.span，将其显示出来和设为当前
    pics[index].style.display = "block";
    dots[index].className = "active";
}
slideImg();