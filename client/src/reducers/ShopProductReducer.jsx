const shopProductReducer = (state, action) => {
    const type = action.type;
    if(type === 'FETCH_UP'){
        state = {
            ...state,
            loading: false,
            productdata: action.data,
            error: false
        }
        //console.log(state);
        return state;

    }else if(type === 'FETCH_DOWN'){
        state = {
            ...state,
            loading: true,
            productdata: [],
            error: true
        }
        //console.log(state);
        return state
    }else if(type === 'ADD_ON'){
        let arr = state.productdata;
        let arr2 = [...arr, ...action.data ]
        state = {
            ...state,
            loading: false,
            productdata: arr2,
            error: false
        }
        //console.log(state);
        return state;
    }else if(type === "HASNEXT"){
        return state ={
            ...state,
            hasNext : action.data
        }
    } else{
        return state
    }
}

export default shopProductReducer;