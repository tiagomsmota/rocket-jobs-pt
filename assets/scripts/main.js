//make benefits checked when label is clicked
var moreFiltersBtn = document.querySelector("#filter-toggle");
var benefit = document.querySelectorAll(".benefit");

for(var i = 0; i < benefit.length; i++) {
    benefit[i].addEventListener("click", function(checked) {
        var benefitCheckbox = this.querySelector("input");
        var benefitLabel = this.querySelector("label");

        if(checked != benefitCheckbox.checked) {
            benefitCheckbox.click();
        };
        benefitLabel.classList.toggle("checked", benefitCheckbox.checked);
    });
};


//make filters expand on click - header
function toggleFilters() {
    var extraFilters = document.querySelector(".search-menu-filters-extra");

    extraFilters.classList.toggle("expand");
    extraFilters.classList.toggle("collapsed");
};

if(moreFiltersBtn) {
    moreFiltersBtn.addEventListener("click", function() {
        toggleFilters();
    });
};


//submit form when click anchor to logout
if(document.querySelector("#logout-btn")) {
    document.querySelector("#logout-btn").addEventListener("click", function() {
        document.querySelector("#logout-form").submit();
    });
};

//remove flash message when click icon
if(document.querySelector(".flash-close")) {
    document.querySelector(".flash-close").addEventListener("click", function() {
        var errorFlash = document.querySelector(".flash-error");
        var successFlash = document.querySelector(".flash-success");
        if(successFlash) {
            successFlash.style.opacity = 0;
            setTimeout(() => successFlash.style.display = "none", 500);
        }
        if(errorFlash) {
            errorFlash.style.opacity = 0;
            setTimeout(() => errorFlash.style.display = "none", 500);
        }
    });
};

//handle form to change user image
if(document.querySelector("#change-image-btn")) {
    document.querySelector("#change-image-btn").addEventListener("click", function() {
        var inputWindow = document.querySelector("#input-window-background");
        inputWindow.style.opacity = 1;
        inputWindow.classList.toggle("hide");
    });

    document.querySelector("#close-input-window-btn").addEventListener("click", function() {
        var inputWindow = document.querySelector("#input-window-background");
        inputWindow.style.opacity = 0;
        setTimeout(() => inputWindow.classList.toggle("hide"), 200);
    });

    document.getElementById("user-image-input").onchange = function() {
        document.querySelector(".input-filename").innerHTML = this.value.replace("C:\\fakepath\\", " ");
    };
};


//handle account delete confirmation
if(document.querySelector("#delete-user-btn")) {
    document.querySelector("#delete-user-btn").addEventListener("click", function() {
        var deleteWindow = document.querySelector("#delete-window-background");
        deleteWindow.style.opacity = 1;
        deleteWindow.classList.toggle("hide");
    });

    document.querySelector("#close-delete-window-btn").addEventListener("click", function() {
        var deleteWindow = document.querySelector("#delete-window-background");
        deleteWindow.style.opacity = 0;
        setTimeout(() => deleteWindow.classList.toggle("hide"), 200);
    });

    document.querySelector(".cancel-delete-user-btn").addEventListener("click", function() {
        var deleteWindow = document.querySelector("#delete-window-background");
        deleteWindow.style.opacity = 0;
        setTimeout(() => deleteWindow.classList.toggle("hide"), 200);
    });

    document.querySelector(".confirm-delete-user-btn").addEventListener("click", function() {
        document.querySelector("#delete-user-form").submit();
    })
};
