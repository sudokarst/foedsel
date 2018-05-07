"use strict";

$(document).ready(function() {
    $("#pushing").on("click", startPushing);

    var pushingDate;
    function startPushing(event) {
        event.preventDefault(); // boilerplate, but why?
        $("#pushing").off("click", startPushing) // disable ASAP
            .addClass("btn btn-info disabled")
            .removeClass("btn-primary");

        pushingDate = new Date();
        console.log(pushingDate + " pushing_handler()");
        $("#logdata").append("Pushing: " + pushingDate + "<br />");

        // prepare next button
        $("#headOut").addClass("btn-primary")
            .removeClass("btn-info disabled")
            .on("click", headOut);
    }

    var remindEvery = 2 * 1000; // seconds * milliseconds/second
    var headOutDate;
    var headOutReminder;
    function headOut(event) {
        event.preventDefault(); // incantations
        $("#headOut").off("click", headOut) // disable ASAP
            .addClass("btn btn-info disabled")
            .removeClass("btn-primary");

        headOutDate = new Date();
        console.log(headOutDate + " headOut_handler()");
        $("#logdata").append("Head out: " + headOutDate + "<br />");

        // schedule reminders
        headOutReminder = setInterval(function() {
            $("#reminders").append("headOut: check vitals," + Date() + "<br />");
        }, remindEvery);

        // prepare next button
        $("#babyOut").addClass("btn-primary")
            .removeClass("btn-info disabled")
            .on("click", babyOut);
    }

    var babyOutDate;
    var babyOutReminder;
    function babyOut(event) {
        clearInterval(headOutReminder);
        event.preventDefault();
        $("#babyOut").off("click", babyOut) // disable ASAP
            .addClass("btn btn-info disabled")
            .removeClass("btn-primary");

        babyOutDate = new Date();
        console.log(babyOutDate + " babyOut_handler()");
        $("#logdata").append("Baby out: " + babyOutDate + "<br />");

        // schedule reminders
        babyOutReminder = setInterval(function() {
            $("#reminders").append("babyOut: check vitals," + Date() + "<br />");
        }, remindEvery);

    }
    console.log("done loading js")
});