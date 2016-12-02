
$(document).ready(function() {

var characterOne = {
    "name": "character one",
    "class": "fighter",
    "character selected": false,
    "stats": {
        "base health": 200,
        "base attack": 30,
        "base defense": 9,
        "base speed": 4,
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
    "character selected": false,
    "stats": {
        "base health": 300,
        "base attack": 5,
        "base defense": 26,
        "base speed": 11,
        "base accuracy" : 67
    },
    "levelUp": function() {
        this.stats["base health"] += 25;
        this.stats["base attack"] += 3;
        this.stats["base defense"] += 6;
        this.stats["base speed"] += 4;
    }

}
function diceRoll() {
  var roll = Math.floor(Math.random() * 100); // algorithm to determine if ability hit??
  console.log(roll);
}
// factor in accuracy somehow with a character accuracy stat


// need to figure out how to live update stats

    var availStats = ["base health", "base attack", "base defense", "base speed", "base accuacy"];
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
        if (roll > 55) {
            defender.stats["base health"] -= attacker.stats["base attack"];
            console.log("Attack was a hit");
            $("#battleFeedback").html = "Attack was a hit."
        } else {
            console.log("Attack was a miss");
            $('#battleFeedback').html = "Attack was a miss.";
            //console.log(defender.stats["base health"]);
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
