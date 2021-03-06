import React, { createContext, useState, useMemo } from 'react'

const TestContext = createContext(null);

const TestContextProvider = ({ children }) => {
    
    const [userData, setUserData] = useState({
        "flag_mobile": false,
        "std_name": "",
        "in_time": "",
        "out_time": "",
        "outgoing_time": "",
        "out_list": [],
    })
    const [statusText, setStatusText] = useState('등교')
    const [isLogin, setIsLogin] = useState(false)

    
    // useEffect(() => {
        
    // }, [])

    const value = {
        userData: useMemo(() => userData, [userData]),
        setUserData: useMemo(() => setUserData, [setUserData]),
        statusText: useMemo(() => statusText, [statusText]),
        setStatusText: useMemo(() => setStatusText, [setStatusText]),
        isLogin: useMemo(() => isLogin, [isLogin]),
        setIsLogin: useMemo(() => setIsLogin, [setIsLogin]),
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