const SET_ACCOUNT = 'SET_ACCOUNT';
const SET_ZOMBIE_CONTRACT = 'SET_ZOMBIE_CONTRACT';
const reducer = (state,action)=> {
  switch(action.type){
    case SET_ACCOUNT:
      return {...state,currentAccount:action.currentAccount};
    case SET_ZOMBIE_CONTRACT:
      return {...state,zombieContract:action.zombieContract};
    case NETWORK:
      return {...state,network:action.network}
    default:
    return state;
  }
}
export default reducer;
