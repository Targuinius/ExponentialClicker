// Game config
var upgrades = [
    {
        cost: 10,
        powerPerClick: 0.3
    },
    {
        cost: 30,
        powerPerClick: 0.6
    },
    {
        cost: 90,
        powerPerClick: 1.2
    },
    {
        cost: 270,
        powerPerClick: 2.4
    },
    {
        cost: 810,
        powerPerClick: 4.8
    },
    {
        cost: 2430,
        powerPerClick: 9.6
    }
];

var buildings = [
    {
        cost: 1000,
        amount: 0,
        upgrades: {
            amount: 0,
            cost: 1000000,
            multiplier: 1,
            upgrades: {
                amount: 0,
                multiplier: 1,
                cost: 1000000000
            }
        },
        action: {
            type: "score",
            perSecond: 10
        }
    },
    {
        cost: 100000,
        amount: 0,
        upgrades: {
            amount: 0,
            cost: 100000000,
            multiplier: 1,
            upgrades: {
                amount: 0,
                multiplier: 1,
                cost: 100000000000
            }
        },
        action: {
            type: "building",
            building: 0,
            perSecond: 1
        }
    },
    {
        cost: 10000000,
        amount: 0,
        upgrades: {
            amount: 0,
            cost: 10000000000,
            multiplier: 1,
            upgrades: {
                amount: 0,
                multiplier: 1,
                cost: 10000000000000
            }
        },
        action: {
            type: "building",
            building: 1,
            perSecond: 1
        }
    },
    {
        cost: 1000000000,
        amount: 0,
        upgrades: {
            amount: 0,
            cost: 1000000000000,
            multiplier: 1,
            upgrades: {
                amount: 0,
                multiplier: 1,
                cost: 1000000000000000
            }
        },
        action: {
            type: "building",
            building: 2,
            perSecond: 1
        }
    },
    {
        cost: 100000000000,
        amount: 0,
        upgrades: {
            amount: 0,
            cost: 100000000000000,
            multiplier: 1,
            upgrades: {
                amount: 0,
                multiplier: 1,
                cost: 100000000000000000
            }
        },
        action: {
            type: "building",
            building: 3,
            perSecond: 1
        }
    },
    {
        cost: 10000000000000,
        amount: 0,
        upgrades: {
            amount: 0,
            cost: 10000000000000000,
            multiplier: 1,
            upgrades: {
                amount: 0,
                multiplier: 1,
                cost: 10000000000000000000
            }
        },
        action: {
            type: "building",
            building: 4,
            perSecond: 1
        }
    }
];

for (var i = 0; i < upgrades.length; i++) {
    var upgrade = upgrades[i];
    var upgradeElement = document.createElement("button");
    upgrade.element = upgradeElement;

    upgradeElement.className = "button";
    upgradeElement.innerHTML = "+<span class='js-upgrade-power-per-click'>" + upgrade.powerPerClick + "</span>/s per click<br />" + "Cost: <span class='js-cost'>" + upgrade.cost + "</span>";

    $(".js-upgrades").append(upgradeElement)
}

for (var i = 0; i < buildings.length; i++) {
    var building = buildings[i];
    var buildingUpgrade = buildings[i].upgrades;
    var buildingUpgrade2 = buildings[i].upgrades.upgrades;
    var buildingElement = document.createElement("button");
    var buildingUpgradeElement = document.createElement("button");
    var buildingUpgrade2Element = document.createElement("button");
    building.element = buildingElement;
    buildingUpgrade.element = buildingUpgradeElement;
    buildingUpgrade2.element = buildingUpgrade2Element;

    var html;
    var html2;
    var html3;

    switch (building.action.type) {
        case "score":
            html = "+<span class='js-per-second'>" + prettify(building.action.perSecond * (buildingUpgrade.multiplier * buildingUpgrade.amount)) + "</span> score per second<br />";
            break;

        case "building":
            html = "+<span class='js-per-second'>" + building.action.perSecond + "</span> buildings per second<br />";
            break;
    }

    html += "Cost: <span class='js-cost'>" + prettify(building.cost) + "</span><br />Amount: <span class='js-amount'>" + building.amount + "</span>";
    html2 = "+<span class='js-multiplier'>" + prettify(buildingUpgrade.multiplier) + "</span> multiplier<br />Cost: <span class='js-cost'>" + prettify(buildingUpgrade.cost) + "</span><br />Total multiplier: <span class='js-total-multiplier'>" + prettify(buildingUpgrade.amount * buildingUpgrade.multiplier) + "</span>";
    html3 = "+<span class='js-multiplier'>" + prettify(buildingUpgrade2.multiplier) + "</span> multiplier<br />Cost: <span class='js-cost'>" + prettify(buildingUpgrade2.cost) + "</span><br />Total multiplier: <span class='js-total-multiplier'>" + prettify(buildingUpgrade2.amount) + "</span>";

    buildingElement.className = "button";
    buildingElement.innerHTML = html;
    buildingUpgradeElement.className = "button";
    buildingUpgradeElement.innerHTML = html2;
    buildingUpgrade2Element.className = "button";
    buildingUpgrade2Element.innerHTML = html3;

    $(".js-buildings").append(buildingElement)
    $(".js-building-upgrades").append(buildingUpgradeElement)
    $(".js-building-upgrades-second").append(buildingUpgrade2Element)
}

var score = 0;
var totalScore = 0;
var power = 0; // = scorePerSecond
var powerPerClick = 0.1;
//var prestigeVar = 0;

//function save() {    
//    var saveVar = {
//        score: score,
//        power: power,
//        powerPerClick: powerPerClick,
//        buildings: buildings,
//        upgrades: upgrades
//    };
//    
//    localStorage.setItem("save", JSON.stringify(saveVar, replacer));
//}
//
//function load() {
//    var savegame = JSON.parse(localStorage.getItem("save"));
//    if (savegame === null || savegame === undefined) {
//        save();
//    } else {
//        if (typeof savegame.score !== "undefined") score = savegame.score;
//        if (typeof savegame.power !== "undefined") power = savegame.power;
//        if (typeof savegame.powerPerClick !== "undefined") powerPerClick = savegame.powerPerClick;
//        if (typeof savegame.buildings !== "undefined") buildings = savegame.buildings;
//        if (typeof savegame.upgrades !== "undefined") upgrades = savegame.upgrades;
//    }
//}
//
//load();
//
//function deleteSave() { localStorage.removeItem("save"); }*/

function prettify(input) {
    var temp = 0;
    if (input >= 10000000000000000000000000000000000) {
        temp = input / 1000000000000000000000000000000000;
        temp = +temp.toFixed(2);
        return temp + "D";
    } else if (input >= 10000000000000000000000000000000) {
        temp = input / 1000000000000000000000000000000;
        temp = +temp.toFixed(2);
        return temp + "N";
    } else if (input >= 10000000000000000000000000000) {
        temp = input / 1000000000000000000000000000;
        temp = +temp.toFixed(2);
        return temp + "O";
    } else if (input >= 10000000000000000000000000) {
        temp = input / 1000000000000000000000000;
        temp = +temp.toFixed(2);
        return temp + "S";
    } else if (input >= 10000000000000000000000) {
        temp = input / 1000000000000000000000;
        temp = +temp.toFixed(2);
        return temp + "s";
    } else if (input >= 10000000000000000000) {
        temp = input / 1000000000000000000;
        temp = +temp.toFixed(2);
        return temp + "Q";
    } else if (input >= 10000000000000000) {
        temp = input / 1000000000000000;
        temp = +temp.toFixed(2);
        return temp + "q";
    } else if (input >= 10000000000000) {
        temp = input / 1000000000000;
        temp = +temp.toFixed(2);
        return temp + "T";
    } else if (input >= 10000000000) {
        temp = input / 1000000000;
        temp = +temp.toFixed(2);
        return temp + "B";
    } else if (input >= 10000000) {
        temp = input / 1000000;
        temp = +temp.toFixed(2);
        return temp + "M";
    } else if (input >= 10000) {
        temp = input / 1000;
        temp = +temp.toFixed(2);
        return temp + "K";
    } else {
        temp = input;
        return +temp.toFixed(2);
    }
}

function incrementClick(number) {
    power += number/* * ((prestigeVar / 1000) + 1)*/;
    updateGui();
}

function increment() {
	var powerTemp = power;
	var delta = 0.1;

	buildings.forEach(function (building) {
		var amount = Math.floor(building.amount);
	
		switch (building.action.type) {
		case "score":
            powerTemp += building.action.perSecond * amount * (building.upgrades.multiplier * (building.upgrades.amount + 1))/* * ((building.upgrades.amount + 1) * (building.upgrades.upgrades.amount + 1)) * ((prestigeVar / 1000) + 1)*/;
            break;
		case "building":
            buildings[building.action.building].amount += building.action.perSecond * amount * delta * (building.upgrades.multiplier * (building.upgrades.amount + 1))/* * ((building.upgrades.amount + 1) + (building.upgrades.upgrades.amount + 1)) * ((prestigeVar / 1000) + 1)*/;
			break;
		}
	});

	score += powerTemp * delta;
	totalScore += powerTemp * delta;
	updateGui();
}

function upgradeClick(upgrade) {
	if (score >= upgrade.cost){
		score -= upgrade.cost;
		powerPerClick += upgrade.powerPerClick;
		
		upgrade.cost *= 3;
		upgrade.powerPerClick *= 2;
	}
}

function buildingClick(building) {
	if (score >= building.cost) {
		score -= building.cost;
		building.amount++;
		
		building.cost *= 1.5;
	}
}

function buildingUpgradeClick(building) {
    if (score >= building.upgrades.cost) {
        score -= building.upgrades.cost;
		building.upgrades.amount++;
		
		building.upgrades.cost *= 1.5;
	}
}

function buildingUpgrade2Click(building) {
    if (score >= building.upgrades.upgrades.cost) {
        score -= building.upgrades.upgrades.cost;
        building.upgrades.upgrades.amount++;
        building.upgrades.multiplier = building.upgrades.upgrades.amount + 1;
        
        building.upgrades.upgrades.cost *= 1.5;
    }
}

//function prestige() {
//    prestigeVar += Math.floor(totalScore / 1000000000);
//    score = 0;
//    totalScore = 0;
//    power = 0;
//    powerPerClick = 0.1;
//}

function updateGui() {
	$(".js-score").html(prettify(score));
	$(".js-score-per-second").html(prettify(power + getBuildingPower()));
	$(".js-power-per-click").html(prettify(powerPerClick))/* * ((prestigeVar / 1000) + 1))*/;
//    elements.prestige.innerHTML = prettify(prestigeVar);
//    elements.prestigeNext.innerHTML = prettify(Math.floor(totalScore / 1000000000));
		
	upgrades.forEach(function (upgrade) {
		upgrade.element.disabled = upgrade.cost > score;
	
		upgrade.element.querySelector(".js-upgrade-power-per-click").innerHTML = prettify(upgrade.powerPerClick);
		upgrade.element.querySelector(".js-cost").innerHTML = prettify(upgrade.cost);
	});
	
	buildings.forEach(function (building) {
		var buildingUpgrade = building.upgrades;
        var buildingUpgrade2 = building.upgrades.upgrades;
        
        building.element.disabled = building.cost > score;
        buildingUpgrade.element.disabled = buildingUpgrade.cost > score;
        buildingUpgrade2.element.disabled = buildingUpgrade2.cost > score;
		
		building.element.querySelector(".js-cost").innerHTML = prettify(building.cost);
		building.element.querySelector(".js-amount").innerHTML = prettify(Math.floor(building.amount));
		building.element.querySelector(".js-per-second").innerHTML = prettify(building.action.perSecond);
		
		buildingUpgrade.element.querySelector(".js-cost").innerHTML = prettify(buildingUpgrade.cost);
        buildingUpgrade.element.querySelector(".js-multiplier").innerHTML = prettify(buildingUpgrade.multiplier);
        buildingUpgrade.element.querySelector(".js-total-multiplier").innerHTML = prettify(buildingUpgrade.multiplier * buildingUpgrade.amount);
        
        buildingUpgrade2.element.querySelector(".js-cost").innerHTML = prettify(buildingUpgrade2.cost);
        buildingUpgrade2.element.querySelector(".js-multiplier").innerHTML = prettify(buildingUpgrade2.multiplier);
        buildingUpgrade2.element.querySelector(".js-total-multiplier").innerHTML = prettify(buildingUpgrade2.amount);
	});
}

function getBuildingPower() {
	return buildings
		.filter(function (building) {
			return building.action.type == "score";
		})
		.reduce(function (value, building) {
			return value + Math.floor(building.amount) * building.action.perSecond * (building.upgrades.multiplier * (building.upgrades.amount + 1));
		}, 0);
}

window.setInterval(function () {
	increment();
}, 100);

//window.setInterval(function () {
//    save();
//}, 60000);

//elements.prestigeButton.addEventListener("click", function() { prestige(); });
//elements.saveButton.addEventListener("click", function() { save(); });
//elements.deleteSaveButton.addEventListener("click", function() { deleteSave(); });
$(".js-increment-button").click(function() {incrementClick(powerPerClick)});
$(".js-tutorial-button").click(function() {
    $(".js-tutorial-text").toggleClass("hidden");
})
//$(".js-tutorial-container").click(function() {
//    $(".js-tutorial-container").html("<button class='button js-tutorial-button'>Tutorial</button>");
//})
//$(".js-tutorial-button").click(function() {
//    $(".js-tutorial-button").html("<div class='js-tutorial-container'>Start out with clicking the big bad Increment button (I know, he\'s not all that big or bad, he\'s actually quite a nice guy!). This will start giving you 0.1 score per second.<br />Keep on clicking and once you have enough, buy the first upgrade and click once again. What's that? So many more points? That's right! The first column will give your more of the so called \"power\" per click.<br />The more power you have, the more points you gain per second.<br />Then, once you have enough points you can buy things from the second column. The first building here will give you 10 power<br />Now, this doesn't seem like too much, but once you get the second building, you all of a sudden gain one of the first building per second! This will go on and on until the sixth building.<br />Now, the third and fourth row work a little different. These will add a multiplier to the upgrade above them. So for every upgrade you buy, you get +1 multiplier.<br />That's about it, if you are annoyed with this dialog, feel free to click on it to get it out of your life. </div>")
//})

upgrades.forEach(function (upgrade) {
	upgrade.element.addEventListener("click", function () {
		upgradeClick(upgrade);
	});
});

buildings.forEach(function (building) {
	building.element.addEventListener("click", function() {
		buildingClick(building);
	});
    building.upgrades.element.addEventListener("click", function() {
		buildingUpgradeClick(building);
	});
    building.upgrades.upgrades.element.addEventListener("click", function() {
		buildingUpgrade2Click(building);
	});
});

/*function isCyclic (obj) {
  var seenObjects = [];

  function detect (obj) {
    if (obj && typeof obj === 'object') {
      if (seenObjects.indexOf(obj) !== -1) {
        return true;
      }
      seenObjects.push(obj);
      for (var key in obj) {
        if (obj.hasOwnProperty(key) && detect(obj[key])) {
          console.log(obj, 'cycle at ' + key);
          return true;
        }
      }
    }
    return false;
  }

  return detect(obj);
}*/
