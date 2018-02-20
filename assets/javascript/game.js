var targetBarbieIndex = -1;

$(".topChoices").on("click", ".card", function () {
    var originals = $(".topChoices").children(".card");
    var targetBarbie = getBarbieName(this);
    for (let i = 0; i < originals.length; i++) {
        if (getBarbieName(originals[i]) === targetBarbie) {
            targetBarbieIndex = i;
            break;
        }

    }
    
    var yourSelection = $(".yourChoice");
    var yourSelectionKids = $(yourSelection).children(".card");
    var yourSelectionBarbie = yourSelectionKids[targetBarbieIndex];
    $(yourSelectionBarbie).show();

});

function getBarbieName(barbie) {
    var barbieName = $(barbie).children(".barbieName").first().html();
    return barbieName;
}
