import React from 'react'
import { AppContext } from '../context'

export default ({
    children,
    ...rest
}) => {
    
    return (
        <AppContext.Provider {...rest} >
            {children}
        </AppContext.Provider>
    )
}