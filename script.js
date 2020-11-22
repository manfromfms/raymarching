var canv = document.getElementById('canv');
var ctx = canv.getContext('2d');

var x_player = 250;
var y_player = 250;

var width = canv.width;
var height = canv.height;
var maxdist = width;
var facing = 0;
var scope = 90;
var angstep = 0.2;

var maxitter = 25;
var minstep = 0.3;

var forstep = 5;
var backstep = -2

var key37 = false;
var key38 = false;
var key39 = false;
var key40 = false;

alert("Use arrays to rotate your camera and move");

setInterval(function() {

    facing = (facing + 360) % 360;

    if (key37) {
        facing -= 1;
    }

    if (key38) {
        var rad = Math.tan(facing * Math.PI / 180);

        var xch = Math.sqrt(Math.pow(forstep, 2) / (Math.pow(rad, 2) + 1));

        var ych = Math.sqrt(Math.pow(forstep * rad, 2) / (Math.pow(rad, 2) + 1));

        if (facing >= 0 && facing < 90) {
            x_player += xch;
            y_player += ych;
        } else if (facing >= 90 && facing < 180) {
            x_player -= xch;
            y_player += ych;
        } else if (facing >= 180 && facing < 270) {
            x_player -= xch;
            y_player -= ych;
        } else if (facing >= 270 && facing < 360) {
            x_player += xch;
            y_player -= ych;
        }
    }

    if (key39) {
        facing += 1;
    }

    if (key40) {
        var rad = Math.tan(facing * Math.PI / 180);

        var xch = Math.sqrt(Math.pow(backstep, 2) / (Math.pow(rad, 2) + 1));

        var ych = Math.sqrt(Math.pow(backstep * rad, 2) / (Math.pow(rad, 2) + 1));

        if (facing >= 0 && facing < 90) {
            x_player -= xch;
            y_player -= ych;
        } else if (facing >= 90 && facing < 180) {
            x_player += xch;
            y_player -= ych;
        } else if (facing >= 180 && facing < 270) {
            x_player += xch;
            y_player += ych;
        } else if (facing >= 270 && facing < 360) {
            x_player -= xch;
            y_player += ych;
        }
    }

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "black";
    //drawObjects();
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.stroke();
    ctx.fillStyle = "green";
    calcWay(x_player, y_player, scope, facing);

    for (var i = 0; i < distance.length; i++) {
        ctx.strokeStyle = 'rgb(' + distance[i] / maxdist * 255 + ',' + distance[i] / maxdist * 255 + ',' + distance[i] / maxdist * 255 + ')';
        ctx.lineWidth = width / distance.length;
        ctx.beginPath();
        ctx.moveTo(i / distance.length * width, height / 2);
        ctx.lineTo(i / distance.length * width, distance[i] / maxdist * height / 2 * Math.cos((scope/2-i*angstep)*Math.PI/180));
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(i / distance.length * width, height / 2);
        ctx.lineTo(i / distance.length * width, height - distance[i] / maxdist * height / 2 * Math.cos((scope/2-i*angstep)*Math.PI/180));
        ctx.stroke();
    }

    document.title = facing;
}, 30);
