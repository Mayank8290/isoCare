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
  Alert
} from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import Activity from '../../components/ActivityIndicator'
import CalendarPicker from 'react-native-calendar-picker';


import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
import Colors from '../../utils/Colors';
import Images from '../../utils/Images';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';

import { getConfiguration, setConfiguration } from '../../utils/configuration';

export default class covidHome extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      name: '',
      patRef: '',
      msg_count: '',
      CosultAr: [],
      images: [
        {
          text: 'Nursing Consultation',
          text2: 'Task Completed',
          image: Images.cancel,
        },
        {
          text: 'Doctor Consultation',
          text2: 'Task Completed',
          image: Images.cancel,
        },
        {
          text: 'Dietician Consultation',
          text2: 'Task Pending',
          image: Images.cancel,
        },
        // {
        //   text: 'Psychological Consultation',
        //   text2: 'Task Pending',
        //   image: Images.cancel,
        // },
        // {
        //   text: 'Physician Video Consultation',
        //   text2: 'Task Pending',
        //   image: Images.cancel,
        // },

      ],
      bottomImages: [
        {
          text: 'Home',
          image: Images.covidHome,
        },
        {
          text: 'Questionnaire',
          image: Images.question,
        },
        {
          text: 'Training',
          image: Images.training,
        },
        {
          text: 'Vital',
          image: Images.vital,
        },
      ],
      day: 1,

      name: '',
      today: '',
      dayCount: '',
      languages: { Home: "" }
    };
    this.onDateChange = this.onDateChange.bind(this);

    const { navigation } = props;


    this.didFocusListener = navigation.addListener(
      'didFocus',
      this.componentDidFocus,
    );
  }

  componentDidFocus = payload => {
    //console.log('hurrayyyyyy', payload);
    this.getData();
  }

  setLanguages() {
    //console.log("props", this.props);
    this.setState({
      languages: this.props.languages,
    })

    this.getAll();
  }

  async getData() {

    const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');
    console.log("selectedlanguage", selectedLanguage);

    if (selectedLanguage == "" || selectedLanguage == null || selectedLanguage.toLocaleLowerCase() == "english") {
      this.props.getSelectedLanguage("english")
        .then(() => this.setLanguages())
        .catch(e => this.showAlert(e.message, 300));
    }
    else if (selectedLanguage.toLocaleLowerCase() == "ਪੰਜਾਬੀ") {
      this.props.getSelectedLanguage("punjabi")
        .then(() => this.setLanguages())
        .catch(e => this.showAlert(e.message, 300));
    }
    else if (selectedLanguage.toLocaleLowerCase() == "hindi") {
      this.props.getSelectedLanguage("hindi")
        .then(() => this.setLanguages())
        .catch(e => this.showAlert(e.message, 300));
    }
  }


  showAlert(message, duration) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      alert(message);
    }, duration);
  }
  getAll() {


    console.log("userId", getConfiguration('user_id', ''));

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



      this.setState({
        name: this.props.response.response.patient[0].patient_name,
        patRef: this.props.response.response.patient[0].patient_ref,
        dayCount: this.props.response.response.patient[0].day_count,
        msg_count: this.props.response.response.patient[0].msg_count,
        CosultAr: this.props.response.response.patient[0].consultation
      })

    }

    setConfiguration('patientRef', this.state.patRef);


  }


  onDateChange(date) {
    console.log('date :', date.format('DD-MM-YYYY'));
    var newDate = date.format('DD-MM-YYYY')
    this.setState({
      selectedStartDate: newDate,
    });
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



    var today = moment(new Date()).format('DD MMM YYYY');
    this.setState({ today });


    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow.bind(this),
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide.bind(this),
    );


  }

  goToChat() {
    this.props.navigation.navigate('ChatScreen');


  }


  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  vitalsAction() {

    //this.props.navigation.navigate('VitalsScreen');
    this.props.navigation.navigate('VitalsScreen', { screen: 'user' });



  }

  goBack() {
    this.props.navigation.goBack();
  }

  openMenu(index) {

    if (index == 0) {

      // this.props.navigation.navigate('VitalsScreen');

    } else if (index == 1) {

      this.props.navigation.navigate('QuestionsScreen');

    } else if (index == 2) {

      this.props.navigation.navigate('TrainingScreen');

    } else if (index == 3) {

      // this.props.navigation.navigate('VitalsScreen');
      this.props.navigation.navigate('VitalsScreen', { screen: 'user' });

    }


  }

  // 6	doc_consultation	varchar(191)	utf8mb4_unicode_ci		Yes	NULL			 Change Change	 Drop Drop	
  // More More
  // 	7	nurse_consultation	varchar(191)	utf8mb4_unicode_ci		Yes	NULL			 Change Change	 Drop Drop	
  // More More
  // 	8	diet_consultation	varchar(191)	utf8mb4_unicode_ci		Yes	NULL			 Change Change	 Drop Drop	
  // More More
  // 	9	psyc_consultation


  getConultName(item) {

    if (item.service == 'doc_consultation') {

      return this.props.languages.Doctor_Consultation ? this.props.languages.Doctor_Consultation : "" //'Doctor Consultaion'
    } else if (item.service == 'nurse_consultation') {

      return this.props.languages.Nurse_Magistrate ? this.props.languages.Nurse_Magistrate : "" //'Nurse/Magistrate Consultaion'

    } else if (item.service == 'diet_consultation') {

      return this.props.languages.diet_consultation ? this.props.languages.diet_consultation : "" //'Dietitian Consultaion'

    } else if (item.service == 'psyc_consultation') {

      return this.props.languages.psyc_consultation ? this.props.languages.psyc_consultation : ""//'Psychiatrist Consultaion'

    }

  }

  getStat(item) {

    if (item.status == '0') {

      return this.props.languages.Task_Pending ? this.props.languages.Task_Pending : ""
    } else if (item.status == '1') {

      return this.props.languages.task_completed ? this.props.languages.task_completed : ""

    }



  }

  renderCard = () => {
    const { CosultAr } = this.state;

    return CosultAr.map((data, index) => {
      return (
        <View style={styles.cardItem}>
          <View style={styles.textImgRow}>
            <View style={{ width: '80%' }}>
              <View style={{ flexDirection: 'column' }}>
                <Text style={styles.largeText}>{this.getConultName(data)}</Text>
                <Text style={styles.smallText}>{this.getStat(data)}</Text>
              </View>
            </View>
            <View style={{ justifyContent: 'center' }}>
              {data.status == '0' ? <Image style={{ width: 20, height: 20 }} source={Images.cross2} /> : <Image style={{ width: 20, height: 20 }} source={Images.tick} />}
            </View>
          </View>
        </View>
      );
    });
  };

  renderImage = () => {
    const { bottomImages } = this.state;

    return bottomImages.map((data, index) => {
      return (
        <View style={styles.imagesColumn}>
          <TouchableOpacity onPress={() => this.openMenu(index)} style={{ alignItems: 'center' }}>
            <Image source={data.image} />
            <View style={styles.textWidth}>
              <Text style={styles.bottomImagesText}>{data.text}</Text>
            </View>
          </TouchableOpacity>

        </View>
      );
    });
  };


  menuAction() {

    this.props.navigation.openDrawer()

  }


  async gotToLogin() {

    setConfiguration('user_id', '');

    // this.storeData()

    await AsyncStorage.setItem('user_id', '');
    this.props.navigation.navigate('LoginScreen');


  }


  logoutAction() {

    Alert.alert(
      this.state.languages.Alert,
      this.state.languages.logout_message,
      [
        {
          text: this.state.languages.logout,
          onPress: () => this.gotToLogin()
        },
        {
          text: this.state.languages.cancel,
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
      ],
      { cancelable: false }
    );

  }


  render() {



    // const { selectedStartDate } = this.state;
    // const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    // let today = moment();
    const { name, today, day, dayCount, msg_count } = this.state;


    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <ImageBackground source={Images.bgNewLight} style={{ flex: 1 }}>
          <View style={{ overflow: 'hidden', paddingBottom: 5 }}>
            <View style={styles.headerView}>
              <View style={{ justifyContent: 'center', alignItems: 'center', width: '70%', height: '100%' }} >
                <Text allowFontScaling={false} style={{ color: Colors.White, marginTop: 3, fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}>{this.state.languages.Home}</Text></View>

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

            <TouchableOpacity style={{ width: '100%', height: 180, backgroundColor: 'transparent', marginTop: 10 }}>
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



            <View style={styles.videoContainer}>
              <View style={{
                width: '100%', height: 60, backgroundColor: 'white', borderRadius: 6, alignSelf: 'center', shadowOffset: { width: 1, height: 1, },
                shadowColor: Colors.darkText,
                shadowOpacity: 0.5,
                // overflow: 'hidden',
                shadowRadius: 3,
                elevation: 5,
              }}>
                <Text style={{ padding: 10, fontWeight: '700' }}>{this.state.languages.Welcome} {name} </Text>
              </View>

              <View style={{
                width: '100%', height: 50, backgroundColor: Colors.BLUE, marginTop: 10, borderRadius: 6, alignSelf: 'center', shadowOffset: { width: 1, height: 1, },
                shadowColor: Colors.darkText,
                shadowOpacity: 0.5,
                // overflow: 'hidden',
                shadowRadius: 3,
                elevation: 5,
              }}><Text style={styles.smallTextStyle}>{this.state.languages.Today_is} {today}</Text></View>
              <Text style={{ marginTop: 10 }}>{this.state.languages.We_are_at}{' '}<Text style={{ color: '#000000', fontSize: moderateScale(15) }}>{this.state.languages.day} {dayCount}{' '}</Text>{this.state.languages.your_Recovery}!</Text>

              {/* // <TouchableOpacity onPress={() => this.openMenu(index)}   style={{alignItems: 'center'}}> */}
              <TouchableOpacity onPress={() => this.goToChat()} style={{
                width: '100%', height: 60, backgroundColor: Colors.BLUE, borderRadius: 6, marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                shadowOffset: { width: 1, height: 1, },
                shadowColor: Colors.darkText,
                shadowOpacity: 0.5,
                // overflow: 'hidden',
                shadowRadius: 3,
                elevation: 5,
              }}>
                <Text style={{ fontSize: 16, marginLeft: 10, color: 'white' }}>{this.state.languages.You_have} {msg_count} {this.state.languages.unread_message}  </Text>

                <Image resizeMode="contain" style={{ width: 25, height: 25, left: -15, tintColor: 'white' }}
                  source={Images.chatDoctor}
                />
              </TouchableOpacity>


              <Text style={styles.centerText}>{this.state.languages.Today_Activities}</Text>

              <View style={styles.cardMargin}>{this.renderCard()}</View>
            </View>

            <View style={{ width: 20, height: 100 }}></View>

          </KeyboardAwareScrollView>

          {/* <View style={styles.bottomRow}>{this.renderImage()}</View> */}
          {this.props.isBusy || this.state.loadBusy ? <Activity /> : null}
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
  backIcon: {

    width: 22,
    height: 22,
    backgroundColor: 'transparent',

  },
  toolbar: {
    backgroundColor: '#ffffff',
    paddingBottom: moderateScale(10),
    flexDirection: 'row',
    paddingTop: moderateScale(20),
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#313131',
    shadowOpacity: 1.5,
    shadowRadius: 3,
    elevation: 5,
  },
  centerText: {
    marginTop: moderateScale(20),
    textAlign: 'left',
    fontSize: moderateScale(15),
    fontWeight: '700'
  },
  toolbarButton: {
    //Step 2
    color: '#fff',
  },
  toolbarTitle: {
    fontWeight: 'bold',
    flex: 1,
    fontSize: moderateScale(20),
    textAlign: 'center',
  },
  videoContainer: {
    marginHorizontal: moderateScale(20),
    marginTop: moderateScale(20),
  },
  textContainer: {},
  textStyle: {
    borderBottomWidth: 1,
    height: moderateScale(40),
    fontSize: 17,
    width: 'auto',
    borderColor: '#7f8c8d',
  },
  smallTextStyle: {
    fontSize: moderateScale(14),
    color: 'white',
    padding: 10
  },
  rowImages: {
    width: '100%',
    flexDirection: 'row',
    marginTop: moderateScale(90),
    justifyContent: 'space-around',
  },
  cardItem: {
    width: '100%',
    alignSelf: 'center',
    borderWidth: 1,
    height: moderateScale(70),
    borderColor: '#F7F7F7',
    borderRadius: 6,
    marginBottom: moderateScale(10),
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowColor: '#00000029',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,

  },
  cardMargin: {
    marginTop: moderateScale(20),

  },
  bottomList: {
    position: 'absolute',
    bottom: moderateScale(10),
  },
  borderItem: {
    marginLeft: moderateScale(10),
    flex: 1,
    borderWidth: 1,
    height: verticalScale(150),
    borderColor: '#707070',
    justifyContent: 'center',
    width: moderateScale(100),
    alignItems: 'center',
  },
  flatListText: {
    color: '#ffffff',
    textAlign: 'center',
  },
  textImgRow: {
    flexDirection: 'row',
    marginHorizontal: moderateScale(5),
    justifyContent: 'space-around',
  },
  largeText: {
    color: Colors.BLUE,
    fontSize: moderateScale(14),
  },
  smallText: {
    color: '#898989',
    fontSize: moderateScale(12),
    marginTop: 4
  },
  bottomRow: {
    flexDirection: 'row',
    width: '80%',
    height: 50,
    alignSelf: 'center',
    backgroundColor: 'red',
    justifyContent: 'center',
    borderRadius: moderateScale(30),
    position: 'absolute',
    bottom: 40
  },
  imagesColumn: {
    flexDirection: 'column',
    width: '25%',
    height: 50,
    justifyContent: 'center'
    // marginLeft: moderateScale(20),
    // marginTop: moderateScale(10),
  },
  bottomImagesText: {
    color: 'white',
    fontSize: moderateScale(10),
    textAlign: 'center',
  },
  textWidth: {
    width: '100%',
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
});
