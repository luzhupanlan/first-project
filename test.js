(function (b) {
    var a = {
        getRandom: function (d, c) {
            return Math.floor(Math.random() * (c - d + 1)) + d
        }
    };
    b.Tool = a
})(window);
(function (c) {
    var a;

    function b(d) {
        d = d || {};
        this.width = d.width || 20;
        this.height = d.height || 20;
        this.color = d.color || "green";
        this.x = d.x || 0;
        this.y = d.y || 0
    }
    b.prototype.render = function (d) {
        if (a) {
            d.removeChild(a)
        }
        var e = document.createElement("div");
        a = e;
        e.style.width = this.width + "px";
        e.style.height = this.height + "px";
        e.style.backgroundColor = this.color;
        e.style.position = "absolute";
        d.appendChild(e);
        this.x = Tool.getRandom(0, d.offsetWidth / e.offsetWidth - 1) * e.offsetWidth;
        this.y = Tool.getRandom(0, d.offsetHeight / e.offsetHeight - 1) * e.offsetHeight;
        e.style.left = this.x + "px";
        e.style.top = this.y + "px"
    };
    c.Food = b
})(window);
(function (d) {
    var b = [];

    function c(e) {
        e = e || {};
        this.width = e.width || 20;
        this.height = e.height || 20;
        this.direction = e.direction || "right";
        this.body = [{
            x: 3,
            y: 2,
            color: "red"
        }, {
            x: 2,
            y: 2,
            color: "blue"
        }, {
            x: 1,
            y: 2,
            color: "blue"
        }]
    }
    c.prototype.render = function (f) {
        a(f);
        for (var e = 0; e < this.body.length; e++) {
            var g = document.createElement("div");
            b.push(g);
            g.style.width = this.width + "px";
            g.style.height = this.height + "px";
            g.style.backgroundColor = this.body[e].color;
            g.style.position = "absolute";
            g.style.left = this.body[e].x * this.width + "px";
            g.style.top = this.body[e].y * this.height + "px";
            f.appendChild(g)
        }
    };

    function a(g) {
        for (var f = 0, e = b.length; f < e; f++) {
            g.removeChild(b[0]);
            b.splice(0, 1)
        }
    }
    c.prototype.move = function () {
        for (var e = this.body.length - 1; e > 0; e--) {
            this.body[e].x = this.body[e - 1].x;
            this.body[e].y = this.body[e - 1].y
        }
        switch (this.direction) {
            case "left":
                this.body[0].x -= 1;
                break;
            case "right":
                this.body[0].x += 1;
                break;
            case "top":
                this.body[0].y -= 1;
                break;
            case "bottom":
                this.body[0].y += 1;
                break
        }
    };
    d.Snake = c
})(window);
(function (b) {
    var a;
    var f;
    var d;

    function e() {
        this.snake = new Snake();
        this.food = new Food()
    }
    e.prototype.start = function (g) {
        this.food.render(g);
        this.snake.render(g);
        this.map = g;
        a = this;
        c();
        document.onkeydown = function (h) {
            console.log(h.keyCode);
            switch (h.keyCode) {
                case 37:
                    if (a.snake.direction === "right") {
                        return
                    }
                    a.snake.direction = "left";
                    break;
                case 38:
                    if (a.snake.direction === "bottom") {
                        return
                    }
                    a.snake.direction = "top";
                    break;
                case 39:
                    if (a.snake.direction === "left") {
                        return
                    }
                    a.snake.direction = "right";
                    break;
                case 40:
                    if (a.snake.direction === "top") {
                        return
                    }
                    a.snake.direction = "bottom";
                    break
            }
        }
    };

    function c() {
        f = setInterval(function () {
            a.snake.move();
            var g = a.snake.body[0];
            var j = a.map.offsetWidth / a.snake.width - 1;
            var i = a.map.offsetHeight / a.snake.height - 1;
            if (g.x < 0 || g.y < 0 || g.x > j || g.y > i) {
                clearInterval(f);
                alert("game over");
                return
            }
            if (g.x * a.snake.width === a.food.x && g.y * a.snake.height === a.food.y) {
                a.food.render(a.map);
                var h = a.snake.body[a.snake.body.length - 1];
                a.snake.body.push({
                    x: h.x,
                    y: h.y,
                    color: h.color
                })
            }
            a.snake.render(a.map)
        }, 150)
    }
    b.Game = e
})(window);
(function () {
    var b = document.getElementById("box");
    var a = new Game();
    a.start(b)
})();