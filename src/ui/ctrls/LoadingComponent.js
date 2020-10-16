import React from 'react'
const LoadingComponent = ({ isVisible }) => 
<>
    {
        isVisible ?     
        <div className="loading-component-container">
            <div />
        </div> : null
    }
</>

export default LoadingComponent