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
    len = imgs.length,
    menu = byId("menu-content"),
    submenu = byId("sub-menu"),
    menuitems = menu.getElementsByClassName("menu-item"),
    innerBox = submenu.getElementsByClassName("inner-box"); //IE8及以下浏览器不兼容

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

  
    //导航菜单
    //遍历主菜单，且绑定时间
    for (var m = 0; m < menuitems.length; m++) {
        //给每一个menuitem定义data-index属性，作为索引
        menuitems[m].setAttribute("data-index", m);
        menuitems[m].style.background = "none"
        menuitems[m].onmouseover = function () {
            submenu.className = 'sub-menu';
            var idx = this.getAttribute("data-index");
            //console.log(idx);
            //遍历所有子菜单，将每一个都隐藏
            for (var j = 0; j < innerBox.length;j++ ){
                innerBox[j].style.display = "none";
                menuitems[j].style.background = "none"
            }
            menuitems[idx].style.background = "rgba(0,0,0,0.1)"
            innerBox[idx].style.display = 'block';
        }

    }
    menu.onmouseout = function () {
        submenu.className = 'sub-menu hide';
    }
    
    submenu.onmouseover = function () {
        this.className = "sub-menu";
    }
    submenu.onmouseout = function (ev) {
        var oEvent = ev || event;
        var oTo = oEvent.toElement || oEvent.relatedTarget;
        if (this.contains(oTo)) return;
        this.className = "sub-menu hide";
        for (var y = 0; y < menuitems.length; y++) {
            menuitems[y].style.background = "none";
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
