var x_obj_pos = [];
var y_obj_pos = [];
var size_obj1 = [];
var size_obj2 = [];
var type_obj = [];
var x_reiter = [];
var y_reiter = [];

var crossingX = [];
var crossingY = [];
var distance = [];

function drawObjects() {
    for (var i = 0; i < x_obj_pos.length; i++) {
        switch (type_obj[i]) {
            case 0:
                ctx.beginPath();
                ctx.arc(x_obj_pos[i], y_obj_pos[i], size_obj1[i], 0, Math.PI * 2);
                ctx.fill();
                break;
            case 1:
                ctx.fillRect(x_obj_pos[i] - size_obj1[i], y_obj_pos[i] - size_obj2[i], size_obj1[i] * 2, size_obj2[i] * 2);
                break;
        }
    }
}

function calcWay(xpos, ypos, scp, fcn) {
    crossingX = [];
    crossingY = [];

    distance = [];

    var itter = 0;
    var size_step = 1;

    var xp = xpos;
    var yp = ypos;

    for (var a = fcn - scp / 2; a < fcn + scp / 2; a += angstep) {

        var ang = (a + 360) % 360;

        var rad = ang * Math.PI / 180;

        rad = Math.tan(rad);

        var lengthes = [];

        while (itter < maxitter && size_step > minstep) {
            for (var i = 0; i < x_obj_pos.length; i++) {
                switch (type_obj[i]) {
                    case 0:
                        lengthes.push(Math.sqrt(Math.pow(xpos - x_obj_pos[i], 2) + Math.pow(ypos - y_obj_pos[i], 2)) - size_obj1[i]);
                        break;

                    case 1:
                        lengthes.push(Math.sqrt(Math.pow(Math.max(Math.abs(xpos - x_obj_pos[i]) - size_obj1[i], 0), 2) + Math.pow(Math.max(Math.abs(ypos - y_obj_pos[i]) - size_obj2[i], 0), 2)));
                        break;

                    case 2:
                        lengthes.push(Math.sqrt(Math.pow(Math.max((Math.abs(xpos - x_obj_pos[i]) - size_obj1[i]), 0), 2) + Math.pow(Math.max(Math.abs(ypos - y_obj_pos[i]) - size_obj2[i], 0), 2)));
                        break;
                }
            }

            ctx.beginPath();
            //ctx.arc(xpos, ypos, Math.min.apply(null, lengthes), 0, Math.PI * 2);
            ctx.stroke();

            size_step = Math.min.apply(null, lengthes);
            if (size_step < 0.3) {

                                ctx.fillStyle = "red";
                                ctx.beginPath();
                                ctx.arc(xpos, ypos, 2, 0, Math.PI * 2);
                                ctx.fill();

                                ctx.strokeWidth = 2;
                                ctx.strokeStyle = "red";
                                ctx.beginPath();
                                ctx.moveTo(xp, yp);
                                ctx.lineTo(xpos, ypos);
                                ctx.stroke();
                                //return;
                                ctx.strokeStyle = "black";
                                ctx.strokeWidth = 0;
                                ctx.moveTo(0, 0);


                distance.push(Math.sqrt(Math.pow(xp - xpos, 2) + Math.pow(yp - ypos, 2)));
            }

            var xchange = Math.sqrt(Math.pow(Math.min.apply(null, lengthes), 2) / (Math.pow(rad, 2) + 1));

            var ychange = Math.sqrt(Math.pow(Math.min.apply(null, lengthes) * rad, 2) / (Math.pow(rad, 2) + 1));

            if (ang >= 0 && ang < 90) {
                xpos += xchange;
                ypos += ychange;
            } else if (ang >= 90 && ang < 180) {
                xpos -= xchange;
                ypos += ychange;
            } else if (ang >= 180 && ang < 270) {
                xpos -= xchange;
                ypos -= ychange;
            } else if (ang >= 270 && ang < 360) {
                xpos += xchange;
                ypos -= ychange;
            }

            itter += 1;
        }

        //console.log(ang + " " + (xp - xpos) + " " + (yp - ypos));
        xpos = xp;
        ypos = yp;

        itter = 0;
        size_step = 1;
    }
}
