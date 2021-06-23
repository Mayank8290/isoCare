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

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import moment from 'moment';


export default class about extends React.Component {

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
      planSelected:'year'
     
      

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

loginAction(){

  this.props.navigation.navigate('PasswordScreen');

}

goBack() {
  this.props.navigation.dispatch(DrawerActions.openDrawer());
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

payAction(){


}


yearAction(){

  this.setState({planSelected:'year'})


}

monthAction(){

  this.setState({planSelected:'month'})

  
}

  render() {

   
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    let today = moment();


    return (
      <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
       <View style={{ overflow: 'hidden', paddingBottom: 5 }}>
        <View style={styles.headerView}>
          <TouchableOpacity
            style={styles.backTouchable}
            onPress={() => this.goBack()}>
            <Image resizeMode="contain" style={styles.backIcon}
              source={Images.menu}
            />
          </TouchableOpacity>
          <Text allowFontScaling={false}  style={{fontSize: 20,color:Colors.darkText}}>About</Text>

        </View>
        </View>
             

        <Image resizeMode="stretch" style={{margin:20,width:screenWidth - 40, height:180}}
              source={Images.about}
            />     

<KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>

<Text allowFontScaling={false}  style={{fontSize: 20,color:Colors.darkText,padding:20}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ium is simply dummy text of the printing and type setting industry. Lorem Ipsum is simply dummy text of the print ing and typesetting industry. Lorem Ipsum is simply mmy text of the printing and typesetting ind ustry. rem Ipsum is simply dummy text of the printing and typesetting industry.</Text>

<Text allowFontScaling={false}  style={{fontSize: 20,color:Colors.darkText,padding:20}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ium is simply dummy text of the printing and type setting industry. Lorem Ipsum is simply dummy text of the print ing and typesetting industry. Lorem Ipsum is simply mmy text of the printing and typesetting ind ustry. rem Ipsum is simply dummy text of the printing and typesetting industry.</Text>

</KeyboardAwareScrollView>
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
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
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
    backgroundColor: 'white',
     justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row',
    shadowOffset:{  width: 1,  height: 1,  },
    shadowColor: Colors.darkText ,
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
    position:'absolute'

  },
  backIcon: {

    width: 22,
    height: 22,
    backgroundColor: 'transparent',

  },
});
