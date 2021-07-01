import React from 'react';
import { Redirect, Route } from "react-router";

function ProtectedRoute({ component: Component, ...rest }) {

    var isLogin = localStorage.getItem('isLogin');
    
    return(
        <Route 
            {...rest}
            render={(props) => {
                if(isLogin) {
                    return <Component/>;
                }else{
                    console.log(props.location);
                    return <Redirect to={{pathname: '/login', state: { from: props.location}}} />;
                }
            }}
        
        />
    );
};

export default ProtectedRoute;
