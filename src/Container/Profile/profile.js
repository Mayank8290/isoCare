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


import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
import Colors from '../../utils/Colors';
import Images from '../../utils/Images';

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import moment from 'moment';
import { getConfiguration , setConfiguration} from '../../utils/configuration';

export default class profile extends React.Component {

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
      password:'',
      item:{},
      loadBusy:false,
      selectedDate:'',
      selectedStartDate: null,
      morViewStatus:false,
      morArray:[{slot:'08:00 AM',status:'0'},{slot:'09:00 AM',status:'0'},{slot:'10:00 AM',status:'0'},{slot:'11:00 AM',status:'0'}],
      noonViewStatus:false,
      noonArray:[{slot:'12:00 PM',status:'0'},{slot:'01:00 PM',status:'0'},{slot:'02:00 PM',status:'0'},{slot:'03:00 PM',status:'0'}],
      eveViewStatus:false,
      eveArray:[{slot:'04:00 PM',status:'0'},{slot:'05:00 PM',status:'0'},{slot:'06:00 PM',status:'0'},{slot:'07:00 PM',status:'0'}],
      nightViewStatus:false,
      nightArray:[{slot:'08:00 PM',status:'0'},{slot:'09:00 PM',status:'0'},{slot:'10:00 PM',status:'0'},{slot:'11:00 PM',status:'0'}],
      selectedSlot:'',
      slotSelected:'',
      bookingfor:'self',
      genderAr: [{
        value: 'Male',
      }, {
        value: 'Female',
      }],



    };
    this.onDateChange = this.onDateChange.bind(this);

    const { navigation } = props;


    this.didFocusListener = navigation.addListener(
      'didFocus',
      this.componentDidFocus,
  );
}

componentDidFocus = payload => {
  console.log('hurrayyyyyy',payload);
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
  console.log('date :',date.format('DD-MM-YYYY') );
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
      console.log("isBusy value --- ",this.props.isBusyGetProfile);
      console.log("response value --- ",this.props.responseGetProfile);
      var name =this.props.responseGetProfile.response.data.patient_name;
      var mobileNumber =this.props.responseGetProfile.response.data.phone;
    var email =this.props.responseGetProfile.response.data.email;
     const apiRoot = getConfiguration('API_ROOT');

    //var city =this.props.responseGetProfile.response.data.city;



   var address =this.props.responseGetProfile.response.data.address;


  if(this.props.responseGetProfile.response.data.profile_photo != null){

    var pho =  this.props.responseGetProfile.response.base_path +this.props.responseGetProfile.response.data.profile_photo

    this.setState({
      name: name,
      phone: mobileNumber,
      email: email,
      photo:pho,
      address:address

   });

  }else{

    this.setState({
      name: name,
      phone: mobileNumber,
      email: email,
      photo:'',
      address:address


   });

  }

  }

  showAlert(message, duration) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      alert(message);
    }, duration);
  }

    getProfile() {
      this.props.getProfileAPI(getConfiguration('user_id',''))
        .then(() => this.afterGetProfile())
      .catch(e => this.showAlert(e.message, 300));

    }

loginAction(){

  this.props.navigation.navigate('PasswordScreen');

}

editProfile(){

  this.props.navigation.navigate('EditProfileScreen');


}

goBack() {
  this.props.navigation.goBack();
}


confirmAction(){





}


// setDateFormat(date) {
//   console.log('date :',date.format('DD-MM-YYYY') );
//   var newDate = date.format('DD-MM-YYYY')

//   return newDate
// }

bookforAction(stat){
  this.setState({bookingfor:stat})
}

  render() {


    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    let today = moment();


    return (
      <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
       <View style={{ overflow: 'hidden', paddingBottom: 5 }}>
        <View style={styles.headerView}>
         <View style={{width:'100%',height:50}}><TouchableOpacity
            style={styles.backTouchable}
            onPress={() => this.goBack()}>
            <Image resizeMode="contain"  style={styles.backIcon}
              source={Images.backImage}
            />
          </TouchableOpacity>
          <Text allowFontScaling={false}  style={{fontSize: 20,top:18,color:Colors.White,alignSelf:'center'}}>{this.props.languages.Profile}</Text>
          <TouchableOpacity
            style={{position:'absolute',top:0,right:0,height:50,backgroundColor:'transparent',width:60,alignItems:'center',justifyContent:'center'}}
            onPress={() => this.editProfile()}>
            <Image resizeMode="contain"  style={styles.backIcon}
              source={Images.editIcon}
            />
          </TouchableOpacity>
          </View>
          <View style={{width:'100%',height:150,backgroundColor:'transparent',alignItems:'center',justifyContent:'center' }}>
          {this.state.photo == '' ||  this.state.photo == 'null' || this.state.photo == null ?


          <Image  style={{width:100,height:100,borderRadius:50,borderWidth:0 ,borderColor:Colors.White,tintColor:'white'}}
              source={Images.user32 }
            />


           :

           <Image  style={{width:100,height:100,borderRadius:50,borderWidth:1,borderStyle:'dashed' ,borderColor:Colors.BLUE }}
           source={{uri:  this.state.photo}}
           />
      }


    <Text allowFontScaling={false}  style={{fontSize: 18,top:5,color:Colors.White,alignSelf:'center'}}>{this.state.name}</Text>

          </View>

        </View>

        </View>
<KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>

<View style={styles.tile}>


                <Text style={styles.searchTextInput}>{this.state.name}</Text>
    </View>

    <View style={styles.tile}>


                    <Text style={styles.searchTextInput}>{this.state.email}</Text>
        </View>


<View style={styles.tile}>


                <Text style={styles.searchTextInput}>{this.state.phone}</Text>
    </View>








<View style={styles.tile}>


                <Text style={styles.searchTextInput}>{this.state.address}</Text>
    </View>


{/* <TouchableOpacity onPress={() => this.confirmAction()} style={{width:250,height:50,marginTop:'5%',backgroundColor:Colors.White ,justifyContent:'center',alignItems:'center',alignSelf:'center',borderRadius:30 ,borderWidth:1,borderColor:Colors.BLUE }}>

<Text allowFontScaling={false}  style={{color:Colors.BLUE,fontSize:18,fontWeight:'bold'}}>Change Password</Text>

</TouchableOpacity> */}


<View style={{width:100,height:100}}></View>

              </KeyboardAwareScrollView>

              {this.props.isBusy || this.state.loadBusy  || this.props.isBusyGetProfile ? <Activity /> : null}

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

  tile:{
             backgroundColor: 'white',
             width: '90%',
             height: 40,
             marginTop: '5.33%',
             alignSelf:'center',
             borderRadius:6,
             marginHorizontal: 0,
             alignItems: 'center',
            flexDirection: 'row',
             borderBottomWidth: 0,
             borderColor: '#818e97',
             shadowOffset:{  width: 1,  height: 1,  },
             shadowColor: Colors.darkText ,
             shadowOpacity: 0.5,
             // overflow: 'hidden',
             shadowRadius: 3,
                 elevation: 5,
            },
               searchTextInput: {
                     height: 40,
                     width: '100%',
                     paddingHorizontal: 10,
                     paddingBottom: 0,
                     backgroundColor: 'transparent',
                     borderColor: 'gray',
                     borderRadius: 0,
                     fontSize:14,
                      textAlignVertical:'center'
                       // fontFamily: "CharlieDisplay-Regular"

                   },
  scrollView: {
    backgroundColor: 'transparent',
    marginHorizontal: 0,

  },
  headerView: {
    height: 200,
    width: '100%',
    backgroundColor: Colors.BLUE,
    //  justifyContent: 'center',
    // alignItems: 'center',
    // flexDirection:'row',
    shadowOffset:{  width: 1,  height: 1,  },
    shadowColor: Colors.darkText ,
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
    position:'absolute'

  },
  backIcon: {

    width: 22,
    height: 22,
    backgroundColor: 'transparent',
    tintColor:'white'


  },
});
