var moreFiltersBtn = document.querySelector("#filter-toggle");
var benefit = document.querySelectorAll(".benefit");

//loop through all benefits
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




function toggleFilters() {
    var extraFilters = document.querySelector(".search-menu-filters-extra");

    extraFilters.classList.toggle("expand");
    extraFilters.classList.toggle("collapsed");
};

moreFiltersBtn.addEventListener("click", function() {
    toggleFilters();
});


