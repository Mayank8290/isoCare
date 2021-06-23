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
  FlatList
} from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';


import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
import Colors from '../../utils/Colors';
import Images from '../../utils/Images';


export default class myAppointment extends React.Component {

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
      catAr:[{title:'Dr. Sumeetpal Kaur',url:Images.sumeeetpal,talent:'Infertility Specialist & Gynaecologist',exp:'10',address:'Street No. - 5A, Vijay Nagar, Batala Road Amritsar, Punjab, India'},{title:'Dr. Navjeet Kaur',url:Images.navjeet,talent:'Consultant (Obs. & Gynae.)',exp:'8',address:'Street No. - 5A, Vijay Nagar, Batala Road Amritsar, Punjab, India'},{title:'Dr. Simranjeet Kaur',url:Images.simran,talent:'Geneticist',exp:'5',address:'Street No. - 5A, Vijay Nagar, Batala Road Amritsar, Punjab, India'},{title:'Dr. Sanjana Kashyap',url:Images.sanjana,talent:'Geneticist',exp:'5',address:'Street No. - 5A, Vijay Nagar, Batala Road Amritsar, Punjab, India'},]

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

openDrawerClick() {
  this.props.navigation.dispatch(DrawerActions.openDrawer());
}

selectAction(item,index){


  console.log('item : ',item);

     this.props.navigation.navigate('doctorDetailScreen' , {item:item});

    
  


}

  render() {
   
    return (
      <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
       <View style={{ overflow: 'hidden', paddingBottom: 5 }}>
        <View style={styles.headerView}>
          <TouchableOpacity
            style={styles.backTouchable}
            onPress={() => this.openDrawerClick()}>
            <Image resizeMode="contain" style={styles.backIcon}
              source={Images.menu}
            />
          </TouchableOpacity>
          <Text allowFontScaling={false}  style={{fontSize: 20,color:Colors.darkText}}>My Appointments</Text>

        </View>
        </View>
              <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
              
          {/* onPress={() => this.selectAction(item,index) } */}
        <FlatList
        style={{width:screenWidth - 20,marginLeft:10 ,marginTop:20}}
        numColumns={1}
        data={this.state.catAr }
        renderItem={({ item,index }) => 
        <View  style={{width:screenWidth - 10,height:135 , backgroundColor:'transparent',}}>
                  
                  <View  style={{width:'100%',height:'99%' , backgroundColor:'white',borderRadius:6,

                  //  alignItems:'center',
                   flexDirection:'row'
                  // justifyContent:'center'               
                   }}>
                  
                  <Image   style={{width:80,height:80,borderRadius:40,marginTop:15}}
  source={item.url }
  />

<View style={{width:'auto',height:'90%',marginTop:15,marginLeft:8}}>
<Text allowFontScaling={false}  style={{color:Colors.darkText,marginTop:0,fontSize:18,fontWeight:'500'}}>{item.title}</Text>
<Text allowFontScaling={false}  style={{color:Colors.TextColor, marginTop:8,fontSize:15,fontWeight:'400'}}>{item.talent}</Text>
<Text allowFontScaling={false}  style={{color:Colors.TextColor, marginTop:8,fontSize:15,fontWeight:'400'}}>10:30 AM 30/05/2020 </Text>
<Text allowFontScaling={false}  style={{color:Colors.TextColor, marginTop:8,fontSize:15,fontWeight:'400'}}>Sco:230, Batala road, Amritsar </Text>

</View>
                 {/* <Text allowFontScaling={false}  style={{color:'black',marginTop:10,fontSize:18,fontWeight:'500'}}>{item.title}</Text> */}

                  </View>
                  <View style={{width:'100%',height:1,backgroundColor:Colors.seprator,marginTop:0}}></View>

  
                  <TouchableOpacity style={{position:'absolute',top:"15%",right:10,width:40,height:40,borderRadius:20,justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:Colors.PrimaryColorBlue,borderStyle:'dashed',backgroundColor:Colors.LightBlue }}><Image style={{width:20,height:20}}  resizeMode="stretch" 
  source={Images.viewIcon }
  /></TouchableOpacity>

     </View>
        }
        keyExtractor={(item, index) => index.toString()}
        />
  
              </KeyboardAwareScrollView>

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
