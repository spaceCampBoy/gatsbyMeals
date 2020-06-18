import React from "react"
import { usePromiseTracker } from "react-promise-tracker"
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
}

export default LoadingIndicator
