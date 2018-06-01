"use strict";

class Stopwatch {
    constructor(display, results) {
        this.running = false;
        this.display = display;
        this.results = results;
        this.laps = [];
        this.reset();
        this.print(this.times);
    }
    
    reset() {
        this.times = [ 0, 0, 0 ];
    }
    
    start() {
        if (!this.time) this.time = performance.now();
        if (!this.running) {
            this.running = true;
            requestAnimationFrame(this.step.bind(this));
        }
    }
    
    lap() {
        let times = this.times;
        let li = document.createElement('li');
        li.innerText = this.format(times);
        this.results.appendChild(li);
    }
    
    stop() {
        this.running = false;
        this.time = null;
    }

    restart() {
        if (!this.time) this.time = performance.now();
        if (!this.running) {
            this.running = true;
            requestAnimationFrame(this.step.bind(this));
        }
        this.reset();
    }
    
    clear() {
        clearChildren(this.results);
    }
    
    step(timestamp) {
        if (!this.running) return;
        this.calculate(timestamp);
        this.time = timestamp;
        this.print();
        requestAnimationFrame(this.step.bind(this));
    }
    
    calculate(timestamp) {
        var diff = timestamp - this.time;
        // Hundredths of a second are 100 ms
        this.times[2] += diff / 10;
        // Seconds are 100 hundredths of a second
        if (this.times[2] >= 100) {
            this.times[1] += 1;
            this.times[2] -= 100;
        }
        // Minutes are 60 seconds
        if (this.times[1] >= 60) {
            this.times[0] += 1;
            this.times[1] -= 60;
        }
    }
    
    print() {
        this.display.innerText = this.format(this.times);
    }
    
    format(times) {
        return `\
${pad0(times[0], 2)}:\
${pad0(times[1], 2)}:\
${pad0(Math.floor(times[2]), 2)}`;
    }
}

function pad0(value, count) {
    var result = value.toString();
    for (; result.length < count; --count)
        result = '0' + result;
    return result;
}

function clearChildren(node) {
    while (node.lastChild)
        node.removeChild(node.lastChild);
}

$(document).ready(function() {
    const BTN_ACTIVE = "btn-primary"
    const BTN_INACTIVE = "btn-outline-info disabled"

    let headOutReminder;

    var audio = new Audio('../static/Connected.wav');
    if (!audio) { console.log('no audio'); }

    $("#pushing").one("click", startPushing);

    function startPushing(event) {
        $("#pushing")
            .addClass(BTN_INACTIVE)
            .removeClass(BTN_ACTIVE);

        // log it
        let pushingDate = new Date();
        console.log(pushingDate + " pushing_handler()");
        $("#logdata").append(
            `<button type="button" class="btn btn-primary">
                Pushing<span id="pushingTimer" class="badge badge-light"></span>
                <span class="sr-only">unread messages</span>
            </button>`);

        let stopwatch = new Stopwatch(
            document.querySelector('#pushingTimer'),
            document.querySelector('.results'));

        stopwatch.start()

        // prepare next button
        $("#headOut")
            .addClass(BTN_ACTIVE)
            .removeClass(BTN_INACTIVE)
            .one("click", headOut);
    }

    const remindEvery = 5 * 1000; // seconds * milliseconds/second
    function headOut(event) {
        $("#headOut")
            .addClass(BTN_INACTIVE)
            .removeClass(BTN_ACTIVE);

        let headOutDate = new Date();
        console.log(headOutDate + " headOut_handler()");
        $("#logdata").append("Head out: " + headOutDate + "<br />");

        // schedule reminders
        headOutReminder = setInterval(function() {
            audio.play();
            $("#reminders").append("H headOut: " + Date() + "<br />");
        }, remindEvery);

        // prepare next button
        $("#babyOut")
            .addClass(BTN_ACTIVE)
            .removeClass(BTN_INACTIVE)
            .one("click", babyOut);
    }

    function babyOut(event) {
        clearInterval(headOutReminder);
        $("#babyOut")
            .addClass(BTN_INACTIVE)
            .removeClass(BTN_ACTIVE);

        let babyOutDate = new Date();
        console.log(babyOutDate + " babyOut_handler()");
        $("#logdata").append("Baby out: " + babyOutDate + "<br />");

        // schedule reminders
        let babyOutReminder = setInterval(function() {
            audio.play();
            $("#reminders").append("B babyOut: " + Date() + "<br />");
        }, remindEvery);

        setTimeout(() => {
            clearInterval(babyOutReminder);
        }, 3.1*remindEvery);

    }
    console.log("done loading js")
});