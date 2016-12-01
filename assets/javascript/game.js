var characterOne = {
    "name": "character one",
    "class": "fighter",
    "character selected": false,
    "stats": {
        "base health": 200,
        "base attack": 30,
        "base defense": 9,
        "base speed": 4
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
        "base speed": 11
    },
    "levelUp": function() {
        this.stats["base health"] += 25;
        this.stats["base attack"] += 3;
        this.stats["base defense"] += 6;
        this.stats["base speed"] += 4;
    }

}


// need to figure out how to live update stats

$(document).ready(function() {
    var availStats = ["base health", "base attack", "base defense", "base speed"];
    var size = Object.keys(characterTwo["stats"]).length;

    function displayStats() {
        for (var i = 0; i < size; i++) {
            var characterStat = $("<div>").addClass("characterStats").data("stat-point", characterTwo["stats"][availStats[i]]).html(availStats[i] + ": " + characterTwo.stats[availStats[i]]).appendTo("#characterStats");
        }
    }
    displayStats();

})

// var size = Object.keys(myObj).length; // captures the length of the object


function basicAttack(defender, attacker) {
    if (defender["base defense"] < attacker["base attack"]) {
        defender["base health"] -= attacker["base attack"];
        console.log("Attack was successful");
    } else {
        defender["base health"] -= 1;
        console.log("Attack was not very effective.");
    }
}

console.log(characterOne["base health"]);
basicAttack(characterOne, characterTwo);
console.log(characterOne["base health"]);
