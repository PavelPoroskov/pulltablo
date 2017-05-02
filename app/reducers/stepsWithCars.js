//import { UPDATE_ALL, UPDATE_AUTO } from '../constants/ActionTypes'

// const initialState =  {
// //    "step02": { 
// //      "a001bc": { autoid: "a001bc", stepid: "01", timestamp: 1002 },
// //      "d007ef": { autoid: "d007ef", stepid: "01", timestamp: 1000 },
// //      "d007ee": { autoid: "d007ee", stepid: "02", timestamp: 1003 }
// //            }
//     }

const initialState =  { 
    "CarIdAndStepId":{}, 
    "StepIdAndCars":{}
  }

export default function stepsWithCars(state = initialState, action) {

  switch (action.type) {

    case 'message':

      let newCars = action.data.cars;

      let oldCarIdAndStepId = state["CarIdAndStepId"] || {};
      let oldStepIdAndCars = state["StepIdAndCars"] || {};


      let stepsToChange = {};

      let arrCarIdToRemoveGlob = [];
      let objCarIdToChangeGlob = {};

      newCars.forEach( car => {
        
        if (!car.stepid) {
          let oldStepId = oldCarIdAndStepId[car.carid];
          if (oldStepId) {
            if (oldStepId in stepsToChange) {
              stepsToChange.[oldStepId]["remove"].push(car.carid);
            }else{
              stepsToChange.[oldStepId] = {"add":{},"remove":[car.carid]};
            }
            arrCarIdToRemoveGlob.push(car.carid);
          }
          return;
        };


        let oldStepId = oldCarIdAndStepId[car.carid];
        if (oldStepId && car.stepid != oldStepId) {
          if (oldStepId in stepsToChange) {
            stepsToChange.[oldStepId]["remove"].push(car.carid);
          }else{
            stepsToChange.[oldStepId] = {"add":{},"remove":[car.carid]};
          }
        }

        if (car.stepid in stepsToChange) {
//          stepsToChange.[car.stepid]["add"].push(car);
          stepsToChange.[car.stepid]["add"].[car.carid] = car;
        }else{
          stepsToChange.[car.stepid] = {"add": { car.carid: car}, "remove":[]};
        }
        objCarIdToChangeGlob[car.carid] = car.stepid;
      } );


      Object.keys(stepsToChange).forEach( stepidToChange => {

        let arrCarIdToRemove = stepsToChange[stepidToChange]["remove"];
        let objCarsToAdd = stepsToChange[stepidToChange]["add"];

        let carsFiltered = {};
        if (stepidToChange in oldStepIdAndCars && arrCarIdToRemove) {
//          cars = { ...state[stepidToDo] };
          let oldCars = oldStepIdAndCars[stepidToChange];

          if (arrCarIdToRemove) {        
            let arrCarsId = Object.keys(oldCars).filter( carid => !arrCarIdToRemove.includes(carid) );

            carsFiltered = arrCarsId.reduce( (objSum,carid) => {
                                          objSum[carid] = cars0[carid];
                                          return objSum
                                        }, {} );
        };

        let newCars = {};
        if (arrCarIdToRemove && objCarsToAdd) {        
          newCars = {...carsFiltered, ...objCarsToAdd};
        }else if (objCarsToAdd) {
          let oldCars = oldStepIdAndCars[stepidToChange];
          newCars = {...oldCars, ...objCarsToAdd};
        }else{
          newCars = carsFiltered;
        }

//        newStateAdd = { ...newStateAdd, stepidToDo: cars };
        stepsToChange[stepidToChange]["newCars"] = newCars;
      });

      let StepIdAndCarsAdd = Object.keys(stepsToChange).reduce( (objSum,stepidToChange) => {
                                    objSum[stepidToChange] = stepToDo[stepidToChange]["newCars"];
                                    return objSum
                                  }, {} );
      let StepIdAndCars = { ...oldStepIdAndCars, ...StepIdAndCarsAdd };


      let CarIdAndStepId = {};
      if (arrCarIdToRemoveGlob) {
        let arrCarsId = Object.keys(oldStepIdAndCars).filter( carid => !arrCarIdToRemoveGlob.includes(carid) );
        let arrCarsIdFiltered = arrCarsId.map( carid => oldStepIdAndCars[carid] );
        CarIdAndStepId = { ...arrCarsIdFiltered, ...objCarIdToChangeGlob };
      }else{
        CarIdAndStepId = { ...oldStepIdAndCars, ...objCarIdToChangeGlob };
      }

      return { 
        CarIdAndStepId, 
        StepIdAndCars
        };

    default:
      return state
  }
}
