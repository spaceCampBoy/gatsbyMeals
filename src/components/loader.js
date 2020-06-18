import React from "react"
import { usePromiseTracker } from "react-promise-tracker"
import Loader from "react-loader-spinner"
import LoadingOverlay from "react-loading-overlay"

const LoadingIndicator =  ({ children }) => {
  const { promiseInProgress } = usePromiseTracker()

  return ((
        <LoadingOverlay
          active={promiseInProgress}
          spinner
          text="Doing the hard work.."
        >
          {children}
        </LoadingOverlay>
    )
  )
  //  return (
  //      promiseInProgress &&
  //      <div
  //     style={{
  //       position: "fixed", top: "50%", left: "48%",
  //       'zIndex': 100,
  //       justifyContent: "center",
  //       alignItems: "center"
  //     }}
  //   >
  //     <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
  //   </div>
  // );
}

export default LoadingIndicator
