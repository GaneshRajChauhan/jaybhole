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

const UpdateUser = ({ navigation }) => {
  let [pageNo, SetPageNo] = useState(0);
  let [partyName, setUserName] = useState('');
  let [previousAccount, setPreviousAccount] = useState('');
  let [partyContact, setUserContact] = useState('');
  let [partyAddress, setUserAddress] = useState('');
  let [drAmount, setDrAmount] = useState(0);
  let [crAmount, setCrAmount] = useState(0);
  let [PanNo, SetPanNo] = useState(0);
  let [docID, SetDocId] = useState('');
  let [items, SetItems] = useState([]);
  let [spinner, SetSpinner] = useState(false);

  let updateAllStates = (name, contact, address, dr, cr, panNo, pageNo, docID) => {
    setUserName(name);
    setUserContact(contact);
    setUserAddress(address);
    setDrAmount(dr);
    setCrAmount(cr);
    SetPanNo(panNo);
    SetPageNo(pageNo);
    SetDocId(docID);
    setPreviousAccount(name);

  };

  let searchUser = () => {
    SetSpinner(true);
    firestore()
      .collection('table_PartyLedger').where('pageNo', "==", pageNo)
      .get()
      .then(querySnapshot => {

        querySnapshot.forEach(documentSnaspshot => {
          updateAllStates(documentSnaspshot.data().party_name,
            documentSnaspshot.data().party_contact,
            documentSnaspshot.data().party_address,
            documentSnaspshot.data().drAmount,
            documentSnaspshot.data().crAmount,
            documentSnaspshot.data().panNo,
            documentSnaspshot.data().pageNo,
            documentSnaspshot.id
          )
        SetSpinner(false);
    })
   })    
};
let updateUser = () => {

  SetSpinner(true);
  if (!pageNo) {
    alert('Please fill  Id');
    return;
  }
  if (!partyName) {
    alert('Please fill name');
    return;
  }
  if (!partyContact) {
    alert('Please fill Contact Number');
    return;
  }
  if (!partyAddress) {
    alert('Please fill Address');
    return;
  }
  firestore()
  .collection('table_transaction_details').where('account_name', "==", previousAccount)
  .get()
  .then(querySnapshot => {
    let temp=[];
    querySnapshot.forEach(documentSnaspshot => {
      firestore()
      .collection('table_transaction_details')
      .doc(documentSnaspshot.id)
      .update({
        account_name: partyName
      });
    }

)
SetItems(temp);
firestore()
.collection('table_PartyLedger')
.doc(docID)
.update({
  party_name: partyName, party_contact: partyContact, party_address: partyAddress, drAmount: drAmount, crAmount: crAmount, panNo: PanNo
})
.then(() => {
  SetSpinner(false);
  Alert.alert(
    'Success',
    'Ledger updated successfully',
    [
      {
        text: 'Ok',
        onPress: () => navigation.navigate('HomeScreen'),
      },
    ],
    { cancelable: false }
  );
});
})
 
}

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
              placeholder="Enter Page No"
              style={{ padding: 10 }}
              onChangeText={(pageNo) => SetPageNo(pageNo)}
            />
            <Mybutton title="Search Party Ledger" customClick={searchUser} />
            <Mytextinput
              placeholder="Enter Name"
              value={partyName}
              style={{ padding: 10 }}
              onChangeText={(partyName) => setUserName(partyName)}
            />
            <Mytextinput
              placeholder="Enter Contact No"
              value={'' + partyContact}
              onChangeText={(partyContact) => setUserContact(partyContact)}
              maxLength={10}
              style={{ padding: 10 }}
              keyboardType="numeric"
            />
            <Mytextinput
              value={'' + drAmount}
              placeholder="Enter Dr Amount"
              onChangeText={(drAmount) => setDrAmount(drAmount)}
              maxLength={10}
              keyboardType="numeric"
              style={{ padding: 10 }}
            />
            <Mytextinput
              placeholder="Enter Cr Amount"
              value={'' + crAmount}
              onChangeText={(crAmount) => setCrAmount(crAmount)}
              maxLength={10}
              keyboardType="numeric"
              style={{ padding: 10 }}
            />
            <Mytextinput
              value={'' + PanNo}
              placeholder="Enter Pan No"
              onChangeText={(panNo) => SetPanNo(panNo)}
              style={{ padding: 10 }}
            />
            <Mytextinput
              value={partyAddress}
              placeholder="Enter Address"
              onChangeText={(partyAddress) => setUserAddress(partyAddress)}
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              style={{ textAlignVertical: 'top', padding: 10 }}
            />
            <Mybutton title="Update User" customClick={updateUser} />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>

    </View>
  </SafeAreaView>
);
}

export default UpdateUser;