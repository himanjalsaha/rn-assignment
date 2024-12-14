import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UserList from '../components/UserList'
import { useTheme } from '../context/Themecontext';

export default function HomeScreen() {
         const { isDarkMode } = useTheme();
    
  return (
    <View style={{backgroundColor: isDarkMode ?"black" : "white" , flex :1}}>
    <UserList/>
    </View>
  )
}

const styles = StyleSheet.create({})