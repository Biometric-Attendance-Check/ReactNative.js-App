import React, {useState, useEffect} from 'react'
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

    const [text, setText] = useState(props.text)
    const [isAttendance, setIsAttendace] = useState()
    const [reason, setReason] = useState()

    useEffect(() => {
        props.subText === '-' ? setText('-') : {}
    }, [])

    const prompt = () => {
        let epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString()
        let payload = epochTimeSeconds + 'some message'

        props.ReactNativeBiometrics.createSignature({
            promptMessage: 'Sign in',
            payload: payload
        }).then((resultObject) => {
            // const { success, signature, error } = resultObject
            
            if(text === '등교' || text === '하교'){
                InOut()
            } else if(text === '외출'){
                setIsAttendace(false)
                
                // 외출
            } else {
                console.log('-')
            }
        })
    }


    const InOut = async () => {
        // 기기 정보를 보냈을 때 정보가 일치하면 그 아이디로 로그인
        await axios.post(`http://13.209.70.126/app/fingerPrint_app.php`, {
            "userDevice":props.uid,
        }).then((res) => {
            props.setUserData(res.data)

            text === '등교'
            ? Alert.alert('등교했습니다.')
            : Alert.alert('집에 갑시다!')

            // 하교 한 이후
            res.data.out_time != null
            ? props.setSchool('-')
            // 등교인지 하교인지
            : res.data.in_time == null
            ? props.setSchool('등교')
            : props.setSchool('하교')
        })
    }

    return (
        <View style={styles.flexGrey}>
            <TouchableOpacity style={styles.bioTouch} onPress={prompt}>
                <Text style={styles.bioText}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default InOut