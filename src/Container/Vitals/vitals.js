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


export default class vitals extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      sbp: '',
      dbp: '',
      pulse: '',
      temp: '',
      spo: '',
      rr: '',
      otherTF: '',
      Screen: '',
      showBootom: false,
      patientRef: '',
      UserRef: '',
      urine: '',
      creatinine: '',


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

      name: 'Vishal',
      today: '',

    };
    this.onDateChange = this.onDateChange.bind(this);

    const { navigation } = props;


    this.didFocusListener = navigation.addListener(
      'didFocus',
      this.componentDidFocus,
    );
  }

  componentDidFocus = payload => {
    console.log('hurrayyyyyy', payload.state.params);

    //7APR
    // if(payload.state.params.screen == 'emp'){

    //   this.setState({Screen:payload.state.params.screen,showBootom:false,patientRef:payload.state.params.patientRef,UserRef:payload.state.params.userRef})

    // }else{

    //   this.setState({Screen:payload.state.params.screen,showBootom:true,patientRef:getConfiguration('patientRef',''),UserRef:getConfiguration('user_id','')})

    // }



  };

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


  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  loginAction() {

    this.props.navigation.navigate('PasswordScreen');

  }

  goBack() {
    this.props.navigation.goBack();
  }
  openMenu(index) {

    if (index == 0) {

      this.props.navigation.navigate('CovidHomeScreen');

    } else if (index == 1) {

      this.props.navigation.navigate('QuestionsScreen');

    } else if (index == 2) {

      this.props.navigation.navigate('TrainingScreen');

    } else if (index == 3) {

      // this.props.navigation.navigate('VitalsScreen');

    }


  }


  renderCard = () => {
    const { images } = this.state;

    return images.map((data, index) => {
      return (
        <TouchableOpacity style={styles.cardItem}>
          <View style={styles.textImgRow}>
            <View style={{ width: '80%' }}>
              <View style={{ flexDirection: 'column' }}>
                <Text style={styles.largeText}>{data.text}</Text>
                <Text style={styles.smallText}>{data.text2}</Text>
              </View>
            </View>
            <TouchableOpacity style={{ justifyContent: 'center' }}>
              <Image source={data.image} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
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


  SubmitAction() {

    if (this.state.sbp == '') {

      Alert.alert(this.props.languages.Enter_Systolic)

    } else if (this.state.dbp == '') {

      Alert.alert(this.props.languages.Enter_Diastolic)

    } else if (this.state.pulse == '') {

      Alert.alert(this.props.languages.Enter_Pluse_Rate)

    } else if (this.state.temp == '') {

      Alert.alert(this.props.languages.Enter_Temprature)

    } else if (this.state.spo == '') {

      Alert.alert(this.props.languages.Enter_spo)

    } else if (this.state.rr == '') {

      Alert.alert(this.props.languages.Enter_rr)

    } else {


      if (this.state.Screen == 'emp') {

        this.SubmitVitals()

      } else {

        this.SubmitVitals()

      }


    }


  }


  SubmitVitals() {

    // "patient_ref"   : userRef,
    // "systolic_bp"   : sbp,
    // "diastolic_bp"  : dbp,
    // "pulse"         : pulse,
    // "temp"          : temp,
    // "spo2"          : spo,
    // "rr"            : rr,
    // "vital_date"    : vDate,
    // "vital_time"    : vTime,
    // "other"         : other

    var userId = getConfiguration('patientRef', '')

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds

    console.log('date', date, '-', month, '-', year, '-', hours, ':', min)


    var date32 = moment()
      .utcOffset('+05:30')
      .format('YYYY/MM/DD');


    var dateStr = date32
    var timeStr = hours + ':' + min
    console.log('date', dateStr)

    this.props.AddVitals(userId, this.state.sbp, this.state.dbp, this.state.pulse, this.state.temp, this.state.spo, this.state.rr, dateStr, timeStr, this.state.otherTF, this.state.urine, this.state.creatinine, getConfiguration('user_id', ''))
      .then(() => this.afterSubmitVitals())
      .catch(e => alert(e.message));

  }

  afterSubmitVitals() {
    console.log("isBusy value --- ", this.props.isBusy);
    console.log("response value --- ", this.props.response);

    Alert.alert(
      this.props.languages.Success,
      this.props.languages.Vital_submitted,
      [
        {
          text: this.props.languages.OK,
          onPress: () => this.goToHome()
        },

      ],
      { cancelable: false }
    );


  }

  goToHome() {

    if (this.state.Screen == 'emp') {

      this.props.navigation.goBack();

    } else {

      this.props.navigation.navigate('CovidHomeScreen');

    }



    //
  }

  gotohistory() {


    if (this.state.Screen == 'emp') {
      this.props.navigation.navigate('VitalHistoryScreen', { screen: 'emp', userRef: this.state.UserRef });


    } else {
      var userId = getConfiguration('patientRef', '')


      this.props.navigation.navigate('VitalHistoryScreen', { screen: 'emp', userRef: userId });

    }


  }


  render() {



    // const { selectedStartDate } = this.state;
    // const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    // let today = moment();
    const { name, today, day } = this.state;


    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ overflow: 'hidden', paddingBottom: 5 }}>
          <View style={styles.headerView}>
            <TouchableOpacity
              style={styles.backTouchable}
              onPress={() => this.goBack()}>
              <Image resizeMode="contain" style={[styles.backIcon, { tintColor: 'white' }]}
                source={Images.backImage}
              />
            </TouchableOpacity>
            <Text allowFontScaling={false} style={{ fontSize: 20, color: Colors.White, marginLeft: 0 }}>{this.props.languages.Vitals}</Text>

            <TouchableOpacity
              style={{ position: 'absolute', right: 10, width: 90, height: 35, backgroundColor: Colors.White, justifyContent: 'center', alignItems: 'center', borderRadius: 8 }}
              onPress={() => this.gotohistory()}>
              <Text allowFontScaling={false} style={{ fontSize: 14, fontWeight: 'bold', color: Colors.BLUE, marginLeft: 0 }}>{this.props.languages.History}</Text>

            </TouchableOpacity>

          </View>
        </View>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>


          <View style={{ width: '100%', height: 180, backgroundColor: 'transparent', marginTop: 10 }}>
            <Image resizeMode="stretch" style={{
              width: '90%', height: '100%', marginLeft: '5%', borderRadius: 0, shadowOffset: { width: 1, height: 1, },
              // shadowColor: Colors.darkText ,
              // shadowOpacity: 1.5,
              // shadowRadius: 3,
              // elevation: 5,

            }}
              source={Images.ban4}
            />

          </View>
          <View style={{
            width: '90%', height: 100, marginHorizontal: '5%', backgroundColor: 'white', borderBottomWidth: 0.5, borderColor: 'gray', flexDirection: 'row',
            borderRadius: 6,
            shadowOffset: { width: 1, height: 1, },
            shadowColor: Colors.darkText,
            shadowOpacity: 0.5,
            // overflow: 'hidden',
            shadowRadius: 3,
            elevation: 5,
          }}>

            <View style={{ width: '65%', height: 'auto', backgroundColor: 'transparent' }}>
              <Text style={{ marginLeft: 10, marginTop: 30, fontWeight: 'bold', fontSize: 14 }}>{this.props.languages.Systolic_Blood_Pressure}</Text>
              <Text style={{ marginLeft: 10, marginTop: 5, fontSize: 12 }}>{this.props.languages.range}:110-140</Text>
            </View>

            <View style={{ width: '40%', height: 'auto', backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ width: '60%', height: '40%', backgroundColor: Colors.BLUE, borderRadius: 12, borderColor: 'gray', borderWidth: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                <TextInput
                  style={styles.searchTextInput}
                  placeholder="0.00"
                  placeholderTextColor={'white'}
                  autoCorrect={false}
                  onChangeText={(sbp) => this.setState({ sbp })}
                  value={this.state.sbp}
                  keyboardType='numeric'
                  returnKeyType='done'
                />

              </View>
            </View>
          </View>

          <View style={{
            width: '90%', height: 100, marginHorizontal: '5%', marginTop: 15, backgroundColor: 'white', borderBottomWidth: 0.5, borderColor: 'gray', flexDirection: 'row',
            borderRadius: 6,
            shadowOffset: { width: 1, height: 1, },
            shadowColor: Colors.darkText,
            shadowOpacity: 0.5,
            // overflow: 'hidden',
            shadowRadius: 3,
            elevation: 5,
          }}>
            <View style={{ width: '65%', height: 'auto', backgroundColor: 'transparent' }}>
              <Text style={{ marginLeft: 10, marginTop: 30, fontWeight: 'bold', fontSize: 14 }}>{this.props.languages.Diastolic_Blood_Pressure}</Text>
              <Text style={{ marginLeft: 10, marginTop: 5, fontSize: 12 }}>{this.props.languages.range}:70-90</Text>
            </View>

            <View style={{ width: '40%', height: 'auto', backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ width: '60%', height: '40%', backgroundColor: Colors.BLUE, borderRadius: 12, borderColor: 'gray', borderWidth: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                <TextInput
                  style={styles.searchTextInput}
                  placeholder="0.00"
                  placeholderTextColor={'white'}
                  autoCorrect={false}
                  onChangeText={(dbp) => this.setState({ dbp })}
                  value={this.state.dbp}
                  keyboardType='numeric'
                  returnKeyType='done'
                />

              </View>
            </View>
          </View>
          <View style={{
            width: '90%', height: 100, marginHorizontal: '5%', marginTop: 15, backgroundColor: 'white', borderBottomWidth: 0.5, borderColor: 'gray', flexDirection: 'row',
            borderRadius: 6,
            shadowOffset: { width: 1, height: 1, },
            shadowColor: Colors.darkText,
            shadowOpacity: 0.5,
            // overflow: 'hidden',
            shadowRadius: 3,
            elevation: 5,
          }}>
            <View style={{ width: '65%', height: 'auto', backgroundColor: 'transparent' }}>
              <Text style={{ marginLeft: 10, marginTop: 30, fontWeight: 'bold', fontSize: 14 }}>{this.props.languages.Pulse}</Text>
              <Text style={{ marginLeft: 10, marginTop: 5, fontSize: 12 }}>{this.props.languages.range}:60-100</Text>
            </View>

            <View style={{ width: '40%', height: 'auto', backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ width: '60%', height: '40%', backgroundColor: Colors.BLUE, borderRadius: 12, borderColor: 'gray', borderWidth: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                <TextInput
                  style={styles.searchTextInput}
                  placeholder="0.00"
                  placeholderTextColor={'white'}
                  autoCorrect={false}
                  onChangeText={(pulse) => this.setState({ pulse })}
                  value={this.state.pulse}
                  keyboardType='numeric'
                  returnKeyType='done'
                />

              </View>
            </View>
          </View>
          <View style={{
            width: '90%', height: 100, marginHorizontal: '5%', marginTop: 15, backgroundColor: 'white', borderBottomWidth: 0.5, borderColor: 'gray', flexDirection: 'row',
            borderRadius: 6,
            shadowOffset: { width: 1, height: 1, },
            shadowColor: Colors.darkText,
            shadowOpacity: 0.5,
            // overflow: 'hidden',
            shadowRadius: 3,
            elevation: 5,
          }}>
            <View style={{ width: '65%', height: 'auto', backgroundColor: 'transparent' }}>
              <Text style={{ marginLeft: 10, marginTop: 30, fontWeight: 'bold', fontSize: 14 }}>{this.props.languages.temperature}</Text>
              <Text style={{ marginLeft: 10, marginTop: 5, fontSize: 12 }}>{this.props.languages.range}:98f-99F</Text>
            </View>

            <View style={{ width: '40%', height: 'auto', backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ width: '60%', height: '40%', backgroundColor: Colors.BLUE, borderRadius: 12, borderColor: 'gray', borderWidth: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                <TextInput
                  style={styles.searchTextInput}
                  placeholder="0.00"
                  placeholderTextColor={'white'}
                  autoCorrect={false}
                  onChangeText={(temp) => this.setState({ temp })}
                  value={this.state.temp}
                  keyboardType='numeric'
                  returnKeyType='done'
                />

              </View>
            </View>
          </View>
          <View style={{
            width: '90%', height: 100, marginHorizontal: '5%', marginTop: 15, backgroundColor: 'white', borderBottomWidth: 0.5, borderColor: 'gray', flexDirection: 'row',
            borderRadius: 6,
            shadowOffset: { width: 1, height: 1, },
            shadowColor: Colors.darkText,
            shadowOpacity: 0.5,
            // overflow: 'hidden',
            shadowRadius: 3,
            elevation: 5,
          }}>
            <View style={{ width: '65%', height: 'auto', backgroundColor: 'transparent' }}>
              <Text style={{ marginLeft: 10, marginTop: 30, fontWeight: 'bold', fontSize: 14 }}>{this.props.languages.SPO2}</Text>
              <Text style={{ marginLeft: 10, marginTop: 5, fontSize: 12 }}>{this.props.languages.range}:94%-100%</Text>
            </View>

            <View style={{ width: '40%', height: 'auto', backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ width: '60%', height: '40%', backgroundColor: Colors.BLUE, borderRadius: 12, borderColor: 'gray', borderWidth: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                <TextInput
                  style={styles.searchTextInput}
                  placeholder="0.00"
                  placeholderTextColor={'white'}
                  autoCorrect={false}
                  onChangeText={(spo) => this.setState({ spo })}
                  value={this.state.spo}
                  keyboardType='numeric'
                  returnKeyType='done'
                />

              </View>
            </View>
          </View>

          <View style={{
            width: '90%', height: 100, marginHorizontal: '5%', marginTop: 15, backgroundColor: 'white', borderBottomWidth: 0.5, borderColor: 'gray', flexDirection: 'row',
            borderRadius: 6,
            shadowOffset: { width: 1, height: 1, },
            shadowColor: Colors.darkText,
            shadowOpacity: 0.5,
            // overflow: 'hidden',
            shadowRadius: 3,
            elevation: 5,
          }}>
            <View style={{ width: '65%', height: 'auto', backgroundColor: 'transparent' }}>
              <Text style={{ marginLeft: 10, marginTop: 30, fontWeight: 'bold', fontSize: 14 }}>{this.props.languages.RR}</Text>
              <Text style={{ marginLeft: 10, marginTop: 5, fontSize: 12 }}>{this.props.languages.range}:14-20</Text>
            </View>

            <View style={{ width: '40%', height: 'auto', backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ width: '60%', height: '40%', backgroundColor: Colors.BLUE, borderRadius: 12, borderColor: 'gray', borderWidth: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                <TextInput
                  style={styles.searchTextInput}
                  placeholder="0.00"
                  placeholderTextColor={'white'}
                  autoCorrect={false}
                  onChangeText={(rr) => this.setState({ rr })}
                  value={this.state.rr}
                  keyboardType='numeric'
                  returnKeyType='done'
                />

              </View>
            </View>
          </View>



          <View style={{
            width: '90%', height: 100, marginHorizontal: '5%', marginTop: 15, backgroundColor: 'white', borderBottomWidth: 0.5, borderColor: 'gray', flexDirection: 'row',
            borderRadius: 6,
            shadowOffset: { width: 1, height: 1, },
            shadowColor: Colors.darkText,
            shadowOpacity: 0.5,
            // overflow: 'hidden',
            shadowRadius: 3,
            elevation: 5,
          }}>
            <View style={{ width: '65%', height: 'auto', backgroundColor: 'transparent' }}>
              <Text style={{ marginLeft: 10, marginTop: 30, fontWeight: 'bold', fontSize: 14 }}>{this.props.languages.Urine}</Text>
              <Text style={{ marginLeft: 10, marginTop: 5, fontSize: 12 }}>{this.props.languages.range}:N/A</Text>
            </View>

            <View style={{ width: '40%', height: 'auto', backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ width: '60%', height: '40%', backgroundColor: Colors.BLUE, borderRadius: 12, borderColor: 'gray', borderWidth: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                <TextInput
                  style={styles.searchTextInput}
                  placeholder="0.00"
                  placeholderTextColor={'white'}
                  autoCorrect={false}
                  onChangeText={(urine) => this.setState({ urine })}
                  value={this.state.urine}
                  keyboardType='numeric'
                  returnKeyType='done'
                />

              </View>
            </View>
          </View>




          <View style={{
            width: '90%', height: 100, marginHorizontal: '5%', marginTop: 15, backgroundColor: 'white', borderBottomWidth: 0.5, borderColor: 'gray', flexDirection: 'row',
            borderRadius: 6,
            shadowOffset: { width: 1, height: 1, },
            shadowColor: Colors.darkText,
            shadowOpacity: 0.5,
            // overflow: 'hidden',
            shadowRadius: 3,
            elevation: 5,
          }}>
            <View style={{ width: '65%', height: 'auto', backgroundColor: 'transparent' }}>
              <Text style={{ marginLeft: 10, marginTop: 30, fontWeight: 'bold', fontSize: 14 }}>{this.props.languages.Creatinine}</Text>
              <Text style={{ marginLeft: 10, marginTop: 5, fontSize: 12 }}>{this.props.languages.range}:N/A</Text>
            </View>

            <View style={{ width: '40%', height: 'auto', backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ width: '60%', height: '40%', backgroundColor: Colors.BLUE, borderRadius: 12, borderColor: 'gray', borderWidth: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                <TextInput
                  style={styles.searchTextInput}
                  placeholder="0.00"
                  placeholderTextColor={'white'}
                  autoCorrect={false}
                  onChangeText={(creatinine) => this.setState({ creatinine })}
                  value={this.state.creatinine}
                  keyboardType='numeric'
                  returnKeyType='done'
                />

              </View>
            </View>
          </View>




          <Text style={{
            fontSize: 14,
            color: 'black', marginLeft: 20, marginTop: 15
          }}>{this.props.languages.other}</Text>
          <View style={{
            height: 100, width: '90%', marginLeft: '5%', marginTop: 15, borderRadius: 5,
            backgroundColor: 'white',
            shadowOffset: { width: 1, height: 1, },
            shadowColor: Colors.darkText,
            shadowOpacity: 1,
            shadowRadius: 3,
            elevation: 3
          }}>

            <TextInput
              style={{
                height: 90, width: '90%', marginLeft: '5%', textAlignVertical: 'top'

              }}
              placeholder=""
              placeholderTextColor={'#000000'}
              multiline={true}
              numberOfLines={4}
              autoCorrect={false}
              returnKeyType={'done'}
              blurOnSubmit={true}
              onSubmitEditing={() => { Keyboard.dismiss() }}

              onChangeText={(otherTF) => this.setState({ otherTF })}
              value={this.state.otherTF}
            />
          </View>

          <View style={{ width: '100%', height: 180, marginTop: 25 }}>

            <TouchableOpacity
              onPress={() => this.SubmitAction()}
              style={{ width: 150, height: 50, marginTop: 20, backgroundColor: 'transparent', justifyContent: 'center', alignSelf: 'center', borderRadius: 6 }}>
              <Image resizeMode="contain" style={{ width: '100%', height: '100%' }}
                source={Images.button}
              />
            </TouchableOpacity>

          </View>
        </KeyboardAwareScrollView>

        { this.state.showBootom == true ? <View style={styles.bottomRow}>{this.renderImage()}</View> : null}
        {this.props.isBusy || this.state.loadBusy ? <Activity /> : null}

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
    width: '80%',
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    borderColor: 'gray',
    borderRadius: 0,
    fontSize: 15,
    fontFamily: "Arial",
    color: 'white'
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
    textAlign: 'center',
    fontSize: moderateScale(20),
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
    fontSize: moderateScale(22),
    width: moderateScale(160),
    borderColor: '#7f8c8d',
  },
  smallTextStyle: {
    fontSize: moderateScale(14),
    marginTop: moderateScale(7),
    color: '#7f8c8d',
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
    height: moderateScale(60),
    borderColor: '#F7F7F7',
    borderRadius: moderateScale(20),
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
    marginHorizontal: moderateScale(10),
    justifyContent: 'space-around',
  },
  largeText: {
    color: '#565656',
    fontSize: moderateScale(17),
  },
  smallText: {
    color: '#898989',
    fontSize: moderateScale(14),
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
  submitA: {
    width: 180,
    height: 50,
    top: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 8,
    alignSelf: 'center'

  },
});
