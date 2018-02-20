var targetBarbieIndex = -1;

$(".topChoices").on("click", ".card", function () {
    var originals = $(".topChoices").children(".card");
    var targetBarbie = getBarbieName(this);
    for (var i = 0; i < originals.length; i++) {
        if (getBarbieName(originals[i]) === targetBarbie) {
            targetBarbieIndex = i;
            break;
        }
    }
    var yourSelection = $(".yourChoice");
    var yourSelectionKids = $(yourSelection).children(".card");
    var yourSelectionBarbie = yourSelectionKids[targetBarbieIndex];
    $(yourSelectionBarbie).show();


    var enemySelection = $(".enemiesAvailable");
    var enemySelectionKids = $(enemySelection).children(".card");
    for (var i = 0; i < enemySelectionKids.length; i++) {
        if (i != targetBarbieIndex) {
            var frenemy = enemySelectionKids[i];
            $(frenemy).show();
        }
    }
    $(".topChoices").hide();
    $("#choose").hide();
});

function getBarbieName(barbie) {
    var barbieName = $(barbie).children(".barbieName").first().html();
    return barbieName;
}
