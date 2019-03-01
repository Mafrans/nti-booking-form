$(function() {
    createModals();

    setInterval(function () {
        if($(".jsmodal-backdrop").css("filter") === "opacity(0)") {
            $(".jsmodal-backdrop").hide();
        }
    }, 200);
});
function select(button) {
    console.log(button);
    if(!$(button).hasClass("selected")) {
        //$(".button").removeClass("selected");
        $(button).addClass("selected");
    }
    else {
        $(button).removeClass("selected");
    }
}

function openModal(modal) {
    $(".jsmodal-backdrop").show();
    $(modal).parent(".jsmodal-backdrop").css("filter", "opacity(1)");
}

function openParentModal(child) {
    $(".jsmodal-backdrop").show();
    $(modal).parent(".jsmodal-backdrop *").css("filter", "opacity(1)");
}

function closeModal(modal) {
    $(modal).parents(".jsmodal-backdrop").css("filter", "opacity(0)");
}

function closeParentModal(child) {
    $(child).parents(".jsmodal-backdrop").css("filter", "opacity(0)");
}



function createModals() {

    $(".jsmodal").wrap("<div class='jsmodal-backdrop'></div>");
    $(".jsmodal-backdrop").css("filter", "opacity(0)");
}