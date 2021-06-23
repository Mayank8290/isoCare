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
  Dimensions
} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
import Swiper from 'react-native-swiper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../utils/Colors';
import Images from '../../utils/Images';


export default class overview extends React.Component {
  that = this;
    constructor(props) {
        super(props);
        this.state = {
            showGetStartedButton: false,
        }
        const { navigation } = props;

        this.didFocusListener = navigation.addListener(
            'didFocus',
            this.componentDidFocus,
        );
    }

    componentDidFocus = payload => {
        console.log('hurrayyyyyy');
    };


    renderSkipView() {
        return (
            <View style={styles.skipView}>
                <TouchableOpacity
                    onPress={() => this.getStratedButtonAction()}
                    style={styles.skipButton}>
                    <Text style={styles.skipTitle}>Skip</Text>
                </TouchableOpacity>
            </View>
        );
    }
    renderTopView() {
        return (
            <View style={{width:'100%',height:170,backgroundColor:'transparent',alignItems:'center',justifyContent:'center'}}>
                 {/* <Image  resizeMode="contain" style={{width:'70%',height:170,top:40}}
  source={require('../../../assets/logo_login.png') }
  /> */}
            </View>
        );
    }

    showButton(index) {
        this.setState({
            showGetStartedButton: (index == 2) ? true : false
        });
    }

    renderSlideView(image,titleText,item) {
        return (
            <View style={styles.slider}>
                <Image
                    resizeMode="contain"
                    style={styles.swipeImage}
                    source={image}
                />
               <View style={{backgroundColor:'transparent',alignItems:'center',justifyContent:'center' ,width:'80%',height:50,marginLeft:'10%',marginTop:10,borderBottomColor:Colors.PrimaryColorBlue,borderBottomWidth:1,borderTopColor:Colors.PrimaryColorBlue,borderTopWidth:1}}>
                <Text style={{alignSelf:'center',fontSize:18,fontWeight:'bold',marginTop:0,color:Colors.PrimaryColorBlue,textAlign:'center'}}>{titleText}</Text>

                    </View> 

                    <Text style={{alignSelf:'center',marginTop:15,width:'80%',textAlign:'center'}}>{item}</Text>
                    {/* {this.renderSkipView()}
                    {this.renderBottomButton()} */}

                    <View style={{backgroundColor:'transparent',alignItems:'center',justifyContent:'center' ,width:'80%',height:50,}}></View>

                {/* <Text style={{alignSelf:'center',fontSize:24,fontWeight:'bold',marginTop:0,color:Colors.PrimaryColorRed}}>{titleText}</Text>
                <Text style={{alignSelf:'center',marginTop:15}}>{item}</Text> */}
            </View>
        );
    }

    // renderSlideViewText(item) {
    //     return (
    //         <View style={styles.slider}>
    //             <Image
    //                 resizeMode="contain"
    //                 style={styles.swipeImage}
    //                 source={image}
    //             />
    //         </View>
    //     );
    // }

    renderSwiperList() {
        return (
            <View style={styles.wrapper}>
                <Swiper showsButtons={false}
                    loop = {false}
                    autoplay = {false}
                    autoplayTimeout = {5}
                    onIndexChanged={(index) => this.showButton(index)}
                    // dotStyle = {{width:15 ,height:15,borderWidth:1,borderColor:Colors.PrimaryColorRed,borderColor:Colors.PrimaryColorRed}}
                    // activeDotStyle = {{width:15 ,height:15}}
                    // dotColor={Colors.dotColor}
                    activeDotColor={Colors.PrimaryColor}>
                 {this.renderSlideView(Images.getStarted1,'ASK A QUERY' ,'Ask a doctor online and get quick medical advice for your health queries.')}
                    {this.renderSlideView(Images.getStarted2,'BOOK CONSULTATION' ,'Lorem Ipsum is simply dummy text of the printing and typesetting industry.')}
                    {this.renderSlideView(Images.getStarted3,'CHAT WITH DOCTOR' ,'Lorem Ipsum is simply dummy text of the printing and typesetting industry.')}
                    {this.renderSlideView(Images.getStarted4,'UPLOAD REPRT & MEDICINE PRESCRIPTION' ,'Lorem Ipsum is simply dummy text of the printing and typesetting industry.')}

                </Swiper>
  
            </View>
        );
    }
//3025183040 176
    getStratedButtonAction() {
        this.props.navigation.navigate('LoginScreen');
    }

    renderBottomButton() {
        if (this.state.showGetStartedButton == true) {
            return (
                <View style={styles.bottomButton}>

                    <TouchableOpacity
                        onPress={() => this.getStratedButtonAction()}
                        style={styles.button}
                    >
                        <Text allowFontScaling={false} style={styles.sendTitle}>Create Profile</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }

    render() {
        return (
            <View style={styles.mainView}>
                {this.renderTopView()}              
                {this.renderSwiperList()}
                {/* {this.renderBottomButton()} */}
                {this.renderSkipView()}

            </View>
        );
    };


}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: 'white'
    },
    skipView: {
        width: '100%',
        height: 50,
        justifyContent: 'flex-end',
        position:"absolute",
        bottom:15
    },
    skipTitle: {
        textAlign: 'right',
        color: Colors.PrimaryColorBlue,
        fontSize: 16,
        fontWeight:'500'
        // fontFamily: Fonts.Regular
    },
    skipButton: {
        width: 50,
        height: 50,
        marginRight: 20,
        alignSelf: 'flex-end',
    },
    wrapper: {
        height: hp('50%'),
        width: wp('100%'),
        marginTop: 20,
    },
    swipeImage: {
        width: '80%',
        height: '80%',
        marginLeft:'10%'
    },
    slider: {
        width: '100%',
        height: '70%',
    },
    bottomButton: {
        backgroundColor: 'transparent',
        width: '100%',
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        height: '16%',
        marginTop: 20,
        borderBottomWidth: 0,
        borderColor: '#818e97',
        position:'absolute',
        bottom:0
    },
    button: {
        width: '90%',
        height: 50,
        marginTop: 0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        borderRadius: 6,
        backgroundColor: Colors.PrimaryColor
    },
    sendTitle: {
        fontSize: 18,
        // fontFamily: Fonts.Medium,
        color: 'white',
    },
});