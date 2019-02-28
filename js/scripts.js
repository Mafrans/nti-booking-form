$(function() {
});

$(".from input[type='time']").keypress(function () {

    console.log($("button#reset-button.datetime-reset-button"));
    $("#reset-button").hide();
});

function select(button) {
    console.log(button);
    if(!$(button).hasClass("selected")) {
        $(".button").removeClass("selected");
        $(button).addClass("selected");
    }
    else {
        $(button).removeClass("selected");
    }
}