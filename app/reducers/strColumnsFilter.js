//import { UPDATE_ALL, UPDATE_AUTO } from '../constants/ActionTypes'

// const initialState = { 
// //      "01": { id: "01", title: "Приемка" }, 
// //      "02": { id: "02", title: "Мойка" }
//     };

const initialState = "";

export default function strColumnsFilter(state = initialState, action) {

  switch (action.type) {

    // case 'message':

    //   if (action.data.steps) {
    //     let stepsById =  action.data.steps.reduce( (obj, item) => {
    //       obj[item.id] = item;
    //       return obj
    //     }, {});

    //     // return {
    //     //   ...state,
    //     //   ...stepsById
    //     // }
    //     return stepsById;
    //   }else {
    //     return state
    //   };

    case 'set_filter':
      console.log('action.filter', action.filter );
      return action.filter;
//    case 'message_update':

    default:
      return state
  }
}
