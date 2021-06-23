import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Platform,
  StatusBar,
  AsyncStorage,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Dimensions
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
import Colors from '../../utils/Colors';
import Images from '../../utils/Images';


export default class changePassword extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      name: '',
      email: '',
      googleId: '',
      facebookId: '',
      countryCode: '+234',
      photo: '',
      mainViewTop: 0,
      autoLogin: true,
      scrollPadding:0,
      password:''
    };

    const { navigation } = props;

    

  }

  _keyboardDidShow() {
   // this.refs._scrollView.scrollTo(220);
    this.setState({
      scrollPadding: -100

    });
  }

  _keyboardDidHide() {
    // this.refs._scrollView.scrollTo(0);

    this.setState({
      scrollPadding: 0
    });
  }

 componentDidMount() {
 
  

  

  this.keyboardDidShowListener = Keyboard.addListener(
    'keyboardDidShow',
    this._keyboardDidShow.bind(this),
  );
  this.keyboardDidHideListener = Keyboard.addListener(
    'keyboardDidHide',
    this._keyboardDidHide.bind(this),
  );


}


componentWillUnmount() {
  this.keyboardDidShowListener.remove();
  this.keyboardDidHideListener.remove();
}

loginAction(){


}
goBack() {
  this.props.navigation.goBack();
}


  render() {
   
    return (
      <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
              <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
              <View style={styles.headerView}>
<TouchableOpacity
            style={styles.backTouchable}
            onPress={() => this.goBack()}>
            <Image resizeMode="contain" style={styles.backIcon}
              source={Images.backImage}
            />
          </TouchableOpacity>
         <Text allowFontScaling={false}  style={styles.title}>Change Password</Text>
       </View>

       <Image
                    resizeMode="contain"
                    style={{alignSelf:'center',marginTop:'12%'}}
                    source={Images.GroupPass}
                />

<View style={{width:'80%',height:60,alignSelf:'center',backgroundColor:'transparent',marginTop:'12%'}}>
        <Text allowFontScaling={false}  style={{ fontSize:16,color:Colors.black}}>Old Password</Text>
        
        <View style={{width:'100%',height:40,alignSelf:'center',backgroundColor:'transparent',flexDirection:'row'}}>
       
        <View style={{width:30,height:40,backgroundColor:'transparent',alignItems:'center',flexDirection:'row'}}>
        <Image  resizeMode="contain" style={{width:18,height:18}}
  source={Images.password}
  />

         </View> 
         <TextInput
                style={styles.searchTextInput}
                placeholder="Enter your old password"
                placeholderTextColor= {'#818e97'}
                autoCorrect= {false}
                onChangeText={(phone) => this.setState({phone})}
                value={this.state.phone}
                autoCapitalize = 'none'
            
              />      
        
        </View>

        </View>

        <View style={{width:'80%',height:1,alignSelf:'center',backgroundColor:Colors.TextColor}}></View>


        <View style={{width:'80%',height:60,alignSelf:'center',backgroundColor:'transparent',marginTop:'5%'}}>
        <Text allowFontScaling={false}  style={{ fontSize:16,color:Colors.black}}>New Password</Text>
        
        <View style={{width:'100%',height:40,alignSelf:'center',backgroundColor:'transparent',flexDirection:'row'}}>
       
        <View style={{width:30,height:40,backgroundColor:'transparent',alignItems:'center',flexDirection:'row'}}>
        <Image  resizeMode="contain" style={{width:18,height:18}}
  source={Images.password}
  />

         </View> 
         <TextInput
                style={styles.searchTextInput}
                placeholder="Enter new password"
                placeholderTextColor= {'#818e97'}
                autoCorrect= {false}
                onChangeText={(phone) => this.setState({phone})}
                value={this.state.phone}
                autoCapitalize = 'none'
              
              />      
        
        </View>

        </View>

        <View style={{width:'80%',height:1,alignSelf:'center',backgroundColor:Colors.TextColor}}></View>



        <View style={{width:'80%',height:60,alignSelf:'center',backgroundColor:'transparent',marginTop:'5%'}}>
        <Text allowFontScaling={false}  style={{ fontSize:16,color:Colors.black}}>Confirm Password</Text>
        
        <View style={{width:'100%',height:40,alignSelf:'center',backgroundColor:'transparent',flexDirection:'row'}}>
       
        <View style={{width:30,height:40,backgroundColor:'transparent',alignItems:'center',flexDirection:'row'}}>
        <Image  resizeMode="contain" style={{width:18,height:18}}
  source={Images.password}
  />

         </View> 
         <TextInput
                style={styles.searchTextInput}
                placeholder="Enter confirm password"
                placeholderTextColor= {'#818e97'}
                autoCorrect= {false}
                onChangeText={(phone) => this.setState({phone})}
                value={this.state.phone}
                autoCapitalize = 'none'
             
              />      
        
        </View>

        </View>

        <View style={{width:'80%',height:1,alignSelf:'center',backgroundColor:Colors.TextColor}}></View>


        <TouchableOpacity onPress={() => this.loginAction()} style={{width:250,height:60,marginTop:'15%',backgroundColor:'transparent',justifyContent:'center',alignSelf:'center' }}>
        <Image  resizeMode="contain" style={{width:'100%',height:'100%',alignSelf:'center'}}
  source={Images.doneBtn}
  />

</TouchableOpacity>

              </KeyboardAwareScrollView>

      </SafeAreaView>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  containterNew : {
    width: Dimensions.get("window").width, //for full screen
    height: Dimensions.get("window").height //for full screen
  },
  fixed: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  searchTextInput: {
    height: 40,
    width: '80%',
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
    borderColor: 'gray',
    borderRadius: 0,
    fontSize: 16,
    fontFamily: "Arial",
    // top:2.5

  },
  scrollView: {
    backgroundColor: 'transparent',
    marginHorizontal: 0,
    
  },
  headerView: {
    height: 60,
    width: '100%',
    backgroundColor: Colors.White,
    borderColor: '#0082cb',
    borderWidth: 0,
     justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row'
  },
  title: {
    fontSize: wp('4.8%'),
    color: Colors.black,
    alignSelf:'center'
  },
  backTouchable: {
    width: 60,
    height: 60,
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute'

  },
  backIcon: {

    width: 22,
    height: 22,
    backgroundColor: 'transparent',

  },
});
