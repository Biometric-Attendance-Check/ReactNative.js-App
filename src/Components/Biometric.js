import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native'
import axios from 'axios'

const InOut = (props) => {

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
            fontSize: 24,
            
        },
    })

    

    const prompt = () => {
        let epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString()
        let payload = epochTimeSeconds + 'some message'

        props.ReactNativeBiometrics.createSignature({
            promptMessage: 'Sign in',
            payload: payload
        }).then((resultObject) => {
            const { success, signature, error } = resultObject
            // 지문인식 완료 후 서버에서 데이터 불러오기
            if(props.text !== '외 출' && props.userData.out_time == null){
                InOut()
                // Alert.alert(JSON.stringify(success))
                Alert.alert('출석체크 완료')
            }
        })
    }


    const InOut = async () => {
        // 기기 정보를 보냈을 때 정보가 일치하면 그 아이디로 로그인
        await axios.post(`http://13.209.70.126/app/fingerPrint_app.php`, {
            "userDevice":props.uid
        }).then((res) => {
            props.setUserData(res.data)
        })
    }

    return (
        <View style={styles.flexGrey}>
            <TouchableOpacity style={styles.bioTouch} onPress={prompt}>
                <Text style={styles.bioText}>{props.text}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default InOut