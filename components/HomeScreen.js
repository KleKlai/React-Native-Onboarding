import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {

    const clearOnboarding = async () => {
        try {
            await AsyncStorage.clear();
        } catch (err) {
            console.log('Error @setItem: ', err)
        }
    }

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <TouchableOpacity onPress={clearOnboarding}>
        <Text>Clear onboarding</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})