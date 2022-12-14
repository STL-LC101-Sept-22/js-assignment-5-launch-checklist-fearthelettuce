// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
    document.getElementById('missionTarget').innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">
                `
}

function validateInput(testInput) {
    let numInput = Number(testInput)
    if (testInput === '') {return 'Empty'};
    if (isNaN(numInput)) {return 'Not a Number'};
    if (!isNaN(numInput)) {return 'Is a Number'};
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let launchList = createLaunchListObj(pilot, copilot, fuelLevel, cargoLevel)
    let areInputsValid = true;
    inputErrorMessage = ''
    if (validateInput(pilot) === 'Empty' || validateInput(copilot) === 'Empty' || validateInput(Number(fuelLevel)) === 'Empty' || validateInput(Number(cargoLevel)) === 'Empty') {
        areInputsValid = false;
        inputErrorMessage += 'All fields are required!'
    }
    if (validateInput(fuelLevel) === 'Not a Number' || validateInput(cargoLevel) === 'Not a Number') {
        areInputsValid = false;
        if (inputErrorMessage !== '') {
            inputErrorMessage += '\n'
        }
        inputErrorMessage += 'Make sure to enter valid information for each field!'
    }
    if (!areInputsValid) {
        alert(inputErrorMessage)
        list.style.visibility = 'hidden'
        return
    }
    list.style.visibility = 'visible'
    let overallStatus = checkLaunchStatus(document,launchList)
    updateOverallLaunchStatus(document, overallStatus)
}

function createLaunchListObj(pilotInput, copilotInput, fuelLevelInput, cargoLevelInput) {
    return {
        pilotItem: {
            statusEle: 'pilotStatus',
            nameLabel: `Pilot ${pilotInput}`,
            statusFunc: function () {
                return { isReady: true, statusLabel: 'is ready' }
            }
        },
        copilotItem: {
            statusEle: 'copilotStatus',
            nameLabel: `Co-pilot ${copilotInput}`,
            statusFunc: function () {
                return { isReady: true, statusLabel: 'is ready' }
            }
        },
        fuelItem: {
            value: Number(fuelLevelInput),
            statusEle: 'fuelStatus',
            nameLabel: 'Fuel level',
            isReady: true,
            statusFunc: function (fuelKg) {
                if (fuelKg < 10000) {
                    return { isReady: false, statusLabel: 'too low' }
                }
                return { isReady: true, statusLabel: 'high enough' }
            },

        },
        cargoItem: {
            value: Number(cargoLevelInput),
            statusEle: 'cargoStatus',
            nameLabel: 'Cargo mass',
            statusFunc: function (cargoKg) {
                if (cargoKg < 10000) {
                    return { isReady: true, statusLabel: 'low enough' }
                }
                return { isReady: false, statusLabel: 'too heavy' }
            },
        }
    }
}

function checkLaunchStatus(document, launchListObj) {
    let overallLaunchStatus = true;
    for (listItem in launchListObj) {
        let statusString = `${launchListObj[listItem].nameLabel} ${launchListObj[listItem].statusFunc(launchListObj[listItem].value).statusLabel} for launch`.trim()
        updateDomEle(document, launchListObj[listItem].statusEle, statusString)
        if (!launchListObj[listItem].statusFunc(launchListObj[listItem].value).isReady) {
            overallLaunchStatus = false;
        }
    }
    return overallLaunchStatus
}

function updateDomEle(document, eleId, statusString, fontColor) {
    let domEle = document.getElementById(eleId)
    domEle.textContent = statusString.trim()
    if (fontColor) {
        domEle.style.color = fontColor
    }
}

function updateOverallLaunchStatus(document, isReadyForLaunch) {
    if (isReadyForLaunch) {
        updateDomEle(document, 'launchStatus', 'Shuttle is Ready for Launch','rgb(65, 159, 106)')
    } else {
        updateDomEle(document,'launchStatus', 'Shuttle Not Ready for Launch','rgb(199, 37, 78)')

    }
}



async function myFetch() {
    let planetsReturned;
    planetsReturned = await fetch('https://handlers.education.launchcode.org/static/planets.json').then(function (response) {
        if (!response.ok) {
            throw new Error('Unable to get data')
        } else {
            return response.json()
        }
    });
    return planetsReturned;
}

function pickPlanet(planets) {
    const randomVal = Math.floor(Math.random() * planets.length)
    return planets[randomVal]
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
