import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { logout } from '../services/Github';

export default class HomeScreen extends React.Component {

    async logout() {
        const token = await AsyncStorage.getItem('@user_token');
        logout(token).then(async result => {
            console.log(result);
            if (result) {
                await AsyncStorage.setItem('@user_token', '');
                this.props.navigation.replace('Login');
            }
        });
    }

    render() {
        return(
            <View style={styles.container}>
                <Text>Welcome to Social Login App</Text>
                <Button title="Logout" onPress={() => this.logout()}/>
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
});