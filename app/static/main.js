"use strict";

$(document).ready(function() {
    let headOutReminder;

    var audio = new Audio('/static/Connected.wav');
    console.log(audio);
    audio.play();

    $("#pushing").one("click", startPushing);

    function startPushing(event) {
        $("#pushing")
            .addClass("btn btn-info disabled")
            .removeClass("btn-primary");

        // log it
        let pushingDate = new Date();
        console.log(pushingDate + " pushing_handler()");
        $("#logdata").append("Pushing: " + pushingDate + "<br />");

        // prepare next button
        $("#headOut")
            .addClass("btn-primary")
            .removeClass("btn-info disabled")
            .one("click", headOut);
    }

    const remindEvery = 3 * 1000; // seconds * milliseconds/second
    function headOut(event) {
        $("#headOut")
            .addClass("btn btn-info disabled")
            .removeClass("btn-primary");

        let headOutDate = new Date();
        console.log(headOutDate + " headOut_handler()");
        $("#logdata").append("Head out: " + headOutDate + "<br />");

        // schedule reminders
        headOutReminder = setInterval(function() {
            $("#reminders").append("headOut: check vitals, " + Date() + "<br />");
        }, remindEvery);

        // prepare next button
        $("#babyOut")
            .addClass("btn-primary")
            .removeClass("btn-info disabled")
            .one("click", babyOut);
    }

    function babyOut(event) {
        clearInterval(headOutReminder);
        $("#babyOut")
            .addClass("btn btn-info disabled")
            .removeClass("btn-primary");

        let babyOutDate = new Date();
        console.log(babyOutDate + " babyOut_handler()");
        $("#logdata").append("Baby out: " + babyOutDate + "<br />");

        // schedule reminders
        let babyOutReminder = setInterval(function() {
            $("#reminders").append("babyOut: check vitals," + Date() + "<br />");
        }, remindEvery);

        setTimeout(() => {
            clearInterval(babyOutReminder);
        }, 3.1*remindEvery);

    }
    console.log("done loading js")
});