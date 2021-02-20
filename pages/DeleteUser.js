// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native
// Screen to delete the user

import React, { useState } from 'react';
import { Button, Text, View, Alert, SafeAreaView } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';
import firestore from '@react-native-firebase/firestore';
import Spinner from 'react-native-loading-spinner-overlay';
var db = openDatabase({ name: 'UserDatabase.db' });

const DeleteUser = ({ navigation }) => {
  let [inputUserId, setInputUserId] = useState('');
  let [spinner, SetSpinner] = useState(false);

  let deleteUser = () => {
    SetSpinner(true);
    firestore()
    .collection('table_transaction')
    .doc(inputUserId)
    .delete()
    .then(() => {
     
      firestore()
      .collection('table_transaction_details').where('transaction_id', "==", inputUserId)
      .get()
      .then(querySnapshot => {
 
        querySnapshot.forEach(documentSnaspshot => {
          firestore()
          .collection('table_transaction_details')
          .doc(documentSnaspshot.id)
          .delete()
          .then((res) => {
            Alert.alert("Transaction Deleted Successfully!!!");
          });
        })
        SetSpinner(false);

      });
    });
   



   
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
          <Spinner
            visible={spinner}
            textContent={'Loading...'}

          />
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytextinput
            placeholder="Enter Transaction Id"
            onChangeText={(inputUserId) => setInputUserId(inputUserId)}
            style={{ padding: 10 }}
          />
          <Mybutton title="Delete User" customClick={deleteUser} />
        </View>
      
      </View>
    </SafeAreaView>
  );
};

export default DeleteUser;