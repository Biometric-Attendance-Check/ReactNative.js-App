import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, StatusBar, Image, Dimensions } from 'react-native'
import Main from './src/Screen/Main'
import Login from './src/Screen/Login'
import Loading from './src/assets/loading.png'

import axios from 'axios'
import DeviceInfo from 'react-native-device-info'
import TestContext from './src/Utils/TestContextProvider'


const { width, height } = Dimensions.get("window");

const Root = () => {

    const [uniqueId, setUniqueId] = useState()
    const {setUserData, setStatusText, isLogin, setIsLogin, isLoading, setIsLoading} = useContext(TestContext)

    // 기기 고유 값을 서버에 보내서 DB 와 비교 후 로그인 가능 여부
    const autoLogin = async () => {
        // 기기 정보를 보냈을 때 정보가 일치하면 그 아이디로 로그인
        await axios.post(`http://13.209.70.126/app/fast_login_check_app.php`, {
            "userDevice":uniqueId
        })
        .then((res) => {
            if(res.data.flag_mobile){
                // 자동 로그인 시
                setUserData(res.data)

                // 하교 한 이후
                res.data.out_time != null
                ? setStatusText('x')
                // 등교인지 하교인지
                : res.data.in_time == null
                ? setStatusText('등교')
                : setStatusText('하교')

                setIsLogin(true)
            } else{
                // 자동 로그인 불가 시
                setIsLoading(false)
            }
        })
    }

    // 디바이스 값을 서버에 보내서 디비에 존재하면 그 아이디로 로그인
    // 존재하지 않으면 디바이스 값이랑 아이디랑 매칭 후 디비에 저장 후 로그인
    useEffect(() => {
        setUniqueId(DeviceInfo.getUniqueId())
        return () => {}
    }, [])

    useEffect(() => {
        autoLogin()
        // return () => {}
    }, [uniqueId])

    return (
        <>
        <StatusBar barStyle="dark-content" />
        {isLoading
        ?<Image style={styles.imageLoading} source={Loading} resizeMode={'contain'}/>
        :isLogin
        ? <Main uid={uniqueId}/>
        : <Login uniqueId={uniqueId}/>
        }
        </>
    )
}

export default Root


const styles = StyleSheet.create({
    imageLoading: {
        width: width*0.1,
        height: height*0.1,
        alignSelf: 'center',
        marginTop: height*0.45,
    },
})