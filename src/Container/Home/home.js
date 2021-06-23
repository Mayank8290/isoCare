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
  FlatList,
  Alert,
  BackHandler
} from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';


import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
import Colors from '../../utils/Colors';
import Images from '../../utils/Images';
import Activity from '../../components/ActivityIndicator'
import { getConfiguration, setConfiguration } from '../../utils/configuration';


export default class home extends React.Component {

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
      patientStatus: true,
      catAr: [{ title: 'Attandence', url: Images.one }, { title: 'Attandence', url: Images.two }, { title: 'Attandence', url: Images.three }, { title: 'Attandence', url: Images.four }, { title: 'Attandence', url: Images.five }]

    };
    // {title:'Attandence',url:Images.icon6},
    const { navigation } = props;
  
  }

  _keyboardDidShow() {
    this.setState({
      scrollPadding: -100

    });
  }

  _keyboardDidHide() {
    this.setState({
      scrollPadding: 0
    });
  }

  componentDidMount() {

   

    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonPressAndroid
    );
    //6PAR
    // this.getAll() 


    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow.bind(this),
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide.bind(this),
    );

  

  }

  handleBackButtonPressAndroid = () => {


    // return true;

    // console.log('navigation hai mera', this.props.navigation.isFocused());
    if (this.props.navigation.isFocused()) {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    } else {
      return false
    }
  };


  componentWillUnmount() {

    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonPressAndroid
    );
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  showAlert(message, duration) {
    this.setState({ autoLogin: false });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      alert(message);
    }, duration);
  }

  getAll() {



    this.props.GetInformation(getConfiguration('user_id', ''))
      .then(() => this.aftergetAll())
      .catch(e => this.showAlert(e.message, 300));

  }

  aftergetAll() {
    console.log("isBusy value --- ", this.props.isBusy);
    console.log("response value --- ", this.props.response);
    // 
    if (this.props.response.response.patient.length == 0) {


    } else {

      var PAt = this.props.response.response.patient[0].patient_ref


      setConfiguration('patientRef', PAt);


      this.setState({ patientStatus: true })

    }



  }





  loginAction() {

    this.props.navigation.navigate('PasswordScreen');

  }

  openDrawerClick() {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  }
  selectAction(item, index) {


    Alert.alert('Please contact hospital administrator to activate this feature.')



    // if(index == 0){
    //   this.props.navigation.navigate('BookAppointmentScreen');


    // }else if(index == 1){
    //   this.props.navigation.navigate('ChatWithDoctorScreen');


    // }else if(index == 2){

    //   this.props.navigation.navigate('askDoctorScreen');

    // }else if(index == 3){

    //  this.props.navigation.navigate('IVFScreen');

    // }else if(index == 4){

    //   this.props.navigation.navigate('ivfBlogsScreen');

    // }else if(index == 5){

    //   this.props.navigation.navigate('AboutScreen');

    // }
  }

  reportAction() {


    Alert.alert('Please contact hospital administrator to activate this feature.')

    // this.props.navigation.navigate('MyReportsScreen');

  }

  myAppointmentAction() {

    Alert.alert('Please contact hospital administrator to activate this feature.')

    // this.props.navigation.navigate('MyAppointmentScreen');

  }


  myDocAction() {
    // this.props.navigation.navigate('MyDocumentsScreen');
    Alert.alert('Please contact hospital administrator to activate this feature.')


  }

  bannerAction() {


    if (this.state.patientStatus == true) {
      this.props.navigation.navigate('CovidHomeScreen');


    } else {

      Alert.alert(
        'Alert',
        'Please contact hospital administrator to activate this feature',
        [
          {
            text: 'Ok',
          },

        ],
        { cancelable: false }
      );

    }


  }


  storeData = async () => {
    try {
      // const user_id = getConfiguration('user_id');
      await AsyncStorage.setItem('user_id', '');




      console.log('success in storage');

    } catch (e) {
      // saving error
      console.log('error in storage', e);
    }
  }



  async gotToLogin() {

    setConfiguration('user_id', '');

    // this.storeData()

    await AsyncStorage.setItem('user_id', '');
    this.props.navigation.navigate('LoginScreen');


  }

  logoutAction() {

    Alert.alert(
      'Alert',
      'Are you sure , you want to logout?',
      [
        {
          text: 'Logout',
          onPress: () => this.gotToLogin()
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
      ],
      { cancelable: false }
    );

  }

  profileAction() {

    this.props.navigation.navigate('ProfileScreen');



  }
  menuAction() {

    this.props.navigation.openDrawer()

  }
  render() {

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ overflow: 'hidden', paddingBottom: 5 }}>
          <View style={styles.headerView}>
            <View style={{ justifyContent: 'center', alignItems: 'center', width: '70%', height: '100%' }} >
              <Text allowFontScaling={false} style={{ color: Colors.White, marginTop: 3, fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}>HOME</Text></View>

            {/* <Image resizeMode="contain" style={{}}
              source={Images.amandeep}
            /> */}
            <TouchableOpacity
              style={styles.logout}
              onPress={() => this.logoutAction()}>
              <Image resizeMode="contain" style={[styles.backIcon, { tintColor: 'white' }]}
                source={Images.logoutIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.logout, { left: 0 }]}
              onPress={() => this.menuAction()}>
              <Image resizeMode="contain" style={[styles.backIcon, { tintColor: 'white' }]}
                source={Images.menu}
              />
            </TouchableOpacity>
          </View>
        </View>

        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>


          <View
            style={{
              width: '90%',
              backgroundColor: 'white',
              marginTop: 15,
              height: 60,
              borderRadius: 30,
              alignSelf: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              shadowOffset: { width: 1, height: 1, },
              shadowColor: Colors.darkText,
              shadowOpacity: 0.5,
              // overflow: 'hidden',
              shadowRadius: 3,
              elevation: 5,
            }}>
            <Image
              resizeMode="contain"
              source={Images.search}
              style={{ width: 20, height: 20, marginLeft: 15 }}
            />
            <TextInput
              style={
                {
                  backgroundColor: 'transparent',
                  width: '80%',
                  marginLeft: 10,
                  marginTop: 0,

                }
              }
              placeholder="search...."
              placeholderTextColor={'#B9B9B9'}
              autoCorrect={false}
              onChangeText={search => this.setState({ search })}
              value={this.state.search}
              autoCapitalize="none"
              keyboardType="default"
              returnKeyType="done"
            />

          </View>

          <TouchableOpacity onPress={() => this.bannerAction()} style={{ width: '100%', height: 180, backgroundColor: 'transparent', marginTop: 10 }}>
            <Image resizeMode="stretch" style={{
              width: '90%', height: '100%', marginLeft: '5%', borderRadius: 0, shadowOffset: { width: 1, height: 1, },
              // shadowColor: Colors.darkText ,
              // shadowOpacity: 1.5,
              // shadowRadius: 3,
              // elevation: 5,

            }}
              source={Images.ban3}
            />

          </TouchableOpacity>


          <FlatList
            style={{ width: screenWidth, marginLeft: 0, marginTop: 20 }}
            numColumns={3}
            // horizontal
            data={this.state.catAr}
            renderItem={({ item, index }) =>
              <TouchableOpacity onPress={() => this.selectAction(item, index)} style={{ width: screenWidth / 3, height: screenWidth / 3, backgroundColor: 'white', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>



                <Image resizeMode="stretch" style={{ width: '85%', height: '85%', marginTop: 0 }}
                  source={item.url}
                />


              </TouchableOpacity>
            }
            keyExtractor={(item, index) => index.toString()}
          />

          <View style={{ width: '100%', height: 250, backgroundColor: 'transparent', marginTop: 15 }}>
            <Text allowFontScaling={false} style={{ color: Colors.BLUE, marginTop: 10, fontSize: 20, fontWeight: 'bold', marginLeft: 25 }}>My Space</Text>


            <TouchableOpacity onPress={() => this.profileAction()} style={{
              width: '90%', height: 50, borderRadius: 6, backgroundColor: 'white', marginLeft: '5%', marginTop: 10, flexDirection: 'row', alignItems: 'center',
              shadowOffset: { width: 1, height: 1, },
              shadowColor: Colors.darkText,
              shadowOpacity: 0.5,
              // overflow: 'hidden',
              shadowRadius: 3,
              elevation: 5,
            }}>
              <Image resizeMode="contain" style={{ width: 20, height: 20, marginLeft: 15 }}
                source={Images.userNew}
              />
              <Text allowFontScaling={false} style={{ color: Colors.darkText, marginTop: 0, fontSize: 18, fontWeight: '500', marginLeft: 8 }}>My Profile</Text>

            </TouchableOpacity>


            <TouchableOpacity onPress={() => this.profileAction()} style={{
              width: '90%', height: 50, borderRadius: 6, backgroundColor: 'white', marginLeft: '5%', marginTop: 10, flexDirection: 'row', alignItems: 'center',
              shadowOffset: { width: 1, height: 1, },
              shadowColor: Colors.darkText,
              shadowOpacity: 0.5,
              // overflow: 'hidden',
              shadowRadius: 3,
              elevation: 5,
            }}>
              <Image resizeMode="contain" style={{ width: 20, height: 20, marginLeft: 15 }}
                source={Images.reportNew}
              />
              <Text allowFontScaling={false} style={{ color: Colors.darkText, marginTop: 0, fontSize: 18, fontWeight: '500', marginLeft: 8 }}>My Reports</Text>

            </TouchableOpacity>

            {/* 
<TouchableOpacity onPress={() => this.reportAction() } style={{width:'90%',height:40,backgroundColor:'transparent',marginLeft:'5%',marginTop:10,flexDirection:'row',alignItems:'center' }}>
<Image resizeMode="contain" style={{}}
              source={Images.myreportIcon}
            />
 <Text allowFontScaling={false}  style={{color:Colors.darkText , marginTop:0,fontSize:18,fontWeight:'500', marginLeft:8}}>My Reports</Text>

</TouchableOpacity>
<View style={{width:'90%',height:1,backgroundColor:Colors.seprator,marginLeft:'5%',marginTop:5}}></View>



<TouchableOpacity onPress={() => this.myAppointmentAction() } style={{width:'90%',height:40,backgroundColor:'transparent',marginLeft:'5%',marginTop:10,flexDirection:'row',alignItems:'center' }}>
<Image resizeMode="contain" style={{}}
              source={Images.calendarIcon}
            />
 <Text allowFontScaling={false}  style={{color:Colors.darkText , marginTop:0,fontSize:18,fontWeight:'500', marginLeft:8}}>My Appointments</Text>

</TouchableOpacity>
<View style={{width:'90%',height:1,backgroundColor:Colors.seprator,marginLeft:'5%',marginTop:5}}></View>




<TouchableOpacity onPress={() => this.myDocAction() } style={{width:'90%',height:40,backgroundColor:'transparent',marginLeft:'5%',marginTop:10,flexDirection:'row',alignItems:'center' }}>
<Image resizeMode="contain" style={{}}
              source={Images.myDocumentIcon}
            />
 <Text allowFontScaling={false}  style={{color:Colors.darkText , marginTop:0,fontSize:18,fontWeight:'500', marginLeft:8}}>My Documents</Text>

</TouchableOpacity>
<View style={{width:'90%',height:1,backgroundColor:Colors.seprator,marginLeft:'5%',marginTop:5}}></View> */}


          </View>
          <View style={{ width: 100, height: 50 }}></View>

        </KeyboardAwareScrollView>
        {this.props.isBusy || this.state.loadBusy || this.props.isBusyGetProfile ? <Activity /> : null}

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
    height: 40,
    width: '80%',
    paddingHorizontal: 10,
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
  backIcon: {

    width: 25,
    height: 25,
    backgroundColor: 'transparent',

  },
  headerView: {
    height: 60,
    width: '100%',
    backgroundColor: Colors.BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowOffset: { width: 1, height: 1, },
    shadowColor: Colors.darkText,
    shadowOpacity: 0.5,
    // overflow: 'hidden',
    shadowRadius: 3,
    elevation: 5,

  },
  backTouchable: {
    width: 60,
    height: 60,
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'

  },
  logout: {
    width: 60,
    height: 60,
    top: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'

  },
  backIcon: {

    width: 22,
    height: 22,
    backgroundColor: 'transparent',

  },
});
