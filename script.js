// Game config
var upgrades = [{},{},{},{},{},{}]
var buildings = [{upgrades: {upgrades: {}}, action: {}},{upgrades: {upgrades: {}}, action: {}},{upgrades: {upgrades: {}}, action: {}},{upgrades: {upgrades: {}}, action: {}},{upgrades: {upgrades: {}}, action: {}},{upgrades: {upgrades: {}}, action: {}}]

function setUpgrades() {
    for(var i = 0; i < 6; i++) {
        if (i == 0) {
            upgrades[i].cost = 10;
            upgrades[i].powerPerClick = 0.3;
        } else {
            upgrades[i].cost = upgrades[i-1].cost * 3;
            upgrades[i].powerPerClick = upgrades[i-1].powerPerClick * 2;
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
    
    $(".js-clicking").append(upgradeElement)
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
var prestigeVar;
function setPrestige() {
    prestigeVar = [
        0,
        1000,
        0,
        1000,
        0,
        1000,
        0,
        1000,
        0
    ];
}
setPrestige();

function save() {
    var saveBuildings = [{upgrades: {upgrades: {}},action: {type: "score",perSecond: 10}},{upgrades: {upgrades: {}},action: {type: "building",perSecond: 1}},{upgrades: {upgrades: {}},action: {type: "building",perSecond: 1}},{upgrades: {upgrades: {}},action: {type: "building",perSecond: 1}},{upgrades: {upgrades: {}},action: {type: "building",perSecond: 1}},{upgrades: {upgrades: {}},action: {type: "building",perSecond: 1}}];
    var saveUpgrades = [{},{},{},{},{},{}];
    for(var i = 0; i < 6; i++) {
        saveBuildings[i].amount = buildings[i].amount;
        saveBuildings[i].upgrades.amount = buildings[i].upgrades.amount;
        saveBuildings[i].upgrades.upgrades.amount = buildings[i].upgrades.upgrades.amount;
        saveBuildings[i].upgrades.multiplier = buildings[i].upgrades.multiplier;
        saveBuildings[i].upgrades.upgrades.multiplier = buildings[i].upgrades.upgrades.multiplier;
        saveBuildings[i].cost = buildings[i].cost;
        saveBuildings[i].upgrades.cost = buildings[i].upgrades.cost;
        saveBuildings[i].upgrades.upgrades.cost = buildings[i].upgrades.upgrades.cost;
        saveUpgrades[i].cost = upgrades[i].cost;
        saveUpgrades[i].powerPerClick = upgrades[i].powerPerClick;
    }
    var saveVar = {
        score: score,
        power: power,
        powerPerClick: powerPerClick,
        buildings: saveBuildings,
        upgrades: saveUpgrades
    };
    
    localStorage.setItem("ECsave", JSON.stringify(saveVar));
}

function load() {
    var savegame = JSON.parse(localStorage.getItem("ECsave"));
    if (!savegame) {
        save();
    } else {
        if (typeof savegame.score !== "undefined") score = savegame.score;
        if (typeof savegame.power !== "undefined") power = savegame.power;
        if (typeof savegame.powerPerClick !== "undefined") powerPerClick = savegame.powerPerClick;
        if (typeof savegame.buildings !== "undefined") {
            for(var i = 0; i < 6; i++) {
                buildings[i].amount = savegame.buildings[i].amount;
                buildings[i].upgrades.amount = savegame.buildings[i].upgrades.amount;
                buildings[i].upgrades.upgrades.amount = savegame.buildings[i].upgrades.upgrades.amount;
                buildings[i].upgrades.multiplier = savegame.buildings[i].upgrades.multiplier;
                buildings[i].upgrades.upgrades.multiplier = savegame.buildings[i].upgrades.upgrades.multiplier;
                buildings[i].cost = savegame.buildings[i].cost;
                buildings[i].upgrades.cost = savegame.buildings[i].upgrades.cost;
                buildings[i].upgrades.upgrades.cost = savegame.buildings[i].upgrades.upgrades.cost;
            }
        }
        if (typeof savegame.upgrades !== "undefined") {
            for(var i = 0; i < 6; i++) {
                upgrades[i].cost = savegame.upgrades[i].cost;
                upgrades[i].powerPerClick = savegame.upgrades[i].powerPerClick;
            }
        }
    }
}

load();

function deleteSave() { localStorage.removeItem("ECsave"); }

function reset(type) {
    switch (type) {
        case "first-prestige":
            prestigeVar[0] += totalScore / 1000000000;
            if (prestigeVar[0] > prestigeVar[1]) {
                prestigeVar[0] = prestigeVar[1];
            }
            score = 0;
            totalScore = 0;
            power = 0;
            powerPerClick = 0.1;
            setUpgrades();
            setBuildings();
            break;
        case "second-prestige":
            prestigeVar[2] += prestigeVar[0] / 10;
            prestigeVar[0] = 0;
            if (prestigeVar[2] > prestigeVar[3]) {
                prestigeVar[2] = prestigeVar[3];
            }
            break;
        case "third-prestige":
            prestigeVar[4] += prestigeVar[2] / 10;
            prestigeVar[2] = 0;
            if (prestigeVar[4] > prestigeVar[5]) {
                prestigeVar[4] = prestigeVar[5];
            }
            break;
        case "fourth-prestige":
            prestigeVar[6] += prestigeVar[4] / 10;
            prestigeVar[4] = 0;
            if (prestigeVar[6] > prestigeVar[7]) {
                prestigeVar[6] = prestigeVar[7];
            }
            break;
        case "fifth-prestige":
            prestigeVar[8] += prestigeVar[6] / 10;
            prestigeVar[6] = 0;
            break;
        case "full":
            score = 0;
            totalScore = 0;
            power = 0;
            powerPerClick = 0.1;
            setUpgrades();
            setBuildings();
            setPrestige();
            break;
    }
}

function prettify(input) {
    var temp = 0;
    if (input >= 1e60) {
        temp = input / 1e60;
        temp = +temp.toFixed(2);
        return temp + "ND";
    } else if (input >= 1e57) {
        temp = input / 1e57;
        temp = +temp.toFixed(2);
        return temp + "OD";
    } else if (input >= 1e54) {
        temp = input / 1e54;
        temp = +temp.toFixed(2);
        return temp + "SD";
    } else if (input >= 1e51) {
        temp = input / 1e51;
        temp = +temp.toFixed(2);
        return temp + "sD";
    } else if (input >= 1e48) {
        temp = input / 1e48;
        temp = +temp.toFixed(2);
        return temp + "QD";
    } else if (input >= 1e45) {
        temp = input / 1e45;
        temp = +temp.toFixed(2);
        return temp + "qD";
    } else if (input >= 1e42) {
        temp = input / 1e42;
        temp = +temp.toFixed(2);
        return temp + "TD";
    } else if (input >= 1e39) {
        temp = input / 1e39;
        temp = +temp.toFixed(2);
        return temp + "DD"; //Huehue, double D
    } else if (input >= 1e36) {
        temp = input / 1e36;
        temp = +temp.toFixed(2);
        return temp + "UD";
    } else if (input >= 1e33) {
        temp = input / 1e33;
        temp = +temp.toFixed(2);
        return temp + "D";
    } else if (input >= 1e30) {
        temp = input / 1e30;
        temp = +temp.toFixed(2);
        return temp + "N";
    } else if (input >= 1e27) {
        temp = input / 1e27;
        temp = +temp.toFixed(2);
        return temp + "O";
    } else if (input >= 1e24) {
        temp = input / 1e24;
        temp = +temp.toFixed(2);
        return temp + "S";
    } else if (input >= 1e21) {
        temp = input / 1e21;
        temp = +temp.toFixed(2);
        return temp + "s";
    } else if (input >= 1e18) {
        temp = input / 1e18;
        temp = +temp.toFixed(2);
        return temp + "Q";
    } else if (input >= 1e15) {
        temp = input / 1e15;
        temp = +temp.toFixed(2);
        return temp + "q";
    } else if (input >= 1e12) {
        temp = input / 1e12;
        temp = +temp.toFixed(2);
        return temp + "T";
    } else if (input >= 1e9) {
        temp = input / 1e9;
        temp = +temp.toFixed(2);
        return temp + "B";
    } else if (input >= 1e6) {
        temp = input / 1e6;
        temp = +temp.toFixed(2);
        return temp + "M";
    } else if (input >= 1e3) {
        temp = input / 1e3;
        temp = +temp.toFixed(2);
        return temp + "K";
    } else {
        temp = input;
        return +temp.toFixed(2);
    }
}

function incrementClick() {
    power += powerPerClick * ((prestigeVar[0] / 1000) + 1);
    updateGui();
}

function increment() {
	var powerTemp = power;
	var delta = 0.1;

	buildings.forEach(function (building) {
		var amount = Math.floor(building.amount);
	
		switch (building.action.type) {
		case "score":
            powerTemp += building.action.perSecond * amount * ((building.upgrades.multiplier * building.upgrades.amount) + 1) * ((prestigeVar[0] / 1000) + 1);
            break;
		case "building":
            buildings[building.action.building].amount += building.action.perSecond * amount * delta * ((building.upgrades.multiplier * building.upgrades.amount) + 1) * ((prestigeVar[0] / 1000) + 1);
			break;
		}
	});

	score += powerTemp * delta;
	totalScore += powerTemp * delta;
    prestigeVar[1] = prestigeVar[2] + 1000;
    prestigeVar[3] = prestigeVar[4] + 1000;
    prestigeVar[5] = prestigeVar[6] + 1000;
    prestigeVar[7] = prestigeVar[8] + 1000;
	updateGui();
}

function upgradeClick(upgrade) {
    if (score >= upgrade.cost){
        score -= upgrade.cost;
        
        powerPerClick += upgrade.powerPerClick;
        upgrade.powerPerClick *= 2;
        upgrade.cost *= 3;
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
	$(".js-power-per-click").html(prettify(powerPerClick)) * ((prestigeVar[0] / 1000) + 1);
    $(".first-prestige").html(prettify(Math.floor(prestigeVar[0])));
    $(".first-prestige-next").html(prettify(Math.floor(Math.min((totalScore / 1000000000), prestigeVar[1]))));
    $(".first-prestige-max").html(prettify(Math.floor(prestigeVar[1])));
    $(".second-prestige").html(prettify(Math.floor(prestigeVar[2])));
    $(".second-prestige-next").html(prettify(Math.floor(Math.min((prestigeVar[0] / 1000), prestigeVar[3]))));
    $(".second-prestige-max").html(prettify(Math.floor(prestigeVar[3])));
    $(".third-prestige").html(prettify(Math.floor(prestigeVar[4])));
    $(".third-prestige-next").html(prettify(Math.floor(Math.min((prestigeVar[2] / 100), prestigeVar[5]))));
    $(".third-prestige-max").html(prettify(Math.floor(prestigeVar[5])));
    $(".fourth-prestige").html(prettify(Math.floor(prestigeVar[6])));
    $(".fourth-prestige-next").html(prettify(Math.floor(Math.min((prestigeVar[4] / 10), prestigeVar[7]))));
    $(".fourth-prestige-max").html(prettify(Math.floor(prestigeVar[7])));
    $(".fifth-prestige").html(prettify(Math.floor(prestigeVar[8])));
    $(".fifth-prestige-next").html(prettify(Math.floor(prestigeVar[6] / 10)));
		
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

window.setInterval(function () {
    save();
}, 60000);

$(".js-prestige-button").click(function() {reset($("#reset-tier").val())});
$(".js-reset-button").click(function() {reset("full")})
$(".js-increment-button").click(function() {
    $(".js-increment-button").blur()
    incrementClick()
});
$(".js-clicking-tab-button").click(function() {
    $(".js-scroll").animate({
        left: -0000 + "px"
    })
})
$(".js-automatic-tab-button").click(function() {
    $(".js-scroll").animate({
        left: -1000 + "px"
    })
})
$(".js-prestige-tab-button").click(function() {
    $(".js-scroll").animate({
        left: -2000 + "px"
    })
})
$(".js-menu-tab-button").click(function() {
    $(".js-scroll").animate({
        left: -3000 + "px"
    })
})
$(".js-tutorial-button").click(function() {
    $(".js-tutorial-text").toggleClass("hidden");
})
$(document).ready(function() {
     $(window).resize(function() {
        $(".js-main").css({
            position: "absolute",
            left: ($(window).width() - $(".js-main").outerWidth()) / 2,
            top: ($(window).height() - $(".js-main").outerHeight()) / 2
        });
    });
    $(window).resize();
});

upgrades.forEach(function (upgrade) {
    upgrade.element.addEventListener("click", function() {
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
