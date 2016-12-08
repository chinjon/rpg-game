$(document).ready(function () {

var characterSelected = "characterOne";
console.log("Character selected: " + characterSelected);

    function hideSection(section) {
        $(section).hide();
    }

    function removeSection(section) {
        $(section).remove();
    }

    function showSection(section) {
        $(section).show();
    }


hideSection("#healthBars");
hideSection(".characterButtons");




    var availStats = ["base health", "base attack", "base defense", "base speed", "base accuracy", "critical chance"];

    // append image to div: http://stackoverflow.com/questions/16432001/how-to-append-image-using-jquery-append

    var characterOne = {
        "name": "character one",
        "class": "fighter",
        "ultimate meter": 0,
        "character selected": false,
        "image": "http://placehold.it/250x250",
        "stats": {
            "base health": 100,
            "base attack": 30,
            "base defense": 9,
            "base speed": 4,
            "base accuracy": 55,
            "critical chance": 10
        },
        "levelUp": function () {
            this.stats["base health"] += 10;
            this.stats["base attack"] += 10;
            this.stats["base defense"] += 3;
            this.stats["base speed"] += 2;
        }
    }

    var characterTwo = {
        "name": "character one",
        "class": "fighter",
        "ultimate meter": 0,
        "character selected": false,
        "image": "http://placehold.it/250x250",
        "stats": {
            "base health": 200,
            "base attack": 15,
            "base defense": 26,
            "base speed": 11,
            "base accuracy": 67,
            "critical chance": 40
        },
        "levelUp": function () {
            this.stats["base health"] += 25;
            this.stats["base attack"] += 3;
            this.stats["base defense"] += 6;
            this.stats["base speed"] += 4;
        }

    }

    var enemyOne = {
        "name": "enemy one",
        "current enemy": false,
        "character defeated": false,
        "image": "http://placehold.it/250x250",
        "stats": {
            "base health": 50,
            "base attack": 10,
            "base defense": 5,
            "base speed": 3,
            "base accuracy": 40
        }
    }

    var enemyTwo = {
        "name": "enemy two",
        "current enemy": false,
        "character defeated": false,
        "image": "http://placehold.it/250x250",
        "stats": {
            "base health": 100,
            "base attack": 20,
            "base defense": 15,
            "base speed": 6,
            "base accuracy": 55
        }
    }

    var enemyThree = {
        "name": "enemy three",
        "current enemy": false,
        "character defeated": false,
        "image": "http://placehold.it/250x250",
        "stats": {
            "base health": 200,
            "base attack": 30,
            "base defense": 20,
            "base speed": 3,
            "base accuracy": 75
        }
    }


    // NEED TO OVERHAUL CONDITIONALS







    function displayCharacterStats(character, area) {
      var size = Object.keys(character.stats).length;
        $(area).html('<div><img src="' + character.image + '"></div>');

        for (var i = 0; i < size; i++) {
            var characterStat = $("<div>").addClass("characterStats").data("stat-point", character.stats[availStats[i]]).html(availStats[i] + ": " + character.stats[availStats[i]]).appendTo(area);
        }
    }

    var enemyArray = ["enemyOne", "enemyTwo", "EnemyThree"];

    function displayEnemyStats(character, area) {
        $(area).prepend('<div><img src="' + character.image + '"></div>');
        var size = Object.keys(character.stats).length;
        for (let i = 0; i < size; i++) {
            var characterStat = $("<div>").addClass("characterStats").data("stat-point", character["stats"][availStats[i]]).html(availStats[i] + ": " + character.stats[availStats[i]]).appendTo(area);
        }
    }
    function showBattle(characterSelect) {
      showSection("#charactersSpace");
      displayCharacterStats(characterSelect, "#userChar");
      displayEnemyStats(enemyOne, "#enemyChar")
    }
    var characterSelectArray = [characterOne, characterTwo];

    function characterSelect() {

        displayCharacterStats(characterOne, "#characterOne");
        displayCharacterStats(characterTwo, "#characterTwo");

        $("#characterOne").on("click", function () {
            $("#characterOne").attr("class", "hightlightChar col-lg-3");
            $("#characterTwo").attr("class", "col-lg-3 col-lg-offset-6");
            // need to make more specific
            // might be too "crude" of a solution for highlighting only one character
            characterOne["character selected"] = true;
            characterTwo["character selected"] = false;
            characterSelected = characterOne;
            console.log("Character selected: characterOne");
        });

        $("#characterTwo").on("click", function () {
            $("#characterTwo").attr("class", "hightlightChar col-lg-3 col-lg-offset-6");
            $("#characterOne").attr("class", "col-lg-3");
            characterTwo["character selected"] = true;
            characterOne["character selected"] = false;
            characterSelected = characterTwo;
            console.log("Character selected: characterTwo");
        })

          // need to enact a CONDITIONAL TO FORCE A SELECTION
        $("#characterSelectConfirm").on("click", function () {
            removeSection("#characterSelect");
            showSection("#charactersSpace");
            showBattle(characterSelected);
            showSection("#healthBars");
            showSection(".characterButtons");
        })
    }

    function basicAttack(defender, attacker) {

        var roll = Math.floor(Math.random() * attacker.stats["base accuracy"]); // algorithm to determine if ability hit??
        console.log(roll);
        var criticalHit = Math.floor(Math.random() * attacker.stats["critical chance"]);
        if (defender.stats["base health"] > 0) {
            if (roll > 40 && criticalHit > 25) {

                if ((defender.stats["base health"] - attacker.stats["base attack"] * 2.5) < 0) {
                    defender.stats["base health"] = 0;
                    $("#enemyHealth").attr("style", "width: 0%");
                } else {

                    defender.stats["base health"] -= attacker.stats["base attack"] * 2.5;
                    console.log("Attack was a critical hit");
                    $("#enemyHealth").attr("style", "width: " + defender.stats["base health"]+"%");
                    $("#battleFeedback").text("Attack was a hit.");
                }
            } else if (roll > 40) {
              if ((defender.stats["base health"] - attacker.stats["base attack"]) < 0) {
                defender.stats["base health"] = 0;
                $("#enemyHealth").attr("style", "width: 0%");

              } else {
                defender.stats["base health"] -= attacker.stats["base attack"];
                $("#enemyHealth").attr("style", "width: " + defender.stats["base health"] + "%");
                console.log("Attack was a hit");
                $("#battleFeedback").text("Attack was a hit.");
              }
            } else {
                console.log("Attack was a miss");
                $('#battleFeedback').text("Attack was a miss.");
                //console.log(defender.stats["base health"]);
            }
        } else {
            defender.stats["base health"] = 0;
            $("#enemyHealth").attr("style", "width: %");
            $('#battleFeedback').text("Defeated.");
        }
    }

    $("#attack").on("click", function() {
        basicAttack(characterOne, characterTwo);
        $("#enemyStats").empty();
        displayEnemyStats(characterOne);
    })

    characterSelect();
    basicAttack(enemyOne, characterSelected);

    function enemyAttack(enemy) {
        var roll = Math.floor(Math.random() * enemy.stats["base accuracy"]);
        // if(roll > 30) {
        //
        // }
    }






    // defender.stats["base defense"] < attacker.stats["base attack"]
            // NEED TO SWITCH PARAMETERS
            // NEED TO MAKE AUTO ATTACK FOR COMPUTER

    //
    //
    // displayCharacterStats(characterTwo, "#characterStats");
    // displayEnemyStats(characterOne);
    //




})

// var size = Object.keys(myObj).length; // captures the length of the object

// function diceRoll() {
//   var roll = Math.floor(Math.random() * 100); // algorithm to determine if ability hit??
//   console.log(roll);
// }
// factor in accuracy somehow with a character accuracy stat

// function critChance() {
//   var criticalHit = Math.floor(Math.random() * attack.stats["critChance"];
// }
