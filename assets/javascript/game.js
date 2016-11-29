var characterOne = {
  "name" : "character one",
  "class" : "fighter",
  "base health" : 200,
  "base attack" : 14,
  "base defense" : 9,
  "base speed" : 4,
  "attack": function(opponent) {
    if(opponent["base defense"] < this["base attack"]) {
      opponent["base health"] -= this["base attack"];
      console.log("That did some damage.");
    } else {
      opponent["base health"] -= 1;
      console.log("That was not very effective.");
    }
  }
}

var characterTwo = {
  "name" : "character one",
  "class" : "fighter",
  "base health" : 300,
  "base attack" : 5,
  "base defense" : 23,
  "base speed" : 2
  // "attack" : function(opponent) {
  //   if(opponent["base defense"] < this["base attack"]) {
  //     opponent["base health"] -= this["base attack"];
  //     console.log("That did some damage.");
  //   } else {
  //     opponent["base health"] -= 1;
  //     console.log("That was not very effective.");
  //   }
  // }
}

function basicAttack(defender, attacker) {
  if(defender["base defense"] < attacker["base attack"]) {
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
