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
  ProgressBarAndroid,
  Alert
} from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import Activity from '../../components/ActivityIndicator'
import CalendarPicker from 'react-native-calendar-picker';
import Pdf from 'react-native-pdf';

import VideoPlayer from 'react-native-video-player';
import YouTube, {
  YouTubeStandaloneIOS,
  YouTubeStandaloneAndroid,
} from 'react-native-youtube';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
import Colors from '../../utils/Colors';
import Images from '../../utils/Images';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import * as OpenAnything from 'react-native-openanything';
import { Thumbnail } from 'react-native-thumbnail-video';


export default class training extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      isReady: false,
      status: null,
      quality: null,
      error: null,
      isPlaying: false,
      isLooping: true,
      duration: 0,
      currentTime: 0,
      fullscreen: false,
      containerMounted: false,
      containerWidth: null,
      attachments: [],
      videoLink: [],
      docLink: [],
      ImagesLink: [],
      VideoPlayerStatus: false,
      playAr: [],
      pdfAr: [],
      tabSelected: '0',
      base_path: '',
      pdfStatus: false,

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
    this.getVideoList()

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

  getVideoList() {

    this.props.getVideoAPI()
      .then(() => this.afterGetVideo())
      .catch(e => alert(e.message));

  }

  afterGetVideo() {
    console.log("isBusy value --- ", this.props.isBusyVideo);
    console.log("response value --- ", this.props.responseVideo);

    var ar = this.props.responseVideo.response.video
    var vAr = []
    var dAr = []
    var iAr = []

    for (let i = 0; i < ar.length; i++) {

      if (ar[i].type == '1') {
        vAr.push(ar[i]);
      } else if (ar[i].type == '2') {
        dAr.push(ar[i]);

      } else if (ar[i].type == '3') {
        iAr.push(ar[i]);

      }


    }




    this.setState({
      videoLink: vAr,
      docLink: dAr,
      ImagesLink: iAr,
      base_path: this.props.responseVideo.response.base_path

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

      this.props.navigation.navigate('QuestionsScreen');

    } else if (index == 2) {

      // this.props.navigation.navigate('TrainingScreen');

    } else if (index == 3) {

      // this.props.navigation.navigate('VitalsScreen');
      this.props.navigation.navigate('VitalsScreen', { screen: 'user' });


    }


  }


  getvideoId(url) {

    var video_id = url.split('v=')[1];
    var ampersandPosition = video_id.indexOf('&');
    if (ampersandPosition != -1) {
      video_id = video_id.substring(0, ampersandPosition);
    }

    return video_id

  }


  changevideo(sts) {

    console.log('sts : ', sts)



  }

  videoStat(sts) {

    console.log('sts : ', sts)


  }

  playAction(data) {

    this.setState({ playAr: data })
    this.setState({ VideoPlayerStatus: true })

  }

  renderCard = () => {
    let { videoLink } = this.state;

    const temp = videoLink;
    console.log('videolink===========>', temp);
    return videoLink.map((data, index) => {
      console.log('video data', data);
      return (
        <View style={{
          width: '100%', height: 'auto', marginLeft: 0, backgroundColor: 'white', marginTop: 5, borderRadius: 6, padding: 6,

          shadowOffset: {
            width: 1, height: 1,
          },
          shadowColor: 'gray',
          shadowOpacity: 1.5,
          shadowRadius: 2, elevation: 3,
        }}>



          <View style={{ width: screenWidth - 50, height: 160, borderRadius: 6, }}>

            {data.video_url.includes('youtube') == true ?


              <TouchableOpacity style={{ backgroundColor: 'black', width: '100%', height: 'auto', justifyContent: 'center', alignItems: 'center' }} >

                <Thumbnail style={{ width: screenWidth - 50, height: 160, margin: 0 }} onPress={() => this.playAction(data)} url={data.video_url} />
              </TouchableOpacity>
              :
              <VideoPlayer
                video={{ uri: data.video_url }}
                videoWidth={1600}
                videoHeight={900}
                thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
              />
            }
          </View>
          <Text allowFontScaling={false} style={{ fontSize: 16, fontWeight: 'bold', color: Colors.darkText, marginLeft: 8, marginTop: 8 }}>{data.video_title}</Text>
          <Text allowFontScaling={false} style={{ fontSize: 16, height: 'auto', fontWeight: '400', color: Colors.darkText, marginLeft: 8, marginTop: 8 }}>{data.video_description}</Text>
          <View style={{ width: 100, height: 20, }}></View>
        </View>
      );
    });
  };


  openPdf(data) {

    this.setState({ pdfStatus: true, pdfAr: data })


  }

  closePdf() {

    this.setState({ pdfStatus: false, pdfAr: [] })



  }


  renderPdfView() {

    var imgUrl = this.state.base_path + this.state.pdfAr.video_url
    var yourPDFURI = { uri: imgUrl, cache: true };

    return (

      <View style={{ position: 'absolute', width: '100%', height: screenHeight - 20, top: 20, backgroundColor: 'white' }}>
        <TouchableOpacity onPress={() => this.closePdf()} style={{ width: 250, height: 50, backgroundColor: Colors.White, justifyContent: 'center', alignItems: 'flex-start' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Back to Documents</Text>

        </TouchableOpacity>
        <Pdf
          source={yourPDFURI}
          style={styles.pdf}
          onError={(error) => { console.log(error); }}
        />

      </View>



    );


  }




  renderImagesCard = () => {
    let { ImagesLink } = this.state;


    return ImagesLink.map((data, index) => {
      console.log('Image data', data);

      var imgUrl = this.state.base_path + data.video_url

      return (
        <View style={{
          width: '90%', height: 'auto', marginLeft: '5%', borderRadius: 6, backgroundColor: 'white', marginTop: 5,
          shadowOffset: {
            width: 1, height: 1,
          },
          shadowColor: 'gray',
          shadowOpacity: 1.5,
          shadowRadius: 2, elevation: 3,
        }}>



          <View style={{ width: '100%', height: 'auto', }}>
            <Image resizeMode='contain' style={{ width: screenWidth - 50, height: screenWidth - 50, alignSelf: 'center' }} source={{ uri: imgUrl }} />
          </View>

          <Text allowFontScaling={false} style={{ fontSize: 16, fontWeight: 'bold', color: Colors.darkText, marginLeft: 8, marginTop: 8 }}>{data.video_title}</Text>
          <Text allowFontScaling={false} style={{ fontSize: 16, height: 'auto', fontWeight: '400', color: Colors.darkText, marginLeft: 8, marginTop: 8 }}>{data.video_description}</Text>
          <View style={{ width: 100, height: 20, }}></View>
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

  closeAction() {

    this.setState({ playAr: [] })
    this.setState({ VideoPlayerStatus: false })

  }

  renderYoutubeView() {

    return (

      <View style={{ position: 'absolute', width: '100%', height: screenHeight - 20, top: 20, backgroundColor: 'white' }}>
        <TouchableOpacity onPress={() => this.closeAction()} style={{ width: 250, height: 50, backgroundColor: Colors.White, justifyContent: 'center', alignItems: 'flex-start' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Back to Videos</Text>

        </TouchableOpacity>
        <YouTube
          videoId={this.getvideoId(this.state.playAr.video_url)} // The YouTube video ID
          apiKey="AIzaSyDDND2sihGBh-DDFj97ID7nPpXF-KsLgK0"
          play={true}
          onReady={e => this.changevideo(e)}
          onChangeState={e => this.videoStat(e.state)}
          onChangeQuality={e => this.setState({ quality: e.quality })}
          onError={e => this.setState({ error: e.error })}
          style={{ alignSelf: 'stretch', height: '80%' }}
          fullscreen={false}
          thum
        />

      </View>



    );


  }

  // imageRenderCard = () => {
  //   let { ImagesLink } = this.state;
  //   return ImagesLink.map((data, index) => {
  //     console.log('video data',data);
  //     return (
  //       <TouchableOpacity style={{width:'100%',height:'auto',marginLeft:0 , backgroundColor:'white',marginTop:5,
  //       shadowOffset:{
  //   width: 1,  height: 1,  },
  //       shadowColor: 'gray',
  //       shadowOpacity: 1.5,
  //       shadowRadius: 2,elevation: 3,
  //       }}>

  // {/* <Image resizeMode="contain" style={{width:100,height:100}}
  //               source={uri:data}
  //             /> */}

  //       <Text allowFontScaling={false}  style={{fontSize: 20,fontWeight:'bold',color:Colors.darkText,marginLeft:8,marginTop:8}}>{data.video_title}</Text>
  //       <Text allowFontScaling={false}  style={{fontSize: 20,height:'auto',fontWeight:'bold',color:Colors.darkText,marginLeft:8,marginTop:8}}>{data.video_description}</Text>
  //       <View style={{width:100,height:20,}}></View>
  //       </TouchableOpacity>
  //     );
  //   });
  // };

  pdfrender() {
    const source = { uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf' };
    const { docLink } = this.state;
    // console.log('doclink======>', docLink[0].video_url);

    // /pdfImage
    return docLink.map((data, index) => {
      console.log('video data', data);
      return (
        <TouchableOpacity onPress={() => this.openPdf(data)} style={{
          width: '90%', height: 'auto', marginLeft: 0, backgroundColor: 'white', borderRadius: 6, marginTop: 5, alignSelf: 'center',
          shadowOffset: {
            width: 1, height: 1,
          },
          shadowColor: 'gray',
          shadowOpacity: 1.5,
          shadowRadius: 2, elevation: 3,
        }}>

          <Image resizeMode="contain" style={{ width: 100, height: 100 }}
            source={Images.pdfImage}
          />

          <Text allowFontScaling={false} style={{ fontSize: 16, fontWeight: 'bold', color: Colors.darkText, marginLeft: 8, marginTop: 8 }}>{data.video_title}</Text>
          <Text allowFontScaling={false} style={{ fontSize: 16, height: 'auto', fontWeight: '400', color: Colors.darkText, marginLeft: 8, marginTop: 8 }}>{data.video_description}</Text>
          <View style={{ width: 100, height: 20, }}></View>
        </TouchableOpacity>
      );
    });
  };





  changetab(index) {


    if (index == '0') {

      this.setState({ tabSelected: index })


    } else if (index == '1') {

      if (this.state.docLink.length == 0) {

        Alert.alert('No Document available')

      } else {

        this.setState({ tabSelected: index })

      }


    } else if (index == '2') {

      if (this.state.ImagesLink.length == 0) {

        Alert.alert('No Images available')


      } else {

        this.setState({ tabSelected: index })

      }


    }


  }

  renderTopTab() {

    return (
      <View style={{ width: '100%', height: 60, flexDirection: 'row', justifyContent: 'space-around' }}>
        <TouchableOpacity onPress={() => this.changetab('0')} style={{ width: '30%', height: 50, backgroundColor: this.state.tabSelected == '0' ? Colors.BLUE : 'white', justifyContent: 'center', alignItems: 'center', borderColor: 'gray', borderWidth: 0.5, borderRadius: 6 }}>
          <Text allowFontScaling={false} style={{ fontSize: 15, color: this.state.tabSelected == '0' ? Colors.White : Colors.BLUE, marginLeft: 0 }}>{this.props.languages.Videos}</Text>
        </TouchableOpacity>
        {/* <View style={{width:1,height:60,backgroundColor:'gray'}}></View> */}
        <TouchableOpacity onPress={() => this.changetab('1')} style={{ width: '30%', height: 50, backgroundColor: this.state.tabSelected == '1' ? Colors.BLUE : 'white', justifyContent: 'center', alignItems: 'center', borderColor: 'gray', borderWidth: 0.5, borderRadius: 6 }}>
          <Text allowFontScaling={false} style={{ fontSize: 15, color: this.state.tabSelected == '1' ? Colors.White : Colors.BLUE, marginLeft: 0 }}>{this.props.languages.Documents}</Text>
        </TouchableOpacity>
        {/* <View style={{width:1,height:60,backgroundColor:'gray'}}></View> */}
        <TouchableOpacity onPress={() => this.changetab('2')} style={{ width: '30%', height: 50, backgroundColor: this.state.tabSelected == '2' ? Colors.BLUE : 'white', justifyContent: 'center', alignItems: 'center', borderColor: 'gray', borderWidth: 0.5, borderRadius: 6 }}>
          <Text allowFontScaling={false} style={{ fontSize: 15, color: this.state.tabSelected == '2' ? Colors.White : Colors.BLUE, marginLeft: 0 }}>{this.props.languages.Images}</Text>
        </TouchableOpacity>
        <View style={{ width: 1, height: 60, backgroundColor: 'gray' }}></View>

      </View>
    );

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
            <Text allowFontScaling={false} style={{ fontSize: 20, color: Colors.White, marginLeft: 0 }}>{this.props.languages.Training}</Text>

          </View>
        </View>

        <View style={{ width: '100%', height: 180, backgroundColor: 'transparent', marginTop: 10 }}>
          <Image resizeMode="stretch" style={{
            width: '90%', height: '100%', marginLeft: '5%', borderRadius: 0, shadowOffset: { width: 1, height: 1, },
            // shadowColor: Colors.darkText ,
            // shadowOpacity: 1.5,
            // shadowRadius: 3,
            // elevation: 5,

          }}
            source={Images.ban4}
          />

        </View>
        {this.renderTopTab()}
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>

          {this.state.tabSelected === '0' ? <View style={styles.cardMargin}>{this.renderCard()}</View> : null}

          {this.state.tabSelected === '1' ? <View>{this.pdfrender()}</View> : null}
          {this.state.tabSelected === '2' ? <View>{this.renderImagesCard()}</View> : null}

          <View style={{ width: 20, height: 120 }}></View>
        </KeyboardAwareScrollView>

        {/* <View style={styles.bottomRow}>{this.renderImage()}</View> */}

        {this.state.VideoPlayerStatus == true ? this.renderYoutubeView() : null}
        {this.state.pdfStatus == true ? this.renderPdfView() : null}

        {this.props.isBusy || this.state.loadBusy || this.props.isBusyVideo ? <Activity /> : null}

      </SafeAreaView>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
    tintColor: 'white'

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
    width: '90%',
    marginLeft: '5%',
    borderRadius: 6

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
    position: 'absolute',
    bottom: 40
  },
  imagesColumn: {
    flexDirection: 'column',
    width: '25%',
    height: 50,
    justifyContent: 'center'
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
  pdfcontainer: {
    flex: 1,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
    height: 300, width: '90%',
    backgroundColor: 'lightgrey',
    marginTop: 15, marginLeft: '5%'
  },
  pdf: {
    // flex: 1,
    // width: 300, height: 500,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 140,

  }
});

/*
  {data.video_url.includes('youtube' )  == true ?
            <TouchableOpacity style ={{backgroundColor:'black',width:'100%',height:'auto',justifyContent:'center',alignItems:'center'}} onPress={() => OpenAnything.Web('https://www.youtube.com/watch?v=SjGiu3HRCkI&list=RDSjGiu3HRCkI&start_radio=1')}>

      <Thumbnail url={data.video_url} />
        </TouchableOpacity>
            :
            <VideoPlayer
            video={{ uri: data.video_url }}
            videoWidth={1600}
            videoHeight={900}
            thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
        />
            }

*/