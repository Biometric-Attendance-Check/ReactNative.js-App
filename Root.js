import React, { useState } from 'react'
import { StatusBar } from 'react-native'
import Main from './src/Screen/Main'
import Login from './src/Screen/Login'

const Root = () => {

    const [bool, setBool] = useState(true)

    return (
        <>
        <StatusBar barStyle="dark-content" />
        {bool
        ? <Main setBool={setBool}/>
        : <Login setBool={setBool}/>}
        </>
    )
}

export default Root
