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
