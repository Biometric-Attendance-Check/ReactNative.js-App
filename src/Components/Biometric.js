import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Image, Button } from 'react-native'
import ReactNativeBiometrics from 'react-native-biometrics'
import deny from '../assets/deny.png'

const styles = StyleSheet.create({
    textTitle: {
        display: 'flex',
        alignSelf: 'center',
        fontSize: 20,
        margin: 10,
    },
})

const Biometric = () => {
    const [isReady, setIsReady] = useState(false)
    const [test, setTest] = useState('none')

    useEffect(() => {
        
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
        

        // ReactNativeBiometrics.createKeys('Confirm fingerprint').then((resultObject) => {
        //     const {publicKey} = resultObject
        //     console.log(publicKey)
        // })


        ReactNativeBiometrics.biometricKeysExist().then((resultObject) => {
            const { keysExist } = resultObject
            if (keysExist) {
                console.log('Keys Exist')
            } else {
                console.log('Keys do not exist or were deleted')
            }
        })


        // ReactNativeBiometrics.deleteKeys().then((resultObject) => {
        //     const { keysDeleted } = resultObject
        //     if (keysDeleted) {
        //         console.log('Successful deletion')
        //     } else {
        //         console.log('Unsuccessful deletion because there were no keys to delete')
        //     }
        // })


        let epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString()
        let payload = epochTimeSeconds + 'some message'

        ReactNativeBiometrics.createSignature({
            promptMessage: 'Sign in',
            payload: payload
        }).then((resultObject) => {
            const { success, signature } = resultObject
            console.log(success, signature)
            if (success) {
                console.log(signature)
                // verifySignatureWithServer(signature, payload)
            } 
        })


        // ReactNativeBiometrics.simplePrompt({promptMessage: 'Confirm fingerprint'}).then((resultObject) => {
        //     const { success } = resultObject
        //     if (success) {
        //         console.log('successful biometrics provided')
        //     } else {
        //         console.log('user cancelled biometric prompt')
        //     }
        // }).catch(() => {
        //     console.log('biometrics failed')
        // })

    }, [])


    const makeKey = () => {
        ReactNativeBiometrics.createKeys('Confirm fingerprint').then((resultObject) => {
            const {publicKey} = resultObject
            console.log(publicKey)
        })
    }

    const deleteKey = () => {
        ReactNativeBiometrics.deleteKeys().then((resultObject) => {
            const { keysDeleted } = resultObject
            if (keysDeleted) {
                console.log('Successful deletion')
            } else {
                console.log('Unsuccessful deletion because there were no keys to delete')
            }
        })
    }
    
    return (
        <View>
            <Text style={styles.textTitle}> Biometrics </Text>
            {isReady
            ? <>
            <Text>true</Text>
            <Text>{test}</Text>
            <Button title='Make Key' onPress={makeKey}/>
            <Button title='Delete Key' onPress={deleteKey}/>
            </>
            : <>
            <Image source={deny}></Image>
            <Text>생체 인식 시스템을 확인해주세요.</Text>
            </>}
        </View>
    )
}

export default Biometric

