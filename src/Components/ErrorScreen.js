import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

import deny from '../assets/deny.png'

const ErrorScreen = (props) => {

    const styles = StyleSheet.create({
        errorBox: {
            display: 'flex',
            flex: 1,
            margin: props.width*0.05,
            borderRadius: 15,
            backgroundColor: 'rgb(210,210,210)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        errorText: {
            fontSize: 26,
            fontWeight: 'bold',
        },
        errorImage: {
            width: 60,
            height: 60,
        },
    })

    return (
        <View style={styles.errorBox}>
            <Image style={styles.errorImage} source={deny}></Image>
            <Text style={styles.errorText}>생체 인식 시스템을</Text>
            <Text style={styles.errorText}>등록하고 다시 실행해주세요</Text>
        </View>
    )
}

export default ErrorScreen