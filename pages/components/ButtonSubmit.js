import React, {Component} from 'react';
import PropTypes from 'prop-types';
  import {Dimensions} from 'react-native';
  import {
    StyleSheet,
    TouchableOpacity,
    Text,
    Animated,
    Easing,
    Image,
    Alert,
    View,
  } from 'react-native';

import spinner from '../images/loading.gif';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

export default class ButtonSubmit extends Component {

  state = {
    isLoading: false,
  };

  

  render() {
    
console.warn(this.props);
    return (
      <View style={styles.container}>
        <Animated.View style={{width: 300}}>
          <TouchableOpacity
            style={styles.button}
            onPress={()=>{console.warn(this.props)}}
            >
            {this.state.isLoading ? (
              <Image source={spinner} style={styles.image} />
            ) : (
              <Text style={styles.text}>LOGIN</Text>
            )}
          </TouchableOpacity>
       
        </Animated.View>
      </View>
    );
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
    // height: MARGIN,
    // width: MARGIN,
    // marginTop: -MARGIN,
    // borderWidth: 1,
    // borderColor: '#F035E0',
    // borderRadius: 100,
    // alignSelf: 'center',
    // zIndex: 99,
    // backgroundColor: '#F035E0',
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  image: {
    width: 24,
    height: 24,
  },
});
