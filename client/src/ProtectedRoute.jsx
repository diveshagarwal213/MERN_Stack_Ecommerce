import React from 'react';
import { Redirect, Route } from "react-router";

function ProtectedRoute({ component: Component, ...rest }) {

    var isLogin = localStorage.getItem('isLogin');
    const accesstoken = localStorage.getItem('accessToken');
    const rootuser = localStorage.getItem('rootUser');
    if(!rootuser || !accesstoken) isLogin = false;
    
    return(
        <Route 
            {...rest}
            render={(props) => {
                if(isLogin) {
                    return <Component/>;
                }else{
                    return <Redirect to={{pathname: '/login', state: { from: props.location}}} />;
                }
            }}
        
        />
    );
};

export default ProtectedRoute;
