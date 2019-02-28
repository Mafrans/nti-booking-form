$(function() {
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