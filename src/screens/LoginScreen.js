import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { startAuthorize, getAccessToken } from '../services/Github';
import { loginGoogle } from '../services/Google';

export default class LoginScreen extends React.Component {

    static navigationOptions = { title: 'Welcome', headerShown: false };
    
    async loginGithub() {
        try {
            startAuthorize().then(async result => {
                if (result) {
                    await AsyncStorage.setItem('@user_token', result);
                    this.props.navigation.replace('Home');
                }
            });
        } catch(error) {
            
        }
    }

    loginGoogle() {
        try {
            loginGoogle().then(async result => {
                console.log(result);
                if (result) {
                    await AsyncStorage.setItem('@user_token', result);
                    this.props.navigation.replace('Home');
                }
            });
        } catch(error) {
            
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={{ margin: 10 }}>Social Login</Text>
                <View style={styles.button}>
                    <Button title="Login with Github" color="#242424" onPress={() => this.loginGithub()}/>
                </View>
                <View style={styles.button}>
                    <Button title="Login with Google" color="#de3f31" onPress={() => this.loginGoogle()}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        margin: 15
    }
});