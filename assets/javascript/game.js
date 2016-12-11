$(document).ready(function() {

    var characterSelected = "characterOne";
    var userMadeSelection = false;
    var characterStartHP = characterSelected["start health"];
    $("#playerStartHP").html(characterStartHP); // sets player's start HP
    var characterAlive = true;
    function characterShake(character) {
        $(character).effect("shake");
    }

    var themeSong = new Howl({
        src: ['./assets/audio/theme.mp3']
      });


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

      function missedAttackMessage() {
        $('#battleFeedback').html("<div>Attack was a MISS!</div>");
      }

    hideSection("#healthBars");
    hideSection(".characterButtons");
    hideSection("#userChar");
    hideSection("#enemyChar");
    hideSection("#battleFeedback");

    var roll = 0;

    var availStats = ["base health", "base attack", "base accuracy"];

    var characterOne = {
        "name": "Jerry",
        "start health": 100,
        "image": "./assets/images/jerry.jpeg",
        "stats": {
            "base health": 100,
            "base attack": 30,
            "base accuracy": 55
        }
    }

    var characterTwo = {
        "name": "Elaine",
        "start health": 200,
        "image": "./assets/images/elaine.jpg",
        "stats": {
            "base health": 200,
            "base attack": 15,
            "base accuracy": 67
        }
          }

    var enemyOne = {
        "name": "George",
        // "current enemy": false,
        // "character defeated": false,
        "start health": 100,
        "image": "./assets/images/george.jpg",
        "stats": {
            "base health": 100,
            "base attack": 10,
            "base accuracy": 40
        }
    }

    var enemyTwo = {
        "name": "Tim Whatley",
        // "current enemy": false,
        // "character defeated": false,
        "start health": 100,
        "image": "./assets/images/tim.png",
        "stats": {
            "base health": 100,
            "base attack": 20,
            "base accuracy": 55
        }
    }

    var enemyThree = {
        "name": "Newman",
        // "current enemy": false,
        // "character defeated": false,
        "start health": 100,
        "image": "./assets/images/newman.png",
        "stats": {
            "base health": 100,
            "base attack": 30,
            "base accuracy": 75
        }
    }
    var enemyCount = 0
    var enemyArray = [enemyOne, enemyTwo, enemyThree];
    var currentEnemy = enemyArray[enemyCount];
    var enemyStartHP = currentEnemy["start health"]; // sets enemy's start HP


    // NEED TO OVERHAUL CONDITIONALS
    function displayCharacterStats(character, area) {
        var size = Object.keys(character.stats).length;
        $(area).html('<div class="characterPic"><img src="' + character.image + '"></div>');

        for (var i = 0; i < size; i++) {
            var characterStat = $("<div>").addClass("characterStats").data("stat-point", character.stats[availStats[i]]).html(availStats[i] + ": " + character.stats[availStats[i]]).appendTo(area);
        }
    }


    function characterDefeated(character) {
        $("#battleFeedback").append("<div>The Game Will Now Reset</div");
        console.log("Game will now refresh");
        setInterval('window.location.reload()', 6000);
    }

    function displayEnemyStats(character, area) {
        $(area).prepend('<div class="enemyPic enemyStats"><img src="' + character.image + '"></div>');
        var size = Object.keys(character.stats).length;
        for (let i = 0; i < size; i++) {
            var characterStat = $("<div>").addClass("enemyStats").data("stat-point", character["stats"][availStats[i]]).html(availStats[i] + ": " + character.stats[availStats[i]]).appendTo(area);
        }
    }

    // switches enemy
    function nextEnemy() {
        $(".enemyStats").remove();
        enemyCount++;
        console.log("#enemyChar has been emptied");
        currentEnemy = enemyArray[enemyCount];
        console.log(enemyCount);
        console.log(currentEnemy);
        displayEnemyStats(currentEnemy, "#enemyChar");
        //reset health bar to 100
        $("#enemyHealth").attr("style", "width: " + 100 + "%");
        // reset health info (text)
        $("#enemyStartHP").html(currentEnemy["start health"]);
        $("#enemyCurrentHP").html(currentEnemy.stats["base health"]);
    }

    function showBattle(characterSelected) {
        showSection("#charactersSpace");
        showSection("#userChar");
        showSection("#enemyChar");
        showSection("#battleFeedback");
        displayCharacterStats(characterSelected, "#userChar");
        displayEnemyStats(enemyOne, "#enemyChar");
        $("#enemyStartHP").html(enemyOne["start health"]);
        $("#enemyCurrentHP").html(enemyOne.stats["base health"]);
    }

    function characterSelect() {


        themeSong.play(); // plays theme song on load

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

    function counterAttack(enemy, player) {
        var damage = player.stats["base attack"];
        roll = Math.floor(Math.random() * enemy.stats["base accuracy"]);
        console.log("Enemy Roll: " + roll);
        if(roll > 35) {
          if((player.stats["base health"] - damage) <= 0) {
            player.stats["base helath"] = 0;
            $("#userHealth").attr("style", "width: 0%");
            $("#playerCurrentHP").html(0);
            characterShake("#userChar");
            $("#battleFeedback").html("You have been defeated!");
            characterDefeated();
            // add a reset feature after player has been defeated/lost
          } else {
            player.stats["base health"] -= damage;
            $("#userHealth").attr("style", "width: " + player.stats["base health"] + "%");
            $("#playerCurrentHP").html(player.stats["base health"]);
            $("#battleFeedback").html("<div>Attack was a hit and the Enemy did " + damage + "HP of damage!</div>");
          }
        } else {
          console.log("Enemy Missed!");
          missedAttackMessage();
        }

    }



    function basicAttack(enemy, player) {
        var damage = player.stats["base attack"];
        roll = Math.floor(Math.random() * player.stats["base accuracy"]);
        // algorithm to determine if ability hit??
        console.log("Roll: " + roll);
        if (roll > 40) {
            if ((enemy.stats["base health"] - damage) <= 0) {
                enemy.stats["base health"] = 0;
                $("#enemyCurrentHP").html(enemy.stats["base health"]);
                $("#enemyHealth").attr("style", "width: 0%");
                characterShake("#enemyChar");
                $("#battleFeedback").html("<div>Enemy was defeated!</div>");
                nextEnemy();
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
            missedAttackMessage();

        }
        // AFTER ENEMY[0] IS DEFEATED, SHIFT ENEMY[0] from ARRAY and ENEMY[1] === now ENEMY[0] is new enemy
    }


    // add an IF CONDITIONAL

    $("#attack").on("click", function() {
        basicAttack(currentEnemy, characterSelected);
        counterAttack(currentEnemy, characterSelected);
        // displayEnemyStats(currentEnemy, "#enemyChar");
        if (currentEnemy["base health"] <= 0) {
            nextEnemy();
        }
        if(characterSelected.stats["base health"] <= 0) {
            characterDefeated;
        };
    })

    characterSelect();
    // basicAttack(currentEnemy, characterSelected);



})
