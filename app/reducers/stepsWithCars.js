
const intersectSets = (arrChanges, stepid, objStepCars) => {

  let objAdd = {};
  let objRemove = {};
//  let objChange = {};

  let haveAdd = false;
  let haveRemove = false;

  arrChanges.forEach( change => {
    if (change.stepid == stepid) {
      objAdd[change.carid] = true;
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
    .map( carid => ({carid, stepid: objChanges[carid] ? objChanges[carid].stepid : false }) );

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
    
    let oldCarIds = objStepIdWithCarIds[stepid];

    let midChangeForStep = intersectSets( arrCarChanges, stepid, oldCarIds );
    if (midChangeForStep.haveChanges) {
      haveChanges = true;
      // objSumStepChanges[stepid] = { 
      //                           ...objStepIdWithCarIds[stepid],
      //                           ...midChangeForStep.objChange
      //                           };

      let newCarIds;// = {};
      if (midChangeForStep.haveRemove) {

        let objInit = midChangeForStep.haveAdd ? midChangeForStep.objAdd : {};

        newCarIds = Object.keys(oldCarIds)
          .filter( carid => !(carid in midChangeForStep.objRemove) )
          .reduce( (objSum, carid) => {
            objSum[carid] = true;
            return objSum;
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

export default function stepIdsWithCarIds(state = initialState, action) {

  switch (action.type) {

    case 'message_fullstate':

      let cars = action.data.cars;
      let steps = action.data.steps;

      if (!steps) {
        return initialState
      };


//        let newState = { ...steps.map( step => ({  [step.stepid]: {}  })  )  };

      let newState = steps.reduce( (objSum, step) => {
        objSum[step.stepid] = {};
        return objSum; 
      }, {} )

      let res = calculateSumChanges( newState, cars );

      if (res.haveChanges) {
        return { ...newState, ...res.Changes };
//          return res.Changes;
      }else{
        return newState;
      };

    case 'message_update':

      let cars = action.data.cars;

      let oldState = state || initialState;

      let res = calculateSumChanges( oldState, cars );
      if (res.haveChanges) {
        return { ...oldState, ...res.Changes };
      }else{
        return oldState;
      };
      
    default:
      return state
  }
}
