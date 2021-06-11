const shopProductReducer = (state, action) => {
    const type = action.type;
    if(type === 'FETCH_UP'){
        state = {
            loading: false,
            productdata: action.data,
            error: ''
        }
        //console.log(state);
        return state;

    }else if(type === 'FETCH_DOWN'){
        state = {
            loading: false,
            productdata: [],
            error: 'somthing went wrong'
        }
        //console.log(state);
        return state
    }else{
        return state
    }
}

export default shopProductReducer;