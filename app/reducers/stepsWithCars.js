//import { UPDATE_ALL, UPDATE_AUTO } from '../constants/ActionTypes'

const initialState =  {
//    "step02": { 
//      "a001bc": { autoid: "a001bc", stepid: "01", timestamp: 1002 },
//      "d007ef": { autoid: "d007ef", stepid: "01", timestamp: 1000 },
//      "d007ee": { autoid: "d007ee", stepid: "02", timestamp: 1003 }
//            }
    }

export default function stepsWithCars(state = initialState, action) {

  switch (action.type) {

    case 'message':

      let cars = action.data.cars;

      let stepToDo = {};
      let carToRemove = [];
      cars.forEach( car => {
        if (!car.stepid) {
          carToRemove.push(car);
          return;
        };
        if (car.stepid in stepToDo) {
          stepToDo.[car.stepid]["add"].push(car);
        }else{
          stepToDo.[car.stepid] = {"add":[car],"remove":[]};
        }
      } );

      Object.keys(state).forEach( stepid => {
        carToRemove.forEach( car => {
          if (car.carid in state[stepid]) {

            if (stepid in stepToDo) {
              stepToDo.[stepid]["remove"].push(car.carid);
            }else{
              stepToDo.[stepid] = {"add":[],"remove":[car.carid]};
            }
          }
        });

        Object.keys(stepToDo).forEach( stepidAdd => {
          if (stepidAdd != stepid) {
            let carToRemove2 = stepToDo.[stepidAdd]["add"];
            carToRemove2.forEach( car => {
              if (car.carid in state[stepid]) {

                if (stepid in stepToDo) {
                  stepToDo.[stepid]["remove"].push(car.carid);
                }else{
                  stepToDo.[stepid] = {"add":[],"remove":[car.carid]};
                }
              }
            });
          }
        });
      });



      Object.keys(stepToDo).forEach( stepidToDo => {

        let arrToRemove = stepToDo[stepidToDo]["remove"];
        let arrToAdd = stepToDo[stepidToDo]["add"];

        let carsFiltered = {};
        if (stepidToDo in state) {
//          cars = { ...state[stepidToDo] };
          let cars0 = state[stepidToDo];

          if (arrToRemove) {        
            let arrCarsId = Object.keys(cars0).filter( carid => !arrToRemove.includes(carid) );

            carsFiltered = arrCarsId.reduce( (objSum,carid) => {
                                          objSum[carid] = cars0[carid];
                                          return objSum
                                        }, {} );
          }else{
//            cars = {...cars0};
            carsFiltered = cars0;
          };
        };

        let cars = carsFiltered;
        if (arrToAdd) {        
          let carsAdd = arrToAdd.reduce( (objSum,car) => {
                                        objSum[car.carid] = car;
                                        return objSum
                                      }, {} );
          cars = {...carsFiltered, ...carsAdd};
        };


//        newStateAdd = { ...newStateAdd, stepidToDo: cars };
        stepToDo[stepidToDo]["cars"] = cars;
      });

      let newStateAdd = Object.keys(stepToDo).reduce( (objSum,stepToDoId) => {
                                    objSum[stepToDoId] = stepToDo[stepToDoId]["cars"];
                                    return objSum
                                  }, {} );
      let newState = { ...state, ...newStateAdd };

      return newState;

    default:
      return state
  }
}
