import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Keyboard,
  ImageBackground,
  Alert
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import Colors from '../../utils/Colors';
import Images from '../../utils/Images';
import Activity from '../../components/ActivityIndicator'
import { getConfiguration , setConfiguration} from '../../utils/configuration';

export default class otpScreen extends Component {


  constructor(props) {
    super(props);
    this.state = {
      firstdigit: '',
      seconddigit: '',
      thirddigit: '',
      fourthdigit: '',
      serverOTP: '',
      mobNum:'',
      timerStr:60,
      timer: null,


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
     this.setState({serverOTP:payload.state.params.OTP,mobNum: payload.state.params.mobileNumber})
}

  componentDidMount() {



    // var mob = this.props.navigation.getParam('countryCode', '') + this.props.navigation.getParam('mobileNumber', '')
    // console.log('Ötp Hereddd',this.props.navigation.getParam('OTP', ''));

    // this.setState({ mobNum:mob,serverOTP: this.props.navigation.getParam('OTP', '') });
    // console.log('Ötp Here',this.state.serverOTP ,mob);
  }

  goBack() {
    this.props.navigation.goBack();
  }




  showAlert(message, duration) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      alert(message);
    }, duration);
  }

verifyAction(){

  // var otp = this.state.firstdigit + this.state.seconddigit + this.state.thirddigit + this.state.fourthdigit;
  // if (otp == this.state.serverOTP) {

  //   if (this.props.navigation.getParam('forgot', '') == "true") {
  //     this.props.navigation.navigate('ForgotPasswordScreen', { OTP: this.state.serverOTP, mobileNumber: this.props.navigation.getParam('mobileNumber', '') });

  //   }
  //   else {
  //     this.props.navigation.navigate('RegisterScreen', { OTP: this.state.serverOTP, mobileNumber: this.props.navigation.getParam('mobileNumber', ''), countryCode: this.props.navigation.getParam('countryCode', '') });

  //   }
  // }
  // else {
  //   this.showAlert('Entered OTP is invalid.', 300)
  // }

  // console.log("Entered OTP", otp);

  console.log("forgot OTP", this.props.navigation.getParam('forgot', ''));

  var otp = this.state.firstdigit + this.state.seconddigit + this.state.thirddigit + this.state.fourthdigit;
   if (otp == this.state.serverOTP) {

     if (this.props.navigation.getParam('forgot', '') == 'true') {
       this.props.navigation.navigate('ForgotPasswordScreen', { OTP: this.state.serverOTP, mobileNumber: this.props.navigation.getParam('mobileNumber', '') });

       //mobileNumber
     }
     else {
       this.props.navigation.navigate('RegisterScreen', { OTP: this.state.serverOTP, mobileNumber: this.props.navigation.getParam('mobileNumber', ''), countryCode: this.props.navigation.getParam('countryCode', '') });

     }
   }
   else {
     alert('Entered OTP is invalid.', 300)
   }

   console.log("Entered OTP", otp);

    
  }

  // this.props.navigation.navigate('RegisterScreen');





  resendOTP(){

  //   setConfiguration('token', '');
  //   setConfiguration('userId', '');

   this.props.loginWithPhone(this.state.mobNum)
     .then(() => this.afterLogin())
   .catch(e => this.showAlert(e.message, 300));

 }

 afterLogin() {
  console.log("isBusy value --- ",this.props.isBusy);
  console.log("response value --- ",this.props.response);

  Alert.alert('OTP sent Successfully.')

 
    
  }

  showAlert(message, duration) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      alert(message);
    }, duration);
  }




  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        
        <View style={styles.headerView}>
          <TouchableOpacity
            style={styles.backTouchable}
            onPress={() => this.goBack()}>
            <Image resizeMode="contain" style={styles.backIcon}
              source={Images.backImage}
            />
          </TouchableOpacity>
          <Text allowFontScaling={false}  style={styles.title}>Verify OTP</Text>
        </View>



        <View style={styles.gridViewBackground}>
          <View style={{
            backgroundColor: 'transparent',
            width: 'auto',
            height: 'auto',
            marginTop: 20,
            marginHorizontal: 20,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
          }}>

            <Text allowFontScaling={false}  style={{ fontSize: wp('4.8%'), color: 'black', fontWeight: '300',marginTop:30 ,textAlign:'justify',width:'90%' }}>OTP</Text>
           
          </View>


          <View style={{
            backgroundColor: 'transparent',
            width: '80%',
            marginLeft:'10%',
            height: 50,
            marginTop: 20,
            marginHorizontal: 0,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row'
          }}>

            <TextInput
              style={{ width: 40, height: 50, paddingBottom: 0, borderBottomWidth: 0.5,borderBottomColor:'black' , fontSize: wp('8%'), marginHorizontal: 5 }}
              placeholder="0"
              maxLength={1}
              textAlign={'center'}
              ref='firstdigit'
              keyboardType='number-pad'
              returnKeyType='done'
              clearTextOnFocus={false}
              autoCorrect={false}
              enablesReturnKeyAutomatically={false}
              placeholderTextColor={'#818e97'}  
              autoCorrect={false}
              onKeyPress={firstdigit => {
                if (this.state.firstdigit.length == 1) {
                  if (firstdigit.nativeEvent.key == 'Backspace') {

                  } else {
                    this.setState({ seconddigit: firstdigit.nativeEvent.key })
                    this.refs.seconddigit.focus();
                  }

                }
              }

              }
              onChangeText={firstdigit => {
                this.setState({ firstdigit: firstdigit })

                if (firstdigit && firstdigit.length == 1) {
                  this.refs.seconddigit.focus();
                }
              }}

              value={this.state.firstdigit}
            />

            <TextInput
              style={{ width: 40, height: 50, paddingBottom: 0, borderBottomWidth: 0.5,borderBottomColor:'black', fontSize: wp('8%'), marginHorizontal: 5 }}
              placeholder="0"
              maxLength={1}
              textAlign={'center'}
              ref='seconddigit'
              keyboardType='number-pad'
              returnKeyType='done'
              clearTextOnFocus={false}
              autoCorrect={false}
              enablesReturnKeyAutomatically={false}
              placeholderTextColor={'#818e97'}
              autoCorrect={false}
              onKeyPress={seconddigit => {
                if (this.state.seconddigit.length == 1) {
                  if (seconddigit.nativeEvent.key == 'Backspace') {

                  } else {
                    this.setState({ thirddigit: seconddigit.nativeEvent.key })
                    this.refs.thirddigit.focus();
                  }

                }
              }

              }
              onEndEditing={seconddigit => {

                if (seconddigit && seconddigit.length == 1) {
                  // this.refs.thirddigit.focus();
                }
                else if (seconddigit.length == 0) {
                  // this.refs.firstdigit.focus();
                }

              }}
              onChangeText={seconddigit => {
                this.setState({ seconddigit: seconddigit })

                if (seconddigit && seconddigit.length == 1) {
                  this.refs.thirddigit.focus();
                }
                else if (seconddigit.length == 0) {
                  this.refs.firstdigit.focus();
                }
              }}
              value={this.state.seconddigit}
            />



            <TextInput
              style={{ width: 40, height: 50, paddingBottom: 0, borderBottomWidth: 0.5,borderBottomColor:'black', fontSize: wp('8%'), marginHorizontal: 5 }}
              placeholder="0"
              maxLength={1}
              textAlign={'center'}
              ref='thirddigit'
              keyboardType='number-pad'
              returnKeyType='done'
              clearTextOnFocus={false}
              autoCorrect={false}
              enablesReturnKeyAutomatically={false}
              placeholderTextColor={'#818e97'}
              autoCorrect={false}
              onKeyPress={thirddigit => {
                if (this.state.thirddigit.length == 1) {
                  if (thirddigit.nativeEvent.key == 'Backspace') {

                  } else {
                    this.setState({ fourthdigit: thirddigit.nativeEvent.key })
                    this.refs.fourthdigit.focus();
                  }

                }
              }
              }
              onFocus={thirddigit => {
                if (thirddigit && thirddigit.length == 1) {
                }
              }}
              onChangeText={thirddigit => {
                this.setState({ thirddigit: thirddigit })

                if (thirddigit && thirddigit.length == 1) {
                  this.refs.fourthdigit.focus();
                }
                else if (thirddigit.length == 0) {
                  this.refs.seconddigit.focus();
                }
              }}
              value={this.state.thirddigit}
            />

            <TextInput
              style={{ width: 40, height: 50, paddingBottom: 0, borderBottomWidth: 0.5,borderBottomColor:'black', fontSize: wp('8%'), marginHorizontal: 5 }}
              placeholder="0"
              maxLength={1}
              textAlign={'center'}
              ref='fourthdigit'
              keyboardType='number-pad'
              returnKeyType='done'
              clearTextOnFocus={false}
              autoCorrect={false}
              enablesReturnKeyAutomatically={false}
              placeholderTextColor={'#818e97'}
              autoCorrect={false}
              onChangeText={fourthdigit => {
                this.setState({ fourthdigit: fourthdigit })

                if (fourthdigit.length == 0) {
                  this.refs.thirddigit.focus();
                }
              }}
              value={this.state.fourthdigit}
            />



          </View>




        </View>






        <TouchableOpacity onPress={() => this.verifyAction()} style={{width:'80%',height:50,marginTop:'12%',backgroundColor:Colors.RED,justifyContent:'center',alignSelf:'center',borderRadius:25 }}>
        <Text allowFontScaling={false}  style={{ fontWeight:'bold',fontSize:18,color:Colors.White,alignSelf:'center'}}>Verify</Text>

       

</TouchableOpacity>


        

{/* 
<View style={styles.arrowTile}>
          <TouchableOpacity onPress={() => this.resendOTP()} style={styles.resendTile}>
          <Text allowFontScaling={false}  style={styles.txtResend}>Resend OTP code</Text>

          </TouchableOpacity>
          
        </View> */}
        {this.props.isBusy || this.props.isBusySocial || this.props.isBusyGetProfile ? <Activity /> : null}
        {/* <TouchableOpacity
            style={styles.touchableArrow}
            onPress={() => this.goToNextScreen()}>

<Text allowFontScaling={false}  style={[styles.txtResend,{color:'white'}]}>VERIFY</Text>


          </TouchableOpacity> */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  headerView: {
    height: 60,
    width: '100%',
    backgroundColor: Colors.white,
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
  innerView: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#ffffff',
    borderWidth: 0.0
  },
  tileBG: {
    height: 40,
    width: 'auto',
    backgroundColor: 'white',
    borderColor: '#000000',
    borderWidth: 0.0,
    marginHorizontal: 20,
    marginTop: 20,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.6,
    shadowRadius: 0.5,
  },
  tileText: {
    fontSize: wp('4.2%'),
    color: '#000000',
  },
  tileArror: {
    position: 'absolute',
    right: 18,
    height: 18,
    width: 20
  },

  gridViewBackground: {
    height: 'auto',
    width: '100%',
    marginTop: 25,
    borderColor: '#f5f6f8',
    borderWidth: 0,
    backgroundColor: 'transparent',
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
  arrowIcon: {
    width: wp('10%'),
    height: wp('10%')

  },
  touchableArrow: {
    backgroundColor: Colors.PrimaryColor,
    height: 50,
    width: '80%',
    marginLeft:"10%",
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:35
  },
  arrowTile: {
    backgroundColor: 'transparent',
    height: 50,
    width:'80%',
    marginLeft: '10%',
    flexDirection: 'row',
    borderWidth: 0,
    borderColor: 'blue',
    top:30
  },
  resendTile: {
    width: '100%',
    height: wp('9%'),
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },

  touchableResend: {
    backgroundColor: 'transparent',
    height: 70,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtResend: {
    color: '#344e67',
    fontSize: wp('4.8%')
  }


});
