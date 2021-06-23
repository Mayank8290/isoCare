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
    Alert
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import DummySplash from '../../components/DummySplash';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
import Colors from '../../utils/Colors';
import Images from '../../utils/Images';
import { getConfiguration, setConfiguration } from '../../utils/configuration';
import Activity from '../../components/ActivityIndicator'
import RadioGroup from 'react-native-radio-button-group';
export default class Language extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            name: '',
            email: '',
            cnfPassword: '',
            newPassword: '',
            googleId: '',
            facebookId: '',
            countryCode: '+234',
            photo: '',
            mainViewTop: 0,
            autoLogin: true,
            scrollPadding: 0,
            password: '',
            radiogroup_options: [
                { id: 0, label: 'English' },
                { id: 1, label: 'ਪੰਜਾਬੀ' },
            ],
            selectedOption: {},
            isLanguage: false,
        };




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

        const { navigation } = this.props;

        console.log("isLanguage", navigation.getParam('isLanguage', 'NO-User'))

        let islang = navigation.getParam('isLanguage', false)

        this.setState({
            isLanguage: islang
        });



        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this._keyboardDidShow.bind(this),
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this._keyboardDidHide.bind(this),
        );

        console.log("languageprop", this.props);

        this.getSeelctedLanguages();

        if (!this.state.isLanguage) {
            this.removeSplashScreen();
        }




    }


    async removeSplashScreen() {


        const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');


        if (selectedLanguage == "" || selectedLanguage == null || selectedLanguage.toLocaleLowerCase() == "english") {
            this.props.getSelectedLanguage("english")
                .then(() => this.afterlanguageset())
                .catch(e => this.showAlert(e.message, 300));
        }
        else if (selectedLanguage.toLocaleLowerCase() == "punjabi") {
            this.props.getSelectedLanguage("punjabi")
                .then(() => this.afterlanguageset())
                .catch(e => this.showAlert(e.message, 300));
        }
        else if (selectedLanguage.toLocaleLowerCase() == "hindi") {
            this.props.getSelectedLanguage("hindi")
                .then(() => this.afterlanguageset())
                .catch(e => this.showAlert(e.message, 300));
        }




    }

    async afterlanguageset() {
        console.log("onloginchecking...........");
        const us = await AsyncStorage.getItem('user_id');
        setConfiguration('user_id', us);
        const userType = await AsyncStorage.getItem('userType');
        setConfiguration('userType', userType);

        if (us != '' && us != null) {

            if (userType == '0') {
                console.log("onloginchecking...........HomeScreen");
                this.props.navigation.navigate('HomeScreen')
            } else {

                this.props.navigation.navigate('HomeEmpScreen')

            }



        } else {

            this.setState({ autoLogin: false });


        }

        // setTimeout(
        //     () => this.setState({ autoLogin: false }),
        //     2000
        // );
    }


    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    async getSeelctedLanguages() {

        let selectedlangauge = await AsyncStorage.getItem('selectedLanguage');
        let object = { label: selectedlangauge, id: 0 };
        if (selectedlangauge == "English") {
            object.id = 0;
            this.setState({
                selectedOption: object
            });
        }
        else if (selectedlangauge == "ਪੰਜਾਬੀ") {
            object.id = 1;
            this.setState({
                selectedOption: object
            });
        }
        else if (selectedlangauge == "Hindi") {
            object.id = 2;
            this.setState({
                selectedOption: object
            });
        }

        console.log("selected", this.state.selectedOption);


    }



    loginAction() {

        console.log("selected", this.state.selectedOption);

        if (this.state.selectedOption.label == "Hindi") {
            this.props.getSelectedLanguage("hindi")
                .then(() => this.languagesetDone())
                .catch(e => this.showAlert(e.message, 300));
        }
        else if (this.state.selectedOption.label == "English") {
            this.props.getSelectedLanguage("english")
                .then(() => this.languagesetDone())
                .catch(e => this.showAlert(e.message, 300));
        }
        else if (this.state.selectedOption.label == "ਪੰਜਾਬੀ") {
            this.props.getSelectedLanguage("punjabi")
                .then(() => this.languagesetDone())
                .catch(e => this.showAlert(e.message, 300));
        }
        else {
            this.showAlert(this.props.languages.select_language);
        }



    }

    async languagesetDone() {
        if (this.state.isLanguage == false) {
            await AsyncStorage.setItem('selectedLanguage', this.state.selectedOption.label);
            this.props.navigation.navigate('LoginScreen');
        }
        else {
            this.showAlert(this.props.languages.saved_language);
            await AsyncStorage.setItem('selectedLanguage', this.state.selectedOption.label);
        }





    }

    showAlert(message, duration) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            alert(message);
        }, duration);
    }
    goBack() {
        this.props.navigation.goBack();
    }

    onPressRadioButton() {
        console.log("choosed");
        // setRadioButtons(radioButtonsArray);
    }


    render() {
        if (this.state.autoLogin == true && this.state.isLanguage == false) {
            return (<DummySplash />);


        }

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <ImageBackground source={Images.bgNewDark} style={{ flex: 1 }}>
                    <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>

                        <View style={styles.headerView}>
                            {this.state.isLanguage == true ?
                                <TouchableOpacity
                                    style={styles.backTouchable}
                                    onPress={() => this.goBack()}>
                                    <Image resizeMode="contain" style={styles.backIcon}
                                        source={Images.backImage}
                                    />
                                </TouchableOpacity> :
                                <View></View>
                            }

                            <Text allowFontScaling={false} style={styles.title}>{this.state.isLanguage == false ? "" : this.props.languages.Change_Language}</Text>
                        </View>

                        <Image resizeMode="contain" style={{ width: 300, height: 150, alignSelf: 'center' }}
                            source={Images.Logo}
                        />

                        <Text allowFontScaling={false} style={{ fontSize: 28, textAlign: 'center', fontWeight: 'bold', color: "#363657" }}>CHOOSE THE LANGUAGE</Text>

                        <View style={{ paddingLeft: 20, paddingRight: 20, marginTop: 30 }}>
                            <RadioGroup
                                options={this.state.radiogroup_options}
                                onChange={(option) => this.setState({ selectedOption: option })}
                            />
                        </View>




                        <TouchableOpacity onPress={() => this.loginAction()} style={{ width: 250, height: 50, marginTop: 20, backgroundColor: Colors.RED, justifyContent: 'center', alignSelf: 'center', borderRadius: 30 }}>

                            <Text allowFontScaling={false} style={{ fontSize: 20, color: 'white', alignSelf: 'center' }}>{this.state.isLanguage == false ? "NEXT" : "DONE"}</Text>

                        </TouchableOpacity>

                    </KeyboardAwareScrollView>

                    {this.props.isBusy ? <Activity /> : null}
                </ImageBackground>
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
        height: 55,
        width: '100%',

        borderColor: '#0082cb',
        borderWidth: 0,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    title: {
        paddingTop: 5,
        fontSize: wp('4.8%'),
        color: Colors.black,
        alignSelf: 'center'
    },
    backTouchable: {
        width: 60,
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

    },
});
