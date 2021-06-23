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
  FlatList,
  BackHandler
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


export default class employeeHome extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      name: '',
      email: '',
      cnfPassword:'',
      newPassword:'',
      googleId: '',
      facebookId: '',
      countryCode: '+234',
      photo: '',
      mainViewTop: 0,
      autoLogin: true,
      scrollPadding:0,
      password:'',
      ListAr:[],
      basePath:''
    };

    const { navigation } = props;



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

  BackHandler.addEventListener(
    'hardwareBackPress',
    this.handleBackButtonPressAndroid
);


this.getPatients()

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

getPatients() {
         
  var userId = getConfiguration('user_id','')

  if (userId == '1001'){

    userId = ''
  }

 

  this.props.PatientList(userId)
    .then(() => this.aftergetPatients())
  .catch(e => alert(e.message));

}

aftergetPatients() {
console.log("isBusy value --- ",this.props.isBusy);
console.log("response value --- ",this.props.response);  

if(this.props.response.response.patinetList.length == 0){

  this.setState({ListAr:[]})

}else{

  this.setState({ListAr:this.props.response.response.patinetList,basePath:this.props.response.response.base_path})

}



}


logoutAction(){

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


async gotToLogin(){

  setConfiguration('user_id', '');

// this.storeData()

await AsyncStorage.setItem('user_id', '');
  this.props.navigation.navigate('LoginScreen');


}

goBack() {
  this.props.navigation.goBack();
}

selectAction(item,index){


  var userId = getConfiguration('user_id','')

  if (userId == '1001'){

    // this.props.navigation.navigate('VitalsScreen',{screen:'emp',patientRef:item.patient_ref,userRef:item.user_ref});
    this.props.navigation.navigate('VitalHistoryScreen',{screen:'emp',userRef:item.user_ref});

  }else{
    
    this.props.navigation.navigate('VitalsScreen',{screen:'emp',patientRef:item.patient_ref,userRef:item.user_ref});

  }

  // VitalsScreen


}
  render() {

    return (
      <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
             <View style={{ overflow: 'hidden', paddingBottom: 5 }}>
        <View style={styles.headerView}>
        <View style = {{justifyContent:'center',alignItems:'center',width:'70%',height:'100%' }} >
        <Text allowFontScaling={false}  style={{color:Colors.BLUE , marginTop:3,fontSize:14,fontWeight:'bold',textAlign:'center'}}>IsoCare by Amandeep in Association with District Administration Amritsar</Text></View>

          {/* <Image resizeMode="contain" style={{}}
              source={Images.amandeep}
            /> */}
              <TouchableOpacity
            style={styles.logout}
            onPress={() => this.logoutAction()}>
            <Image resizeMode="contain" style={styles.backIcon}
              source={Images.logoutIcon}
            />
          </TouchableOpacity> 
        </View>
        </View> 

<View style={{width:'40%',height:30,backgroundColor:'white',alignSelf:'center',marginTop:10,borderRadius:5,
  shadowOffset:{  width: 0.5,  height: 0.5,  },
  shadowColor: Colors.darkText ,
  shadowOpacity: 0.5,
  shadowRadius: 3,
      elevation: 5,
}}>
<Text allowFontScaling={false}  style={{color:Colors.BLUE , marginTop:2,fontSize:18,fontWeight:'bold',textAlign:'center'}}>My Patients</Text>
</View>
<FlatList
        style={{width:screenWidth - 30,marginLeft:15 ,marginTop:20}}
        // numColumns={1}
        data={this.state.ListAr }
        renderItem={({ item,index }) =>
        <TouchableOpacity  onPress={() => this.selectAction(item,index) }  style={{width:'100%',height:100 , backgroundColor:'white',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <View style={{width:'96%',height:'95%',backgroundColor:'white',borderRadius:5,flexDirection:'row',alignItems:'center', shadowOffset:{  width: 0.5,  height: 0.5 },
  shadowColor: Colors.darkText ,
  shadowOpacity: 0.5,
  shadowRadius: 3,
      elevation: 5,}}>
       <Image resizeMode="contain" style={{width:70,height:70,marginLeft:15,borderWidth:0.5,borderColor:'gray',borderRadius:35}}
              source={{uri:this.state.basePath + item.profile_photo}}
            />  
     <View style={{width:'auto',height:'70%',backgroundColor:'white',marginLeft:10}}>
<Text allowFontScaling={false}  style={{color:Colors.BLUE , marginTop:5,fontSize:18,fontWeight:'bold',}}>{item.patient_name}</Text>
     <Text allowFontScaling={false}  style={{color:Colors.BLUE , marginTop:10,fontSize:18,fontWeight:'bold',}}>Day : {item.day_count}</Text>

       </View> 
       <Image resizeMode="contain" style={{width:20,height:20,position:'absolute',right:10}}
              source={Images.nextArrow}
            />

      </View>
        </TouchableOpacity>
        }
        keyExtractor={(item, index) => index.toString()}
        />



              {this.props.isBusy  ? <Activity /> : null}

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
    paddingHorizontal: 0,
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
    shadowRadius: 3,
        elevation: 5,

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
  logout: {
    width: 60,
    height: 60,
    top: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute'

  },
});
