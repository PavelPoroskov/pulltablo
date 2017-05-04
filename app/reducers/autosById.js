//import { UPDATE_ALL, UPDATE_AUTO } from '../constants/ActionTypes'

const initialState =  { 
//      "a001bc": { autoid: "a001bc", stepid: "01", timestamp: 1002 },
//      "d007ef": { autoid: "d007ef", stepid: "01", timestamp: 1000 },
//      "d007ee": { autoid: "d007ee", stepid: "02", timestamp: 1003 }
    }

export default function autosById(state = initialState, action) {

  switch (action.type) {

    case 'message_fullstate':

      // let autosById = action.data.cars.reduce( (obj, item) => {
      //   obj[item.id] = item.stepid ? item : undefined;
      //   return obj
      // }, {});

      // return autosById;

      return action.data.cars;

    case 'message_update':
//      console.log( "autosById() message_update" );

      // let autosById = action.data.cars.reduce( (obj, item) => {
      //   obj[item.id] = item.stepid ? item : undefined;
      //   return obj
      // }, {});

      // return {
      //     ...state, 
      //     ...autosById
      //   };

      return {
          ...state, 
          ...action.data.cars
        };
      
    default:
      return state
  }
}
