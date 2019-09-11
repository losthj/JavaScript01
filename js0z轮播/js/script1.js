//封装一个获取id的函数
function byId(id) {
    return typeof(id) === "string" ? document.getElementById(id) : id;
}

var index = 0,
    timer = null,
    main = byId("main"),
    banner = byId("banner"),
    imgs = banner.getElementsByTagName("div"),
    prev = byId("prev"),
    next = byId("next"),
    dots = byId("dots").getElementsByTagName("span"),
    len = imgs.length;

function slieImg() {
// 鼠标移入暂停切换
    main.onmouseover = function () {
        if (timer) clearInterval(timer);
    }
// 鼠标移出重新开始切换
    main.onmouseout = function () {
        timer = setInterval(function () {
            index++;
            if (index >= len) {
                index = 0;
            }
            changImg()
        }, 2000)
    }

    //自动切换
    main.onmouseout();
    //上一张
    prev.onclick = function () {
        index--;
        if (index < 0) {
            index = len - 1;
        }
        changImg();
    }
    //下一张
    next.onclick = function () {
        index++;
        if (index >= len) {
            index = 0;
        }
        changImg();
    }

    //圆点切换
    for (var j = 0; j < len; j++) {
        dots[j].id = j;//可以用特定属性index,id
        dots[j].onclick = function () {
            index = this.id;
            changImg();
        }
    }
}

  

function changImg() {
    for (var i = 0; i < len; i++) {
        imgs[i].style.display = "none"
        dots[i].className = "";
    }
    imgs[index].style.display = "block";
    dots[index].className = "active";
}

slieImg()
