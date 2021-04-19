import React, {useState, useContext} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import axios from 'axios'
import TestContext from '../Utils/TestContextProvider'

const { width, height } = Dimensions.get("window");

const OutSide = (props) => {
    const [reason, setReason] = useState()
    const {setUserData} = useContext(TestContext)

    const submitReason = async () => {
        await axios.post(`http://13.209.70.126/app/outGoing_app.php`, {
            "userDevice":props.uid,
            "reason":reason,
        }).then((res) => {
            if(res.data.access == false){
                Alert.alert("삐빅.. 와이파이가 다릅니다..\nYJU-BON***_5G에 연결해주세요.")
            }else {
                setUserData(res.data)
                if(res.data.out_list[res.data.out_list.length-1].in_time != null &&
                    res.data.out_list[res.data.out_list.length-1].out_time == null){
                        props.setIsThisOut(true)
                } else{
                    props.setIsThisOut(false)
                }
            }
        })
        props.setOutGoingPage(false)
    }

    return (
        <View style={styles.flexWhite}>
            {
                props.isThisOut
                ? <></>
                : <TextInput style={styles.input} onChangeText={(text) => {setReason(text)}}/>
            }
            <TouchableOpacity style={styles.submit} onPress={submitReason}>
                <Text style={styles.submitText}>제출</Text>
            </TouchableOpacity>
        </View>
    )
}

export default OutSide

const styles = StyleSheet.create({
    flexWhite: {
        display: 'flex',
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    submit: {
        display: 'flex',
        width: width*0.85,
        height: height*0.3,
        backgroundColor: 'white',
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
    submitText: {
        fontSize: 20,
        fontWeight: 'bold',
    }
})
