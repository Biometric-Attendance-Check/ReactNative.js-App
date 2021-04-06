import React, { useState, useEffect } from 'react'
import { StatusBar } from 'react-native'
import Main from './src/Screen/Main'
import Login from './src/Screen/Login'

import axios from 'axios'
import DeviceInfo from 'react-native-device-info'

const Root = () => {

    const [bool, setBool] = useState(false)
    const [uniqueId, setUniqueId] = useState()
    const [data, setData] = useState()

    // 디바이스 값을 서버에 보내서 디비에 존재하면 그 아이디로 로그인
    // 존재하지 않으면 디바이스 값이랑 아이디랑 매칭 후 디비에 저장 후 로그인
    useEffect(() => {
        setUniqueId(DeviceInfo.getUniqueId())
        // console.log(DeviceInfo.getUniqueId())
    }, [])

    return (
        <>
        <StatusBar barStyle="dark-content" />
        {bool
        ? <Main data={data}/>
        : <Login setBool={setBool} uniqueId={uniqueId} setData={setData}/>}
        </>
    )
}

export default Root
