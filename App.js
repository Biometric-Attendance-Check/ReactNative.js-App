import React from 'react'
import Root from './Root'
import { TestContextProvider } from './src/Utils/TestContextProvider'

const App = () => {
    return (
        <TestContextProvider>
        <Root/>
        </TestContextProvider>
    )
}

export default App
