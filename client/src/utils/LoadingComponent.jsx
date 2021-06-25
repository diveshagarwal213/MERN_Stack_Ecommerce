const LoadingComponent = (props) => {
    let message;
    if(props.message){
        message = props.message
    }else{
        message = "loading";
    }
    return (
        <div className="loading_div" >
            <h1>{message}</h1>
        </div>
    )
}

export default LoadingComponent;