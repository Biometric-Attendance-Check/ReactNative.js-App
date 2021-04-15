import React, { createContext, useState, useMemo, useEffect } from 'react'

const TestContext = createContext(null);

const TestContextProvider = ({ children }) => {

    const [statusText, setStatusText] = useState('등교')
    
    // useEffect(() => {
        
    // }, [])

    const value = {
        statusText: useMemo(() => statusText, [statusText]),
        setStatusText: useMemo(() => setStatusText, [setStatusText]),
    }
    
    return (
        <TestContext.Provider value={value}>
            {children}
        </TestContext.Provider>
    )
}


const { Consumer: TestContextConsumer } = TestContext

export {
    TestContextProvider,
    TestContextConsumer
};
export default TestContext;