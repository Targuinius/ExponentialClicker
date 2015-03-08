// Game config
var upgrades = [{},{},{},{},{},{}]
var buildings = [{upgrades: {upgrades: {}}, action: {}},{upgrades: {upgrades: {}}, action: {}},{upgrades: {upgrades: {}}, action: {}},{upgrades: {upgrades: {}}, action: {}},{upgrades: {upgrades: {}}, action: {}},{upgrades: {upgrades: {}}, action: {}}]

function setUpgrades() {
    for(var i = 0; i < 6; i++) {
        if (i == 0) {
            upgrades[i].cost = 10;
            upgrades[i].powerPerClick = 0.3;
        } else {
            upgrades[i].cost = upgrades[i-1].cost * 3
            upgrades[i].powerPerClick = upgrades[i-1].powerPerClick * 2
        }
    }
}

function setBuildings() {
    for(var i = 0; i < 6; i++) {
        buildings[i].amount = 0;
        buildings[i].upgrades.amount = 0;
        buildings[i].upgrades.upgrades.amount = 0;
        buildings[i].upgrades.multiplier = 1;
        buildings[i].upgrades.upgrades.multiplier = 1;
        if (i == 0) {
            buildings[i].cost = 1000;
            buildings[i].upgrades.cost = 1000000;
            buildings[i].upgrades.upgrades.cost = 1000000000;
            buildings[i].action = {type: "score", perSecond: 10};
        } else {
            buildings[i].cost = buildings[i-1].cost * 100;
            buildings[i].upgrades.cost = buildings[i-1].upgrades.cost * 100;
            buildings[i].upgrades.upgrades.cost = buildings[i-1].upgrades.upgrades.cost * 100;
            buildings[i].action.type = "building"
            buildings[i].action.building = i-1;
            buildings[i].action.perSecond = 1;
        }
    }
}
setUpgrades();
setBuildings();

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
var prestigeVar = 0;

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
//    if (!savegame) {
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

function reset(type) {
    if (type == "prestige") {
        prestigeVar = totalScore / 1000000000;
        score = 0;
        totalScore = 0;
        power = 0;
        powerPerClick = 0.1;
        setUpgrades();
        setBuildings();
    }
    if (type == "full") {
        prestigeVar = 0;
        score = 0;
        totalScore = 0;
        power = 0;
        powerPerClick = 0.1;
        setUpgrades();
        setBuildings();
    }
}

function prettify(input) {
    var temp = 0;
    if (input >= 1e34) {
        temp = input / 1e33;
        temp = +temp.toFixed(2);
        return temp + "D";
    } else if (input >= 1e31) {
        temp = input / 1e30;
        temp = +temp.toFixed(2);
        return temp + "N";
    } else if (input >= 1e28) {
        temp = input / 1e27;
        temp = +temp.toFixed(2);
        return temp + "O";
    } else if (input >= 1e25) {
        temp = input / 1e24;
        temp = +temp.toFixed(2);
        return temp + "S";
    } else if (input >= 1e22) {
        temp = input / 1e21;
        temp = +temp.toFixed(2);
        return temp + "s";
    } else if (input >= 1e19) {
        temp = input / 1e18;
        temp = +temp.toFixed(2);
        return temp + "Q";
    } else if (input >= 1e16) {
        temp = input / 1e15;
        temp = +temp.toFixed(2);
        return temp + "q";
    } else if (input >= 1e13) {
        temp = input / 1e12;
        temp = +temp.toFixed(2);
        return temp + "T";
    } else if (input >= 1e10) {
        temp = input / 1e9;
        temp = +temp.toFixed(2);
        return temp + "B";
    } else if (input >= 1e7) {
        temp = input / 1e6;
        temp = +temp.toFixed(2);
        return temp + "M";
    } else if (input >= 1e4) {
        temp = input / 1e3;
        temp = +temp.toFixed(2);
        return temp + "K";
    } else {
        temp = input;
        return +temp.toFixed(2);
    }
}

function incrementClick(number) {
    power += number * ((prestigeVar / 1000) + 1);
    updateGui();
}

function increment() {
	var powerTemp = power;
	var delta = 0.1;

	buildings.forEach(function (building) {
		var amount = Math.floor(building.amount);
	
		switch (building.action.type) {
		case "score":
            powerTemp += building.action.perSecond * amount * ((building.upgrades.multiplier * building.upgrades.amount) + 1) * ((prestigeVar / 1000) + 1);
            break;
		case "building":
            buildings[building.action.building].amount += building.action.perSecond * amount * delta * ((building.upgrades.multiplier * building.upgrades.amount) + 1) * ((prestigeVar / 1000) + 1);
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

function updateGui() {
	$(".js-score").html(prettify(score));
	$(".js-score-per-second").html(prettify(power + getBuildingPower()));
	$(".js-power-per-click").html(prettify(powerPerClick)) * ((prestigeVar / 1000) + 1);
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
        buildingUpgrade.element.querySelector(".js-total-multiplier").innerHTML = prettify((buildingUpgrade.multiplier * buildingUpgrade.amount) + 1);
        
        buildingUpgrade2.element.querySelector(".js-cost").innerHTML = prettify(buildingUpgrade2.cost);
        buildingUpgrade2.element.querySelector(".js-multiplier").innerHTML = prettify(buildingUpgrade2.multiplier);
        buildingUpgrade2.element.querySelector(".js-total-multiplier").innerHTML = prettify((buildingUpgrade2.multiplier * buildingUpgrade2.amount) + 1);
	});
}

function getBuildingPower() {
	return buildings
		.filter(function (building) {
			return building.action.type == "score";
		})
		.reduce(function (value, building) {
			return value + Math.floor(building.amount) * building.action.perSecond * ((building.upgrades.multiplier * building.upgrades.amount) + 1);
		}, 0);
}

window.setInterval(function () {
	increment();
}, 100);

//window.setInterval(function () {
//    save();
//}, 60000);

$(".js-prestige-button").click(function() {reset("prestige")});
$(".js-reset-button").click(function() {reset("full")})
//elements.saveButton.addEventListener("click", function() { save(); });
//elements.deleteSaveButton.addEventListener("click", function() { deleteSave(); });
$(".js-increment-button").click(function() {incrementClick(powerPerClick)   });
$(".js-tutorial-button").click(function() {
    $(".js-tutorial-text").toggleClass("hidden");
})

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
