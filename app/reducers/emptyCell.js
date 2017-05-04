
const initialState =  { 
      carid: "",
      stepid: "",
//      pow(2,64) = 18 446 744 073 709 551 616
      timestamp: 18446744073709551615      
    }

export default function emptyCell(state = initialState, action) {

  return state;
}
