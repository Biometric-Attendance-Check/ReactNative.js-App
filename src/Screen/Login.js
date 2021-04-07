import React, {useState, useEffect} from 'react'
import { StyleSheet, View, Text, Dimensions, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import axios from 'axios'

import Character from '../assets/character.jpeg'

const { width, height } = Dimensions.get("window");

const Login = (props) => {

    const [idText, setIdText] = useState()

    // 기기 고유 값을 서버에 보내서 DB 와 비교 후 로그인 가능 여부
    const autoLogin = async () => {
        // 기기 정보를 보냈을 때 정보가 일치하면 그 아이디로 로그인
        await axios.post(`http://13.209.70.126/app/fast_login_check_app.php`, {
            "userDevice":props.uniqueId
        })
        .then((res) => {
            if(res.data.flag_mobile){
                // 자동 로그인 시
                props.setData(res.data)
                props.setBool(true)
            } else{
                // 자동 로그인 불가 시
                props.setBool(false)
            }
        })
    }

    const fetchLogin = async () => {
        await axios.post(`http://13.209.70.126/app/login_check_app.php`, {
            'userID':'28', 'userDevice':props.uniqueId
        })
        .then((res) => {
            /////////////////////////////////아래의 true 시연이 코드 오면 고쳐야함 ///
            if(true){
                // 아이디 기기정보 일치
                props.setData(res.data)
                props.setBool(true)
            } else{
                // 아이디 기기정보 불일치
                Alert.alert('회원님의 아이디와 기기정보가 일치하지 않습니다.')
            }
        })
    }

    return (
        <View style={styles.flexWhite}>
            <Image source={Character} />
            <View style={styles.login}>
                <TextInput style={styles.input} onChangeText={(text) => {setIdText(text)}}/>
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
        padding: 10,
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