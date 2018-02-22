//global variables

var targetBarbieIndex = -1;
var targetDefenderBarbieIndex = -1;

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
    $(".topChoiceLabel").hide();
});

// create new onclick event
$(".enemiesAvailable").on("click", ".card", function () {
    var frenemies = $(".enemiesAvailable").children(".card");
    var defenderBarbie = $(".defender");

    if (hasVisibleBarbie(defenderBarbie) === false) {
        var targetBarbie = getBarbieName(this);

        for (var i = 0; i < frenemies.length; i++) {
            if (getBarbieName(frenemies[i]) === targetBarbie) {
                targetDefenderBarbieIndex = i;
                break;
            }
        }
        var yourDefenderKids = $(defenderBarbie).children(".card");
        var yourDefenderBarbie = yourDefenderKids[targetDefenderBarbieIndex];
        $(yourDefenderBarbie).show();
        $(frenemies[targetDefenderBarbieIndex]).hide();
    }
//     $(".attack").on("click", function (){

// }
});


function getBarbieName(barbie) {
    var barbieName = $(barbie).children(".barbieName").first().html();
    return barbieName;

}
// /section represents either .enemiesAvailable or defender
function hasVisibleBarbie(section) {
    var sectionKids = $(section).children(".card");
    for (var i = 0; i < sectionKids.length; i++) {
        if ($(sectionKids[i]).is(":visible")) {
            return true;
        }
    }
    return false;

    // $($(".enemiesAvailable").children(".card")[2]).is(":visible");
}
function getTargetBarbieHP(){
    var yourSelection = $(".yourChoice");
    var yourSelectionKids = $(yourSelection).children(".card");
    return $(yourSelectionKids[targetBarbieIndex]).attr("data-baseHP");
}
function getDefenderBarbieHP(){
    var yourDefenderBarbie = $(".defender");
    var yourDefenderKids = $(yourDefenderBarbie).children(".card");
    return $(yourDefenderKids[targetDefenderBarbieIndex]).attr("data-baseHP");
}
function getTargetBarbieBaseAP(){
    var yourSelection = $(".yourChoice");
    var yourSelectionKids = $(yourSelection).children(".card");
    return $(yourSelectionKids[targetBarbieIndex]).attr("data-baseAP");
}
function getDefenderBarbieBaseAP(){
    var yourDefenderBarbie = $(".defender");
    var yourDefenderKids = $(yourDefenderBarbie).children(".card");
    return $(yourDefenderKids[targetDefenderBarbieIndex]).attr("data-baseAP");
}
function getTargetBarbieCounterAP(){
    var yourSelection = $(".yourChoice");
    var yourSelectionKids = $(yourSelection).children(".card");
    return $(yourSelectionKids[targetBarbieIndex]).attr("data-counterAP");
}
function getDefenderBarbieCounterAP(){
    var yourDefenderBarbie = $(".defender");
    var yourDefenderKids = $(yourDefenderBarbie).children(".card");
    return $(yourDefenderKids[targetDefenderBarbieIndex]).attr("data-counterAP");
}
function resetHPtoBaseHP(section){
    var barbieCards = $(section).children(".card");
    for (var i = 0; i < barbieCards.length; i++) {
        var singleBarbieCard = barbieCards[i];
        var baseHP = $(singleBarbieCard).attr("data-baseHP");
        // var currentHP = $(singleBarbieCard).children(".hitPoints").html();
        $(singleBarbieCard).children(".hitPoints").html(baseHP);
    }
}

// //function take a parameter of new hit points and needs to change current
// hit points of yourchoicebarbe