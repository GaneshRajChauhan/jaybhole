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
import { Picker, Content } from 'native-base';
import firestore from '@react-native-firebase/firestore';
import Spinner from 'react-native-loading-spinner-overlay';
export default class RegisterUser extends React.Component {
  state = {
    Particular: '',
    Amount: '',
    daysInMonth: 0,
    days: [],
    months: [],
    ledgerValue:'[Select Ledger]',
    TransactionTypeValue:'[Select Type]',
    cashBankValue:'[Select Cash/Bank/Credit]',
    cashBank:[{label:'[Select Cash/Bank/Credit]',value:'[Select Cash/Bank/Credit]'},{label:'Credit',value:'Credit'},{label:'Cash',value:'Cash'},{label:'Bank',value:'Bank'}],
    years: [{ label: '2076', value: 2076 }, { label: '2077', value: 2077 }, { label: '2078', value: 2078 }],
    Day: 0,
    transactionType:[{label:'[Select Type]',value:'[Select Type]'},{label:'Sales',value:'Sales'},{label:'Purchase',value:'Purchase'},{label:'Receive',value:'Receive'},{label:'Payment',value:'Payment'}],
    NepaliDateData: {},
    ledger:[],
    spinner:false,
    Month: 0,
    Year: 0
  }
  componentDidMount() {

    let edate = new Date();

    let mm = edate.getMonth();
    let yy = edate.getFullYear();
    let dd = edate.getDate();
    let nepaliDate = this.EngToNep(yy, mm + 1, dd);
    console.warn(nepaliDate);
    this.state.Day = nepaliDate.Day;
    this.state.Month = nepaliDate.Month;
    this.state.Year = nepaliDate.Year;
    this.state.NepaliDateData = nepaliDate;
    this.state.daysInMonth = nepaliDate.TotalDaysOfMonth;
    this.setState(this.state);
    this.getDates();
    this.GetMonths();
    this.getYears();
    console.warn(this.state);
    this.ViewAllPartyLedger();
  }
  submitTransaction = () => {
    let  transactionType=this.state.TransactionTypeValue;
    let cashBankValue=this.state.cashBankValue;
    let ledgerValue=this.state.ledgerValue;
    let amount=this.state.Amount;
    let particular=this.state.Particular;
    let _year=this.state.Year+'/'+this.state.Month+'/'+this.state.Day

   if (!transactionType||transactionType=='[Select Type]') {
     Alert.alert('Please fill Transaction Type!!!');
     return;
   }
   if (!cashBankValue||cashBankValue=='[Select Cash/Bank/Credit]') {
     Alert.alert('Please fill Cash/Bank/Type!!!');
     return;
   }
   if (!ledgerValue) {
     Alert.alert('Please fill Cash/Bank/Type!!!');
     return;
   }
   else{

   }
   if (!amount) {
     Alert.alert('Please fill amount!!!');
     return;
   }
   if (!particular) {
     Alert.alert('Please fill particular!!!');
     return;
   }
   let _drAccount='';
   let partyLedger=''
   if(ledgerValue!="000000")
   {
    partyLedger=(this.state.ledger.filter(x=>x.Id==ledgerValue))[0].party_name;
   }
    
   console.warn(partyLedger);
   let _crAccount='';
   if(transactionType=="Sales")
   {
     if(cashBankValue=="Credit")
     {
       _crAccount="Sales A/C"
       _drAccount=partyLedger;
     }
     if(cashBankValue=="Cash")
     {
       _drAccount="Cash A/C";
       _crAccount="Sales A/C";
     }
     if(cashBankValue=="Bank")
     {
       _drAccount="Bank A/C";
       _crAccount="Sales A/C";
     }
   }
   if(transactionType=="Purchase")
   {
     if(cashBankValue=="Credit")
     {
       _drAccount="Purchase A/C";
       _crAccount=partyLedger;
    
     }
     if(cashBankValue=="Bank")
     {
       _drAccount="Purchase A/C";
       _crAccount="Bank A/C";
    
     }
     if(cashBankValue=="Cash")
     {
       _drAccount="Purchase A/C";
       _crAccount="Cash A/C";
     }
   }
   if(transactionType=="Receive")
   {

     if(cashBankValue=="Bank")
     {
       _drAccount="Bank A/C";
       _crAccount=partyLedger;
    
     }
     if(cashBankValue=="Cash")
     {
       _drAccount="Cash A/C";
       _crAccount=partyLedger;
     }
   }
   if(transactionType=="Payment")
   {

     if(cashBankValue=="Bank")
     {
       _drAccount=partyLedger;
       _crAccount="Bank A/C";;
    
     }
     if(cashBankValue=="Cash")
     {
       _drAccount=partyLedger;
       _crAccount="Cash A/C";;
     }
   }
  
let _navigation=this.props.navigation;
this.setState({spinner:true});

firestore()
 .collection('table_transaction').add({
    transaction_type:transactionType,
    cashbank_type:cashBankValue,
    ledger_id:ledgerValue,
    date: _year,
    amount: amount,
    particular: particular
    
  }) .then((result) => {



    firestore()
    .collection('table_transaction_details').add({
      transaction_id:result.id,
      account_name:_drAccount,
      particulars:particular,
       dr: amount,
       cr: 0,
       date: _year
       
     }).then(rslt=>{
      firestore()
      .collection('table_transaction_details').add({
        transaction_id:result.id,
        account_name:_crAccount,
        particulars:particular,
         dr: 0,
         cr: amount,
         date: _year
         
       }).then(r=>{
        Alert.alert(
          'Success',
          'You are Registered Successfully',
          [
            {
              text: 'Ok',
              onPress: () =>{
                this.setState({spinner:false});
                _navigation.navigate('HomeScreen')
              }  ,
            },
          ],
          { cancelable: false }
        );
       })
     })
    

  }).catch(error=>{
    this.setState({spinner:false});
    Alert.alert(error)});
 };
   ViewAllPartyLedger = () => {
    this.setState({spinner:true});
    firestore()
    .collection('table_PartyLedger')
    .get()
    .then(querySnapshot => {
      console.warn('Total users: ', querySnapshot.size);
      var temp = [];
      querySnapshot.forEach(documentSnapshot => {
        temp.push({Id:documentSnapshot.id, ...documentSnapshot.data()});
        console.warn({Id:documentSnapshot.id, ...documentSnapshot.data()});
      });
      this.setState({ledger:temp})
      this.setState({spinner:false});
    });
    
    }
  getYears() {
    let date = new Date();
    let mm = date.getMonth();
    let yy = date.getFullYear();
    let dd = date.getDate();
    let nepaliDate = this.EngToNep(yy, mm + 1, dd);
    var fromYear = nepaliDate.Year - 2;
    var toYear = nepaliDate.Year + 2;
    var years = [];
    for (let index = fromYear; index < toYear; index++) {
      years.push({ label: index.toString(), value: index });

    }
    console.warn(this.state);

    this.state.years = years;
    this.setState(this.state);
    this.state.Year
  }
  getDates = () => {
    console
    var dates = [];

    for (let index = 1; index <= this.state.daysInMonth; index++) {
      dates.push({ label: index.toString(), value: index });

    }

    this.state.days = dates;
  }
  pickerYearsItems = () => {
    var items = []
    for (var item of this.state.years) {
      items.push(
        <Picker.Item key={item.value} label={item.label} value={item.value} />
      )
    }
    return items
  }
  pickerTransactionType = () => {
    var items = []
    for (var item of this.state.transactionType) {
      items.push(
        <Picker.Item key={item.value} label={item.label} value={item.value} />
      )
    }
    return items
  }
  pickerCashBankType = () => {
    var items = []
    for (var item of this.state.cashBank) {
      items.push(
        <Picker.Item key={item.value} label={item.label} value={item.value} />
      )
    }
    return items
  }
  pickerLedger = () => {
    console.warn(this.state.ledger);
    var items = [];
    items.push(       <Picker.Item key={'abc'} label={'[Select Ledger]'} value={'000000'} />)
    for (var item of this.state.ledger) {
      items.push(
        <Picker.Item  label={item.party_name} value={item.Id} />
      )
    }
    return items
  }
  pickerMonthsItems = () => {
    var items = []
    for (var item of this.state.months) {
      items.push(
        <Picker.Item key={item.value} label={item.label} value={item.value} />
      )
    }

    return items
  }
  pickerDaysItems = () => {
    var items = []
    for (var item of this.state.days) {
      items.push(
        <Picker.Item key={item.value} label={item.label} value={item.value} />
      )
    }
    return items
  }
  onDropDownYearValueChange = (value) => {
    console.warn(value);
    let selectedValue = value;

    let engArray = this.NepToEng(value, this.state.Month, this.state.Day);
    var NepaliDate=this.EngToNep(engArray[0],engArray[1],engArray[2]);
    this.state.daysInMonth=NepaliDate.TotalDaysOfMonth;

    this.state.month

    this.setState({ Year: selectedValue })
    this.getDates();
  }
  onDropDownMonthValueChange = (value) => {
    console.warn(value);
    let selectedValue = value;

    let engArray = this.NepToEng(this.state.Year, value, this.state.Day);
    var NepaliDate=this.EngToNep(engArray[0],engArray[1],engArray[2]);
    this.state.daysInMonth=NepaliDate.TotalDaysOfMonth;

    this.setState({ Month: selectedValue })
    this.getDates();
  }
  onDropDownDayValueChange = (value) => {
    console.warn(value);
    let selectedValue = value;



    this.setState({ Day: selectedValue })
  }
  onDropDownTypevalueChange = (value) => {
    console.warn(value);
    let selectedValue = value;



    this.setState({ TransactionTypeValue: selectedValue })
  }
  onDropDownCashBankChange = (value) => {
    console.warn(value);
    let selectedValue = value;



    this.setState({ cashBankValue: selectedValue })
  }
  onDropDownLedgerBankChange = (value) => {
    console.warn(value);
    let selectedValue = value;

    console.warn(value);

    this.setState({ ledgerValue: selectedValue })
  }
  render() {
    let data = [{
      value: 'Banana',
    }, {
      value: 'Mango',
    }, {
      value: 'Pear',
    }];
    console.warn('render function');
    return (
      <SafeAreaView style={{ flex: 1 }}>
           <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
         
        />
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <View style={{ flex: 1 }}>
            <ScrollView keyboardShouldPersistTaps="handled">
              <KeyboardAvoidingView
                behavior="padding"
                style={{ flex: 1, justifyContent: 'space-between' }}>
                    <View style={{ width: 300 ,marginLeft:30}} >
                    <Content>
                      <Picker
                        mode="dropdown"
                        selectedValue={this.state.TransactionTypeValue}
                        onValueChange={this.onDropDownTypevalueChange.bind(this)}
                      >
                        {this.pickerTransactionType()}
                      </Picker>
                    </Content>
                  </View>
                  <View style={{ width: 300 ,marginLeft:30}} >
                    <Content>
                      <Picker
                        mode="dropdown"
                        selectedValue={this.state.cashBankValue}
                        onValueChange={this.onDropDownCashBankChange.bind(this)}
                      >
                        {this.pickerCashBankType()}
                      </Picker>
                    </Content>
                  </View>
                  <View style={{ width: 300 ,marginLeft:30}} >
                    <Content>
                      <Picker
                        mode="dropdown"
                        selectedValue={this.state.ledgerValue}
                        onValueChange={this.onDropDownLedgerBankChange.bind(this)}
                      >
                        {this.pickerLedger()}
                      </Picker>
                    </Content>
                  </View>
                  <View style={{ marginLeft: 30, width: 800, flexDirection: 'row', alignContent: 'space-around' }} >
                  <View style={{ width: 100 }} >
                    <Content>
                      <Picker
                        mode="dropdown"
                        selectedValue={this.state.Year}
                        onValueChange={this.onDropDownYearValueChange.bind(this)}
                      >
                        {this.pickerYearsItems()}
                      </Picker>
                    </Content>
                  </View>
                  
                  <View style={{ width: 130 }} >
                    <Content>
                      <Picker
                        mode="dropdown"
                        selectedValue={this.state.Month}
                        onValueChange={this.onDropDownMonthValueChange.bind(this)}
                      >
                        {this.pickerMonthsItems()}
                      </Picker>
                    </Content>
                  </View>
                  <View style={{ width: 80 }} >
                    <Content>
                      <Picker
                        mode="dropdown"
                        selectedValue={this.state.Day}
                        onValueChange={this.onDropDownDayValueChange.bind(this)}
                      >
                        {this.pickerDaysItems()}
                      </Picker>
                    </Content>
                  </View>

                </View>

                <Mytextinput
                  placeholder="Amount"
                  onChangeText={(amount) => this.setState({Amount:amount})}
                  maxLength={10}
                  keyboardType="numeric"
                  style={{ padding: 10 }}
                />
              
              
                <Mytextinput
                  placeholder="Details"
                  onChangeText={(particular) => this.setState({Particular:particular})}
                  maxLength={225}
                  numberOfLines={5}
                  multiline={true}
                  style={{ textAlignVertical: 'top', padding: 10 }}
                />
                <Mybutton title="Submit" customClick={this.submitTransaction} />
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
         
        </View>
      </SafeAreaView>
    );
  }
  onMonthChange(m) {

  }
  onDateChange = (d) => {
    console.warn(d);
    this.setState({ Day: d })
  }
  yearChange(year) {

    var nplDate = this.EngToNep(year, this.state.Month, this.state.Day);
    this.state.NepaliDateData = nplDate;
    this.state.Year = year;
    this.setState(this.state);

  }
  GetMonths = () => {
    var months = [];
    months.push({ value: 1, label: "Baishak" });
    months.push({ value: 2, label: "Jestha" });
    months.push({ value: 3, label: "Ashad" });
    months.push({ value: 4, label: "Shrawn" });
    months.push({ value: 5, label: "Bhadra" });
    months.push({ value: 6, label: "Ashwin" });
    months.push({ value: 7, label: "kartik" });
    months.push({ value: 8, label: "Mangshir" });
    months.push({ value: 9, label: "Poush" });
    months.push({ value: 10, label: "Magh" });
    months.push({ value: 11, label: "Falgun" });
    months.push({ value: 12, label: "Chaitra" });
    this.state.months = months;
  }
  IsLeapYear = (year) => {
    var a = year;
    if (a == 0) {
      if (a % 400 == 0) {
        return true;
      }
      else {
        return false;
      }

    }
    else {
      if (a % 4 == 0) {
        return true;
      }
      else {
        return false;
      }
    }
  }
  IsRangeEng = (yy, mm, dd) => {
    if (yy < 1944 || yy > 2033) {
      console.log("Supported only between 1944-2022");
      return false;
    }

    if (mm < 1 || mm > 12) {
      console.log("Error! value 1-12 only");
      return false;
    }

    if (dd < 1 || dd > 31) {
      console.log("Error! value 1-31 only");
      return false;
    }

    return true;
  }

  NepToEng = (yy, mm, dd) => {

    let bs =
      [
        { key: 0, date: [2000, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31] },
        { key: 1, date: [2001, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 2, date: [2002, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
        { key: 3, date: [2003, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 4, date: [2004, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31] },
        { key: 5, date: [2005, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 6, date: [2006, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
        { key: 7, date: [2007, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 8, date: [2008, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31] },
        { key: 9, date: [2009, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 10, date: [2010, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
        { key: 11, date: [2011, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 12, date: [2012, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30] },
        { key: 13, date: [2013, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 14, date: [2014, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
        { key: 15, date: [2015, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 16, date: [2016, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30] },
        { key: 17, date: [2017, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 18, date: [2018, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
        { key: 19, date: [2019, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31] },
        { key: 20, date: [2020, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 21, date: [2021, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 22, date: [2022, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30] },
        { key: 23, date: [2023, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31] },
        { key: 24, date: [2024, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 25, date: [2025, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 26, date: [2026, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 27, date: [2027, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31] },
        { key: 28, date: [2028, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 29, date: [2029, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30] },
        { key: 30, date: [2030, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 31, date: [2031, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31] },
        { key: 32, date: [2032, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 33, date: [2033, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
        { key: 34, date: [2034, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 35, date: [2035, 30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31] },
        { key: 36, date: [2036, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 37, date: [2037, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
        { key: 38, date: [2038, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 39, date: [2039, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30] },
        { key: 40, date: [2040, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 41, date: [2041, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
        { key: 42, date: [2042, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 43, date: [2043, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30] },
        { key: 44, date: [2044, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 45, date: [2045, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
        { key: 46, date: [2046, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 47, date: [2047, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 48, date: [2048, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 49, date: [2049, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30] },
        { key: 50, date: [2050, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31] },
        { key: 51, date: [2051, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 52, date: [2052, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 53, date: [2053, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30] },
        { key: 54, date: [2054, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31] },
        { key: 55, date: [2055, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 56, date: [2056, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30] },
        { key: 57, date: [2057, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 58, date: [2058, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31] },
        { key: 59, date: [2059, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 60, date: [2060, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
        { key: 61, date: [2061, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 62, date: [2062, 30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31] },
        { key: 63, date: [2063, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 64, date: [2064, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
        { key: 65, date: [2065, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 66, date: [2066, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31] },
        { key: 67, date: [2067, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 68, date: [2068, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
        { key: 69, date: [2069, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 70, date: [2070, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30] },
        { key: 71, date: [2071, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 72, date: [2072, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
        { key: 73, date: [2073, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 74, date: [2074, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 75, date: [2075, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 76, date: [2076, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30] },
        { key: 77, date: [2077, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31] },
        { key: 78, date: [2078, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 79, date: [2079, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 80, date: [2080, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30] },
        { key: 81, date: [2081, 31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30] },
        { key: 82, date: [2082, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30] },
        { key: 83, date: [2083, 31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30] },
        { key: 84, date: [2084, 31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30] },
        { key: 85, date: [2085, 31, 32, 31, 32, 30, 31, 30, 30, 29, 30, 30, 30] },
        { key: 86, date: [2086, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30] },
        { key: 87, date: [2087, 31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30] },
        { key: 88, date: [2088, 30, 31, 32, 32, 30, 31, 30, 30, 29, 30, 30, 30] },
        { key: 89, date: [2089, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30] },
        { key: 90, date: [2090, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30] }
      ];


    let def_eyy = 1943;
    let def_emm = 4;
    let def_edd = 14 - 1;		// init english date.
    let def_nyy = 2000; let def_nmm = 1; let def_ndd = 1;		// equivalent nepali date.
    let total_eDays = 0; let total_nDays = 0; let a = 0; let day = 4 - 1;		// initializations...
    let m = 0; let y = 0; let i = 0;
    let j = 0;
    let k = 0; let numDay = 0;

    let month = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let lmonth = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (this.IsRangeNep(yy, mm, dd) == false) {
      return new DateTime();

    }
    else {

      // count total days in-terms of year
      for (i = 0; i < (yy - def_nyy); i++) {
        for (j = 1; j <= 12; j++) {
          total_nDays += bs[k].date[j];
        }
        k++;
      }

      // count total days in-terms of month			
      for (j = 1; j < mm; j++) {
        total_nDays += bs[k].date[j];
      }

      // count total days in-terms of dat
      total_nDays += dd;

      //calculation of equivalent english date...
      total_eDays = def_edd;
      m = def_emm;
      y = def_eyy;
      while (total_nDays != 0) {
        if (this.IsLeapYear(y)) {
          a = lmonth[m];
        }
        else {
          a = month[m];
        }

        total_eDays++;
        day++;
        if (total_eDays > a) {
          m++;
          total_eDays = 1;
          if (m > 12) {
            y++;
            m = 1;
          }
        }
        if (day > 7)
          day = 1;
        total_nDays--;
      }
      numDay = day;

      var date = [y, m, total_eDays];
      return date;
    }
  }
   IsYearRangeNep=( yy)=>
  {
      if (yy < 2000 || yy > 2089)
      {
          console.warn("Supported only between 2000-2089");
          return false;
      }
      return true;
  }
    IsRangeNep=( yy,  mm,  dd)=>
  {
      if (!this.IsYearRangeNep(yy))
      {
          return false;
      }
      if (mm < 1 || mm > 12)
      {
          console.log("Error! value 1-12 only");
          return false;
      }

      if (dd < 1 || dd > 32)
      {
          console.log("Error! value 1-31 only");
          return false;
      }
      return true;
  }
  EngToNep = (yy, mm, dd) => {

    let bs =
      [
        { key: 0, date: [2000, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31] },
        { key: 1, date: [2001, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 2, date: [2002, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
        { key: 3, date: [2003, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 4, date: [2004, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31] },
        { key: 5, date: [2005, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 6, date: [2006, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
        { key: 7, date: [2007, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 8, date: [2008, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31] },
        { key: 9, date: [2009, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 10, date: [2010, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
        { key: 11, date: [2011, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 12, date: [2012, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30] },
        { key: 13, date: [2013, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 14, date: [2014, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
        { key: 15, date: [2015, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 16, date: [2016, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30] },
        { key: 17, date: [2017, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 18, date: [2018, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
        { key: 19, date: [2019, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31] },
        { key: 20, date: [2020, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 21, date: [2021, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 22, date: [2022, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30] },
        { key: 23, date: [2023, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31] },
        { key: 24, date: [2024, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 25, date: [2025, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 26, date: [2026, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 27, date: [2027, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31] },
        { key: 28, date: [2028, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 29, date: [2029, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30] },
        { key: 30, date: [2030, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 31, date: [2031, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31] },
        { key: 32, date: [2032, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 33, date: [2033, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
        { key: 34, date: [2034, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 35, date: [2035, 30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31] },
        { key: 36, date: [2036, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 37, date: [2037, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
        { key: 38, date: [2038, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 39, date: [2039, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30] },
        { key: 40, date: [2040, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 41, date: [2041, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
        { key: 42, date: [2042, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 43, date: [2043, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30] },
        { key: 44, date: [2044, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 45, date: [2045, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
        { key: 46, date: [2046, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 47, date: [2047, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 48, date: [2048, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 49, date: [2049, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30] },
        { key: 50, date: [2050, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31] },
        { key: 51, date: [2051, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 52, date: [2052, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 53, date: [2053, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30] },
        { key: 54, date: [2054, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31] },
        { key: 55, date: [2055, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 56, date: [2056, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30] },
        { key: 57, date: [2057, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 58, date: [2058, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31] },
        { key: 59, date: [2059, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 60, date: [2060, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
        { key: 61, date: [2061, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 62, date: [2062, 30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31] },
        { key: 63, date: [2063, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 64, date: [2064, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
        { key: 65, date: [2065, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 66, date: [2066, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31] },
        { key: 67, date: [2067, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 68, date: [2068, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
        { key: 69, date: [2069, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 70, date: [2070, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30] },
        { key: 71, date: [2071, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 72, date: [2072, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
        { key: 73, date: [2073, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 74, date: [2074, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 75, date: [2075, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 76, date: [2076, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30] },
        { key: 77, date: [2077, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31] },
        { key: 78, date: [2078, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 79, date: [2079, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 80, date: [2080, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30] },
        { key: 81, date: [2081, 31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30] },
        { key: 82, date: [2082, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30] },
        { key: 83, date: [2083, 31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30] },
        { key: 84, date: [2084, 31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30] },
        { key: 85, date: [2085, 31, 32, 31, 32, 30, 31, 30, 30, 29, 30, 30, 30] },
        { key: 86, date: [2086, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30] },
        { key: 87, date: [2087, 31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30] },
        { key: 88, date: [2088, 30, 31, 32, 32, 30, 31, 30, 30, 29, 30, 30, 30] },
        { key: 89, date: [2089, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30] },
        { key: 90, date: [2090, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30] }
      ];

    var months = [];
    months.push(1, "Baishak");
    months.push(2, "Jestha");
    months.push(3, "Ashad");
    months.push(4, "Shrawn");
    months.push(5, "Bhadra");
    months.push(6, "Ashwin");
    months.push(7, "kartik");
    months.push(8, "Mangshir");
    months.push(9, "Poush");
    months.push(10, "Magh");
    months.push(11, "Falgun");
    months.push(12, "Chaitra");
    if (this.IsRangeEng(yy, mm, dd) == false) {
      return null;
    }
    else {

      // english month data.
      var month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      var lmonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      var def_eyy = 1944; //spear head english date...
      var def_nyy = 2000;
      var def_nmm = 9;
      var def_ndd = 17 - 1; //spear head nepali date...
      var total_eDays = 0;
      var total_nDays = 0; var a = 0; var day = 7 - 1; //all the initializations...
      var m = 0; var y = 0; var i = 0; var j = 0;
      var numDay = 0;

      // count total no. of days in-terms of year
      for (i = 0; i < (yy - def_eyy); i++) { //total days for month calculation...(english)
        if (this.IsLeapYear(def_eyy + i))
          for (j = 0; j < 12; j++)
            total_eDays += lmonth[j];
        else
          for (j = 0; j < 12; j++)
            total_eDays += month[j];
      }

      // count total no. of days in-terms of month
      for (i = 0; i < (mm - 1); i++) {
        if (this.IsLeapYear(yy))
          total_eDays += lmonth[i];
        else
          total_eDays += month[i];
      }

      // count total no. of days in-terms of date
      total_eDays += dd;


      i = 0; j = def_nmm;
      total_nDays = def_ndd;
      m = def_nmm;
      y = def_nyy;

      // count nepali date from array
      while (total_eDays != 0) {
        a = bs[i].date[j];
        total_nDays++; //count the days
        day++; //count the days interms of 7 days
        if (total_nDays > a) {
          m++;
          total_nDays = 1;
          j++;
        }
        if (day > 7)
          day = 1;
        if (m > 12) {
          y++;
          m = 1;
        }
        if (j > 12) {
          j = 1; i++;
        }
        total_eDays--;
      }

      numDay = day;

      var nepDate = new this.NepDate();
      nepDate.Year = y;
      nepDate.Month = m;

      nepDate.Day = total_nDays;
      nepDate.TotalDaysOfMonth = bs[i].date[j];
      nepDate.WeekDayName = this.GetDayOfWeek(day);
      nepDate.MonthName = this.GetNepaliMonth(m - 1);
      nepDate.WeekDay = numDay;

      return nepDate;
    }
  }
  GetNepaliMonth = (m) => {
    var months = [];
    months.push("Baishak");
    months.push("Jestha");
    months.push("Ashad");
    months.push("Shrawn");
    months.push("Bhadra");
    months.push("Ashwin");
    months.push("kartik");
    months.push("Mangshir");
    months.push("Poush");
    months.push("Magh");
    months.push("Falgun");
    months.push("Chaitra");
    return months[m];
  }
  NepDate = () => {
    var Year;
    var Month;
    var TotalDaysOfMonth;
    var Day;
    var _weekDayName;

    var MonthName;
    var WeekDay;
  }
  GetDayOfWeek = (d) => {
    var day = "";
    switch (d) {
      case 1:
        day = "Sunday";
        break;

      case 2:
        day = "Monday";
        break;

      case 3:
        day = "Tuesday";
        break;

      case 4:
        day = "Wednesday";
        break;

      case 5:
        day = "Thursday";
        break;

      case 6:
        day = "Friday";
        break;

      case 7:
        day = "Saturday";
        break;
    }
    return day;
  }
  InitializeData = () => {
    bs =
      [
        { key: 0, date: [2000, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31] },
        { key: 1, date: [2001, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 2, date: [2002, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
        { key: 3, date: [2003, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 4, date: [2004, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31] },
        { key: 5, date: [2005, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 6, date: [2006, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
        { key: 7, date: [2007, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 8, date: [2008, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31] },
        { key: 9, date: [2009, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 10, date: [2010, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
        { key: 11, date: [2011, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 12, date: [2012, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30] },
        { key: 13, date: [2013, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 14, date: [2014, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
        { key: 15, date: [2015, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 16, date: [2016, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30] },
        { key: 17, date: [2017, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 18, date: [2018, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
        { key: 19, date: [2019, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31] },
        { key: 20, date: [2020, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 21, date: [2021, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 22, date: [2022, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30] },
        { key: 23, date: [2023, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31] },
        { key: 24, date: [2024, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 25, date: [2025, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 26, date: [2026, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 27, date: [2027, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31] },
        { key: 28, date: [2028, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 29, date: [2029, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30] },
        { key: 30, date: [2030, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 31, date: [2031, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31] },
        { key: 32, date: [2032, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 33, date: [2033, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
        { key: 34, date: [2034, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 35, date: [2035, 30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31] },
        { key: 36, date: [2036, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 37, date: [2037, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
        { key: 38, date: [2038, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 39, date: [2039, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30] },
        { key: 40, date: [2040, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 41, date: [2041, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
        { key: 42, date: [2042, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 43, date: [2043, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30] },
        { key: 44, date: [2044, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 45, date: [2045, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
        { key: 46, date: [2046, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 47, date: [2047, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 48, date: [2048, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 49, date: [2049, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30] },
        { key: 50, date: [2050, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31] },
        { key: 51, date: [2051, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 52, date: [2052, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 53, date: [2053, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30] },
        { key: 54, date: [2054, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31] },
        { key: 55, date: [2055, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 56, date: [2056, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30] },
        { key: 57, date: [2057, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 58, date: [2058, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31] },
        { key: 59, date: [2059, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 60, date: [2060, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
        { key: 61, date: [2061, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 62, date: [2062, 30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31] },
        { key: 63, date: [2063, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 64, date: [2064, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
        { key: 65, date: [2065, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 66, date: [2066, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31] },
        { key: 67, date: [2067, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 68, date: [2068, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
        { key: 69, date: [2069, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 70, date: [2070, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30] },
        { key: 71, date: [2071, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 72, date: [2072, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
        { key: 73, date: [2073, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
        { key: 74, date: [2074, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 75, date: [2075, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 76, date: [2076, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30] },
        { key: 77, date: [2077, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31] },
        { key: 78, date: [2078, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 79, date: [2079, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
        { key: 80, date: [2080, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30] },
        { key: 81, date: [2081, 31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30] },
        { key: 82, date: [2082, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30] },
        { key: 83, date: [2083, 31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30] },
        { key: 84, date: [2084, 31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30] },
        { key: 85, date: [2085, 31, 32, 31, 32, 30, 31, 30, 30, 29, 30, 30, 30] },
        { key: 86, date: [2086, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30] },
        { key: 87, date: [2087, 31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30] },
        { key: 88, date: [2088, 30, 31, 32, 32, 30, 31, 30, 30, 29, 30, 30, 30] },
        { key: 89, date: [2089, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30] },
        { key: 90, date: [2090, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30] }
      ];

    var months = [];
    months.push(1, "Baishak");
    months.push(2, "Jestha");
    months.push(3, "Ashad");
    months.push(4, "Shrawn");
    months.push(5, "Bhadra");
    months.push(6, "Ashwin");
    months.push(7, "kartik");
    months.push(8, "Mangshir");
    months.push(9, "Poush");
    months.push(10, "Magh");
    months.push(11, "Falgun");
    months.push(12, "Chaitra");
    return bs;

  }
  


};

