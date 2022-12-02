// Write your JavaScript code here!

// const { pickPlanet } = require("./scriptHelper");

window.addEventListener("load", function () {

    const submitBtn = document.getElementById('formSubmit')
    const missionTargetEle = document.getElementById('missionTarget')
    const pilotNameInput = document.getElementById('pilotName')
    const coPilotNameInput = document.querySelector("[name='copilotName']")
    const fuelLevelInput = document.querySelector("[name='fuelLevel']")
    const cargoMassInput = document.querySelector("[name='cargoMass']")
    const faultItemList = document.getElementById('faultyItems')


    submitBtn.addEventListener('click',submitForm)
    let listedPlanets;
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch();
    
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        console.log(listedPlanets);
    }).then(function () {
        console.log(listedPlanets);
        // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
        const planet = pickPlanet(listedPlanets)
        addDestinationInfo(missionTargetEle, planet.name, planet.diameter, planet.star, planet.distance, planet.moons, planet.image);
    })
   
    function submitForm(event) {
        event.preventDefault()
        console.log('hi')
        formSubmission(window.document, faultItemList, pilotNameInput.value, coPilotNameInput.value, fuelLevelInput.value, cargoMassInput.value) 

        // if (!isValidInput()) { return }
        // shuttleStatus = {
        //     overallStatus: getOverallStatus(),
        //     pilot: {
        //         label: pilotNameInput.value,
        //         status: true,
        //         statusLabel: 'is ready'
        //     },
        //     coPilot: {
        //         label: coPilotNameInput.value,
        //         status: true,
        //         statusLabel: 'is ready'
        //     },
        //     fuelLevel: {
        //         label: 'Fuel level',
        //         status: getFuelLevelStatus(fuelLevelInput.value),
        //         statusLabel: 'too low',
        //     },
        //     cargoMass: {
        //         label: 'Cargo mass',
        //         status: getCargoMassStatus(cargoMassInput.value),
        //         statusLabel: 'low enough',
        //     }
        // }
    }

    function isValidInput() {
        let validInput = true;
        let inputErrorMessage = '';

        
        if (validateInput(pilotNameInput.value) === 'Empty' || validateInput(coPilotNameInput.value) === 'Empty' || validateInput(fuelLevelInput.value) === 'Empty' || validateInput(cargoMassInput.value) === 'Empty' ) {
            validInput = false;
            inputErrorMessage += 'All fields are required!'
        }
        if (typeof (pilotNameInput.value) !== 'string' || typeof (coPilotNameInput.value) !== 'string') {
            validInput = false;
            inputErrorMessage += 'Make sure to enter valid information for each field!'
        }
        if (isNaN(Number(fuelLevelInput.value)) || isNaN(Number(cargoMassInput.value))) {
            validInput = false;
            if (inputErrorMessage !== '') {
                inputErrorMessage += '\n'
            }
            inputErrorMessage += 'Make sure to enter valid information for each field!'
        }
        if (inputErrorMessage !== '') {
            alert(inputErrorMessage)
        }
        return validInput
    }

});

