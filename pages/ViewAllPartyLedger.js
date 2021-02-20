// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native
// Screen to view all the user*/

import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView ,TouchableOpacity} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' ,createFromLocation : 1});
import firestore from '@react-native-firebase/firestore';
import Spinner from 'react-native-loading-spinner-overlay';
const ViewAllPartyLedger = ({navigation}) => {
  let [flatListItems, setFlatListItems] = useState([]);
  let[spinner,SetSpinner]=useState(false);
console.warn(navigation);
   useEffect(() => {
   SetSpinner(true);
    firestore()
    .collection('table_PartyLedger')
    .get()
    .then(querySnapshot => {
      console.warn('Total users: ', querySnapshot.size);
      var temp = [];
      querySnapshot.forEach(documentSnapshot => {
        temp.push(documentSnapshot.data());
        console.warn('User ID: ', documentSnapshot.id, documentSnapshot.data());
      });
      setFlatListItems(temp);
      SetSpinner(false);
    });



    // db.transaction((tx) => {
    //   tx.executeSql('SELECT * FROM table_PartyLedger', [], (tx, results) => {
        

    //       var temp = [];
    //       for (let i = 0; i < results.rows.length; ++i)
    //         temp.push(results.rows.item(i));
    //       setFlatListItems(temp);
        
     
    //   });
    // });
  }, []
  );

  let listViewItemSeparator = () => {
    return (
      <View
        style={{ height: 1, width: '100%', backgroundColor: '#808080' }}
      />
    );
  };

  let listItemView = (item) => {
    return (
       <TouchableOpacity onPress={()=>{navigation.navigate('Transaction',{item:item})}} >
           <View
        key={item.Id}
        style={{ backgroundColor: 'white',alignItems:'center' }}>
        <Text>Page No.: {item.pageNo}</Text>
        <Text>Pan No.: {item.panNo}</Text>
        <Text style={{fontSize:20}} >{item.party_name}</Text>
        <Text>Contact: {item.party_contact}</Text>
        <Text>Address: {item.party_address}</Text>
      </View>
      </TouchableOpacity>
    
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
       <Spinner
          visible={spinner}
          textContent={'Loading...'}
         
        />
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={flatListItems}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>

      </View>
    </SafeAreaView>
  );
};

export default ViewAllPartyLedger;