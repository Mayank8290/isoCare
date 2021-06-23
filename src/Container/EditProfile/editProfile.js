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
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker'
import ImagePicker from 'react-native-image-picker';


import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
import Colors from '../../utils/Colors';
import Images from '../../utils/Images';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment';
import { getConfiguration, setConfiguration } from '../../utils/configuration';
import { create } from 'apisauce';

export default class editProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      name: '',
      emergencyphone: 'N/A',
      email: '',
      googleId: '',
      facebookId: '',
      countryCode: '+234',
      photo: '',
      mainViewTop: 0,
      autoLogin: true,
      scrollPadding: 0,
      password: '',
      item: {},
      loadBusy: false,
      address: '',
      selectedDate: '',
      selectedStartDate: null,
      morViewStatus: false,
      morArray: [{ slot: '08:00 AM', status: '0' }, { slot: '09:00 AM', status: '0' }, { slot: '10:00 AM', status: '0' }, { slot: '11:00 AM', status: '0' }],
      noonViewStatus: false,
      noonArray: [{ slot: '12:00 PM', status: '0' }, { slot: '01:00 PM', status: '0' }, { slot: '02:00 PM', status: '0' }, { slot: '03:00 PM', status: '0' }],
      eveViewStatus: false,
      eveArray: [{ slot: '04:00 PM', status: '0' }, { slot: '05:00 PM', status: '0' }, { slot: '06:00 PM', status: '0' }, { slot: '07:00 PM', status: '0' }],
      nightViewStatus: false,
      nightArray: [{ slot: '08:00 PM', status: '0' }, { slot: '09:00 PM', status: '0' }, { slot: '10:00 PM', status: '0' }, { slot: '11:00 PM', status: '0' }],
      selectedSlot: '',
      slotSelected: '',
      bookingfor: 'self',
      genderAr: [{
        value: 'Male',
      }, {
        value: 'Female',
      }],
      maritialAr: [{
        value: 'Married',
      }, {
        value: 'Single',
      }], //A+, A-,  B+, B-,  O+, O-,  AB+, AB-
      bloodGroupAr: [{
        value: 'A+',
      }, {
        value: 'A-',
      }, {
        value: 'B-',
      }, {
        value: 'B+',
      }, {
        value: 'O-',
      }, {
        value: '0+',
      }, {
        value: 'AB-',
      }, {
        value: 'AB+',
      }],
      avatarSource: ''



    };
    this.onDateChange = this.onDateChange.bind(this);

    const { navigation } = props;


    this.didFocusListener = navigation.addListener(
      'didFocus',
      this.componentDidFocus,
    );
  }

  componentDidFocus = payload => {
    console.log('hurrayyyyyy', payload);
    //   this.props.navigation.navigate('confirmAppointmentScreen',{item:this.state.item , selectedDate:this.state.selectedStartDate ,slot:this.state.selectedSlot });
    // this.setState({
    //     selectedStartDate: payload.state.params.selectedDate,
    //     item:payload.state.params.item,
    //     slotSelected:payload.state.params.slot,
    //     loadBusy:false
    //   });

    this.getProfile()

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



    console.log("Random String --- ", this.makeid(7));


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

  afterGetProfile() {
    console.log("isBusy value --- ", this.props.isBusyGetProfile);
    console.log("response value --- ", this.props.responseGetProfile);
    var name = this.props.responseGetProfile.response.data.patient_name;
    var mobileNumber = this.props.responseGetProfile.response.data.phone;
    var email = this.props.responseGetProfile.response.data.email;
    var address = this.props.responseGetProfile.response.data.address;

    const apiRoot = getConfiguration('API_ROOT');

    if (this.props.responseGetProfile.response.data.profile_photo != null) {

      var pho = this.props.responseGetProfile.response.base_path + this.props.responseGetProfile.response.data.profile_photo
      console.log("pho value --- ", pho);

      this.setState({
        name: name,
        phone: mobileNumber,
        email: email,
        photo: pho,
        address: address


      });

    } else {

      this.setState({
        name: name,
        phone: mobileNumber,
        email: email,
        photo: ''

      });

    }
  }


  getProfile() {
    this.props.getProfileAPI(getConfiguration('user_id', ''))
      .then(() => this.afterGetProfile())
      .catch(e => this.showAlert(e.message, 300));

  }

  loginAction() {

    this.props.navigation.navigate('PasswordScreen');

  }

  goBack() {
    this.props.navigation.goBack();
  }


  confirmAction() {





  }


  // setDateFormat(date) {
  //   console.log('date :',date.format('DD-MM-YYYY') );
  //   var newDate = date.format('DD-MM-YYYY')

  //   return newDate
  // }

  bookforAction(stat) {
    this.setState({ bookingfor: stat })
  }


  // SelectPhoto(){



  // }


  showAlert(message, duration) {
    this.setState({ autoLogin: false });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      alert(message);
    }, duration);
  }

  SelectPhoto() {


    const options2 = {
      quality: 0.5,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };



    ImagePicker.showImagePicker(options2, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        const source1 = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
          photo: 'data:image/jpeg;base64,' + response.data
        });

        // this.upload();


      }
    });
  }

  makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }




  upload() {


    this.setState({
      isBusyUploadImage: true
    });
    //let acces_token = getConfiguration('token');

    let customerid = getConfiguration('user_id');

    const apiRoot = getConfiguration('API_ROOT');
    var url = apiRoot;
    var fileName = this.makeid(7)

    // create api.
    const api = create({
      baseURL: url,
      headers: {},
    })


    var photo = this.state.avatarSource;

    console.log('name photo:', photo)


    // create formdata
    const data = new FormData();
    data.append('user_ref', customerid);
    data.append('patient_name', this.state.name);



    if (photo != '') {



      data.append('profile_photo', {
        uri: Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", ""),
        type: 'image/jpeg',
        name: fileName + '.jpg'
      });

    }


    console.log('name data:', data)


    // post your data.
    api.post('update_profile_image', data, {
      onUploadProgress: (e) => {
        console.log(e)
        const progress = e.loaded / e.total;
        console.log(progress);
        this.setState({
          progress: progress
        });
      }
    })
      .then((res) => this.uploadSuccess(res))

    // if you want to add DonwloadProgress, use onDownloadProgress
    onDownloadProgress: (e) => {
      const progress = e.loaded / e.total;
    }
  }


  uploadSuccess(res) {
    console.log("upload succes", res);

    if (res.status == 200) {
      this.setState({
        isBusyUploadImage: false
      });
      console.log("upload succes", res);
      this.getProfile();
    }
    else {
      this.setState({
        isBusyUploadImage: false
      });
      this.showAlert(res.message, 300);
    }
  }


  updateProfile() {

    if (this.state.name == '') {
      this.showAlert('Please enter your name', 300);


    } else {

      this.upload()

    }

  }





  render() {


    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    let today = moment();


    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ overflow: 'hidden', paddingBottom: 5 }}>
          <View style={styles.headerView}>
            <View style={{ width: '100%', height: 50 }}><TouchableOpacity
              style={styles.backTouchable}
              onPress={() => this.goBack()}>
              <Image resizeMode="contain" style={styles.backIcon}
                source={Images.backImage}
              />
            </TouchableOpacity>
              <Text allowFontScaling={false} style={{ fontSize: 20, top: 18, color: Colors.White, alignSelf: 'center', fontWeight: 'bold' }}>{this.props.languages.editProfile}</Text>

              <TouchableOpacity
                style={{ position: 'absolute', top: 0, right: 0, height: 50, backgroundColor: 'transparent', width: 60, alignItems: 'center', justifyContent: 'center' }}
                onPress={() => this.updateProfile()}>
                <Text allowFontScaling={false} style={{ fontSize: 20, color: Colors.White, top: 3, fontWeight: 'bold' }}>{this.props.languages.Save} </Text>

              </TouchableOpacity>

            </View>


          </View>

        </View>


        <View style={{ width: '100%', height: 150, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => this.SelectPhoto()} style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 1, borderColor: Colors.White, alignItems: 'center', justifyContent: 'center' }}>
            {this.state.photo == '' ? <Image style={{ width: 98, height: 98, borderRadius: 50, borderColor: Colors.White }}
              source={Images.user32}
            /> : <Image style={{ width: 98, height: 98, borderRadius: 50, borderColor: Colors.BLUE }}
              source={{ uri: this.state.photo }}
            />}
            <Image style={{ width: 30, height: 30, position: "absolute", right: -8, bottom: -8 }}
              source={require('../../../assets/Add-Icon.png')}
            />
          </TouchableOpacity>

        </View>


        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>

          <View style={styles.tile}>

            <TextInput
              style={styles.searchTextInput}
              placeholder="Name"
              placeholderTextColor={'#818e97'}
              autoCorrect={false}
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
              editable={false}


            />
          </View>


          <View style={styles.tile}>

            <TextInput
              style={styles.searchTextInput}
              placeholder="Email"
              // autoCapitalize = {false}
              placeholderTextColor={'#818e97'}
              autoCorrect={false}
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
              editable={false}
            />
          </View>




          <View style={styles.tile}>

            <TextInput
              style={styles.searchTextInput}
              placeholder="Phone"
              placeholderTextColor={'#818e97'}
              keyboardType='number-pad'
              returnKeyType='done'
              autoCorrect={false}
              onChangeText={(phone) => this.setState({ phone })}
              value={this.state.phone}
              editable={false}

            />
          </View>


          <View style={styles.tile}>

            <TextInput
              style={styles.searchTextInput}
              placeholder="Address"
              placeholderTextColor={'#818e97'}
              keyboardType='number-pad'
              returnKeyType='done'
              autoCorrect={false}
              onChangeText={(address) => this.setState({ address })}
              value={this.state.address}
              editable={false}

            />
          </View>

          <View style={{ width: 100, height: 100 }}></View>

        </KeyboardAwareScrollView>

        {this.props.isBusy || this.state.loadBusy || this.state.isBusyUploadImage || this.props.isBusyGetProfile ? <Activity /> : null}

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
    width: '100%',
    paddingHorizontal: 10,
    // paddingBottom: 0,
    backgroundColor: 'transparent',
    borderColor: 'gray',
    borderRadius: 0,
    fontSize: 14,
    //  textAlignVertical:'top'
    //fontFamily: "CharlieDisplay-Regular"
  },
  scrollView: {
    backgroundColor: 'transparent',
    marginHorizontal: 0,

  },
  headerView: {
    height: 60,
    width: '100%',
    backgroundColor: Colors.BLUE,
    //  justifyContent: 'center',
    // alignItems: 'center',
    // flexDirection:'row',
    shadowOffset: { width: 1, height: 1, },
    shadowColor: Colors.darkText,
    shadowOpacity: 0.5,
    // overflow: 'hidden',
    shadowRadius: 3,
    elevation: 5,

  },
  tile: {
    backgroundColor: 'white',
    width: '90%',
    height: 40,
    marginTop: '5.33%',
    alignSelf: 'center',
    borderRadius: 6,
    marginHorizontal: 0,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 0,
    borderColor: '#818e97',
    shadowOffset: { width: 1, height: 1, },
    shadowColor: Colors.darkText,
    shadowOpacity: 0.5,
    // overflow: 'hidden',
    shadowRadius: 3,
    elevation: 5,
  },
  backTouchable: {
    width: 50
    ,
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
    tintColor: 'white'


  },
});
