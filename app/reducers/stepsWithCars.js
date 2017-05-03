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

function calculateS(oldCarIdAndStepId, oldStepIdAndCars,newCars) {

  let stepsToChange = {};

// //      let arrCarIdToRemoveGlob = [];
   let objCarIdToChangeGlob = {};

//   newCars.forEach( car => {
    

  Object.keys(newCars).forEach( carid => {
    let car = newCars[carid];

    // if (!car.stepid) {
    //   objCarIdToChangeGlob[car.carid] = "";
    if (!car) {
      objCarIdToChangeGlob[carid] = "";
    }else{
      objCarIdToChangeGlob[carid] = car.stepid;
    }

//    if (!car.stepid) {
    if (!car) {
      let oldStepId = oldCarIdAndStepId[carid];
      if (oldStepId) {
        if (oldStepId in stepsToChange) {
          stepsToChange.[oldStepId]["remove"].push(carid);
        }else{
          stepsToChange.[oldStepId] = {"add":{},"remove":[carid]};
        }
//            arrCarIdToRemoveGlob.push(car.carid);
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
                                      objSum[carid] = oldCars[carid];
                                      return objSum
                                    }, {} );
      };
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


  // let CarIdAndStepId = {};
  // if (arrCarIdToRemoveGlob) {
  //   let arrCarsId = Object.keys(oldStepIdAndCars).filter( carid => !arrCarIdToRemoveGlob.includes(carid) );
  //   let arrCarsIdFiltered = arrCarsId.map( carid => oldStepIdAndCars[carid] );
  //   CarIdAndStepId = { ...arrCarsIdFiltered, ...objCarIdToChangeGlob };
  // }else{
  //   CarIdAndStepId = { ...oldStepIdAndCars, ...objCarIdToChangeGlob };
  // }
  let CarIdAndStepId = { ...oldStepIdAndCars, ...objCarIdToChangeGlob };

  return { 
    CarIdAndStepId, 
    StepIdAndCars
    };

}

export default function stepsWithCars(state = initialState, action) {

  switch (action.type) {

    case 'message_fullstate':

      let newCars = action.data.cars;

      let oldCarIdAndStepId = {};
      let oldStepIdAndCars = {};

      return calculateS( oldCarIdAndStepId, oldStepIdAndCars, newCars);

    case 'message_update':

      let newCars = action.data.cars;

      let oldCarIdAndStepId = state["CarIdAndStepId"] || {};
      let oldStepIdAndCars = state["StepIdAndCars"] || {};

      return calculateS( oldCarIdAndStepId, oldStepIdAndCars, newCars);
      
    default:
      return state
  }
}
