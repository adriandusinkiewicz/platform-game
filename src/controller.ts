export const controller = {

    left: {
        active: false,
        state: false
    },
    right: {
        active: false,
        state: false
    },
    up: {
        active: false,
        state: false
    },

    keyUpDown: function (event: any) {

        var key_state = (event.type == "keydown") ? true : false;

        switch (event.keyCode) {

            case 37: // left key

                if (controller.left.state != key_state) controller.left.active = key_state;
                controller.left.state = key_state;

                break;

            case 32: // up key

                if (controller.up.state != key_state) controller.up.active = key_state;
                controller.up.state = key_state;

                break;
                
            case 39: // right key

                if (controller.right.state != key_state) controller.right.active = key_state;
                controller.right.state = key_state;

                break;

        }

        //console.log("left:  " + controller.left.state + ", " + controller.left.active + "\nright: " + controller.right.state + ", " + controller.right.active + "\nup:    " + controller.up.state + ", " + controller.up.active);

    }

};