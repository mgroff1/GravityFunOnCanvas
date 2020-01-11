var c = document.getElementById("c");
var ctx = c.getContext('2d');
c.width = innerWidth;
c.height = innerHeight;
var w = innerWidth;
var h = innerHeight;
var circles = [];
var x = w / 2,
    y = h / 2;
var smallIncUp = 1.1;
var smallIncDown = smallIncUp * 3.63;
var rot = 1;
var sizeE = 50;
var radiusDec = .09;
var widthDec = radiusDec/1000;
var speed = .002;
var planetWidthDec = .025;
var planetRadiusDec = .09;
function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function Circle(radius, speed, width, xPos, yPos, col) {
    this.radius = radius;
    this.speed = speed;
    this.width = width;
    this.xPos = x;
    this.yPos = y;
    this.col = col;
    this.opacity = .05 + Math.random() * .5;
    this.r = random(0, 255);
    this.counter = 0;

}

Circle.prototype.update = function () {
  var colorPick=['blue','red','orange','yellow','white'];
    var value=random(0,6);
    this.counter += -1 * this.speed;

    ctx.beginPath();
    this.rx = this.xPos + Math.cos(this.counter / 100) * this.radius * smallIncDown;
    this.ry = this.yPos + Math.sin(this.counter / 100) * this.radius / smallIncUp;
    smallIncDown = smallIncDown -= .000000811

    ctx.fillStyle = colorPick[value];
    this.exp = .2;
    if (this === pOne || this === pTwo) {
        this.radius -= planetRadiusDec;
        this.speed += speed;
        this.width -= planetWidthDec;
        if (this.radius <= 6) {
            this.radius = 1;
        }
        if (this.width <= 10) {
            this.width = 10;
      
        }
      
   
    }
    for (let i in circles) {
        if (this === circles[i]) {
            circles[i].radius -= radiusDec
            circles[i].width -= widthDec;
            circles[i].speed += speed;
            if (circles[i].radius <= 1) {
                circles[i].radius = .7;
            }
            if (circles[i].width <= 1) {
                circles[i].width = .7;
            }

        }
    }
    ctx.arc(this.rx -= 1, this.ry -= 1, this.width, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();

}; 

function setupCircles() {
    for (var i = 0; i < 300; i++) {
        var cX = random(w - 50, w - 100);
        var cY = random(h - 50, h - 100);
        var speed = .2 + Math.random() * 5;
        var size = random(1, 5);
        var radius = random(5, 25) * 25;
        var co = 'rgba(250,250,250,.85)';

        var circle = new Circle(radius, speed, size, cX, cY, co);
        circles.push(circle);
    }
    anim()
}


var vX, vY, Pspeed, Psize, Pradius, Pcolor, Pmark;
var Planet;

function Planet(vX, vY, Pspeed, Psize, Pradius, Pcolor, Pmark) {
    this.vX = x;
    this.vY = y;
    this.Pspeed = .2 + Math.random() * 2;
    this.Psize = 50;
    this.Pradius = 350;
    this.Pcolor = Pcolor;
    this.Pmark = this.Pmark * this.Pspeed;
}

var pOne, pTwo;

function planet() {
    pOne = new Planet(vX, vY, Pspeed, Psize, Pradius, 'blue', Pmark);
    pOne = new Circle(pOne.Pradius, pOne.Pspeed, pOne.Psize, pOne.vX, pOne.vY, pOne.Pcolor);
    pTwo = new Planet(vX, vY, Pspeed, Psize, Pradius, 'red', Pmark);
    pTwo = new Circle(pTwo.Pradius, pTwo.Pspeed, pTwo.Psize, pTwo.vX, pTwo.vY, pTwo.Pcolor);
    anim();
}

planet()

setupCircles();

function anim() {
    var startH = 10;
    var startW = startH * 1.08;
    var sX = w / 2 - startW / 2;
    var sY = h / 2 - startH / 2;
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, 0, w, h);
    for (var i = 0; i < circles.length; i++) {
        var myCircle = circles[i];
        myCircle.update();
    }

    pOne.update();
    pTwo.update();

    requestAnimationFrame(anim);

}