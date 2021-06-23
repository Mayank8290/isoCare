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
  Alert
} from 'react-native';


import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
import Colors from '../../utils/Colors';
import Images from '../../utils/Images';
import { getConfiguration, setConfiguration } from '../../utils/configuration';
import Activity from '../../components/ActivityIndicator'

export default class register extends React.Component {

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
      address: ''
    };


    const { navigation } = props;
    this.didFocusListener = navigation.addListener(
      'didFocus',
      this.componentDidFocus,
    );

  }


  componentDidFocus = payload => {
    const { params } = payload.action;

    // console.log('screen value Loan:',payload.state.params)
    //  this.setState({phone: payload.state.params.mobileNumber})
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

  afterRegister() {
    console.log("isBusy value --- ", this.props.isBusy);
    console.log("response value --- ", this.props.response);
    if (this.props.response.response.success == 'true') {
      // var phone_number =  this.props.response.response.data.phone_number;
      // setConfiguration('phone_number', phone_number);
      //  var user_id =  this.props.response.response.data.user_ref;
      //  setConfiguration('user_id', user_id);
      //  setConfiguration('userType','0')

      //  this.storeData();

      Alert.alert(
        this.props.languages.Success,
        this.props.languages.successfully_registed,
        [
          {
            text: 'Login',
            onPress: () => this.goToHome()
          },

        ],
        { cancelable: false }
      );

    }
  }

  goToHome() {

    this.props.navigation.goBack()
    // this.props.navigation.navigate('HomeScreen');


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


  showAlert(message, duration) {
    this.setState({ autoLogin: false });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      alert(message);
    }, duration);
  }

  register() {

    this.props.registerAPI(this.state.name, this.state.email, this.state.phone, this.state.password, this.state.address)



      // this.props.registerAPI(this.state.name, this.state.city, this.state.address, this.state.email, this.state.phone, this.state.password,   this.props.navigation.getParam('OTP', ''))
      .then(() => this.afterRegister())
      .catch(e => this.showAlert(e.message, 300));

  }


  loginAction() {

    this.props.navigation.navigate('LoginScreen');

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

  signUpAction() {


    if (this.state.name == '') {

      this.showAlert(this.props.languages.enter_your_name, 300)

    } else if (this.state.email == '') {

      this.showAlert(this.props.languages.enter_your_email, 300)


    } else if (!this.validate(this.state.email)) {

      this.showAlert(this.props.languages.enter_valid_email, 300)


    } else if (this.state.phone == '') {

      this.showAlert(this.props.languages.enter_phone, 300)

    } else if (this.state.phone.length < 10) {

      this.showAlert(this.props.languages.enter_valid_phone, 300)

    } else if (this.state.password == '') {

      this.showAlert(this.props.languages.enter_password, 300)


    } else {

      this.register()

    }



  }


  render() {

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <ImageBackground source={Images.bgNewDark} style={{ flex: 1 }}>

          <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>

            <Image
              style={{ width: 200, height: 100, alignSelf: 'center', marginTop: '20%' }}
              resizeMode='contain'
              source={Images.Logo}
            />
            <View style={{
              width: screenWidth - 40, height: 550, backgroundColor: 'white', alignSelf: 'center', marginTop: 0, borderRadius: 6,
              shadowOffset: { width: 1, height: 1, },
              shadowColor: Colors.darkText,
              shadowOpacity: 0.5,
              // overflow: 'hidden',
              shadowRadius: 3,
              elevation: 5,
            }}>


              <Text allowFontScaling={false} style={{ fontSize: 22, color: Colors.BLUE, fontWeight: 'bold', alignSelf: 'center', marginTop: 15 }}>{this.props.languages.Register}</Text>


              <View style={{ width: '90%', height: 50, borderWidth: 1, borderColor: Colors.seprator, alignSelf: 'center', marginTop: 10, borderRadius: 6 }}>
                <TextInput
                  style={styles.searchTextInput}
                  placeholder={this.props.languages.Name}
                  placeholderTextColor={'#818e97'}
                  autoCorrect={false}
                  onChangeText={(name) => this.setState({ name })}
                  value={this.state.name}
                  autoCapitalize='none'
                  keyboardType='default'
                  returnKeyType='done'
                  multiline={false}
                />
              </View>


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
                  placeholder={this.props.languages.Phone}
                  placeholderTextColor={'#818e97'}
                  autoCorrect={false}
                  onChangeText={(phone) => this.setState({ phone })}
                  value={this.state.phone}
                  autoCapitalize='none'
                  keyboardType='number-pad'
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
                  keyboardType='default'
                  returnKeyType='done'
                  multiline={false}
                  secureTextEntry={true}
                />
              </View>




              <View style={{ width: '90%', height: 120, borderWidth: 1, borderColor: Colors.seprator, alignSelf: 'center', marginTop: 10, borderRadius: 6 }}>
                <TextInput
                  style={[styles.searchTextInput, { height: 115, textAlignVertical: 'top' }]}
                  placeholder={this.props.languages.Address}
                  placeholderTextColor={'#818e97'}
                  autoCorrect={false}
                  onChangeText={(address) => this.setState({ address })}
                  value={this.state.address}
                  autoCapitalize='none'
                  keyboardType='default'
                  returnKeyType='done'
                  multiline={true}

                />
              </View>





              <TouchableOpacity onPress={() => this.signUpAction()} style={{ width: 150, height: 50, marginTop: 20, backgroundColor: 'transparent', justifyContent: 'center', alignSelf: 'center', borderRadius: 6 }}>
                <Image resizeMode="contain" style={{ width: '100%', height: '100%' }}
                  source={Images.button}
                />
              </TouchableOpacity>



              <TouchableOpacity onPress={() => this.loginAction()} >
                <Text allowFontScaling={false} style={{ fontSize: 16, color: Colors.darkText, alignSelf: 'center', marginTop: 12 }}>{this.props.languages.Sign_In}</Text>
              </TouchableOpacity>

            </View>

            <View style={{ width: 100, height: 100 }}></View>

          </KeyboardAwareScrollView>
          {this.props.isBusy ? <Activity /> : null}
        </ImageBackground>
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
    height: 50,
    width: '90%',
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
  backIcon: {

    width: 25,
    height: 25,
    backgroundColor: 'transparent',

  },
});
