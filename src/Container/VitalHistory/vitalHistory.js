import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    TextInput,
    StyleSheet,
    SafeAreaView,
    Dimensions
} from 'react-native';

import Images from '../../utils/Images';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
import Colors from '../../utils/Colors';
import { getConfiguration , setConfiguration} from '../../utils/configuration';


export default class vitalHistory extends React.Component {
    

    constructor(props) {
        super(props);
        this.state = {
          phone: '', 
          sbp:'',
          dbp:'',
          pulse:'',
          temp:'',
          spo:'',
          rr:'',
          otherTF:'',
          vitalHistoryAr:[],
          itemIndex:-1,
          Screen:'',
          UserRef:'',

        }
        const { navigation } = props;

    
        this.didFocusListener = navigation.addListener(
          'didFocus',
          this.componentDidFocus,
      );
    }
    
    componentDidFocus = payload => {
      console.log('hurrayyyyyy',payload.state.params.screen);

      this.setState({Screen:payload.state.params.screen,UserRef:payload.state.params.userRef})
      this.getVitals(payload.state.params.userRef)

      //7APR
    
    //   if(payload.state.params.screen == 'emp'){
    
    //     this.setState({Screen:payload.state.params.screen,UserRef:payload.state.params.userRef})
    //     this.getVitals(payload.state.params.userRef)

    //   }else{
    
    //     this.setState({Screen:payload.state.params.screen,UserRef:payload.state.params.userRef})
    //     this.getVitals(payload.state.params.userRef)

    //   }
    
    
    
    };



onclick(item,index){


if(index == this.state.itemIndex){
    this.setState({itemIndex:-1})


}else{

    this.setState({itemIndex:index})


}



}


renderItem = (item,index) => {

    var itemIndex = -1;

        return (

            <View style={styles.itemWrap}>
                <TouchableOpacity onPress={() => this.onclick(item,index)} style={[styles.listHeader,{backgroundColor:item.vital_status == '1' ? 'green' : 'red'}]}>
                    {/* <View style={{ width: '15%', alignItems: 'center',height:70,alignItems:'center',justifyContent:'center' }}>
                        <Image resizeMode='contain' source = { item.vital_status == '1' ? Images.flagRed : Images.flagGreen} style={{ width: 30, height: 40, borderRadius: 20 }} />
                    </View> */}
                    <View style={styles.dateTimeWrap}>
                        <Text style={{fontSize:15,color:'white'}}>Date : {item.vital_date}</Text>
                        <Text style={{fontSize:15,marginTop:8,color:'white'}}>Time : {item.vital_time}</Text>

                    </View>
                    <View style={styles.iconWrap}>
                        <View >
                            <Image source={this.state.itemIndex == index ?  Images.upIcon :    Images.downIcon} style={{ width: 15, height: 15 ,tintColor:'white'}}></Image>
                            {/* <Text style={{ fontSize: 24 }}>^</Text> */}
                        </View>
                    </View>

                </TouchableOpacity>
                {this.state.itemIndex == index ?
                    <View style={styles.innerWrap}>

                        <View style={styles.sdpDbpWrap}>
                            <View style={styles.sbpDbpInnerWrap}>
                                <Text style={styles.TextWhite}>SBP : </Text>
                                <Text style={styles.TextWhite}>{item.systolic_bp}</Text>
                            </View>
                            <View style={styles.sbpDbpInnerWrap}>
                                <Text style={styles.TextWhite}>DBP : </Text>
                                <Text style={styles.TextWhite}>{item.diastolic_bp}</Text>
                            </View>
                           
                        </View>


                        <View style={styles.sdpDbpWrap}>
                        <View style={styles.sbpDbpInnerWrap}>
                                <Text style={styles.TextWhite}>Temp : </Text>
                                <Text style={styles.TextWhite}>{item.temp}</Text>
                            </View>
                            <View style={styles.sbpDbpInnerWrap}>
                                <Text style={styles.TextWhite}>RR : </Text>
                                <Text style={styles.TextWhite}>{item.rr}</Text>
                            </View>
                           
                        {/* <View style={styles.sdpDbpWrap}>
                         
                            </View> */}
                        </View>

                        <View style={styles.sdpDbpWrap}>
                        <View style={styles.sbpDbpInnerWrap}>
                                <Text style={styles.TextWhite}>Pulse : </Text>
                                <Text style={styles.TextWhite}>{item.pulse}</Text>
                            </View>
                            <View style={styles.sbpDbpInnerWrap}>
                                <Text style={styles.TextWhite}>SPO2 : </Text>
                                <Text style={styles.TextWhite}>{item.spo2}</Text>
                        </View>
                           
                        </View>

                        <Text style={styles.nursesText}>Nurses Comment</Text>
                        <View style={{ alignItems: 'center', marginBottom: 20 }}>
                            <TextInput style={styles.textInputStyle}
                                value={item.nurse_comment}   
                                numberOfLines={12}
                                multiline={true}
                                editable={false}
                                scrollEnabled={true}
                                //item.nurse_comment                                                                                                                                                                                                                                                
                            />
                        </View>

                    </View> : null}

            </View>
        );
    }


    componentDidMount() {

        }
  
goBack() {
    this.props.navigation.goBack();
  }
        
        getVitals(userId) {
         
          
           
          
            this.props.GetVitalsHistory(userId)
              .then(() => this.aftergetVitals())
            .catch(e => alert(e.message));
          
          }
          
          aftergetVitals() {
          console.log("isBusy value --- ",this.props.isBusy);
          console.log("response value --- ",this.props.response);  
            this.setState({vitalHistoryAr:this.props.response.response.vital})

          }

    render(){
        
        return (
        <SafeAreaView style={{flex:1}}>
        <View style={styles.container}>

        <View style={{ overflow: 'hidden', paddingBottom: 5 }}>
        <View style={styles.headerView}>
          <TouchableOpacity
            style={styles.backTouchable}
            onPress={() => this.goBack()}>
            <Image resizeMode="contain" style={styles.backIcon}
              source={Images.backImage}
            />
          </TouchableOpacity>
          <Text allowFontScaling={false}  style={{fontSize: 20,color:Colors.White,marginLeft:0}}>Vitals History</Text>

        </View>
        </View>
            {this.state.vitalHistoryAr.length == 0 ? <View style={{width:'100%',height:400,alignItems:'center',justifyContent:'center'}}>
            <Text allowFontScaling={false}  style={{fontSize: 20,color:Colors.darkText,marginLeft:0}}>No records found.</Text></View> : <FlatList
                data={this.state.vitalHistoryAr}
                renderItem={({ item,index }) => this.renderItem(item,index)}
                extraData={this.state.vitalHistoryAr}
            />}
        </View>
        </SafeAreaView>
    );

}




  
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 20
    },
    headerStyle: {
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
        paddingVertical: 10,
        borderColor: 'lightgrey',
        borderWidth: 1,
    },
    itemWrap: {
        flex: 1,
        marginBottom: 15,
        marginTop: 20
    },
    listHeader: {
        elevation: 4,
        backgroundColor: 'white',
        flexDirection: 'row',
        marginRight: 18,
        marginLeft: 18,
        height:70,
        shadowOffset:{  width: 1,  height: 1,  },
        shadowColor: Colors.darkText ,
        shadowOpacity: 0.5,
        // overflow: 'hidden',
        shadowRadius: 3,
            elevation: 5,
         borderRadius:8   

    },
    dateTimeWrap: {
        width: '80%',
        marginLeft: 20,
        height: 70,
        justifyContent: 'center'
    },
    iconWrap: {
        width: '20%',
        marginRight: 10,
        justifyContent: 'center'
    },
    innerWrap: {
        // borderWidth: 1,
        // borderColor: 'lightgrey',
        marginLeft: 15,
        marginRight: 15,
        marginTop:10,
        // shadowOffset:{  width: 1,  height: 1,  },
        // shadowColor: Colors.darkText ,
        // shadowOpacity: 0.5,
        // // overflow: 'hidden',
        // shadowRadius: 3,
        //     elevation: 5,
         borderRadius:8  ,
         backgroundColor:'transparent'
    },
    sdpDbpWrap: {
        flexDirection: 'row',
        marginTop: 5,
        padding: 5,
        justifyContent: 'space-around',
        backgroundColor:'transparent'

    },
    textInputStyle: {
        height: 100,
        width: "90%",
        borderColor: 'lightgrey',
        borderWidth: 1,
        textAlignVertical:'top',
        paddingHorizontal:10,
        shadowOffset:{  width: 1,  height: 1,  },
        shadowColor: Colors.darkText ,
        shadowOpacity: 0.5,
        // overflow: 'hidden',
        shadowRadius: 3,
            elevation: 5,
        borderRadius:8  ,
        backgroundColor:'white'

        
    },
    nursesText: {
        marginLeft: 10,
        fontSize: 16,
        padding: 10,
        fontWeight:'700'
    },
    sbpDbpInnerWrap: {
        // borderColor: 'lightgrey',
        // borderWidth: 1,
        width: '45%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:Colors.BLUE,
        borderRadius:6,
        flexDirection:'row'
    },
    TextWhite:{
        color:'white'
    },
    headerView: {
        height: 60,
        width: '100%',
        backgroundColor: Colors.BLUE,
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
        tintColor:'white'
    
      },

})