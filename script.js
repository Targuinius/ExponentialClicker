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
            upgrades: {
                amount: 0,
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
            upgrades: {
                amount: 0,
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
            upgrades: {
                amount: 0,
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
            upgrades: {
                amount: 0,
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
            upgrades: {
                amount: 0,
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
            upgrades: {
                amount: 0,
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

// Elements
var elements = {
    incrementButton: document.querySelector(".js-increment-button"),
//    prestigeButton: document.querySelector(".js-prestige-button"),
//    saveButton: document.querySelector(".js-save-button"),
//    deleteSaveButton: document.querySelector(".js-delete-save-button"),
    upgradesContainer: document.querySelector(".js-upgrades"),
    buildingsContainer: document.querySelector(".js-buildings"),
    buildingUpgradesContainer: document.querySelector(".js-building-upgrades"),
    buildingUpgrades2Container: document.querySelector(".js-building-upgrades-second"),
    score: document.querySelector(".js-info .js-score"),
    perSecond: document.querySelector(".js-info .js-score-per-second"),
    powerPerClick: document.querySelector(".js-info .js-power-per-click"),
//    prestige: document.querySelector(".js-prestige"),
//    prestigeNext: document.querySelector(".js-next-prestige")
};

for (var i = 0; i < upgrades.length; i++) {
    var upgrade = upgrades[i];
    var upgradeElement = document.createElement("button");
    upgrade.element = upgradeElement;

    upgradeElement.className = "button";
    upgradeElement.innerHTML = "+<span class='js-power-per-click'>" + upgrade.powerPerClick + "</span>/s per click<br />" + "Cost: <span class='js-cost'>" + upgrade.cost + "</span>";

    elements.upgradesContainer.appendChild(upgradeElement);
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
            html = "+<span class='js-score-per-second'>" + building.action.perSecond + "</span> score per second<br />";
            break;

        case "building":
            html = "+<span class='js-building-per-second'>" + building.action.perSecond + "</span> buildings per second<br />";
            break;
    }

    html += "Cost: <span class='js-cost'>" + prettify(building.cost) + "</span><br />Amount: <span class='js-amount'>" + building.amount + "</span>";
    html2 = "+1 multiplier<br />" + "Cost: <span class='js-cost'>" + prettify(buildingUpgrade.cost) + "</span><br />" + "Amount: <span class='js-amount'>" + buildingUpgrade.amount + "</span><br />";
    html3 = "+1 multiplier<br />" + "Cost: <span class='js-cost'>" + prettify(buildingUpgrade2.cost) + "</span><br />" + "Amount: <span class='js-amount'>" + buildingUpgrade2.amount + "</span><br />";

    buildingElement.className = "button";
    buildingElement.innerHTML = html;
    buildingUpgradeElement.className = "button";
    buildingUpgradeElement.innerHTML = html2;
    buildingUpgrade2Element.className = "button";
    buildingUpgrade2Element.innerHTML = html3;

    elements.buildingsContainer.appendChild(buildingElement);
    elements.buildingUpgradesContainer.appendChild(buildingUpgradeElement);
    elements.buildingUpgrades2Container.appendChild(buildingUpgrade2Element);
}

var score = 0;
var totalScore = 0;
var power = 0; // = scorePerSecond
var powerPerClick = 0.1;
//var prestigeVar = 0;

/*var replacer = ["score", "power", "powerPerClick"]

function save() {    
    var saveVar = {
        score: score,
        power: power,
        powerPerClick: powerPerClick,
        buildings: buildings,
        upgrades: upgrades
    };
    
    localStorage.setItem("save", JSON.stringify(saveVar, replacer));
}

function load() {
    var savegame = JSON.parse(localStorage.getItem("save"));
    if (savegame === null || savegame === undefined) {
        save();
    } else {
        if (typeof savegame.score !== "undefined") score = savegame.score;
        if (typeof savegame.power !== "undefined") power = savegame.power;
        if (typeof savegame.powerPerClick !== "undefined") powerPerClick = savegame.powerPerClick;
        if (typeof savegame._buildings !== "undefined") buildings = savegame._buildings;
        if (typeof savegame._upgrades !== "undefined") upgrades = savegame._upgrades;
    }
}

load();

function deleteSave() { localStorage.removeItem("save"); }*/

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
	elements.perSecond.innerHTML = prettify(power);
    updateGui();
}

function increment() {
	var powerTemp = power;
	var delta = 0.1;

	buildings.forEach(function (building) {
		var amount = Math.floor(building.amount);
	
		switch (building.action.type) {
		case "score":
            powerTemp += building.action.perSecond * amount * ((building.upgrades.amount + 1) * (building.upgrades.upgrades.amount + 1))/* * ((prestigeVar / 1000) + 1)*/;
            break;
		case "building":
            buildings[building.action.building].amount += building.action.perSecond * amount * delta * ((building.upgrades.amount + 1) + (building.upgrades.upgrades.amount + 1))/* * ((prestigeVar / 1000) + 1)*/;
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

function buildingUpgradeClick(buildingUpgrade) {
    if (score >= buildingUpgrade.cost) {
        score -= buildingUpgrade.cost;
		buildingUpgrade.amount++;
		
		buildingUpgrade.cost *= 1.5;
	}
}

function buildingUpgrade2Click(buildingUpgrade2) {
    if (score >= buildingUpgrade2.cost) {
        score -= buildingUpgrade2.cost;
        buildingUpgrade2.amount++;
        
        buildingUpgrade2.cost *= 1.5;
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
	elements.score.innerHTML = prettify(score);
	elements.perSecond.innerHTML = prettify(power + getBuildingPower());
	elements.powerPerClick.innerHTML = prettify(powerPerClick)/* * ((prestigeVar / 1000) + 1))*/;
//    elements.prestige.innerHTML = prettify(prestigeVar);
//    elements.prestigeNext.innerHTML = prettify(Math.floor(totalScore / 1000000000));
		
	upgrades.forEach(function (upgrade) {
		upgrade.element.disabled = upgrade.cost > score;
	
		upgrade.element.querySelector(".js-power-per-click").innerHTML = prettify(upgrade.powerPerClick);
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
		
		buildingUpgrade.element.querySelector(".js-cost").innerHTML = prettify(buildingUpgrade.cost);
		buildingUpgrade.element.querySelector(".js-amount").innerHTML = prettify(Math.floor(buildingUpgrade.amount));
        
        buildingUpgrade2.element.querySelector(".js-cost").innerHTML = prettify(buildingUpgrade2.cost);
        buildingUpgrade2.element.querySelector(".js-amount").innerHTML = prettify(Math.floor(buildingUpgrade2.amount));
	});
}

function getBuildingPower() {
	return buildings
		.filter(function (building) {
			return building.action.type == "score";
		})
		.reduce(function (value, building) {
			return value + Math.floor(building.amount) * building.action.perSecond * ((building.upgrades.amount + 1) * (building.upgrades.upgrades.amount + 1));
		}, 0);
}

window.setInterval(function () {
	increment();
}, 100);

//window.setInterval(function () {
//    save();
//}, 60000);

elements.incrementButton.addEventListener("click", function() { incrementClick(powerPerClick); });
//elements.prestigeButton.addEventListener("click", function() { prestige(); });
//elements.saveButton.addEventListener("click", function() { save(); });
//elements.deleteSaveButton.addEventListener("click", function() { deleteSave(); });

upgrades.forEach(function (upgrade) {
	upgrade.element.addEventListener("click", function () {
		upgradeClick(upgrade);
	});
});

buildings.forEach(function (building) {
	building.element.addEventListener("click", function() {
		buildingClick(building);
	});
    var buildingUpgrade = building.upgrades;
    buildingUpgrade.element.addEventListener("click", function() {
		buildingUpgradeClick(buildingUpgrade);
	});
    var buildingUpgrade2 = building.upgrades.upgrades;
    buildingUpgrade2.element.addEventListener("click", function() {
		buildingUpgrade2Click(buildingUpgrade2);
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