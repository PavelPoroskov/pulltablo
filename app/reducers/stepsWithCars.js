//import { UPDATE_ALL, UPDATE_AUTO } from '../constants/ActionTypes'

// const initialState =  {
// //    "step02": { 
// //      "a001bc": { autoid: "a001bc", stepid: "01", timestamp: 1002 },
// //      "d007ef": { autoid: "d007ef", stepid: "01", timestamp: 1000 },
// //      "d007ee": { autoid: "d007ee", stepid: "02", timestamp: 1003 }
// //            }
//     }

const initialState0 =  { 
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

export default function stepsWithCars0(state = initialState0, action) {

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




const intersectM1 = (arrChanges, stepid, objStepCars) => {

  let objAdd = {};
  let objRemove = {};
//  let haveChanges = false;
  let haveAdd = false;
  let haveRemove = false;

  arrChanges.forEach( change => {
    if (change.stepid == stepid) {
      objAdd[change.carid] = stepid;
      haveAdd = true;
    }else if (change.carid in objStepCars) {
//      objAdd[change.carid] = "";
      objRemove[change.carid] = false;
      haveRemove = true;
    };
  });

  return {
            objAdd,
            objRemove,
            haveAdd,
            haveRemove,
            haveChanges: (haveAdd || haveRemove)
          };
};

const calculateSumChanges = ( objStepIdWithCarIds, objChanges ) => {

  let haveChanges = false;

  let arrCarChanges = Object.keys(objChanges)
    .map( carid => ({carid, stepid: objChanges[carid] ? objChanges[carid].stepid : false }) );

  let objSumStepChanges = {};

  let newStepIds = { ...(arrCarChanges.filter( obj => obj.stepid )
                          .map( obj => obj.stepid )) );

  let objLoop = { ...(Object.keys(objStepIdWithCarIds)), ...newStepid };

  Object.keys(objLoop).forEach( stepid => {
    if ( !objStepIdWithCarIds[stepid]) {
      objSumStepChanges[stepid] = {};
      haveChanges = true;
    };
    
    let oldCarIds = objStepIdWithCarIds[stepid] || {};

    let midChangeForStep = intersectM1( arrCarChanges, stepid, oldCarIds );
    if (midChangeForStep.haveChanges) {
      haveChanges = true;
      // objSumStepChanges[stepid] = { 
      //                           ...objStepIdWithCarIds[stepid],
      //                           ...midChangeForStep.objAdd
      //                           };

      let newCarIds;// = {};
      if (midChangeForStep.haveRemove) {

        let objInit = midChangeForStep.haveAdd ? midChangeForStep.objAdd : {};
        newCarIds = Object.keys(oldCarIds).filter( carid => !(carid in midChangeForStep.objRemove) )
          .reduce( carid => {
            return oldCarIds[carid];
          }, objInit );

      }else { //if (midChangeForStep.haveAdd) {  
        newCarIds = { 
                    ...oldCarIds,
                    ...midChangeForStep.objAdd
                    };
      };
      objSumStepChanges[stepid] = newCarIds;

    };
  });

  return {
    Changes: objSumStepChanges, 
    haveChanges;
  };
};


const initialState =  { 
// //    "step02": { 
// //      "a001bc": "",
// //      "d007ef": "",
// //      "d007ee": ""
// //            }
  }

export default function stepsWithCars(state = initialState, action) {

  switch (action.type) {

    case 'message_fullstate':

      let newCars = action.data.cars;

//      let oldState = {};
      let oldState;
      if (0 < Object.keys(state).length) {
        oldState = {};
      }else{
        oldState = state;
      };

      let res = calculateSumChanges( oldState, newCars );
      if (res.haveChanges) {
//        return { ...oldState, ...res.Changes };
        return res.Changes;
      }else{
        return oldState;
      };

      return calculateS( oldCarIdAndStepId, oldStepIdAndCars, newCars);

    case 'message_update':

      let newCars = action.data.cars;

      let oldState = state || {};

      let res = calculateSumChanges( oldState, newCars );
      if (res.haveChanges) {
        return { ...oldState, ...res.Changes };
      }else{
        return oldState;
      };
      
    default:
      return state
  }
}
