import { useEffect } from "react";

function useDocTitle(name) {
    useEffect(() =>{
        document.title = `${name} CityCakes`
    },[name])
}

export default useDocTitle;