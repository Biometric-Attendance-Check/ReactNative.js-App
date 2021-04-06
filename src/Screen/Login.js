import React from 'react'
import { StyleSheet, View, Text, Dimensions, TextInput, TouchableOpacity } from 'react-native'

import axios from 'axios'

const { width, height } = Dimensions.get("window");

const Login = (props) => {

    const fetchLogin = async () => {
        await axios.post(`http://13.209.70.126/app/login_check_app.php`, {
            'userID':'28', 'userDevice':props.uniqueId
        })
        .then((res) => {
            props.setData(res.data)
            props.setBool(true)
        })
    }

    return (
        <View style={styles.flexWhite}>
            <View style={styles.login}>
                <TextInput style={styles.input}></TextInput>
                <TouchableOpacity onPress={fetchLogin}><Text>Login</Text></TouchableOpacity>
            </View>
        </View>
    )
}

export default Login


const styles = StyleSheet.create({
    flexWhite: {
        display: 'flex',
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    login: {
        display: 'flex',
        width: width*0.85,
        height: height*0.3,
        backgroundColor: 'rgb(188,224,255)',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        display: 'flex',
        width: width*0.7,
        height: height*0.06,
        borderBottomWidth: 1,
        borderRadius: width,
        margin: height*0.01,
    }
})