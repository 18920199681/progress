window.onload = function () {

    function getStyle(obj, name) {
        if (obj.currentStyle) {
            return obj.currentStyle[name];
        } else {
            return getComputedStyle(obj, false)[name];
        }
    }

    var process_circle = document.querySelector(".process_circle");
    var process_now = document.querySelector(".process_now");
    var process_box = document.querySelector(".process_box");
    var process_width = parseInt(getStyle(process_box, "width"));
    var a_start_btn = document.querySelector(".a_start_btn");
    var a_close_btn = document.querySelector(".a_close_btn");
    var a_cover_box = document.querySelector(".a_cover_box");

    // 剩余播放时间（转为毫秒）
    var a_time = 3000;

    function startMove(a_time) {

        function move_fn() {
            var speed = Math.abs(process_width / (a_time / 15));
            if (process_circle.offsetLeft >= process_width) {
                clearInterval(timer);
                a_cover_box.classList.remove("rotate");
                process_circle.style.left = 0 + "px";
                process_now.style.width = 0 + "px";
                a_start_btn.style.display = "block";
                a_close_btn.style.display = "none";
            } else {
                process_circle.style.left = process_circle.offsetLeft + speed + "px";
                process_now.style.width = process_now.offsetWidth + speed + "px";
            }
        }
        timer = setInterval(move_fn, 15);

        a_close_btn.onclick = function () {
            a_close_btn.style.display = "none";
            a_start_btn.style.display = "block";
            clearInterval(timer);
            a_cover_box.classList.remove("rotate");
        }
    }

    if (process_circle.offsetLeft <= process_width) {
        a_start_btn.onclick = function () {
            a_start_btn.style.display = "none";
            a_close_btn.style.display = "block";
            startMove(a_time);
            a_cover_box.classList.add("rotate");
        }
    }

    // 移动滚动条
    process_circle.addEventListener("touchstart", function (e) {
        var disX = e.changedTouches[0].clientX - process_circle.offsetLeft;
        document.addEventListener("touchmove", function (e) {
            var oLeft = e.changedTouches[0].clientX - disX;
            if (oLeft < 0) {
                oLeft = 0;
            } else if (oLeft > process_box.offsetWidth - process_circle.offsetWidth) {
                oLeft = process_box.offsetWidth - process_circle.offsetWidth;
            } else {
                process_circle.style.left = oLeft + "px";
                process_now.style.width = oLeft + "px";
            }
        });
        document.addEventListener("touchend", function (e) {
            document.touchmove = null;
            document.touchend = null;
        });
        return false;
    })

    process_box.addEventListener("click", function (e) {
        var disX = e.clientX;
        process_circle.style.left = disX + "px";
        process_now.style.width = disX + "px";
        return false;
    })
}

