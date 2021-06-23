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
import { getConfiguration , setConfiguration} from '../../utils/configuration';
import Activity from '../../components/ActivityIndicator'

export default class password extends React.Component {

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
    this.didFocusListener = navigation.addListener(
        'didFocus',
        this.componentDidFocus,
    );

  }

  
  componentDidFocus = payload => {
    const { params } = payload.action;

    console.log('screen value Loan:',payload.state.params)
     this.setState({phone: payload.state.params.mobileNumber})
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

checkPassword(mobileNumber,password) {
   //console.log("hurrayyyyyy in methodfcmToken value", this.state.fcmToken);
  this.props.checkPasswordAPI(mobileNumber, password , )
    .then(() => this.afterCheckPassword())
  .catch(e => this.showAlert(e.message, 300));

}


afterCheckPassword() {
 console.log("isBusy value --- ",this.props.isBusy);
console.log("response value --- ",this.props.response);
if(this.props.response.response.success == 'true')
{
    // var token =  this.props.response.response.data.token;
    // setConfiguration('token', token);

if(this.props.response.response.user_type == 1){


  const id = this.props.response.response.data.nurse_ref;

    setConfiguration('user_id',id)
    setConfiguration('userType','1')

    this.storeData();
    this.props.navigation.navigate('HomeEmpScreen')


}else{
  

  const id = this.props.response.response.data.user_ref;

  setConfiguration('user_id',id)
  setConfiguration('userType','0')

  this.storeData();
  this.props.navigation.navigate('HomeScreen')

}

    


      


}else{

  this.showAlert('Please enter correct password', 300)

}


}
storeData = async () => {
  try {
    const user_id = getConfiguration('user_id');
    await AsyncStorage.setItem('user_id', user_id);

    const userType = getConfiguration('userType');
    await AsyncStorage.setItem('userType', userType);


    console.log('success in storage');

  } catch (e) {
    // saving error
    console.log('error in storage', e);
  }
}





forgotPassword()
 {


  this.forgotPasswordAPICall(this.props.navigation.getParam('mobileNumber', ''));



 }

forgotPasswordAPICall(mobileNumber,countryCode) {
         this.props.forgotPasswordAPI(mobileNumber, countryCode)
           .then(() => this.afterForgotPasswordAPI())
         .catch(e => this.showAlert(e.message, 300));

       }


     afterForgotPasswordAPI() {
        console.log("isBusy value --- ",this.props.isBusyForgot);
       console.log("response value --- ",this.props.responseForgot);

       const id = this.props.responseForgot.response.data.user_ref;

       setConfiguration('user_id',id)
        this.props.navigation.navigate('OtpScreen',{mobileNumber: this.state.phone, OTP: this.props.responseForgot.response.otp , forgot: 'true', countryCode: this.props.navigation.getParam('countryCode', '') });



      }


      showAlert(message, duration) {
        this.setState({ autoLogin: false });
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          alert(message);
        }, duration);
      }

loginAction(){


if(this.state.password == ''){

  this.showAlert('Please enter password', 300)
}else{

this.checkPassword(this.state.phone , this.state.password)

}


  // this.checkPassword(this.props.navigation.getParam('mobileNumber', ''), this.state.password);

  //  this.props.navigation.navigate('OtpScreen');

}
goBack() {
    this.props.navigation.goBack();
  }

  forgotAction(){



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
         <Text allowFontScaling={false}  style={styles.title}>Password</Text>
       </View>


       <View style={{width:'80%',height:60,alignSelf:'center',backgroundColor:'transparent',marginTop:'15%'}}>
        <Text allowFontScaling={false}  style={{ fontSize:16,color:Colors.darkText}}>Password</Text>

        <View style={{width:'100%',height:50,alignSelf:'center',backgroundColor:'transparent',flexDirection:'row'}}>
        <Image resizeMode="contain" style={{width:20,height:20,marginTop:13}}
              source={Images.password}
            />

         <TextInput
                style={styles.searchTextInput}
                placeholder="Enter Password"
                placeholderTextColor= {'#818e97'}
                autoCorrect= {false}
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
                autoCapitalize = 'none'    
                secureTextEntry = {true}
              />

        </View>

        </View>

        <View style={{width:'80%',marginTop:5,height:1,alignSelf:'center',backgroundColor:Colors.TextColor}}></View>

        <TouchableOpacity onPress={() => this.loginAction()} style={{width:'80%',height:50,marginTop:'12%',backgroundColor:Colors.RED,justifyContent:'center',alignSelf:'center',borderRadius:25 }}>
        <Text allowFontScaling={false}  style={{ fontWeight:'bold',fontSize:18,color:Colors.White,alignSelf:'center'}}>Continue</Text>



</TouchableOpacity>

<TouchableOpacity onPress={() => this.forgotPassword()} >
<Text allowFontScaling={false}  style={{ fontSize:16,color:Colors.darkText,alignSelf:'center',marginTop:'12%'}}>Forgot Password</Text>
</TouchableOpacity>


              </KeyboardAwareScrollView>
              {this.props.isBusy ? <Activity /> : null}

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
    height: 50,
    width: '80%',
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    borderColor: 'gray',
    borderRadius: 0,
    fontSize: 15,
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
