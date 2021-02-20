// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native
// Screen to register the user

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
var db = openDatabase({ name: 'UserDatabase.db' ,createFromLocation : 1});

const RegisterParty = ({ navigation }) => {
  console.warn(navigation);
  let [userName, setUserName] = useState('');
  let [userContact, setUserContact] = useState('');
  let [drAmount, setDrAmount] = useState(0);
  let [crAmount, setCrAmount] = useState(0);
  let [pageNo, setPageNo] = useState(0);
  let [panNo, setPanNo] = useState('');
  let [userAddress, setUserAddress] = useState('');
  let[spinner,SetSpinner]=useState(false);
  let register_user = () => {
    console.log(userName, userContact, userAddress);

    if (!userName) {
      alert('Please fill Party name');
      return;
    }
    if (!userContact) {
      alert('Please fill Party Contact Number');
      return;
    }
    if (!userAddress) {
      alert('Please fill Party Address');
      return;
    }
    if (!pageNo) {
      alert('Please fill Page No.');
      return;
    }
    if (!panNo) {
      alert('Please fill Pan No.');
      return;
    }
    SetSpinner(true);
    firestore()
    .collection('table_PartyLedger')
    .add({
      party_name:userName,
      party_contact:userContact,
      party_address:userAddress,
      drAmount:drAmount,
      crAmount:crAmount,
      pageNo:pageNo,
      panNo:panNo
    })
    .then(() => {
      Alert.alert(
        'Success',
        'You are Registered Successfully',
        [
          {
            text: 'Ok',
            onPress: () =>  navigation .navigate('HomeScreen'),
          },
        ],
        { cancelable: false }
      );
     SetSpinner(false);
    }).catch(error=>{
      SetSpinner(false);
      Alert.alert(error)});
    // db.transaction(function (tx) {
    //   tx.executeSql(
    //     'INSERT INTO table_PartyLedger (party_name, party_contact, party_address,drAmount,crAmount) VALUES (?,?,?,?,?)',
    //     [userName, userContact, userAddress,drAmount,crAmount],
    //     (tx, results) => {
    //       console.log('Results', results.rowsAffected);
    //       if (results.rowsAffected > 0) {
    //         Alert.alert(
    //           'Success',
    //           'You are Registered Successfully',
    //           [
    //             {
    //               text: 'Ok',
    //               onPress: () =>  navigation .navigate('HomeScreen'),
    //             },
    //           ],
    //           { cancelable: false }
    //         );
    //       } else alert('Registration Failed');
    //     }
    //   );
    // });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
       <Spinner
          visible={spinner}
          textContent={'Loading...'}
         
        />
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <Mytextinput
                placeholder="Enter Name"
                onChangeText={(userName) => setUserName(userName)}
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Enter Contact No"
                onChangeText={(userContact) => setUserContact(userContact)}
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />
                 <Mytextinput
                placeholder="Enter Dr Amount"
                onChangeText={(drAmount) => setDrAmount(drAmount)}
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />
                 <Mytextinput
                placeholder="Enter Cr Amount"
                onChangeText={(crAmount) => setCrAmount(crAmount)}
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />
                <Mytextinput
                placeholder="Enter Page No"
                onChangeText={(pageNo) => setPageNo(pageNo)}
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Enter Pan No"
                onChangeText={(panNo) => setPanNo(panNo)}
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Enter Address"
                onChangeText={(userAddress) => setUserAddress(userAddress)}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{ textAlignVertical: 'top', padding: 10 }}
              />
              <Mybutton title="Submit" customClick={register_user} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
       
      </View>
    </SafeAreaView>
  );
};

export default RegisterParty;