//targetBarbie is the player's chosen barbie
var targetBarbie = null;

//defenderBarbie is the current defender
var defenderBarbie = null;
var defenderCount = 3;

var choiceBarbies = $('.topChoices').children(".card");
var yourChoiceBarbies = $('.yourChoice').children(".card");
var frenemyBarbies = $(".enemiesAvailable").children(".card");
var defenderBarbies = $(".defender").children(".card");

$(document).ready(function () {

    $(".topChoices").on("click", ".card", function () {
        var barbieIndex = $(choiceBarbies).index(this);
        targetBarbie = yourChoiceBarbies[barbieIndex];

        $(targetBarbie).show();
        $(".topChoices").hide();
        $(".yourChoice").show();
        $(".topChoiceLabel").hide();

        $(frenemyBarbies).show();
        var defenderClone = frenemyBarbies[barbieIndex];
        $(defenderClone).hide();

    })

    $(".enemiesAvailable").on("click", ".card", function () {
        if (defenderBarbie === null) {
            var barbieIndex = $(".enemiesAvailable").children().index(this);
            defenderBarbie = $(".defender").children(".card")[barbieIndex];

            $(defenderBarbie).show();
            var frenemyBarbie = $(".enemiesAvailable").children(".card")[barbieIndex];
            $(frenemyBarbie).hide();
        }
    })

    $("#attack").on("click", function () {
        if (defenderBarbie === null) {
            $("#stats").html("No Enemies to Attack!");
        }
        else {
            var targetBarbieHp = parseInt(getBarbieStat(targetBarbie, "hp"));
            var targetBarbieAttack = parseInt(getBarbieStat(targetBarbie, "ap"));
            var targetBarbieBaseAttack = parseInt(getBarbieStat(targetBarbie, "baseAP"));

            var defenderBarbieHp = parseInt(getBarbieStat(defenderBarbie, "hp"));
            var defenderBarbieAttack = parseInt(getBarbieStat(defenderBarbie, "ca"));

            //target barbie gets first strike
            defenderBarbieHp = defenderBarbieHp - targetBarbieAttack;
            setHitPoints(defenderBarbie, defenderBarbieHp);

            if (defenderBarbieHp <= 0) {
                defenderCount = defenderCount - 1;
                setHitPoints(defenderBarbie, getBarbieStat(defenderBarbie, "baseHP"));
                $(defenderBarbie).hide();
                $(".stats").text("You defeated " + getBarbieStat(defenderBarbie, "name"));
                defenderBarbie = null;

                targetBarbieAttack = targetBarbieAttack + targetBarbieBaseAttack;
                setAttackPower(targetBarbie, targetBarbieAttack);

                if(defenderCount === 0){
                    $(".stats").append("<br>You have defeated all your frenemies!");
                    $("#newgame").show();
                    $("#attack").hide();
                }
            }
            else {
                var defenderBarbieCounterAttack = getBarbieStat(defenderBarbie, "ca");
                targetBarbieHp = targetBarbieHp - defenderBarbieCounterAttack;
                setHitPoints(targetBarbie, targetBarbieHp);
                
                if(targetBarbieHp <= 0){
                    $(".stats").text("You were defeated by " + getBarbieStat(defenderBarbie, "name"));
                    $("#newgame").show();
                    $("#attack").hide();
                }
            }


        }

    })

    $("#newgame").on("click", function(){
        resetGame();
    })

})

function getBarbieStat(barbie, statName) {
    switch (statName) {
        case "hp": //Hit Points
            return $(barbie).children(".hitPoints").first().text();
            break;
        case "ca": //Counter Attack
            return $(barbie).attr("data-counterAP");
            break;
        case "ap": //Attack Powere
            return $(barbie).attr("data-AP");
            break;
        case "baseAP":
            return $(barbie).attr("data-baseAP");
            break;
        case "baseHP":
            return $(barbie).attr("data-baseHP");
        case "name":
            return $(barbie).children(".barbieName").first().text();
            break;
        default:
            break;
    }
}

function setHitPoints(barbie, newHitpoints) {
    $(barbie).children(".hitPoints").first().text(newHitpoints);
}

function setAttackPower(barbie, newAP){
    $(barbie).attr("data-AP", newAP);
}

function resetGame() {

    //Reset Hitpoints of Barbies
    setHitPoints(targetBarbie, getBarbieStat(targetBarbie, "baseHP"));
    setAttackPower(targetBarbie, getBarbieStat(targetBarbie, "baseAP"));
    $(targetBarbie).hide();

    
    //Change Visibility to Defaults
    $(".topChoices").show();
    $(".yourChoice").children(".card").hide();
    $(".topChoiceLabel").show();
    $(frenemyBarbies).hide();
    $(defenderBarbies).hide();

    $("#stats").text("");

    if(defenderBarbie != null){
        setHitPoints(defenderBarbie, getBarbieStat(defenderBarbie, "baseHP"));
    }
    defenderBarbie = null;
    targetBarbie = null;
    $("#newgame").hide();
    $("#attack").show();
}