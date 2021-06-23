
import React from "react";
import {
  Container,
  ActivityIndicator,
  Content,
  Text,
  View,
  Image,
  Dimensions
} from "react-native";
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const DummySplash = props => (

  <View style={{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'

  }}>
    <Image resizeMode="stretch" style={{ width: screenWidth, height: screenHeight }} source={require('../../../assets1/splash.jpg')} />

    {/* <Text allowFontScaling={false}  style={{ fontSize:18,position:'absolute',bottom:30,color:'#363A61' , fontWeight: 'bold',alignSelf:'center',marginTop:'12%',width:'90%',textAlign:'center' }}>IsoCare by Amandeep in Association with District Administration Amritsar</Text> */}


  </View>
);

export default DummySplash;
