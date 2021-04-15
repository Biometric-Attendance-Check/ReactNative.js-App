import React, {useState, useContext} from 'react'
import { StyleSheet, View, Text, Dimensions, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import axios from 'axios'

import Character from '../assets/character.jpeg'
import TestContext from '../Utils/TestContextProvider';

const { width, height } = Dimensions.get("window");

const Login = (props) => {

    const [idText, setIdText] = useState()
    const {setUserData, setIsLogin, setStatusText} = useContext(TestContext)

    const fetchLogin = async () => {
        await axios.post(`http://13.209.70.126/app/login_check_app.php`, {
            'userID':idText, 'userDevice':props.uniqueId
        })
        .then((res) => {
            //
            if(res.data.std_name){
                // 아이디 기기정보 일치
                setUserData(res.data)

                // 하교 한 이후
                data.out_time != null
                ? setStatusText('x')
                // 등교인지 하교인지
                : data.in_time == null
                ? setStatusText('등교')
                : setStatusText('하교')

                setIsLogin(true)
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