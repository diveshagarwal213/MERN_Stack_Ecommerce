const AppDataReducer = (state, action) => {
    const type = action.type;
    const Resultdata = action.data;
    switch (type) {
        case 'SET_CAT_AND_FLAV':
            return state = {
                ...state,
                defaultCategories : Resultdata.Categories,
                defaultFlavors : Resultdata.Flavors,
            }

        case 'SET_NEW_PRODUCTS':
            
            return state = {
                ...state,
                newProducts: action.data
            }
    
        default:
            return state;
    }
};

export default AppDataReducer;