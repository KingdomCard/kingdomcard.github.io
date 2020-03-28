"use strict"; function createDialog(o) {
    dialogBackground=$("<div class='dialog-background'></div").appendTo(o), $(dialogBackground).click(() => {
        $(o).trigger("dialog-close");
    }), $(o).on("dialog-close", function () {
        dialogClick=$(this), dialogClick.addClass("dialog-closing"), window.setTimeout(() => {
            dialogClick.remove();
        }, 500);
    }), $(o).attr("tabindex", "0"), o.focus(), $(o).on("hover", function () {
        this.focus();
    }), $(o).on("keydown", function (o) {
        "Escape"===o.key&&$(this).trigger("dialog-close");
    });
}
