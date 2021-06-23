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

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import { getConfiguration, setConfiguration } from '../../utils/configuration';


export default class questions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      attachments: [],
      emojiAr: [{ image: require('../../../assets1/very-happy.png') }, { image: require('../../../assets1/smile.png') }, { image: require('../../../assets1/happy.png') }, { image: require('../../../assets1/sad.png') }, { image: require('../../../assets1/restless.png') }, { image: require('../../../assets1/angry.png') }],
      questionAr: [],
      StatusArray: [],
      otherTF: '',
      images: [
        {
          text: 'Nursing Consultation',
          text2: 'Task Completed',
          image: Images.tick,
        },
        {
          text: 'Doctor Consultation',
          text2: 'Task Completed',
          image: Images.tick,
        },
        {
          text: 'Dietician Consultation',
          text2: 'Task Pending',
          image: Images.cancel,
        },
        {
          text: 'Psychological Consultation',
          text2: 'Task Pending',
          image: Images.cancel,
        },
        {
          text: 'Physician Video Consultation',
          text2: 'Task Pending',
          image: Images.cancel,
        },
      ],
      bottomImages: [
        {
          text: 'Home',
          image: Images.covidHome,
        },
        {
          text: 'Questionnaire',
          image: Images.question,
        },
        {
          text: 'Training',
          image: Images.training,
        },
        {
          text: 'Vital',
          image: Images.vital,
        },
      ],
      day: 1,

      name: 'Vishal',
      today: '',

    };
    this.onDateChange = this.onDateChange.bind(this);

    const { navigation } = props;


    this.didFocusListener = navigation.addListener(
      'didFocus',
      this.componentDidFocus,
    );
  }

  componentDidFocus = payload => {

    console.log('hurrayyyyyy', payload);
    this.getQuestionList()

  };

  onDateChange(date) {
    console.log('date :', date.format('DD-MM-YYYY'));
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


    var today = moment(new Date()).format('DD MMM YYYY');
    this.setState({ today });


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

  async getQuestionList() {
    let selectedlangauge = await AsyncStorage.getItem('selectedLanguage');
    if (selectedlangauge == "English") {
      this.props.getQusetionAPI("english")
        .then(() => this.afterGetQuestion())
        .catch(e => alert(e.message));
    }
    else if (selectedlangauge == "ਪੰਜਾਬੀ") {
      this.props.getQusetionAPI("punjabi")
        .then(() => this.afterGetQuestion())
        .catch(e => alert(e.message));
    }
    else {
      this.props.getQusetionAPI("hindi")
        .then(() => this.afterGetQuestion())
        .catch(e => alert(e.message));
    }



  }

  afterGetQuestion() {
    console.log("isBusy value --- ", this.props.isBusyquestion);
    console.log("response value --- ", this.props.responsequestion);

    var ar = this.props.responsequestion.response.questions



    var ques = []
    for (let i = 0; i < ar.length; i++) {

      ques.push(-1)
    }


    this.setState({
      StatusArray: ques,
    })

    console.log('Quest Status Array : ', this.state.StatusArray);


    this.setState({
      questionAr: this.props.responsequestion.response.questions,
    })

  }

  loginAction() {

    this.props.navigation.navigate('PasswordScreen');

  }

  goBack() {
    this.props.navigation.goBack();
  }

  openMenu(index) {

    if (index == 0) {

      this.props.navigation.navigate('CovidHomeScreen');

    } else if (index == 1) {

      //   this.props.navigation.navigate('QuestionsScreen');

    } else if (index == 2) {

      this.props.navigation.navigate('TrainingScreen');

    } else if (index == 3) {

      // this.props.navigation.navigate('VitalsScreen');
      this.props.navigation.navigate('VitalsScreen', { screen: 'user' });

    }


  }

  renderCard = () => {
    const { questionAr } = this.state;

    return questionAr.map((data, index) => {
      return (
        <View style={{ width: '95%', height: 180, alignSelf: 'center', backgroundColor: 'white' }}>
          <View style={{
            width: '100%', height: 160, backgroundColor: 'white', borderRadius: 6,
            shadowOffset: { width: 1, height: 1, },
            shadowColor: 'gray',
            shadowOpacity: 0.5,
            shadowRadius: 2, elevation: 3,
          }}>
            <Text style={{ fontSize: 18, fontWeight: '300', marginLeft: 8, color: 'black', marginTop: 10 }}>{data.question}</Text>
            <Text style={{ fontSize: 14, fontWeight: '300', marginLeft: 8, color: 'gray', marginTop: 3 }}>{data.subq}</Text>
            <View style={{ width: '100%', height: 40, flexDirection: 'row', backgroundColor: 'transparent' }}>
              <Text allowFontScaling={false} style={{ fontSize: 13, fontWeight: '300', marginLeft: 8, color: 'black', marginTop: 10, fontWeight: 'bold' }}>{this.props.languages.Good}</Text>
              <Text allowFontScaling={false} style={{ fontSize: 13, fontWeight: '300', marginLeft: '80%', color: 'black', marginTop: 10, fontWeight: 'bold' }}>{this.props.languages.Bad}</Text>
            </View>

            <View style={{ width: '100%', height: 'auto', flexDirection: 'row', backgroundColor: 'transparent', marginTop: 10 }}>
              <ScrollView contentContainerStyle={{ width: 'auto', height: 'auto', flexDirection: 'row' }} horizontal={true} directionalLockEnabled={true} style={{ width: 'auto', height: '100%', backgroundColor: 'transparent', flexDirection: 'row' }}>



                {this.renderEmojiImage(index)}


              </ScrollView>


            </View>

          </View>

          {/* <View style={{width:'100%',marginLeft:'2.5%',height:1,backgroundColor:'lightgrey',marginTop:15}}></View> */}
        </View>
      );
    });
  };

  renderImage = () => {
    const { bottomImages } = this.state;

    return bottomImages.map((data, index) => {
      return (
        <View style={styles.imagesColumn}>
          <TouchableOpacity onPress={() => this.openMenu(index)} style={{ alignItems: 'center' }}>
            <Image source={data.image} />
            <View style={styles.textWidth}>
              <Text style={styles.bottomImagesText}>{data.text}</Text>
            </View>
          </TouchableOpacity>

        </View>
      );
    });
  };

  renderEmojiImage = (index1) => {
    const { emojiAr } = this.state;

    return emojiAr.map((data, index) => {

      var st = this.state.StatusArray[index1]

      return (
        <View style={styles.imagesColumn1}>
          <TouchableOpacity onPress={() => this.smilePress(data, index, index1)} style={{ alignItems: 'center' }}>
            <Image source={data.image} />

          </TouchableOpacity>
          { st == index ? <Image resizeMode='contain' style={{ width: 15, height: 15, position: 'absolute', right: 10 }} source={Images.tickNew} /> : null}

        </View>
      );
    });
  };


  smilePress(data, index, index1) {

    // console.log('i data :',data);
    // console.log('i index :',index);
    // console.log('i index1 :',index1);

    const some_array = [...this.state.StatusArray]
    console.log('i index1 :', some_array);

    some_array[index1] = index
    console.log('i index2 :', some_array);

    this.state.StatusArray = []
    this.setState({ StatusArray: [] })
    this.setState({ StatusArray: some_array })

    console.log('i index3 :', this.state.StatusArray);


  }


  SubmitAction() {

    var stat = false

    for (let i = 0; i < this.state.StatusArray.length; i++) {

      if (this.state.StatusArray[i] == -1) {
        console.log('i value :', i);
        stat = true
        Alert.alert(this.props.languages.select_all_answers);

        return


      }

    }


    if (stat == false) {


      var AnswerAr = []
      for (let i = 0; i < this.state.StatusArray.length; i++) {

        AnswerAr.push({ question_ref: this.state.questionAr[i].question_ref, answer: this.state.StatusArray[i] + 1, other: this.state.otherTF })


      }

      console.log('Answers : ', AnswerAr);
      this.SendAnswers(AnswerAr)


    }


  }


  SendAnswers(ans) {

    var userId = getConfiguration('patientRef', '');
    console.log('userId', userId)

    this.props.submitAnswerAPI(userId, ans)
      .then(() => this.afterSendAnswers())
      .catch(e => alert(e.message));

  }

  afterSendAnswers() {
    console.log("isBusy value --- ", this.props.isBusy);
    console.log("response value --- ", this.props.response);

    Alert.alert(
      this.props.languages.Success,
      this.props.languages.submitted_successfully,
      [
        {
          text: this.props.languages.OK,
          onPress: () => this.goToHome()
        },

      ],
      { cancelable: false }
    );

  }


  goToHome() {

    this.props.navigation.navigate('CovidHomeScreen');



  }
  render() {



    // const { selectedStartDate } = this.state;
    // const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    // let today = moment();
    const { name, today, day } = this.state;


    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ overflow: 'hidden', paddingBottom: 5 }}>
          <View style={styles.headerView}>
            <TouchableOpacity
              style={styles.backTouchable}
              onPress={() => this.goBack()}>
              <Image resizeMode="contain" style={styles.backIcon}
                source={Images.backImage}
              />
            </TouchableOpacity>

            <Text allowFontScaling={false} style={{ fontSize: 20, color: 'white', marginLeft: 0 }}>{this.props.languages.Questionnaire}</Text>


            {/* <TouchableOpacity
           style={styles.submitA}
           onPress={() => this.SubmitAction()}>
                   <Text allowFontScaling={false}  style={{fontSize: 16,color:'black',marginLeft:0}}>Submit</Text>

         </TouchableOpacity> */}

          </View>
        </View>

        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          <View style={{ width: '100%', height: 180, backgroundColor: 'transparent', marginTop: 10 }}>
            <Image resizeMode="stretch" style={{
              width: '90%', height: '100%', marginLeft: '5%', borderRadius: 0, shadowOffset: { width: 1, height: 1, },
              // shadowColor: Colors.darkText ,
              // shadowOpacity: 1.5,
              // shadowRadius: 3,
              // elevation: 5,

            }}
              source={Images.ban3}
            />

          </View>
          <View style={{ width: '100%', height: 40, backgroundColor: 'white', justifyContent: 'center' }}><Text allowFontScaling={false} style={{ fontSize: 18, fontWeight: '700', color: Colors.BLUE, marginLeft: 20, marginTop: 0 }}>{this.props.languages.Your_Questionnaire_for_today}</Text></View>

          <View style={styles.cardMargin}>{this.renderCard()}</View>


          <Text style={{
            fontSize: 17,
            color: 'black', marginLeft: 20, marginTop: 15
          }}>{this.props.languages.other}</Text>
          <View style={{
            height: 100, width: '90%', marginLeft: '5%', marginTop: 15, borderRadius: 5,
            backgroundColor: 'white',
            shadowOffset: { width: 1, height: 1, },
            shadowColor: Colors.darkText,
            shadowOpacity: 1,
            shadowRadius: 3,
            elevation: 3
          }}>

            <TextInput
              style={{
                height: 90, width: '90%', marginLeft: '5%',

              }}
              placeholder=""
              placeholderTextColor={'#000000'}
              multiline={true}
              numberOfLines={4}
              autoCorrect={false}
              returnKeyType={'done'}
              blurOnSubmit={true}
              onSubmitEditing={() => { Keyboard.dismiss() }}

              onChangeText={(otherTF) => this.setState({ otherTF })}
              value={this.state.otherTF}
            />
          </View>


          <View style={{ width: '100%', height: 80, marginTop: 50 }}>
            <TouchableOpacity
              onPress={() => this.SubmitAction()}
              style={{ width: 150, height: 50, marginTop: 20, backgroundColor: 'transparent', justifyContent: 'center', alignSelf: 'center', borderRadius: 6 }}>
              <Image resizeMode="contain" style={{ width: '100%', height: '100%' }}
                source={Images.button}
              />
            </TouchableOpacity>
            {/* <TouchableOpacity
           style={styles.submitA}
           onPress={() => this.SubmitAction()}>
                   <Text allowFontScaling={false}  style={{fontSize: 16,color:'white',fontWeight:'bold',marginLeft:0}}>Submit</Text>

           </TouchableOpacity> */}

          </View>

          <View style={{ width: 100, height: 100 }}></View>
        </KeyboardAwareScrollView>

        {/* <View style={styles.bottomRow}>{this.renderImage()}</View> */}
        {this.props.isBusy || this.state.loadBusy || this.props.isBusyquestion ? <Activity /> : null}

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
    tintColor: 'black'

  },
  headerView: {
    height: 60,
    width: '100%',
    backgroundColor: Colors.BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowOffset: { width: 1, height: 1, },
    shadowColor: Colors.darkText,
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
    position: 'absolute'

  },
  submitA: {
    width: 180,
    height: 50,
    top: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 8,
    alignSelf: 'center'

  },
  backIcon: {

    width: 22,
    height: 22,
    backgroundColor: 'transparent',
    tintColor: 'white'

  },
  toolbar: {
    backgroundColor: '#ffffff',
    paddingBottom: moderateScale(10),
    flexDirection: 'row',
    paddingTop: moderateScale(20),
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#313131',
    shadowOpacity: 1.5,
    shadowRadius: 3,
    elevation: 5,
  },
  centerText: {
    marginTop: moderateScale(20),
    textAlign: 'center',
    fontSize: moderateScale(20),
  },
  toolbarButton: {
    //Step 2
    color: '#fff',
  },
  toolbarTitle: {
    fontWeight: 'bold',
    flex: 1,
    fontSize: moderateScale(20),
    textAlign: 'center',
  },
  videoContainer: {
    marginHorizontal: moderateScale(20),
    marginTop: moderateScale(20),
  },
  textContainer: {},
  textStyle: {
    borderBottomWidth: 1,
    height: moderateScale(40),
    fontSize: moderateScale(22),
    width: moderateScale(160),
    borderColor: '#7f8c8d',
  },
  smallTextStyle: {
    fontSize: moderateScale(14),
    marginTop: moderateScale(7),
    color: '#7f8c8d',
  },
  rowImages: {
    width: '100%',
    flexDirection: 'row',
    marginTop: moderateScale(90),
    justifyContent: 'space-around',
  },
  cardItem: {
    width: '100%',
    alignSelf: 'center',
    borderWidth: 1,
    height: moderateScale(60),
    borderColor: '#F7F7F7',
    borderRadius: moderateScale(20),
    marginBottom: moderateScale(10),
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowColor: '#00000029',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,

  },
  cardMargin: {
    marginTop: moderateScale(20),

  },
  bottomList: {
    position: 'absolute',
    bottom: moderateScale(10),
  },
  borderItem: {
    marginLeft: moderateScale(10),
    flex: 1,
    borderWidth: 1,
    height: verticalScale(150),
    borderColor: '#707070',
    justifyContent: 'center',
    width: moderateScale(100),
    alignItems: 'center',
  },
  flatListText: {
    color: '#ffffff',
    textAlign: 'center',
  },
  textImgRow: {
    flexDirection: 'row',
    marginHorizontal: moderateScale(10),
    justifyContent: 'space-around',
  },
  largeText: {
    color: '#565656',
    fontSize: moderateScale(17),
  },
  smallText: {
    color: '#898989',
    fontSize: moderateScale(14),
  },
  bottomRow: {
    flexDirection: 'row',
    width: '80%',
    height: 50,
    alignSelf: 'center',
    backgroundColor: 'red',
    justifyContent: 'center',
    borderRadius: moderateScale(30),
    position: 'relative',
    bottom: 40
  },
  imagesColumn: {
    flexDirection: 'column',
    width: '25%',
    height: 'auto',
    justifyContent: 'center'
    // marginLeft: moderateScale(20),
    // marginTop: moderateScale(10),
  },
  imagesColumn1: {
    flexDirection: 'column',
    width: 55,
    height: 45,
    // marginLeft:10,
    backgroundColor: 'transparent',
    marginTop: 0
    // marginLeft: moderateScale(20),
    // marginTop: moderateScale(10),
  },
  bottomImagesText: {
    color: 'white',
    fontSize: moderateScale(10),
    textAlign: 'center',
  },
  textWidth: {
    width: '100%',
  },
});
