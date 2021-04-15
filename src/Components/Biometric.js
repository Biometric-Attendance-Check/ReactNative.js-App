import React, {useState, useEffect, useContext} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native'
import axios from 'axios'
import TestContext from '../Utils/TestContextProvider'



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
            fontSize: 24,
            
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
            // const { success, signature, error } = resultObject
            InOut()
        })
    }


    const InOut = async () => {
        // 기기 정보를 보냈을 때 정보가 일치하면 그 아이디로 로그인
        await axios.post(`http://13.209.70.126/app/fingerPrint_app.php`, {
            "userDevice":props.uid,
        }).then((res) => {
            setUserData(res.data)

            statusText === '등교'
            ? Alert.alert('등교했습니다.')
            : Alert.alert('집에 갑시다!')
        })
    }

    return (
        <View style={styles.flexGrey}>
            <TouchableOpacity style={styles.bioTouch} onPress={prompt}>
                <Text style={styles.bioText}>{props.text?props.text:statusText}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Biometric