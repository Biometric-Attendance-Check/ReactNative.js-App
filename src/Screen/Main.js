import React, {useState, useEffect} from 'react'
import { StyleSheet, View, Text, Dimensions, Image } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"; 
import ReactNativeBiometrics from 'react-native-biometrics'

import Biometric from '../Components/Biometric'
import ErrorScreen from '../Components/ErrorScreen'
import YJ from '../assets/yeungjin.png'

const { width, height } = Dimensions.get("window");

const Main = (props) => {
    const [isReady, setIsReady] = useState(false)
    const [userData, setUserData] = useState()

    // const deleteKey = () => {
    //     ReactNativeBiometrics.deleteKeys().then((resultObject) => {
    //         const { keysDeleted } = resultObject
    //         if (keysDeleted) {
    //             console.log('Successful deletion')
    //         } else {
    //             console.log('Unsuccessful deletion because there were no keys to delete')
    //         }
    //     })
    // }

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

        ReactNativeBiometrics.biometricKeysExist().then((resultObject) => {
            const { keysExist } = resultObject
            if (keysExist) {
                console.log('Keys Exist')
            } else {
                ReactNativeBiometrics.createKeys('Confirm fingerprint').then((resultObject) => {
                    const {publicKey} = resultObject
                    console.log(publicKey)
                })
            } 
        })

        console.log(props.data)

        setUserData(props.data)
    }, [])


    return (
        <View style={styles.flexWhite}>
            <Text style={styles.Title}>3WDJ 지문인식</Text>
            {isReady
            ? <>
            <Image style={styles.yjImage} source={YJ} resizeMode={'contain'}/>
            <View style={styles.flexTop}>
                {/* 출결 현황 */}
                <Text style={styles.textContents}>{userData.name}</Text>
                <Text style={styles.userText}>입실 시간 : {userData.in_time}</Text>
                <Text style={styles.userText}>퇴실 시간 : {userData.out_time}</Text>
            </View>
            <View style={styles.flexBottom}>
                <Biometric width={width} text='출석 체크'
                    ReactNativeBiometrics={ReactNativeBiometrics}/>
            </View>
            </>
            : <ErrorScreen width={width}/>}
            
        </View>
    )
}


export default Main



const styles = StyleSheet.create({
    Title: {
        display: 'flex',
        marginTop: getStatusBarHeight()+height*0.01,
        marginLeft: width*0.05,
        fontSize: width*0.06,
        fontWeight: 'bold',
    },
    flexTop: {
        display: 'flex',
        flex: 3,
        margin: width*0.05,
        marginBottom: 0,
        borderRadius: 15,
        backgroundColor: 'rgb(225,224,255)',
    },
    flexBottom: {
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
        padding: 10,
        paddingBottom: 20,
    },
    textTitle: {
        display: 'flex',
        alignSelf: 'center',
        fontSize: 20,
        margin: 10,
    },
    textContents: {
        margin: 30,
        fontSize: 24,
    },
    userText: {
        marginLeft: 30,
        marginBottom: 10,
        fontSize: 16,
    },
    yjImage: {
        width: width*0.8,
        height: height*0.3,
        alignSelf: 'center',
    }
});