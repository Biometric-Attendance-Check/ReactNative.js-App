import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native'

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

            Alert.alert(JSON.stringify(success))
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