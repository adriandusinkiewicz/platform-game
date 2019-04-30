export default class Animation {

    count: number;
    delay: number;
    frame: number;
    frame_index: number;
    frame_set: Array<number>;

    constructor(
        frame_set: Array<number>,
        delay: number
    ) {
        this.count = 0;
        this.delay = delay;
        this.frame = 0;
        this.frame_index = 0;
        this.frame_set = frame_set;
    }

    change(frame_set: Array<number>, delay: number = 15) {
        if (this.frame_set != frame_set) {
            this.count = 0;
            this.delay = delay;
            this.frame_index = 0;
            this.frame_set = frame_set;
            this.frame = this.frame_set[this.frame_index];
        }
    }

    update() {
        this.count++;
        if (this.count >= this.delay) {
            this.count = 0;
            this.frame_index = (this.frame_index == this.frame_set.length - 1) ? 0 : this.frame_index + 1;
            this.frame = this.frame_set[this.frame_index];
        }
    }
}