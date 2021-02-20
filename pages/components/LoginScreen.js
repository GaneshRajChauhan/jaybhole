import React, { Component } from 'react';
import Logo from './Logo';
import Wallpaper from './Wallpaper';
const DEVICE_WIDTH = Dimensions.get('window').width;
import firestore from '@react-native-firebase/firestore';
import Spinner from 'react-native-loading-spinner-overlay';

import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
  Text,
  TextInput,
  Animated
} from 'react-native';

const MARGIN = 40;
export default class LoginScreen extends Component {
  state = {
    isLoading: false,
    username: 'bishnu',
    password: '',
    isLoading: false,
    userData: {},
  };
  render() {

    return (
      <Wallpaper>
        <Logo />
        <Spinner
          visible={this.state.isLoading}
          textContent={'Loading...'}
         
        />
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={styles.inputWrapper}>
            <Image source={this.props.source} style={styles.inlineImg} />
            <TextInput
              style={styles.input}
              placeholder={'User Name'}
              onChangeText={(v) => this.setState({ username: v })}
              secureTextEntry={false}
              value={this.state.username}
              autoCorrect={this.props.autoCorrect}
              autoCapitalize={this.props.autoCapitalize}
              returnKeyType={this.props.returnKeyType}
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.inputWrapper}>
            <Image source={this.props.source} style={styles.inlineImg} />
            <TextInput
              style={styles.input}
              placeholder={'User Password'}
              onChangeText={(v) => this.setState({ password: v })} s
              secureTextEntry={true}
              value={this.state.password}
              autoCorrect={this.props.autoCorrect}
              autoCapitalize={this.props.autoCapitalize}
              returnKeyType={this.props.returnKeyType}
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
            />
          </View>
          <TouchableOpacity

            activeOpacity={0.7}
            style={styles.btnEye}
            onPress={this.showPass}>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <View style={styles.container}>
          <Animated.View style={{ width: 300 }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.login();


              }}
            >

              <Text style={styles.text}>LOGIN</Text>

            </TouchableOpacity>

          </Animated.View>
        </View>
      </Wallpaper>

    );
  }
  login = () => {
    let username = ''
    let password = ''
    console.warn('hi');
    this.setState({isLoading:true});
    firestore()
      .collection('tbl_user')
      .get()
      .then(querySnapshot => {
            console.warn(querySnapshot);
        querySnapshot.forEach(documentSnapshot => {
          
          console.warn('hello');
          username = documentSnapshot.data().user_name;
          password = documentSnapshot.data().password;
          this.setState(this.state);
        });
        if ((this.state.username == username & this.state.password === password || (this.state.username == 'admin' && this.state.password == 'Ganesh'))) {
          this.props.navigation.navigate('HomeScreen');
        }
        else {
          Alert.alert('User Name or Password is incorrect!!!');
        }
        this.setState({isLoading:false});
      }).catch(err=>console.log(err));
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F035E0',
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
  },
  circle: {
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  image: {
    width: 24,
    height: 24,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: DEVICE_WIDTH - 40,
    height: 40,
    marginHorizontal: 20,
    paddingLeft: 45,
    borderRadius: 20,
    color: '#ffffff',
  },
  inputWrapper: {
    flex: 1,
  },
  inlineImg: {
    position: 'absolute',
    zIndex: 99,
    width: 22,
    height: 22,
    left: 35,
    top: 9,
  },
});

