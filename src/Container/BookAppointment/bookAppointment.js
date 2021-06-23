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
import Activity from '../../components/ActivityIndicator'


import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
import Colors from '../../utils/Colors';
import Images from '../../utils/Images';


export default class bookAppointment extends React.Component {

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
      catAr:[]

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


  showAlert(message, duration) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      alert(message);
    }, duration);
  }
 componentDidMount() {
 
  
  var myHeaders = new Headers();
myHeaders.append("Authorization", "Basic Y2tfMTI2ZmIwYjJiZTFkYTBiZDA1ZDQ2NDk0YzQ2ODg0NDE5NzZkZjNiYzpjc180NzVjNjE0Yzk1ZmU2NDFhMjBlYTkwZTc3NmIwMzA5ZGE2MmIyNTYz");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://www.vivamart.no/wc-api/v3/products?filter[limit]=15", requestOptions)
  .then(response => response.json())
  .then(result =>  { this.setState({catAr:result.products})}
  )
  .catch(error => console.log('error', error));


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

 // this.props.navigation.navigate('PasswordScreen');

}

openDrawerClick() {

  console.log('error', this.state.catAr)

 // this.props.navigation.dispatch(DrawerActions.openDrawer());
}

selectAction(item,index){


  // console.log('item : ',item);

  //    this.props.navigation.navigate('doctorDetailScreen' , {item:item});

    
  


}

getAll() {

  

  this.props.getStateAPI()
    .then(() => this.aftergetAll())
  .catch(e => this.showAlert(e.message, 300));

}

aftergetAll() {
console.log("isBusy value --- ",this.props.isBusy);
console.log("response value --- ",this.props.response);
}


getProducts(){



  var myHeaders = new Headers();
myHeaders.append("Authorization", "Basic Y2tfMTI2ZmIwYjJiZTFkYTBiZDA1ZDQ2NDk0YzQ2ODg0NDE5NzZkZjNiYzpjc180NzVjNjE0Yzk1ZmU2NDFhMjBlYTkwZTc3NmIwMzA5ZGE2MmIyNTYz");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://www.vivamart.no/wc-api/v3/products?filter[limit]=50", requestOptions)
  .then(response => response.text())
  .then(result => this.listPro(result))
  .catch(error => console.log('error', error));


}

listPro(result){

   console.log('error1', result)



  this.setState({catAr:result.products})

  console.log('error', this.state.catAr)

}

  render() {

//     if(this.state.catAr.length == 0){

// return(

//   <Activity /> 
// );

//     }
   
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
          <Text allowFontScaling={false}  style={{fontSize: 20,color:Colors.darkText}}>Product Listing</Text>

        </View>
        </View>
              <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
              
          
        <FlatList
        style={{width:screenWidth - 20,marginLeft:10 ,marginTop:20}}
        numColumns={1}
        extraData={this.state.catAr}
        data={this.state.catAr }
        renderItem={({ item,index }) => 
        <TouchableOpacity  onPress={() => this.selectAction(item,index) }  style={{width:screenWidth - 10,height:120 , backgroundColor:'transparent',}}>
                  
                  <View  style={{width:'100%',height:'99%' , backgroundColor:'white',borderRadius:6,

                   alignItems:'center',
                   flexDirection:'row'
                  // justifyContent:'center'               
                   }}>
                  
 <Image   style={{width:80,height:80,borderRadius:40}}
  source={ {uri : item.featured_src} }
  />

<View style={{width:'auto',height:'90%',marginTop:'5%',marginLeft:8}}>
<Text allowFontScaling={false}  style={{color:Colors.darkText,marginTop:10,fontSize:18,fontWeight:'500'}}>{item.title}</Text>
{/* <Text allowFontScaling={false}  style={{color:Colors.TextColor, marginTop:8,fontSize:15,fontWeight:'400'}}>{item.short_description}</Text> */}
<Text allowFontScaling={false}  style={{color:Colors.TextColor, marginTop:8,fontSize:15,fontWeight:'400'}}>Price : Kr {item.price}</Text>

</View>
                 {/* <Text allowFontScaling={false}  style={{color:'black',marginTop:10,fontSize:18,fontWeight:'500'}}>{item.title}</Text> */}

                  </View>
                  <View style={{width:'100%',height:1,backgroundColor:Colors.seprator,marginTop:0}}></View>

  
                 

     </TouchableOpacity>
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
