import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"; 

const styles = StyleSheet.create({
    flexBlue: {
        display: 'flex',
        flex: 1,
        backgroundColor: 'steelblue',
    },
    flexRed: {
        display: 'flex',
        flex: 1,
        marginTop: getStatusBarHeight(),
        backgroundColor: 'red',
    },
});

const Main = () => {
    return (
        <>
        <View style={styles.flexRed}></View>
        <View style={styles.flexBlue}></View>
        </>
    )
}

export default Main

