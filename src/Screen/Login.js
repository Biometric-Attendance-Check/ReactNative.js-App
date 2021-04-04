import React from 'react'
import { StyleSheet, Button, View, Dimensions } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"; 

const { width, height } = Dimensions.get("window");

const Login = (props) => {

    const toBio = () => {
        props.setBool(true)
    }

    return (
        <View style={styles.flexWhite}>
            <Button style={styles.flexTemp} title='To biometrics' onPress={toBio}/>
        </View>
    )
}

export default Login


const styles = StyleSheet.create({
    flexWhite: {
        display: 'flex',
        backgroundColor: 'white',
        flex: 1,
    },
    flexTemp: {
        display: 'flex',
        marginTop: getStatusBarHeight()+height*0.01,
        marginLeft: width*0.05,
    }
})