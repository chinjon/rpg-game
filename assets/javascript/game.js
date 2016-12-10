$(document).ready(function() {

    var characterSelected = "characterOne";
    var userMadeSelection = false;
    var characterStartHP = characterSelected["start health"];
    $("#playerStartHP").html(characterStartHP);

    function characterShake(character) {
        $(character).effect("shake");
    }

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


    var roll = 0;

    var availStats = ["base health", "base attack", "base accuracy"];

    var characterOne = {
        "name": "character one",
        "class": "fighter",
        "ultimate meter": 0,
        "start health": 100,
        "image": "http://placehold.it/250x250",
        "stats": {
            "base health": 100,
            "base attack": 30,
            "base accuracy": 55
        },
        "levelUp": function() {
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
        "start health": 200,
        "image": "http://placehold.it/250x250",
        "stats": {
            "base health": 200,
            "base attack": 15,
            "base accuracy": 67
        },
        "levelUp": function() {
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
        "start health": 50,
        "image": "http://placehold.it/250x250",
        "stats": {
            "base health": 50,
            "base attack": 10,
            "base accuracy": 40
        }
    }

    var enemyTwo = {
        "name": "enemy two",
        "current enemy": false,
        "character defeated": false,
        "start health": 100,
        "image": "http://placehold.it/250x250",
        "stats": {
            "base health": 100,
            "base attack": 20,
            "base accuracy": 55
        }
    }

    var enemyThree = {
        "name": "enemy three",
        "current enemy": false,
        "character defeated": false,
        "start health": 200,
        "image": "http://placehold.it/250x250",
        "stats": {
            "base health": 200,
            "base attack": 30,
            "base accuracy": 75
        }
    }

    var enemyStartHP = currentEnemy.["start health"]



    // NEED TO OVERHAUL CONDITIONALS
    function displayCharacterStats(character, area) {
        var size = Object.keys(character.stats).length;
        $(area).html('<div class="characterPic"><img src="' + character.image + '"></div>');

        for (var i = 0; i < size; i++) {
            var characterStat = $("<div>").addClass("characterStats").data("stat-point", character.stats[availStats[i]]).html(availStats[i] + ": " + character.stats[availStats[i]]).appendTo(area);
        }
    }
    var enemyCount = 0
    var enemyArray = [enemyOne, enemyTwo, enemyThree];
    var currentEnemy = enemyArray[enemyCount];

    function characterDefeated(character) {
        enemyCount++;
        $(character).fadeOut("fast", function() {});
        $("#enemyChar").empty();
        displayEnemyStats(currentEnemy, "#enemyChar");
    }

    function displayEnemyStats(character, area) {
        $(area).prepend('<div class="characterPic"><img src="' + character.image + '"></div>');
        var size = Object.keys(character.stats).length;
        for (let i = 0; i < size; i++) {
            var characterStat = $("<div>").addClass("characterStats").data("stat-point", character["stats"][availStats[i]]).html(availStats[i] + ": " + character.stats[availStats[i]]).appendTo(area);
        }
    }

    function showBattle(characterSelected) {
        showSection("#charactersSpace");
        displayCharacterStats(characterSelected, "#userChar");
        displayEnemyStats(enemyOne, "#enemyChar");
        $("#enemyStartHP").html(enemyOne["start health"]);
        $("#enemyCurrentHP").html(enemyOne.stats["base health"]);
    }

    function characterSelect() {

        displayCharacterStats(characterOne, "#characterOne");
        displayCharacterStats(characterTwo, "#characterTwo");

        $("#characterOne").on("click", function() {
            $("#characterOne").attr("class", "hightlightChar col-lg-3");
            $("#characterTwo").attr("class", "col-lg-3 col-lg-offset-6");
            // need to make more specific
            // might be too "crude" of a solution for highlighting only one character
            userMadeSelection = true;
            characterSelected = characterOne;
            characterStartHP = characterSelected["start health"];
            $("#playerStartHP").html(characterStartHP);
            console.log("Character selected: characterOne");
        });

        $("#characterTwo").on("click", function() {
            $("#characterTwo").attr("class", "hightlightChar col-lg-3 col-lg-offset-6");
            $("#characterOne").attr("class", "col-lg-3");
            characterTwo["character selected"] = true;
            characterOne["character selected"] = false;
            userMadeSelection = true;
            characterSelected = characterTwo;
            characterStartHP = characterSelected["start health"];
            $("#playerStartHP").html(characterStartHP);
            console.log("Character selected: characterTwo");
        })

        $("#characterSelectConfirm").on("click", function() {
            if (userMadeSelection) {
                removeSection("#characterSelect");
                showSection("#charactersSpace");
                showBattle(characterSelected);
                $("#playerCurrentHP").html(characterSelected.stats["base health"]);
                showSection("#healthBars");
                showSection(".characterButtons");
            } else {
                $("#charSelectMessage").html("Please Make A Selection!");
            }
        })
    }

    function basicAttack(enemy, attacker) {
        var damage = attacker.stats["base attack"];
        roll = Math.floor(Math.random() * attacker.stats["base accuracy"]);
        // algorithm to determine if ability hit??
        console.log("Roll: " + roll);
        if (roll > 40) {
            if ((enemy.stats["base health"] - attacker.stats["base attack"]) <= 0) {
                enemy.stats["base health"] = 0;
                $("#enemyCurrentHP").html(enemy.stats["base health"]);
                $("#enemyHealth").attr("style", "width: 0%");
                characterShake("#enemyChar");
                characterDefeated("#enemyChar");
                $("#battleFeedback").html("<div>Enemy was defeated!</div>");
            } else {
                enemy.stats["base health"] -= damage;
                $("#enemyCurrentHP").html(enemy.stats["base health"]);
                characterShake("#enemyChar");
                console.log("Attack was a hit")
                $("#enemyHealth").attr("style", "width: " + enemy.stats["base health"] + "%");
                $("#battleFeedback").html("<div>Attack was a hit and did " + damage + "HP of damage!</div>");

            }
        } else {
            console.log("Attack was a miss");
            $('#battleFeedback').html("<div>Attack was a MISS!</div>");

        }
        // AFTER ENEMY[0] IS DEFEATED, SHIFT ENEMY[0] from ARRAY and ENEMY[1] === now ENEMY[0] is new enemy
    }

    function enemyAttack(defender, attacker) {
      var damage = attacker.stats["base attack"];
      roll = Math.floor(Math.random() * attacker.stats["base accuracy"]);
      console.log("Roll: " + roll);
    }

    function counterAttack(enemy, player) {
        roll = Math.floor(Math.random() * enemy.stats["base accuracy"]);
    }

    $("#attack").on("click", function() {
        basicAttack(currentEnemy, characterSelected);
        $("#enemyStats").empty();
        displayEnemyStats(characterSelected);
    })

    characterSelect();
    // basicAttack(currentEnemy, characterSelected);

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
