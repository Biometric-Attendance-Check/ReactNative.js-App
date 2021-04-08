import React, {useState, useEffect} from 'react'
import { StyleSheet, View, Text, Dimensions, Image, Platform, PermissionsAndroid, ScrollView, Alert } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import ReactNativeBiometrics from 'react-native-biometrics'
import WifiManager from "react-native-wifi-reborn"


import Biometric from '../Components/Biometric'
import ErrorScreen from '../Components/ErrorScreen'
import YJ from '../assets/yeungjin.png'

const { width, height } = Dimensions.get("window");

const Main = (props) => {
    const [isReady, setIsReady] = useState(false)
    const [userData, setUserData] = useState()

    const wifi = () => {
        WifiManager.connectToProtectedSSID('YJU-BON200-5G', 'bon200!@#', false).then(
            () => {
                console.log("Connected successfully!");
            },
            (err) => {
                console.log("Connection failed!");
                console.log('err',err)
            }
        );
        WifiManager.getCurrentWifiSSID().then(
            (ssid) => {
                Alert.alert("ssid : ", ssid)
                console.log(ssid)
            },
            (err) => {
                console.log("Cannot get current SSID!")
                console.log(err)
            }
        )
        console.log(WifiManager)
    }

    useEffect(() => {
        // 휴대폰 가로 세로 길이
        console.log(width, height)
        wifi()
        if(Platform.OS === 'ios'){

        } else {
            const granted = PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location permission is required for WiFi connections',
                    message:
                    'This app needs location permission as this is required  ' +
                    'to scan for wifi networks.',
                    buttonNegative: 'DENY',
                    buttonPositive: 'ALLOW',
                },
            );
            // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //     // You can now use react-native-wifi-reborn
            // } else {
            //     // Permission denied
            // }
            console.log(granted)
        }

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

        // console.log(props.data)

        setUserData(props.data)
        props.setLoading(false)
    }, [])


    return (
        <View style={styles.flexWhite}>
            <Text style={styles.Title}>3WDJ 지문인식</Text>
            {isReady
            ? <>
            <Image style={styles.yjImage} source={YJ} resizeMode={'contain'}/>
            <ScrollView style={styles.flexTop}>
                {/* 출결 현황 */}
                <Text style={styles.textContents}>{userData.std_name}</Text>
                <Text style={styles.userText}>입실 시간 : {userData.in_time}</Text>
                <Text style={styles.userText}>퇴실 시간 : {userData.out_time}</Text>

                <Text style={styles.userText}>외출 시간 : {}</Text>
            </ScrollView>
            
            <View style={styles.flexBottom}>
                <Biometric width={width} text='출석 체크' setUserData={setUserData} userData={userData}
                    ReactNativeBiometrics={ReactNativeBiometrics} uid={props.uid}/>
                    {/* {Alert.alert(props.uid)} */}
            </View>
            <View style={styles.flexBottom}>
                <Biometric width={width} text='외 출' setUserData={setUserData}
                    ReactNativeBiometrics={ReactNativeBiometrics} uid={props.uid}/>
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
        flexGrow: 3,
        margin: width*0.05,
        borderRadius: 15,
        backgroundColor: 'rgb(225,224,255)',
    },
    flexBottom: {
        display: 'flex',
        flex: 1,
        marginBottom: width*0.05,
        marginHorizontal: width*0.05,
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