import React from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"; 

import Biometric from '../Components/Biometric'

const { width, height } = Dimensions.get("window");

const Main = (props) => {
    console.log(width, height)
    return (
        <View style={styles.flexWhite}>
            <Text style={styles.flexText}>3WDJ 지문인식</Text>
            <View style={styles.flexRed}>
                <Biometric setBool={props.setBool}/>
            </View>
            <View style={styles.flexBlue}>
                <View style={styles.flexGrey}><Text>입실</Text></View>
                <View style={styles.flexGrey}><Text>퇴실</Text></View>
            </View>
        </View>
    )
}


export default Main



const styles = StyleSheet.create({
    flexText: {
        display: 'flex',
        marginTop: getStatusBarHeight()+height*0.01,
        marginLeft: width*0.05,
        fontSize: width*0.06,
        fontWeight: 'bold',
    },
    flexRed: {
        display: 'flex',
        flex: 7,
        margin: width*0.05,
        marginBottom: 0,
        borderRadius: 15,
        backgroundColor: 'rgb(225,224,255)',
    },
    flexBlue: {
        display: 'flex',
        flexDirection: 'row',
        flex: 3,
        margin: width*0.05,
        borderRadius: 15,
        backgroundColor: 'rgb(188,224,255)',
    },
    flexWhite: {
        display: 'flex',
        backgroundColor: 'white',
        flex: 1,
    },
    flexGrey: {
        display: 'flex',
        flex: 1,
        margin: width*0.03,
        borderRadius: 10,
        backgroundColor: 'rgb(246,247,252)',
    },
});