window.onload = function () {
    console.time("mainThread");
    (function (d) {
        var arr = [1, 2, 3, 4, 5];
        var btn = d.getElementById('btn');
        btn.onclick = function () {
            for (var i = 0; i < 3; i++) {
                console.log("hello gulp uglify")
                console.log(arr);
            }
        }
    })(document);
    console.timeEnd("mainThread");
}
