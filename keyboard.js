function keydown(e) {
    switch (e.keyCode) {
        case 37:
            key37 = true;
            break;
        case 38:
            key38 = true;
            break;
        case 39:
            key39 = true;
            break;
        case 40:
            key40 = true;
            break;
    }
}

function keyup(e) {
    switch (e.keyCode) {
        case 37:
            key37 = false;
            break;
        case 38:
            key38 = false;
            break;
        case 39:
            key39 = false;
            break;
        case 40:
            key40 = false;
            break;
    }
}

addEventListener("keydown", keydown);
addEventListener("keyup", keyup);
