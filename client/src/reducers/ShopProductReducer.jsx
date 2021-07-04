const shopProductReducer = (state, action) => {
    const type = action.type;

    const Resultdata = action.data;
    if(Resultdata.data){
        
        var {next , products} = Resultdata.data;
        var hasNext, nextPage;
        
        products = products.map(row => {return { pid : row._id ,...row}});
        
        if(next){
            hasNext = true
            nextPage = next.page ;
        }else{
            hasNext = false;
            nextPage = state.nextPage ;
        }
    }

    if(type === 'SET_NEW_PRODUCTS'){
        state = {
            ...state,
            loading: false,
            productdata: products,
            error: false,
            hasNext : hasNext,
            nextPage : nextPage
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
    }else if(type === 'ADD_PRODUCTS'){
        let arr = state.productdata;
        let arr2 = [...arr, ...products ]
        state = {
            ...state,
            productdata: arr2,
            hasNext : hasNext,
            nextPage : nextPage
        }
        //console.log(state);
        return state;
    }else{
        return state
    }
}

export default shopProductReducer;