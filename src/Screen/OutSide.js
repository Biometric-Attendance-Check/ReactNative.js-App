import React, {useState, useContext} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, Alert, Image } from 'react-native'
import axios from 'axios'
import TestContext from '../Utils/TestContextProvider'
import lunch from '../assets/lunch.png'
import dinner from '../assets/dinner.png'
import zoom from '../assets/zoom.jpg'
import interview from '../assets/interview.png'

const { width, height } = Dimensions.get("window");

const OutSide = (props) => {
    const [reason, setReason] = useState()
    const {setUserData} = useContext(TestContext)
    const reasonType = [{'type': '점심', 'image': lunch},
                        {'type': '저녁', 'image': dinner},
                        {'type': '글로벌존', 'image': zoom},
                        {'type': '면접연습', 'image': interview}]

    const submitReason = async () => {
        if(reason == null && props.isThisOut != true){
            Alert.alert("외출하시는 목적을 입력해주세요.")
        } else {
        await axios.post(`http://13.209.70.126/app/outGoing_app.php`, {
            "userDevice":props.uid,
            "reason":reason,
        }).then((res) => {
                setUserData(res.data)
                if(res.data.out_list[res.data.out_list.length-1].in_time != null &&
                    res.data.out_list[res.data.out_list.length-1].out_time == null){
                        props.setIsThisOut(true)
                } else{
                    props.setIsThisOut(false)
                }
        })
        props.setOutGoingPage(false)
        }
    }

    const returnButton = () => {
        props.setOutGoingPage(false)
    }

    const clickReason = (rs) => {
        setReason(rs)
    }

    return (
        <View style={styles.flexWhite}>
            <View style={styles.submit}>
            <View style={styles.outTypeBox}>
                {reasonType.map((v,index) => 
                    <TouchableOpacity key={index} style={styles.box} onPress={() => clickReason(v.type)}>
                        <Image style={styles.image} source={v.image} resizeMode={'contain'}/>
                        <Text style={styles.outType}>{v.type}</Text>
                    </TouchableOpacity>
                )}
            </View>
                {props.isThisOut
                    ? <></>
                    : <TextInput style={styles.input} value={reason} onChangeText={(text) => {setReason(text)}}/>
                }
                <TouchableOpacity style={styles.buttons} onPress={submitReason}>
                    <Text style={styles.submitText}>제출</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={returnButton}>
                    <Text style={styles.submitText}>돌아가기</Text>
                </TouchableOpacity>
            </View>
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
        width: width*0.82,
        height: height*0.06,
        borderBottomWidth: 3,
        margin: height*0.02,
    },
    submitText: {
        fontSize: width*0.06,
        fontWeight: 'bold',
    },
    buttons: {
        margin: width*0.04,
        paddingVertical: 10,
    },
    outType: {
        display: 'flex',
        fontSize: width*0.05,
        fontWeight: 'bold',
        top: -height*0.037
    },
    outTypeBox: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    box: {
        backgroundColor: 'rgb(188,224,255)',
        borderRadius: 10,
        margin: width*0.01,
        width: width*0.4,
        height: width*0.4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image:{
        width: width*0.2,
        height: height*0.2
    }
})
