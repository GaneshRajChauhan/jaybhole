// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native
// Screen to update the user

import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';
import firestore from '@react-native-firebase/firestore';
import Spinner from 'react-native-loading-spinner-overlay';
var db = openDatabase({ name: 'UserDatabase.db' });

const ChangePassword = ({ navigation }) => {
  let [inputUserId, setInputUserId] = useState('');
  let [password, SetPassword] = useState('');
  let [Confirmpassword, SetConfirmPassword] = useState('');

  
  let updateUser = () => {


    if (!password) {
      alert('Please fill User id');
      return;
    }
    if (!Confirmpassword) {
      alert('Please fill name');
      return;
    }
 
    if (password!==Confirmpassword) {
      alert('Password and Confirm Password should be same!!!');
      return;
    }
    firestore()
    .collection('tbl_user')
    .doc('password')
    .update({
      password: password,
    }).then((rslt)=>{
      console.warn(rslt);
    })
    db.transaction((tx) => {
                  tx.executeSql(
                    'UPDATE tbl_user set  password=? ',
                    [password],
                    (tx, results) => {
                      console.warn('Results', results.rowsAffected);
                   
                        Alert.alert(
                          'Success',
                          'Password Change successfully',
                          [
                            {
                              text: 'Ok',
                              onPress: () => navigation.navigate('HomeScreen'),
                            },
                          ],
                          { cancelable: false }
                        );
         
                    }
                  );
   
  });
}

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <Mytextinput
                placeholder="Enter New Password"
                style={{ padding: 10 }}
                onChangeText={(password) => SetPassword(password)}
              />
              <Mytextinput
                placeholder="Enter New Confirm Password"
            
                style={{ padding: 10 }}
                onChangeText={(confirmPassword) => SetConfirmPassword(confirmPassword)}
              />
              <Mybutton title="Update Password" customClick={updateUser} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
       
      </View>
    </SafeAreaView>
  );
}

export default ChangePassword;