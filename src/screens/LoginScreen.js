import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { startAuthorize, getAccessToken } from '../services/Github';

export default class LoginScreen extends React.Component {

    static navigationOptions = '';
    
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

    }

    render() {
        return(
            <View style={styles.container}>
                <Text>Social Login</Text>
                <Button title="Login with Github" style={styles.button} onPress={() => this.loginGithub()}/>
                <Button title="Login with Google" style={styles.button} onPress={() => this.loginGoogle()}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        margin: 15
    }
});