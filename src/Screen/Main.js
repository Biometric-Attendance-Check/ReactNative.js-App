import React from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"; 

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    flexText: {
        display: 'flex',
        marginTop: getStatusBarHeight()+height*0.01,
        marginLeft: width*0.05,
        fontSize: 24,
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
        flex: 7,
        margin: width*0.05,
        borderRadius: 15,
        backgroundColor: 'rgb(188,224,255)',
    },
    flexWhite: {
        display: 'flex',
        backgroundColor: 'white',
        flex: 1,
    }
});

const Main = () => {
    console.log(width, height)
    return (
        <View style={styles.flexWhite}>
            <Text style={styles.flexText}>3WDJ 지문인식</Text>
            <View style={styles.flexRed}></View>
            <View style={styles.flexBlue}></View>
        </View>
    )
}

export default Main

