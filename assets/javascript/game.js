$(document).ready(function() {

var characterOne = {
    "name": "character one",
    "class": "fighter",
    "character selected": false,
    "stats": {
        "base health": 100,
        "base attack": 30,
        "base defense": 9,
        "base speed": 4,
        "base accuracy": 55,
        "critical chance": 10
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
    "character selected": false,
    "stats": {
        "base health": 200,
        "base attack": 15,
        "base defense": 26,
        "base speed": 11,
        "base accuracy" : 67,
        "critical chance" : 40
    },
    "levelUp": function() {
        this.stats["base health"] += 25;
        this.stats["base attack"] += 3;
        this.stats["base defense"] += 6;
        this.stats["base speed"] += 4;
    }

}




    var availStats = ["base health", "base attack", "base defense", "base speed", "base accuacy", "critical chance"];
    var size = Object.keys(characterTwo["stats"]).length;

    function displayCharacterStats(character) {
        for (var i = 0; i < size; i++) {
            var characterStat = $("<div>").addClass("characterStats").data("stat-point", character["stats"][availStats[i]]).html(availStats[i] + ": " + character.stats[availStats[i]]).appendTo("#characterStats");
        }
    }
    function displayEnemyStats(character) {

        for (var i = 0; i < size; i++) {
            var characterStat = $("<div>").addClass("characterStats").data("stat-point", character["stats"][availStats[i]]).html(availStats[i] + ": " + character.stats[availStats[i]]).appendTo("#enemyStats");
        }
    }

// defender.stats["base defense"] < attacker.stats["base attack"]

    function basicAttack(defender, attacker) {

      var roll = Math.floor(Math.random() * attacker.stats["base accuracy"]); // algorithm to determine if ability hit??
      console.log(roll);
        var criticalHit = Math.floor(Math.random() * attacker.stats["critical chance"]);
      if(defender.stats["base health"] > 0) {
        if (roll > 40 && criticalHit > 25) {
          defender.stats["base health"] -= attacker.stats["base attack"]*2.5;
          console.log("Attack was a critical hit");
          $("#enemyHealth").attr("width", defender.stats["base health"]);
          $("#battleFeedback").text("Attack was a hit.");
        } else if(roll > 40) {
          defender.stats["base health"] -= attacker.stats["base attack"];
          $("#enemyHealth").attr("style", "width: "+ defender.stats["base health"]+ "%");
          console.log("Attack was a hit");
          $("#battleFeedback").text("Attack was a hit.");
        } else {
            console.log("Attack was a miss");
            $('#battleFeedback').text("Attack was a miss.");
            //console.log(defender.stats["base health"]);
        }
    } else {
        defender.stats["base health"] = 0;
        $('#battleFeedback').text("Defeated.");
    }
    }
    displayCharacterStats(characterTwo);
    displayEnemyStats(characterOne);

    $("#attack").on("click", function() {
        basicAttack(characterOne, characterTwo);
        $("#enemyStats").empty();
        displayEnemyStats(characterOne);
    })



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
