import React from "react"
import { usePromiseTracker} from "react-promise-tracker";
import Loader from 'react-loader-spinner';

const LoadingIndicator = prop => {
    const { promiseInProgress } = usePromiseTracker();

   return (
       promiseInProgress && 
       <div
      style={{
        position: "fixed", top: "50%", left: "48%",
        'zIndex': 5,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
    </div>
  );  
}

export default LoadingIndicator