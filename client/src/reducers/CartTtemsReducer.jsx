const setlocalstorage =  (state) => {
    localStorage.setItem('cartstate', JSON.stringify({state}));
    //console.log({state});
};

const reducer = (state, action) => {
    const product = action.product;
    

    if (action.type === 'onAdd') { //add item to cart if already preasent then + qty 1
        const exist = state.find(x => x.pid === product.pid);
       
        if (exist) {
            return state = state.map(x => x.pid === product.pid ? { ...exist, qty: exist.qty + 1 } : x)
        } else {
            state = [...state, { ...product, qty: 1 }];
            setlocalstorage(state);
            return state   
        }
        
    } else if (action.type === 'onRemove') { //remove qty to -1 if 1 then remove tiem  
        const exist = state.find(x => x.pid === product.pid);
        if (exist.qty === 1) {

            state = state.filter(x => x.pid !== product.pid)
            setlocalstorage(state);
            return state

        } else {
            return state = state.map(x => x.pid === product.pid ? { ...exist, qty: exist.qty - 1 } : x)
        }
    }else if(action.type === 'onDelete'){
        state = state.filter(x => x.pid !== product.pid)
        setlocalstorage(state);
        return state;
    }else if(action.type === 'EMPTY'){
        return state = [];
    } else {
        return state
    }
}

export default reducer;