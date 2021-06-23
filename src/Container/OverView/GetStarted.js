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


export default class getStarted extends React.Component {
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

    nextAction(){



    }

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
  source={require('../../../assets/Logo.png') }
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
                <Text style={{alignSelf:'center',fontSize:18,fontWeight:'bold',marginTop:0,color:Colors.PrimaryColorBlue}}>{titleText}</Text>

                    </View> 

                    <Text style={{alignSelf:'center',marginTop:15,width:'80%',textAlign:'center'}}>{item}</Text>
                    {this.renderSkipView()}
                    {this.renderBottomButton()}

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
                </Swiper>
  
            </View>
        );
    }
//3025183040 176
    getStratedButtonAction() {
        this.props.navigation.navigate('LoginScreen');
    }

    renderBottomButton() {
            return (
                <View style={styles.bottomButton}>

                    <TouchableOpacity
                        onPress={() => this.nextAction()}
                        style={styles.button}
                    >
                        <Image  resizeMode="contain" style={{width:'70%'}}
  source={require('../../../assets/btn_large.png') }
  />
                    </TouchableOpacity>
                </View>
            );
        
    }

    render() {
        return (
            <View style={styles.mainView}>
                {/* {this.renderTopView()}               */}
                {this.renderSwiperList()}
                {/* {this.renderBottomButton()} */}
                {/* {this.renderSkipView()} */}

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
        height: 40,
        justifyContent: 'center',
        alignItems:'center',
        // position:"absolute",
        // bottom:15,
        backgroundColor: 'transparent',
        marginTop:20
    },
    skipTitle: {
        textAlign: 'right',
        color: Colors.black,
        fontSize: 18,
        fontWeight:'bold'
        // fontFamily: Fonts.Regular
    },
    skipButton: {
        width: 50,
        height: 40,
        // marginRight: 20,
        // alignSelf: 'center',
        //  alignItems:'center',
        //  justifyContent:'center '

    },
    wrapper: {
        height: hp('85%'),
        width: wp('100%'),
        marginTop:'15%',
    },
    swipeImage: {
        width: '70%',
        height: '50%',
        marginLeft:'10%'
    },
    slider: {
        width: '100%',
        height: '100%',
    },
    bottomButton: {
        backgroundColor: 'transparent',
        width: '100%',
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        marginTop: 0,
        borderBottomWidth: 0,
        bottom:0
    },
    button: {
        width: '100%',
        height: 60,
        marginTop: 0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        borderRadius: 6,
        backgroundColor: 'transparent'
    },
    sendTitle: {
        fontSize: 18,
        // fontFamily: Fonts.Medium,
        color: 'white',
    },
});