import React, {useState} from 'react'
import { StyleSheet, View, Text, Dimensions, TextInput, TouchableOpacity, Image } from 'react-native'
import axios from 'axios'

import Character from '../assets/character.jpeg'

const { width, height } = Dimensions.get("window");

const Login = (props) => {

    const [auto, setAuto] = useState(false)

    const autoLogin = async () => {
        // 기기 정보를 보냈을 때 정보가 일치하면 그 아이디로 로그인

        setAuto(true)
    }

    const fetchLogin = async () => {
        await axios.post(`http://13.209.70.126/app/login_check_app.php`, {
            'userID':'40', 'userDevice':props.uniqueId
        })
        .then((res) => {
            props.setData(res.data)
            props.setBool(true)
        })
        setAuto(true)
    }

    return (
        <View style={styles.flexWhite}>
            <Image source={Character} />
            <View style={styles.login}>
            {/* <Text style={styles.loginText}>3WDJ 출석</Text> */}
                <TextInput style={styles.input} />
                <TouchableOpacity onPress={fetchLogin}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>
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
        borderBottomWidth: 2,
        margin: height*0.02,
    },
    loginText: {
        fontSize: 20,
        fontWeight: 'bold',
    }
})