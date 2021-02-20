// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native

import * as React from 'react';
import { Button, View,TouchableOpacity, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './pages/HomeScreen';
import RegisterUser from './pages/RegisterUser';
import UpdateUser from './pages/UpdateUser';
import ViewUser from './pages/ViewUser';
import ViewAllUser from './pages/ViewAllUser';
import DeleteUser from './pages/DeleteUser';
import PartyLedger from './pages/PartyLedger';
import ViewPartyLedger from './pages/ViewAllPartyLedger';
import LoginScreen from './pages/components/LoginScreen';
import Transaction from './pages/Transaction';
import  ChangePassword  from './pages/ChangePassword';
const Stack = createStackNavigator();

export default class App  extends React.Component  {

  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator  initialRouteName="LoginScreen">
          
        <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              title: 'Login', //Set Header Title
              headerStyle: {
                backgroundColor: '#f4511e', //Set Header color
              },
              headerTintColor: '#fff', //Set Header text color
              headerTitleStyle: {
                fontWeight: 'bold', //Set Header text style
              },
            }}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            
            options={{
              title: '    Home Screen', //Set Header Title
              headerStyle: {
                backgroundColor: '#f4511e', //Set Header color
              },
              headerTintColor: '#fff', //Set Header text color
              headerTitleStyle: {
                fontWeight: 'bold', //Set Header text style
              },
            headerShown:false


            }}
          />
           <Stack.Screen
            name="PartyLedger"
            component={PartyLedger}
            options={{
              title: 'Party Ledger', //Set Header Title
              headerStyle: {
                backgroundColor: '#f4511e', //Set Header color
              },
              headerTintColor: '#fff', //Set Header text color
              headerTitleStyle: {
                fontWeight: 'bold', //Set Header text style
              },
            }}
          />
            <Stack.Screen
            name="ViewPartyLedger"
            component={ViewPartyLedger}
            options={{
              title: 'View Party Ledger', //Set Header Title
              headerStyle: {
                backgroundColor: '#f4511e', //Set Header color
              },
              headerTintColor: '#fff', //Set Header text color
              headerTitleStyle: {
                fontWeight: 'bold', //Set Header text style
              },
            }}
          />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={{
              title: 'Change Password', //Set Header Title
              headerStyle: {
                backgroundColor: '#f4511e', //Set Header color
              },
              headerTintColor: '#fff', //Set Header text color
              headerTitleStyle: {
                fontWeight: 'bold', //Set Header text style
              },
            }}
          />
          <Stack.Screen
            name="ViewAll"
            component={ViewAllUser}
            options={{
              title: 'View Users', //Set Header Title
              headerStyle: {
                backgroundColor: '#f4511e', //Set Header color
              },
              headerTintColor: '#fff', //Set Header text color
              headerTitleStyle: {
                fontWeight: 'bold', //Set Header text style
              },
            }}
          />
          <Stack.Screen
            name="Update"
            component={UpdateUser}
            options={{
              title: 'Update User', //Set Header Title
              headerStyle: {
                backgroundColor: '#f4511e', //Set Header color
              },
              headerTintColor: '#fff', //Set Header text color
              headerTitleStyle: {
                fontWeight: 'bold', //Set Header text style
              },
            }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterUser}
            options={{
              title: 'Transaction', //Set Header Title
              headerStyle: {
                backgroundColor: '#f4511e', //Set Header color
              },
              headerTintColor: '#fff', //Set Header text color
              headerTitleStyle: {
                fontWeight: 'bold', //Set Header text style
              },
            }}
          />
          <Stack.Screen
            name="Delete"
            component={DeleteUser}
            options={{
              title: 'Delete Transaction', //Set Header Title
              headerStyle: {
                backgroundColor: '#f4511e', //Set Header color
              },
              headerTintColor: '#fff', //Set Header text color
              headerTitleStyle: {
                fontWeight: 'bold', //Set Header text style
              },
              headerBackImage:null
            }}
          />
            <Stack.Screen
            name="Transaction"
            component={Transaction}
            options={{
              title: 'Ledger Details', //Set Header Title
              headerStyle: {
                backgroundColor: '#f4511e', //Set Header color
              },
              headerTintColor: '#fff', //Set Header text color
              headerTitleStyle: {
                fontWeight: 'bold', //Set Header text style
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
 
};