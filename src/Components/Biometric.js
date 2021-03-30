import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ReactNativeBiometrics from 'react-native-biometrics'

const styles = StyleSheet.create({

})

const Biometric = () => {

    const [tempValue, setTempValue] = useState('none')

    ReactNativeBiometrics.isSensorAvailable()
    .then((resultObject) => {
        const { available, biometryType } = resultObject

        console.log(available, biometryType)

        if (available && biometryType === ReactNativeBiometrics.TouchID) {
        console.log('TouchID is supported')
        setTempValue('TouchID')
        } else if (available && biometryType === ReactNativeBiometrics.FaceID) {
        console.log('FaceID is supported')
        setTempValue('FaceID')
        } else if (available && biometryType === ReactNativeBiometrics.Biometrics) {
        console.log('Biometrics is supported')
        setTempValue('biometry')
        } else {
        console.log('Biometrics not supported')
        setTempValue('NNNNNNNNNNNOOOOOOO')
        }
        
    })
    
    return (
        <View>
            <Text> Biometrics </Text>
            <Text> {tempValue} </Text>
        </View>
    )
}

export default Biometric

