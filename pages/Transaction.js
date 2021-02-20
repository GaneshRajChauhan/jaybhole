// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native
// Screen to view all the user*/

import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import { func } from 'prop-types';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
var db = openDatabase({ name: 'UserDatabase.db' });
import firestore from '@react-native-firebase/firestore';
import Spinner from 'react-native-loading-spinner-overlay';
const Transaction = (navigation) => {
  let [flatListItems, setFlatListItems] = useState([]);
  let [totalBalance, setTotalBalance] = useState('');
  let [spinner, SetSpinner] = useState(false);
  useEffect(() => {

    let dr = Number(navigation.route.params.item.drAmount);
    let cr = Number(navigation.route.params.item.crAmount);
    var openingBalance = "";
    if (dr > cr) {
      openingBalance = dr + "Dr"
    }
    else {
      openingBalance = cr + 'Cr'
    }
    var temp1 = [];
    var temp = [];
    var tempData = [];
    let balance = 0;
    let drcrBalance = '';
    SetSpinner(true);
    firestore()
      .collection('table_transaction_details').where('account_name', "==", navigation.route.params.item.party_name)
      .get()

      .then(querySnapshot => {

        temp1.push({ date: '00/00/00', Id: 'Opening', account_name: navigation.route.params.item.party_name, particulars: 'Opening Balance', dr: dr, cr: cr, balance: openingBalance });
        // tempData.push({date:'00/00/00',Id:'Opening',account_name:navigation.route.params.item.party_name,particulars:'Opening Balance',dr:dr,cr:cr,balance:openingBalance})
        querySnapshot.forEach(documentSnaspshot => {


          temp1.push({ Id: documentSnaspshot.data().transaction_id, ...documentSnaspshot.data() });

        });
        var sortedItems = [...temp1].sort(function (a, b) {
          var nameA = a.date.toUpperCase(); // ignore upper and lowercase
          var nameB = b.date.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        });


        sortedItems.forEach((item, index) => {

          temp.push(item);
          let dramount = (temp.filter(x => Number(x.dr) > 0)).map(x => Number(x.dr));
          let totaldr = dramount.reduce((a, b) => {
            return a + b;
          }, 0)
          let cramount = (temp.filter(x => Number(x.cr) > 0)).map(x => Number(x.cr));
          let totalcr = cramount.reduce((a, b) => {
            return a + b;
          }, 0)
          balance = totaldr - totalcr;

          drcrBalance = balance.toString();
          if (balance > 0) {
            drcrBalance = balance + ' Dr'
          }
          if (balance < 0) {
            balance = Math.abs(balance);
            drcrBalance = balance + ' Cr';
          }
          tempData.push({
            date: item.date, Id: item.Id, account_name: item.account_name,
            particulars: item.particulars, dr: item.dr, cr: item.cr, balance: drcrBalance
          })
        })
        console.warn('hello')
        console.warn(tempData);
        setTotalBalance(drcrBalance);
        setFlatListItems(tempData);
        SetSpinner(false);



      });
  }, []);



  let listViewItemSeparator = () => {
    return (
      <View
        style={{ height: 1, width: '100%', backgroundColor: '#808080' }}
      />
    );
  };

  let listItemView = (item) => {
    return (
      <View style={{ flexDirection: 'row' }} key={item.Id} >
        <View
          key={item.Id}
          style={{ backgroundColor: 'white', width: wp('40%'), marginLeft: wp('2%') }}>
          <Text style={{fontSize:10}}> {item.Id}</Text>

          <Text> {item.particulars}</Text>
          <Text> {item.date}</Text>
        </View>
        <View
          key={item.Id}
          style={{ backgroundColor: 'white', width: wp('15%') }}>
          <Text> {item.dr}</Text>
        </View>
        <View
          key={item.Id}
          style={{ backgroundColor: 'white', width: wp('15%') }}>
          <Text> {item.cr}</Text>
        </View>
        <View
          key={item.Id}
          style={{ backgroundColor: 'white', marginRight: wp('2%'), width: wp('25%') }}>
          <Text style={{ textAlign: 'left', fontWeight: 'bold' }}> {item.balance}</Text>
        </View>
      </View>


    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flexDirection: 'row', alignContent: 'space-between', backgroundColor: 'green' }}>
          <View style={{ width: 150, marginLeft: wp('1%') }}>
            <Text style={{ fontSize: 22 }}>Particulars</Text>
          </View>
          <View style={{ width: 50 }} >
            <Text style={{ fontSize: 22 }}>Dr</Text>
          </View>
          <View style={{ width: 50 }} >
            <Text style={{ fontSize: 22 }}>Cr</Text>
          </View>
          <View style={{ width: 100 }} >
            <Text style={{ fontSize: 22 }}>Balance</Text>
          </View>


        </View>
        <View style={{ flex: 1 }}>
          <Spinner
            visible={spinner}
            textContent={'Loading...'}

          />
          <FlatList
            data={flatListItems}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
        <View style={{ backgroundColor: 'green', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}> {navigation.route.params.item.party_name} {totalBalance}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Transaction;