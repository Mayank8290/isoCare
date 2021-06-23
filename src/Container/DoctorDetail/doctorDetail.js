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


export default class doctorDetail extends React.Component {

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
      loadBusy:true,
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
  // var date = new Date().getDate(); //Current Date
  //   var month = new Date().getMonth() + 1; //Current Month
  //   var year = new Date().getFullYear(); //Current Year

  //   console.log('date',date)
  //   console.log('month',month)
  //   console.log('year',year)
  //   var newDate = year + '-' +month + '-' + date
  //   console.log('hurrayyyyyy',newDate);

    // this.setState({item:payload.state.params.item,loadBusy:false,selectedDate:newDate})


// this.setState({item:payload.state.params.item,loadBusy:false})

let today = moment();
var newDate = today.format('DD-MM-YYYY')

this.setState({
  selectedStartDate: newDate,
  item:payload.state.params.item,
  loadBusy:false
});



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
  this.props.navigation.goBack();
}

morViewAction(){

  this.setState({morViewStatus : !this.state.morViewStatus})

}

morSelection(item,index){

      this.setState({selectedSlot:item.slot})

  //   var my_array = this.state.morArray
  //   var status1 = this.state.morArray[index].status
    
  //   var start_index = index
  //   var number_of_elements_to_remove = 1;
  //   var removed_elements = my_array.splice(start_index, number_of_elements_to_remove, {slot:my_array[index].slot ,status:status1 == '0' ? '1': '0'});
  //   console.log(removed_elements);
  //   //["tennis", "golf"]
  //   console.log(my_array);
  //   //["baseball", "boxing", "bowling", "volleyball", "golf"];
  // this.setState({morArray:my_array})


}

noonViewAction(){

  this.setState({noonViewStatus : !this.state.noonViewStatus})

}

noonSelection(item,index){

  this.setState({selectedSlot:item.slot})

    
  //   var my_array = this.state.noonArray
  //   var status1 = this.state.noonArray[index].status
    
  //   var start_index = index
  //   var number_of_elements_to_remove = 1;
  //   var removed_elements = my_array.splice(start_index, number_of_elements_to_remove, {slot:my_array[index].slot ,status:status1 == '0' ? '1': '0'});
  //   console.log(removed_elements);
  //   //["tennis", "golf"]
  //   console.log(my_array);
  //   //["baseball", "boxing", "bowling", "volleyball", "golf"];
  // this.setState({noonArray:my_array})


}


eveViewAction(){

  this.setState({eveViewStatus : !this.state.eveViewStatus})

}

eveSelection(item,index){

    // this.props.navigation.navigate('BookAppointmentScreen');

    this.setState({selectedSlot:item.slot})
 
  //   var my_array = this.state.eveArray
  //   var status1 = this.state.eveArray[index].status
    
  //   var start_index = index
  //   var number_of_elements_to_remove = 1;
  //   var removed_elements = my_array.splice(start_index, number_of_elements_to_remove, {slot:my_array[index].slot ,status:status1 == '0' ? '1': '0'});
  //   console.log(removed_elements);
  //   //["tennis", "golf"]
  //   console.log(my_array);
  //   //["baseball", "boxing", "bowling", "volleyball", "golf"];
  // this.setState({eveArray:my_array})


}


nightViewAction(){

  this.setState({nightViewStatus : !this.state.nightViewStatus})

}

nightSelection(item,index){

    // this.props.navigation.navigate('BookAppointmentScreen');

    this.setState({selectedSlot:item.slot})
  
    var my_array = this.state.nightArray
    var status1 = this.state.nightArray[index].status
    
    var start_index = index
    var number_of_elements_to_remove = 1;
    var removed_elements = my_array.splice(start_index, number_of_elements_to_remove, {slot:my_array[index].slot ,status:status1 == '0' ? '1': '0'});
    console.log(removed_elements);
    //["tennis", "golf"]
    console.log(my_array);
    //["baseball", "boxing", "bowling", "volleyball", "golf"];
  this.setState({nightArray:my_array})


}


daySelected(day){



//  this.setState({selectedDate:day.dateString})

}


bookAction(){

  if(this.state.selectedSlot == ''){

    Alert.alert('Please select the slot.')
  }else{

    console.log('Date : ',this.state.selectedStartDate )
    console.log('selectedSlot : ',this.state.selectedSlot )
     this.props.navigation.navigate('confirmAppointmentScreen',{item:this.state.item , selectedDate:this.state.selectedStartDate ,slot:this.state.selectedSlot });

  }

 

  
}

  render() {

    if(this.state.loadBusy == true){

      return (
        <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
 <View style={{ overflow: 'hidden', paddingBottom: 5 }}>
        <View style={styles.headerView}>
          <TouchableOpacity
            style={styles.backTouchable}
            onPress={() => this.goBack()}>
            <Image resizeMode="contain" style={styles.backIcon}
              source={Images.backImage}
            />
          </TouchableOpacity>
          <Text allowFontScaling={false}  style={{fontSize: 20,color:Colors.darkText}}>Select Timeslot</Text>

        </View>
        </View>



        {this.props.isBusy || this.state.loadBusy ? <Activity /> : null}

         </SafeAreaView>
      );

    }
  
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
              source={Images.backImage}
            />
          </TouchableOpacity>
          <Text allowFontScaling={false}  style={{fontSize: 20,color:Colors.darkText}}>Select Timeslot</Text>

        </View>
        </View>
              <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
              
              <View  style={{width:'95%',marginLeft:'5%',height:120 , backgroundColor:'white',borderRadius:6,

alignItems:'center',
flexDirection:'row'
// justifyContent:'center'               
}}>

<Image  style={{width:80,height:80,borderRadius:40}}
source={this.state.item.url }
/>

<View style={{width:'auto',height:'90%',marginTop:'5%',marginLeft:8}}>
<Text allowFontScaling={false}  style={{color:Colors.darkText,marginTop:10,fontSize:18,fontWeight:'500'}}>{this.state.item.title}</Text>
<Text allowFontScaling={false}  style={{color:Colors.TextColor, marginTop:8,fontSize:15,fontWeight:'400'}}>{this.state.item.talent}</Text>
<Text allowFontScaling={false}  style={{color:Colors.TextColor, marginTop:8,fontSize:15,fontWeight:'400'}}>Exp : {this.state.item.exp} Yrs</Text>

</View>
{/* <Text allowFontScaling={false}  style={{color:'black',marginTop:10,fontSize:18,fontWeight:'500'}}>{item.title}</Text> */}

</View>
<View style={{width:'90%',marginLeft:'5%',height:1,backgroundColor:Colors.seprator,marginTop:0}}></View>


<View  style={{width:'95%',marginLeft:'5%',height:'auto' , backgroundColor:'transparent',borderRadius:6,margintop:8}}>
<Image  resizeMode="stretch" style={{position:'absolute',top:10}}
source={Images.placeIcon}
/>
<Text allowFontScaling={false}  style={{color:Colors.darkText,marginTop:10,marginLeft:'8%',fontSize:18,fontWeight:'500'}}>Vardhaan Hospital</Text>
<Text allowFontScaling={false}  style={{color:Colors.TextColor, marginTop:8,marginLeft:'8%',fontSize:16,fontWeight:'400'}}>{this.state.item.address} </Text>
</View>
<View style={{width:'90%',marginLeft:'5%',height:1,backgroundColor:Colors.seprator,marginTop:10}}></View>




<View  style={{width:'90%',marginLeft:'5%',height:'auto' , backgroundColor:'white',borderRadius:6,margintop:20}}>
<CalendarPicker
          onDateChange={this.onDateChange}
          selectedDayColor={Colors.PrimaryColor }
          selectedDayTextColor='white'
          todayBackgroundColor={Colors.PrimaryColorBlue }
          minDate={today}
          previousTitle="<"
          // previousTitleStyle={{color: '#fff'}}
          nextTitle=">"
          textStyle={{fontSize:18}}
    
        />
</View>

<TouchableOpacity onPress={() => this.morViewAction() } style={{width:'90%',marginLeft:'5%',height:40,backgroundColor:Colors.LightBlue,borderColor:Colors.PrimaryColorBlue, borderWidth:1, flexDirection:'row' ,alignItems:'center', justifyContent:'space-between',marginTop:20}}>
<Text allowFontScaling={false}  style={{color:Colors.darkText,fontSize:16,fontWeight:'400',marginLeft:10}}>Morning 8 AM to 12 PM</Text>
<Image  resizeMode="contain" style={{marginRight:10}}
source = { this.state.morViewStatus == true ?  Images.upIcon : Images.downIcon}
/>
</TouchableOpacity>
{this.state.morViewStatus == true ? <View style={{width:'90%',height:120,backgroundColor:'transparent',marginLeft:'5%'}}>

<FlatList
        style={{width:'100%',marginLeft:0 ,marginTop:10}}
        numColumns={3}
        data={this.state.morArray }
        renderItem={({ item,index }) => 
        <TouchableOpacity  onPress={() => this.morSelection(item,index) }  style={{width: '33.3%' ,height:50 , backgroundColor:'transparent',marginTop:5,alignItems:'center', justifyContent:'center'}}>
             <View style={{width:'80%',height:35,backgroundColor:this.state.selectedSlot != item.slot ? Colors.LightPink : Colors.PrimaryColor,borderRadius:17.5 , borderWidth:1,borderColor:Colors.PrimaryColorPink,borderStyle: 'dashed',alignItems:'center', justifyContent:'center'}}>
             <Text allowFontScaling={false}  style={{color:this.state.selectedSlot != item.slot ? Colors.PrimaryColor : Colors.White,fontSize:16,fontWeight:'500'}}>{item.slot}</Text>

            </View>
                  

     </TouchableOpacity>
        }
        keyExtractor={(item, index) => index.toString()}
        />


</View> : null}







<TouchableOpacity onPress={() => this.noonViewAction() } style={{width:'90%',marginLeft:'5%',marginTop:20,height:40,backgroundColor:Colors.LightBlue,borderColor:Colors.PrimaryColorBlue, borderWidth:1, flexDirection:'row' ,alignItems:'center', justifyContent:'space-between'}}>
<Text allowFontScaling={false}  style={{color:Colors.darkText,fontSize:16,fontWeight:'400',marginLeft:10}}>Afternoon 12 PM to 4 PM</Text>
<Image  resizeMode="contain" style={{marginRight:10}}
source = { this.state.noonViewStatus == true ?  Images.upIcon : Images.downIcon}
/>
</TouchableOpacity>
{this.state.noonViewStatus == true ? <View style={{width:'90%',height:120,backgroundColor:'transparent',marginLeft:'5%'}}>

<FlatList
        style={{width:'100%',marginLeft:0 ,marginTop:10}}
        numColumns={3}
        data={this.state.noonArray }
        renderItem={({ item,index }) => 
        <TouchableOpacity  onPress={() => this.noonSelection(item,index) }  style={{width: '33.3%' ,height:50 , backgroundColor:'transparent',marginTop:5,alignItems:'center', justifyContent:'center'}}>
             <View style={{width:'80%',height:35,backgroundColor:this.state.selectedSlot != item.slot ? Colors.LightPink : Colors.PrimaryColor,borderRadius:17.5 , borderWidth:1,borderColor:Colors.PrimaryColorPink,borderStyle: 'dashed',alignItems:'center', justifyContent:'center'}}>
             <Text allowFontScaling={false}  style={{color:this.state.selectedSlot != item.slot ? Colors.PrimaryColor : Colors.White,fontSize:16,fontWeight:'500'}}>{item.slot}</Text>

            </View>
                  

     </TouchableOpacity>
        }
        keyExtractor={(item, index) => index.toString()}
        />


</View> : null}







<TouchableOpacity onPress={() => this.eveViewAction() } style={{width:'90%',marginLeft:'5%',marginTop:20,height:40,backgroundColor:Colors.LightBlue,borderColor:Colors.PrimaryColorBlue, borderWidth:1, flexDirection:'row' ,alignItems:'center', justifyContent:'space-between'}}>
<Text allowFontScaling={false}  style={{color:Colors.darkText,fontSize:16,fontWeight:'400',marginLeft:10}}>Evening 4 PM to 8 PM</Text>
<Image  resizeMode="contain" style={{marginRight:10}}
source = { this.state.eveViewStatus == true ?  Images.upIcon : Images.downIcon}
/>
</TouchableOpacity>
{this.state.eveViewStatus == true ? <View style={{width:'90%',height:120,backgroundColor:'transparent',marginLeft:'5%'}}>

<FlatList
        style={{width:'100%',marginLeft:0 ,marginTop:10}}
        numColumns={3}
        data={this.state.eveArray }
        renderItem={({ item,index }) => 
        <TouchableOpacity  onPress={() => this.eveSelection(item,index) }  style={{width: '33.3%' ,height:50 , backgroundColor:'transparent',marginTop:5,alignItems:'center', justifyContent:'center'}}>
             <View style={{width:'80%',height:35,backgroundColor:this.state.selectedSlot != item.slot ? Colors.LightPink : Colors.PrimaryColor,borderRadius:17.5 , borderWidth:1,borderColor:Colors.PrimaryColorPink,borderStyle: 'dashed',alignItems:'center', justifyContent:'center'}}>
             <Text allowFontScaling={false}  style={{color:this.state.selectedSlot != item.slot ? Colors.PrimaryColor : Colors.White,fontSize:16,fontWeight:'500'}}>{item.slot}</Text>

            </View>
                  

     </TouchableOpacity>
        }
        keyExtractor={(item, index) => index.toString()}
        />


</View> : null}








<TouchableOpacity onPress={() => this.nightViewAction() } style={{width:'90%',marginLeft:'5%',marginTop:20,height:40,backgroundColor:Colors.LightBlue,borderColor:Colors.PrimaryColorBlue, borderWidth:1, flexDirection:'row' ,alignItems:'center', justifyContent:'space-between'}}>
<Text allowFontScaling={false}  style={{color:Colors.darkText,fontSize:16,fontWeight:'400',marginLeft:10}}>Night 8 PM to 12 AM</Text>
<Image  resizeMode="contain" style={{marginRight:10}}
source = { this.state.nightViewStatus == true ?  Images.upIcon : Images.downIcon}
/>
</TouchableOpacity>
{this.state.nightViewStatus == true ? <View style={{width:'90%',height:120,backgroundColor:'transparent',marginLeft:'5%'}}>

<FlatList
        style={{width:'100%',marginLeft:0 ,marginTop:10}}
        numColumns={3}
        data={this.state.nightArray }
        renderItem={({ item,index }) => 
        <TouchableOpacity  onPress={() => this.nightSelection(item,index) }  style={{width: '33.3%' ,height:50 , backgroundColor:'transparent',marginTop:5,alignItems:'center', justifyContent:'center'}}>
             <View style={{width:'80%',height:35,backgroundColor:this.state.selectedSlot != item.slot ? Colors.LightPink : Colors.PrimaryColor,borderRadius:17.5 , borderWidth:1,borderColor:Colors.PrimaryColorPink,borderStyle: 'dashed',alignItems:'center', justifyContent:'center'}}>
             <Text allowFontScaling={false}  style={{color:this.state.selectedSlot != item.slot ? Colors.PrimaryColor : Colors.White,fontSize:16,fontWeight:'500'}}>{item.slot}</Text>

            </View>
                  

     </TouchableOpacity>
        }
        keyExtractor={(item, index) => index.toString()}
        />


</View> : null}


<TouchableOpacity onPress={() => this.bookAction()} style={{width:250,height:50,marginTop:'15%',backgroundColor:Colors.LightPink ,justifyContent:'center',alignItems:'center',alignSelf:'center',borderRadius:30 ,borderStyle: 'dashed',borderWidth:1,borderColor:Colors.PrimaryColorPink }}>
       
<Text allowFontScaling={false}  style={{color:Colors.PrimaryColorPink,fontSize:18,fontWeight:'bold'}}>Book</Text>

</TouchableOpacity>


<View style={{width:100,height:100}}></View>
  
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
