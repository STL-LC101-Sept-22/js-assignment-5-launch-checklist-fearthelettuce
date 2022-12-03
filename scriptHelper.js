// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
    document.innerHTML = `<h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">`
}

function validateInput(testInput) {
    if (testInput === '') {return 'Empty'}
    if (isNaN(testInput)) { return 'Not a Number' }
    if (!isNaN(testInput)) {return 'Is a Number'}
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
        return
    }
    //all inputs are valid
    // toggleElementVisibility(list)
    checkLaunchStatus(launchList, list)
    
}



function checkLaunchStatus(launchListObj, listEle) {
    let overallLaunchStatus = true;
    for (listItem in launchListObj) {
        updateLaunchListItem(launchListObj[listItem].statusEle, `${launchListObj[listItem].nameLabel} ${launchListObj[listItem].statusFunc(launchListObj[listItem].value).statusLabel} for launch`)
        if (!launchListObj[listItem].statusFunc(launchListObj[listItem].value).isReady) {
            overallLaunchStatus = false;
        }
    }
    updateOverallLaunchStatus(overallLaunchStatus)
    listEle.style.visibility = 'visible'
    return overallLaunchStatus
    
}

function updateLaunchListItem(eleId, statusString, fontColor) {
    let domEle = document.getElementById(eleId)
    domEle.innerText = statusString
    if (fontColor) {
        domEle.style.color = fontColor
    }
}

function updateOverallLaunchStatus(isReadyForLaunch) {
    if (isReadyForLaunch) {
        updateLaunchListItem('launchStatus', 'Shuttle is ready for launch','green')
    } else {
        updateLaunchListItem('launchStatus', 'Shuttle not ready for launch','red')

    }
}

function createLaunchListObj(pilotInput, copilotInput, fuelLevelInput, cargoLevelInput) {
    return {
        pilotItem: {
            statusEle: 'pilotStatus',
            nameLabel: `Pilot ${pilotInput}`,
            // isReady: true,
            // statusLabel: 'is ready',
            statusFunc: function () {
                return { isReady: true, statusLabel: 'is ready' }
            }
        },
        copilotItem: {
            statusEle: 'copilotStatus',
            nameLabel: `Co-pilot ${copilotInput}`,
            // isReady: true,
            // statusLabel: 'is ready',
            statusFunc: function () {
                return { isReady: true, statusLabel: 'is ready' }
            }
        },
        fuelItem: {
            value: Number(fuelLevelInput),
            statusEle: 'fuelStatus',
            nameLabel: `Fuel level`,
            isReady: true,
            // statusLabel: 'high enough'
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
            // isReady: true,
            // statusLabel: 'low enough',
            statusFunc: function (cargoKg) {
                if (cargoKg < 10000) {
                    return { isReady: true, statusLabel: 'low enough' }
                }
                return { isReady: false, statusLabel: 'too high' }
            },
        }
    }
}

async function myFetch() {
    let planetsReturned;
    planetsReturned = await fetch('https://handlers.education.launchcode.org/static/planets.json').then(function (response) {
        return response.json()
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
