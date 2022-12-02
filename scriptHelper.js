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
    if (isNaN(Number(testInput))) { return 'Not a Number' }
    if (!isNaN(Number(testInput))) {return 'Is a Number'}
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
   const missionTargetEle = document.getElementById('missionTarget')
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
