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
  Dimensions,
  Alert,
  CheckBox,
  Linking
} from 'react-native';


import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
import Colors from '../../utils/Colors';
import Images from '../../utils/Images';
import Activity from '../../components/ActivityIndicator'
import DummySplash from '../../components/DummySplash';
import { getConfiguration, setConfiguration } from '../../utils/configuration';


export default class login extends React.Component {

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
      scrollPadding: 0,
      password: '',
      isSelected: false
    };

    const { navigation } = props;
    this.didFocusListener = navigation.addListener(
      'didFocus',
      this.componentDidFocus,
    );

  }


  componentDidFocus = payload => {
    const { params } = payload.action;
    this.getData()

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


  async getData() {

    console.log("onloginchecking...........");

    const us = await AsyncStorage.getItem('user_id');
    setConfiguration('user_id', us);

    const userType = await AsyncStorage.getItem('userType');
    setConfiguration('userType', userType);

    const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');


    if (selectedLanguage == "" || selectedLanguage == null || selectedLanguage.toLocaleLowerCase() == "english") {
      this.props.getSelectedLanguage("english")
        .then(() => this.afterlanguageset())
        .catch(e => this.showAlert(e.message, 300));
    }
    else if (selectedLanguage.toLocaleLowerCase() == "punjabi") {
      this.props.getSelectedLanguage("punjabi")
        .then(() => this.afterlanguageset())
        .catch(e => this.showAlert(e.message, 300));
    }
    else if (selectedLanguage.toLocaleLowerCase() == "hindi") {
      this.props.getSelectedLanguage("hindi")
        .then(() => this.afterlanguageset())
        .catch(e => this.showAlert(e.message, 300));
    }


    //
    if (us != '' && us != null) {

      if (userType == '0') {
        console.log("onloginchecking...........HomeScreen");
        this.props.navigation.navigate('HomeScreen')
      } else {

        this.props.navigation.navigate('HomeEmpScreen')

      }



    } else {

      this.setState({ autoLogin: false });


    }
  }

  afterlanguageset() {
    console.log("language set value ------- ", this.props);
  }


  showAlert(message, duration) {
    this.setState({ autoLogin: false });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      alert(message);
    }, duration);
  }


  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  // login() {

  //       //  setConfiguration('token', '');
  //       //  setConfiguration('user_id', '');

  //         this.props.loginWithPhone(this.state.phone)
  //           .then(() => this.afterLogin())
  //         .catch(e => this.showAlert(e.message, 300));

  //       }

  //       afterLogin() {
  //     console.log("isBusy value --- ",this.props.isBusy);
  //    console.log("response value --- ",this.props.response);


  //     let isExist = this.props.response.response.status;
  //     console.log("hdafsbfjv",isExist);
  //     if (isExist == '1') {
  //         this.props.navigation.navigate('PasswordScreen',{mobileNumber: this.state.phone, countryCode: this.state.countryCode});
  //     }
  //     else {
  //         this.props.navigation.navigate('OtpScreen',{OTP: this.props.response.response.otp, forgot: 'false',mobileNumber:this.state.phone});
  //     }
  //     //  this.setState({
  //     //    phone: ''
  //     //  });

  //   }



  loginPatient() {


    this.props.PatientLogin(this.state.email, this.state.password)
      .then(() => this.afterloginPatient())
      .catch(e => this.showAlert(e.message, 300));

  }

  afterloginPatient() {
    console.log("isBusy value --- ", this.props.isBusyLogin);
    console.log("response value --- ", this.props.responseLogin);

    if (this.props.responseLogin.response.success == 'false') {

      Alert.alert(this.props.responseLogin.response.message)

    } else {

      const id = this.props.responseLogin.response.data.patient_ref;

      setConfiguration('user_id', id)
      setConfiguration('userType', '0')

      this.storeData();
      this.props.navigation.navigate('HomeScreen')

    }



  }

  validate = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      return false;
    }
    else {
      return true;
    }
  }

  loginAction() {

    // this.props.navigation.navigate('HomeScreen')




    if (this.state.email == '') {

      this.showAlert(this.props.languages.enter_email_login, 100)

    }
    else if (this.state.password == '') {

      this.showAlert(this.props.languages.enter_pass_login, 100)

    } 
    else if(this.state.isSelected == false)
    {
      this.showAlert("Please agree to our terms and conditons", 100)
    }
    else {

      this.loginPatient()


    }


    //this.props.navigation.navigate('PasswordScreen');

  }

  setSelection = () => {
    this.setState({ isSelected: !this.state.isSelected });
  }

  opnewebPage() {
    Linking.canOpenURL("http://isocare.co.in/Privacy-page.html").then(supported => {
      if (supported) {
        Linking.openURL("http://isocare.co.in/Privacy-page.html");
      } else {
        console.log("Don't know how to open URI: " + this.props.url);
      }
    });
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

  render() {

    // if (this.state.autoLogin == true) {
    //   return (<DummySplash />);


    // }


    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <ImageBackground source={Images.bgNewDark} style={{ flex: 1 }}>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
            <View style={{ width: screenWidth, height: 700, backgroundColor: 'transparent' }}>
              <Image resizeMode="contain" style={{ width: 200, height: 120, alignSelf: 'center', marginTop: '20%' }}
                source={Images.Logo}
              />
              {/* <Text allowFontScaling={false}  style={{ fontSize:18,color:Colors.BLUE , fontWeight: 'bold',alignSelf:'center',marginTop:'12%' }}>------ Sign In ------</Text> */}

              {/* <View style={{width:'80%',height:60,alignSelf:'center',backgroundColor:'transparent',marginTop:'25%'}}>
        <Text allowFontScaling={false}  style={{ fontSize:16,color:Colors.black}}>Phone Number</Text>

        <View style={{width:'100%',height:50,alignSelf:'center',backgroundColor:'transparent',flexDirection:'row'}}>

        <View style={{width:60,height:50,backgroundColor:'transparent',alignItems:'center',flexDirection:'row'}}>
        <Image  resizeMode="contain" style={{width:18,height:18}}
  source={Images.phone}
  />
          <Text allowFontScaling={false}  style={{ fontSize:16,color:Colors.TextColor,marginLeft:8}}>+91</Text>
        <View style={{width:1,height:20,backgroundColor:Colors.TextColor,marginLeft:10}}></View>
         </View>
         <TextInput
                style={styles.searchTextInput}
                placeholder="Contact Number"
                placeholderTextColor= {'#818e97'}
                autoCorrect= {false}
                onChangeText={(phone) => this.setState({phone})}
                value={this.state.phone}
                autoCapitalize = 'none'
                keyboardType='numeric'
                returnKeyType='done'
                multiline={false}
              />

        </View>

        </View>

        <View style={{width:'80%',marginTop:5,height:1,alignSelf:'center',backgroundColor:Colors.TextColor}}></View> */}


              <View style={{
                width: screenWidth - 40, height: 360, backgroundColor: 'white', alignSelf: 'center', marginTop: 25, borderRadius: 6,
                shadowOffset: { width: 1, height: 1, },
                shadowColor: Colors.darkText,
                shadowOpacity: 0.5,
                // overflow: 'hidden',
                shadowRadius: 3,
                elevation: 5,
              }}>

                <Text allowFontScaling={false} style={{ fontSize: 22, color: Colors.BLUE, fontWeight: 'bold', alignSelf: 'center', marginTop: 10 }}>{this.props.languages.Login}</Text>

                <View style={{ width: '90%', height: 50, borderWidth: 1, borderColor: Colors.seprator, alignSelf: 'center', marginTop: 10, borderRadius: 6 }}>
                  <TextInput
                    style={styles.searchTextInput}
                    placeholder={this.props.languages.Email}
                    placeholderTextColor={'#818e97'}
                    autoCorrect={false}
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                    autoCapitalize='none'
                    keyboardType='email-address'
                    returnKeyType='done'
                    multiline={false}
                  />
                </View>

                <View style={{ width: '90%', height: 50, borderWidth: 1, borderColor: Colors.seprator, alignSelf: 'center', marginTop: 10, borderRadius: 6 }}>
                  <TextInput
                    style={styles.searchTextInput}
                    placeholder={this.props.languages.Password}
                    placeholderTextColor={'#818e97'}
                    autoCorrect={false}
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                    autoCapitalize='none'
                    returnKeyType='done'
                    multiline={false}
                    secureTextEntry={true}
                  />
                </View>

                <View style={styles.checkboxContainer}>
                  <CheckBox
                    value={this.state.isSelected}
                    onValueChange={() => this.setSelection()}
                    style={styles.checkbox}
                  />
                  <TouchableOpacity onPress={() => this.opnewebPage()}><Text style={styles.label}>{this.props.languages.tandctext}</Text></TouchableOpacity>

                </View>

                <TouchableOpacity onPress={() => this.loginAction()} style={{ width: 150, height: 50, marginTop: 20, backgroundColor: 'transparent', justifyContent: 'center', alignSelf: 'center', borderRadius: 6 }}>
                  <Image resizeMode="contain" style={{ width: '100%', height: '100%' }}
                    source={Images.button}
                  />
                </TouchableOpacity>

                <View style={{ width: '60%', height: 50, backgroundColor: 'transparent', alignSelf: 'center', marginTop: 15, flexDirection: 'row', justifyContent: 'center' }}>
                  <TouchableOpacity onPress={() => this.registerAct()} style={{ width: 70, height: 50, marginTop: 0, backgroundColor: 'transparent', justifyContent: 'center' }}>
                    <Text allowFontScaling={false} style={{ fontWeight: '500', fontSize: 12, color: Colors.TextColor, alignSelf: 'center' }}>{this.props.languages.Register}</Text>

                  </TouchableOpacity>
                  {/* <TouchableOpacity onPress={() => this.forgotAction()} style={{width:110,height:50,marginTop:0,backgroundColor:'transparent',justifyContent:'center'}}>
        <Text allowFontScaling={false}  style={{ fontWeight:'bold',fontSize:12,color:Colors.TextColor,alignSelf:'center'}}>Forgot Password ?</Text>

</TouchableOpacity> */}
                </View>

              </View>





            </View>

          </KeyboardAwareScrollView>
          {this.props.isBusyLogin ? <Activity /> : null}
        </ImageBackground>
      </SafeAreaView>


    );
  }

  registerAct() {

    this.props.navigation.navigate('RegisterScreen')
  }

  forgotAction() {
    this.props.navigation.navigate('ForgotPasswordScreen')


  }

}



const styles = StyleSheet.create({
  checkboxContainer: {
    marginTop: 10,
    flexDirection: "row",
    marginBottom: 20,
    marginLeft: 16,
    textAlign: 'center',
  },
  label: {
    margin: 8,
    color: "#0000EE"
  },
  checkbox: {
    alignSelf: "center",
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  containterNew: {
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
    height: 45,
    width: '95%',
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    fontSize: 15,
    fontFamily: "Arial",
    // top:2.5

  },
  scrollView: {
    backgroundColor: 'transparent',
    marginHorizontal: 0,

  },
  backIcon: {

    width: 25,
    height: 25,
    backgroundColor: 'transparent',

  },
});
