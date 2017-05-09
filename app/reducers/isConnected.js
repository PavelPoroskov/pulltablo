const initialState =  false

export default function isConnected(state = initialState, action) {

  switch (action.type) {

    case 'message_fullstate':
    	return true;

    case 'message_update':
    	return true;

    case 'disconnected':
    	return false;

    default:
      return state
  }
}