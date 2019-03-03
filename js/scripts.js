$(function() {
    createModals();

    setInterval(function () {
        $(".jsmodal-backdrop").each(function () {
            if($(this).css("filter") === "opacity(0)") {
                $(this).hide();
            }
        });

    }, 200);
});

var mouseX;
var mouseY;

$(document).on("mousemove", function(event) {
    mouseX = event.pageX;
    mouseY = event.pageY;
});

function compareCss(element, css, value) {
    var b = false;
    $(element).each(function () {
        if(b) return;
        b = $(this).css(css) === value;
    });
    return b;
}

function backdropClick(backdrop) {
    var modal = $(backdrop).children(".jsmodal");
    if (mouseX >= modal.position().left && mouseX <= modal.position().left + modal.width()) {
        if (mouseY >= modal.position().top + $(window).scrollTop() && mouseY <= modal.position().top + $(window).scrollTop() + modal.height()) {
            return;
        }
    }
    closeModal(modal);
}

function select(button) {
    console.log(button);
    if(!$(button).hasClass("selected")) {
        //$(".button").removeClass("selected");
        $(button).addClass("selected");
    }
    else {
        $(button).removeClass("selected");
    }

    checkRequired();
}
function select(button, deselect) {
    console.log(button);
    var b = $(button).hasClass("selected");
    $(deselect).removeClass("selected");

    if (b) {
        $(button).removeClass("selected");
    } else {
        //$(".button").removeClass("selected");
        $(button).addClass("selected");
    }
    checkRequired();
}

$("input[type='time']").keydown(function () {
    checkRequired();
});

function checkRequired() {
    // Equipment
    var equipment = false;
    $(".buttons>.button").each(function () {
        if($(this).hasClass("selected")) {
            equipment = true;
        }
    });

    // Time
    var date = false;
    $(".date>.button").each(function () {
        if($(this).hasClass("selected")) {
            date = true;
        }
    });

    var radioFiller = $(".radio").hasClass("selected");

    var minTime = parseTime("8:00");
    var maxTime = parseTime("16:00");
    var fromTime = parseTime($(".from input[type='time']").val());
    var toTime = parseTime($(".to input[type='time']").val());

    var validFromTime = (fromTime >= minTime && fromTime <= maxTime);
    var validToTime = (toTime >= minTime && toTime <= maxTime);
	var inverseTime = toTime - fromTime < 0;

    if(inverseTime) {
        $(".error-message").text("Du kan inte boka en negativ mängd tid");
    }
    else if(!validFromTime) {
        $(".error-message").text("'Från klockan' måste vara mellan 8:00 och 16:00");
    }
    else if(!validToTime) {
        $(".error-message").text("'Till klockan' måste vara mellan 8:00 och 16:00");
    }
    else if(!date) {
        $(".error-message").text("Du måste välja en dag att boka på");
    }
    else if(!equipment) {
        $(".error-message").text("Du måste välja utrustning");
    }
    else if(!radioFiller) {
        $(".error-message").text("Du måste bekräfta våra villkor");
    }
    else {
        $(".error-message").text("");
    }

    if(equipment && date && radioFiller && validFromTime && validToTime) {
        $(".submit-button").addClass("enabled");
        $(".submit-button").attr("href", "#submit");
    }
    else {
        $(".submit-button").removeClass("enabled");
        $(".submit-button").attr("href", null);
    }
}

function parseTime(timestamp) {
    return (timestamp.split(":")[0] * 60) + parseInt(timestamp.split(":")[1]);
}

function deselect(button) {
    console.log(button);
    $(button).removeClass("selected");
}

function openModal(modal) {
    closeModal(".jsmodal");

    $(modal).parent(".jsmodal-backdrop").show();
    $(modal).parent(".jsmodal-backdrop").css("filter", "opacity(1)");
}

function openParentModal(child) {
    closeModal(".jsmodal");

    $(modal).parent(".jsmodal-backdrop").show();
    $(modal).parent(".jsmodal-backdrop").css("filter", "opacity(1)");
}

function closeModal(modal) {
    $(modal).parents(".jsmodal-backdrop").css("filter", "opacity(0)");
}

function closeParentModal(child) {
    $(child).parents(".jsmodal-backdrop").css("filter", "opacity(0)");
}


function submitData() {
    var json = {};

    json.author = $(".user-name").text();
	console.log($(".equipment .button.selected span").text());
    json.equipment = $(".equipment .button.selected span").text();
    json.date = $(".date .button.selected span").text();
    json.from = parseTime($(".from input").val());
    json.to = parseTime($(".to input").val());

    console.log(json);
}

function createModals() {
    $(".jsmodal").wrap("<div onclick='backdropClick(this)' class='jsmodal-backdrop'></div>");
    $(".jsmodal-backdrop").css("filter", "opacity(0)");
}