// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native

import React, { useEffect } from 'react';
import { View, Text, SafeAreaView ,TouchableOpacity, TouchableHighlightBase} from 'react-native';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import { openDatabase } from 'react-native-sqlite-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
var db = openDatabase({ name: 'UserDatabase.db' });
import firestore from '@react-native-firebase/firestore';
import Spinner from 'react-native-loading-spinner-overlay';
export default class HomeScreen extends  React.Component {
  static navigationOptions = ({ navigation }) => {

console.warn('hi');
    const params = navigation.state.params || {}
    return {
      headerStyle: {
        backgroundColor: '#cccccc',
      },
      headerRight: (
        <View style={{ flex: 1, flexDirection: 'row' }}>
          {/* <TouchableOpacity   >
            <View style={{ paddingRight: 12 }}>
              <Icon
                size={24}
                name={'bell'}
              />
            </View>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={params.rightHeaderButtonPress}  >
            <View style={{ paddingRight: 12 }}>
             <Text>Sign Out</Text>
            </View>
          </TouchableOpacity>
        </View>
      ),
    }
  }
  state={
    spinner:false
  }
  componentDidMount(){
    this.useEffect();
  }
  getuser=async()=>{
    this.setState({spinner:true});
    // await firestore()
    // .collection('students')
    // .get()
    // .onSnapshot(documentSnapshot => {
      
    //   console.warn('User data: ', documentSnapshot.data());
    
    // });
    await (await firestore().collection('studentss').add({pabi:'123',ganesh:'22333444'})).onSnapshot(
      doc=>{
        console.warn(123);
        this.props.navigation.navigate('ChangePassword')
        this.setState({spinner:false});
      }
    )
  }
  useEffect=() => {
    console.warn('test');
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.warn('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',
              []
            );
          }
        }
      );
    });
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_PartyLedger'",
        [],
        function (tx, res) {
          console.warn('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_PartyLedger', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_PartyLedger(Id INTEGER PRIMARY KEY AUTOINCREMENT, party_name VARCHAR(50), party_contact INT(10), party_address VARCHAR(255),drAmount INTEGER,crAmount INTEGER)',
              []
            );
          }
        }
      );
    });
    db.transaction(function (txn) {
      txn.executeSql(
         "SELECT name FROM sqlite_master WHERE type='table' AND name='tbl_user'",
        [],
        function (tx, res) {
          console.warn('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS tbl_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS tbl_user(Id INTEGER PRIMARY KEY AUTOINCREMENT,   VARCHAR(50), password INT(20))',
              []
            );
            txn.executeSql(
              'INSERT INTO tbl_user (login_name,password) VALUES (?,?)',   ['bishnu','bishnu123']
            
            );
          }
        }
      );
    });
    db.transaction(function (txn) {
      console.warn('hissssssssssssssssssss');
      txn.executeSql(
         "SELECT name FROM sqlite_master WHERE type='table' AND name='table_transaction'",
        [],
        function (tx, res) {
          console.warn('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_transaction', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_transaction(Id INTEGER PRIMARY KEY AUTOINCREMENT, transaction_type VARCHAR(20),cashbank_type VARCHAR(20),ledger_id INTEGER,date VARCHAR(20),amount INTEGER,particular VARCHAR(200))',
              []
            );
          
          }
        }
      );
    });
    db.transaction(function (txn) {
      console.warn('hissssssssssssssssssss');
      txn.executeSql(
         "SELECT name FROM sqlite_master WHERE type='table' AND name='table_transaction_details'",
        [],
        function (tx, res) {
          console.warn('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_transaction_details', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_transaction_details(Id INTEGER PRIMARY KEY AUTOINCREMENT,transaction_id INTEGER,account_name VARCHAR(50), particulars VARCHAR(200),dr INTEGER,cr INTEGER,date VARCHAR(20))',
              []
            );
          
          }
        }
      );
    });
  }
render()
{
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
         
        />
      <View style={{backgroundColor:'#f4511e',flexDirection:'row', height:50}}><Text style={{marginLeft:100,color:'white',fontSize:20, marginTop:15}}>Home</Text><TouchableOpacity onPress={()=>this.props.navigation.navigate('LoginScreen')} ><View><Text style={{fontSize:20,marginLeft:100,marginTop:15, color:'white'}}>Log Out</Text></View></TouchableOpacity></View>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
        <Mybutton
            title="Create Party Ledger"
            customClick={() => this.props.navigation.navigate('PartyLedger')}
          />
                <Mybutton
            title="Ledger Balance"
            customClick={() => this.props.navigation.navigate('ViewPartyLedger')}
          />
          <Mybutton
            title="Transaction"
            customClick={() => this.props.navigation.navigate('Register')}
          />
          <Mybutton
            title="Update Ledger"
            customClick={() => this.props.navigation.navigate('Update')}
          />
         

          <Mybutton
            title="Delete Transaction"
            customClick={() => this.props.navigation.navigate('Delete')}
          />
                    <Mybutton
            title="Change Password"
            customClick={() =>
              
              {
                this.getuser();
              
              
              } }
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

  
};

