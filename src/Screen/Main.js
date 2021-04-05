import React, {useState, useEffect} from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"; 
import ReactNativeBiometrics from 'react-native-biometrics'

import Biometric from '../Components/Biometric'
import ErrorScreen from '../Components/ErrorScreen'

const { width, height } = Dimensions.get("window");

const Main = (props) => {
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        // 휴대폰 가로 세로 길이
        console.log(width, height)

        // 생체인식 기능 활성화 체크
        ReactNativeBiometrics.isSensorAvailable().then((resultObject) => {
            // available : 가능하면 true, 불가능하면 false
            // biometryType : TouchID or FaceID or Biometircs or undefined
            const { available, biometryType } = resultObject

            if (available && biometryType === ReactNativeBiometrics.TouchID) {
                console.log('TouchID is supported')
                setIsReady(true)
            } else if (available && biometryType === ReactNativeBiometrics.FaceID) {
                console.log('FaceID is supported')
                setIsReady(true)
            } else if (available && biometryType === ReactNativeBiometrics.Biometrics) {
                console.log('Biometrics is supported')
                setIsReady(true)
            } else {
                console.log('Biometrics not supported')
                setIsReady(false)
            }
        })
    }, [])

    return (
        <View style={styles.flexWhite}>
            <Text style={styles.flexText}>3WDJ 지문인식</Text>
            {isReady
            ? <>
            <View style={styles.flexRed}>
                {/* 출결 현황 */}
                
            </View>
            <View style={styles.flexBlue}>
                <Biometric width={width} text='입 실' ReactNativeBiometrics={ReactNativeBiometrics}/>
                <Biometric width={width} text='퇴 실' ReactNativeBiometrics={ReactNativeBiometrics}/>
            </View>
            </>
            : <ErrorScreen width={width}/>}
            
        </View>
    )
}


export default Main



const styles = StyleSheet.create({
    flexText: {
        display: 'flex',
        marginTop: getStatusBarHeight()+height*0.01,
        marginLeft: width*0.05,
        fontSize: width*0.06,
        fontWeight: 'bold',
    },
    flexRed: {
        display: 'flex',
        flex: 7,
        margin: width*0.05,
        marginBottom: 0,
        borderRadius: 15,
        backgroundColor: 'rgb(225,224,255)',
    },
    flexBlue: {
        display: 'flex',
        flexDirection: 'row',
        flex: 3,
        margin: width*0.05,
        borderRadius: 15,
        backgroundColor: 'rgb(188,224,255)',
    },
    flexWhite: {
        display: 'flex',
        backgroundColor: 'white',
        flex: 1,
    },
    textTitle: {
        display: 'flex',
        alignSelf: 'center',
        fontSize: 20,
        margin: 10,
    },
});