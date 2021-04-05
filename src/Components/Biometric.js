import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'

const InOut = (props) => {

    const styles = StyleSheet.create({
        flexGrey: {
            display: 'flex',
            flex: 1,
            margin: props.width*0.03,
            borderRadius: 10,
            backgroundColor: 'rgb(246,247,252)',
        },
        bioTouch: {
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        bioText: {
            fontSize: 24,
            fontWeight: 'bold',
        },
    })

    // ReactNativeBiometrics.biometricKeysExist().then((resultObject) => {
    //     const { keysExist } = resultObject
    //     if (keysExist) {
    //         console.log('Keys Exist')
    //     } else {
    //         console.log('Keys do not exist or were deleted')
    //     } 
    // })

    // const makeKey = () => {
    //     ReactNativeBiometrics.createKeys('Confirm fingerprint').then((resultObject) => {
    //         const {publicKey} = resultObject
    //         console.log(publicKey)
    //     })
    // }

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

    const prompt = () => {
        let epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString()
        let payload = epochTimeSeconds + 'some message'
        props.ReactNativeBiometrics.createSignature({
            promptMessage: 'Sign in',
            payload: payload
        }).then((resultObject) => {
            const { success, signature, error } = resultObject
            if (success) {
                // console.log(signature)
                verifySignatureWithServer(signature, payload)
                props.setTempText(successed)
            } else {
                // console.log(error)
                props.setTempText(failed)
            }
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