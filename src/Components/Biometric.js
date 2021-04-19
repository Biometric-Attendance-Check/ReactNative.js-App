import React, {useContext} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert, Dimensions} from 'react-native'
import axios from 'axios'
import TestContext from '../Utils/TestContextProvider'

const { width, height } = Dimensions.get("window");

const Biometric = (props) => {

    const styles = StyleSheet.create({
        flexGrey: {
            display: 'flex',
            flex: 1,
            margin: props.width*0.05,
            borderRadius: 10,
        },
        bioTouch: {
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        bioText: {
            fontSize: width*0.06,
        },
    })

    const {setUserData, statusText} = useContext(TestContext)

    const prompt = () => {
        let epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString()
        let payload = epochTimeSeconds + 'some message'

        props.ReactNativeBiometrics.createSignature({
            promptMessage: 'Sign in',
            payload: payload
        }).then((resultObject) => {
            const { success, signature, error } = resultObject
            if(success){
                if(props.text == null && (statusText === '등교' || statusText === '하교')){
                    InOut()
                } else if(props.text == '외출' && statusText === '하교'){
                    props.setOutGoingPage(true)
                }
            } else {
                Alert.alert("생체인식 실패")
            }
        })
    }


    const InOut = async () => {
        // 기기 정보를 보냈을 때 정보가 일치하면 출석체크
        await axios.post(`http://13.209.70.126/app/fingerPrint_test.php`, {
            "userDevice":props.uid,
        }).then((res) => {
            // if(res.data.access == false){
            //     // Alert.alert("삐빅.. 와이파이가 다릅니다..\nYJU-BON***_5G에 연결해주세요.")
            // } else{
                setUserData(res.data)

                statusText === '등교'
                ? Alert.alert('등교했습니다.')
                : Alert.alert('집에 갑시다!')
            // }
        })
    }

    const stop = () => {
        Alert.alert('이미 귀가 하셨습니다.')
    }

    const ipCheck = async () => {
        await axios.post(`http://13.209.70.126/app/ip_check_app.php`).then(res => {
            if(res.data.access == true){
                prompt()
            } else{
                Alert.alert("삐빅.. 와이파이가 다릅니다..\nYJU-BON***_5G에 연결해주세요.")
            }
        })
    }

    return (
        <View style={styles.flexGrey}>
            <TouchableOpacity style={styles.bioTouch} onPress={(statusText != 'x') ? ipCheck : stop}>
                <Text style={styles.bioText}>{props.text?props.text:statusText}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Biometric