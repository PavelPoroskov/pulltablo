
const intersectSets = (arrChanges, stepid, objStepCars) => {

  let objAdd = {};
  let objRemove = {};
//  let objChange = {};

  let haveAdd = false;
  let haveRemove = false;

  arrChanges.forEach( change => {
    if (change.stepid == stepid) {
//      objAdd[change.carid] = true;
      objAdd[change.carid] = change;
//      objChange[change.carid] = true;
      haveAdd = true;
    }else if (change.carid in objStepCars) {
//      objAdd[change.carid] = "";
      objRemove[change.carid] = false;
      haveRemove = true;
//      objChange[change.carid] = false;
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

  let objSumStepChanges = {};
  let haveChanges = false;

  let arrCarChanges = Object.keys(objChanges)
    .map( carid => ({
      carid, 
      stepid: objChanges[carid] ? objChanges[carid].stepid : false,
//      sort: objChanges[carid] ? objChanges[carid].timestamp : 0
      sort: objChanges[carid] ? objChanges[carid].time_update : 0
    }) );

  // let newStepIds = { ...(arrCarChanges.filter( obj => obj.stepid )
  //                         .map( obj => obj.stepid )) );

  // let objLoop = { ...(Object.keys(objStepIdWithCarIds)), ...newStepid };

  // Object.keys(objLoop).forEach( stepid => {
    // if ( !objStepIdWithCarIds[stepid]) {
    //   objSumStepChanges[stepid] = {};
    //   haveChanges = true;
    // };

//    let oldCarIds = objStepIdWithCarIds[stepid] || {};

  Object.keys(objStepIdWithCarIds).forEach( stepid => {
    
    let oldCars = objStepIdWithCarIds[stepid];

    let midChangeForStep = intersectSets( arrCarChanges, stepid, oldCars );
    if (midChangeForStep.haveChanges) {
      haveChanges = true;
      // objSumStepChanges[stepid] = { 
      //                           ...objStepIdWithCarIds[stepid],
      //                           ...midChangeForStep.objChange
      //                           };

      let newCars;// = {};
      if (midChangeForStep.haveRemove) {

        let objInit = midChangeForStep.haveAdd ? midChangeForStep.objAdd : {};

        newCars = Object.keys(oldCars)
          .filter( carid => !(carid in midChangeForStep.objRemove) )
          .reduce( (objSum, carid) => {
            objSum[carid] = oldCars[carid];
            return objSum;
          }, objInit );

      }else { //if (midChangeForStep.haveAdd) {  
        newCars = { 
                    ...oldCars,
                    ...midChangeForStep.objAdd
                    };
      };

      objSumStepChanges[stepid] = newCars;
    };
  });

  return {
    Changes: objSumStepChanges, 
    haveChanges
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

  let cars;
  let res;

  switch (action.type) {

    case 'message_fullstate':

      cars = action.data.cars;
      let steps = action.data.steps;

      if (!steps) {
        return initialState
      };

//        let newState = { ...steps.map( step => ({  [step.stepid]: {}  })  )  };

      let newState = steps.reduce( (objSum, step) => {
        objSum[step.stepid] = {};
        return objSum; 
      }, {} )

      res = calculateSumChanges( newState, cars );

      if (res.haveChanges) {
        return { ...newState, ...res.Changes };
//          return res.Changes;
      }else{
        return newState;
      };

    case 'message_update':

      cars = action.data.cars;

      let oldState = state || initialState;

      res = calculateSumChanges( oldState, cars );
      if (res.haveChanges) {
        return { ...oldState, ...res.Changes };
      }else{
        return oldState;
      };
      
    default:
      return state
  }
}
