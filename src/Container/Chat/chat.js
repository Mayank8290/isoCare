import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  Image,
  StatusBar
} from 'react-native';

import { widthPercentageToDP } from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-picker';
import SocketIOClient from 'socket.io-client';
import { SafeAreaView } from 'react-navigation';
import Colors from '../../utils/Colors';
import Images from '../../utils/Images';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Activity from '../../components/ActivityIndicator'
import { getConfiguration, setConfiguration } from '../../utils/configuration';

// import { ChatScreen } from 'react-native-easy-chat-ui'


export default class chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chatList: [],
      newMessage: '',
      chatid: '',
      patientRef: getConfiguration('patientRef', ''),
      IntervalId: '',
      //  eventName:getConfiguration('eventName','')
    };
  }

  componentDidMount() {

    this.GetAllMessages();

    this._keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyBoardDidShow,
    );
    this._keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyBoardDidHide,
    );

    const intervalId = setInterval(() => {

      console.log('i am calling BAR BAR');
      this.GetAllMessages()
    }, 8000);


    this.setState({ IntervalId: intervalId })

  }

  componentWillUnmount() {
    // this.keyboardDidShowListener.remove();
    // this.keyboardDidHideListener.remove();

    clearInterval(this.state.IntervalId);

  }



  keyboardDidShow() {
    this.flatList._scrollView.scrollTo(0);
    console.log("_keyboardDidShow value --- ");


    this.setState({
      scrollPadding: -100

    });
  }

  keyboardDidHide() {
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


  GetAllMessages() {



    this.props.GetMessages(getConfiguration('patientRef', ''))
      .then(() => this.afterGetAllMessages())
      .catch(e => this.showAlert(e.message, 300));

  }

  afterGetAllMessages() {
    console.log("isBusy value --- ", this.props.isBusy);
    console.log("response value --- ", this.props.response);

    this.setState({ chatList: this.props.response.response.message })
    console.log("response chatList --- ", this.state.chatList);

  }




  addChatId(res) {

    this.setState({ chatid: res.result.data.chatId })


  }


  sendMessage() {



    this.props.SendMessage(getConfiguration('patientRef', ''), this.state.newMessage)
      .then(() => this.aftersendMessage())
      .catch(e => this.showAlert(e.message, 300));


    //     let url = 'http://51.255.130.8:3002'
    //     // this.socket = SocketIOClient(url);



    //     SocketIOClient(url).emit('sendMessage', {'message': this.state.newMessage , type : 'text'},(res)=>{
    //       console.log(res);


    //  });

  }

  aftersendMessage() {

    this.setState({ newMessage: '' })
    console.log("isBusy value --- ", this.props.isBusySendMessage);
    console.log("response value --- ", this.props.responseSendMessage);

    this.GetAllMessages()

  }


  goBack() {
    this.props.navigation.goBack()
  }

  renderItem = (item, index) => {
    //let inMessage = message.byManager;
    return (
      <View style={[styles.item]}>


        { item.sender_ref != this.state.patientRef ? <View style={{ flex: 1, alignItems: 'flex-start' }}>
          <View style={{ backgroundColor: Colors.BLUE, borderRadius: 20, padding: 10, paddingHorizontal: 14, marginRight: 20, marginBottom: 10 }}>

            <Text style={{ marginTop: 3, color: 'white' }} >{item.message}</Text>

          </View>
        </View> :

          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <View style={{ backgroundColor: '#6972c7', padding: 10, borderRadius: 20, paddingHorizontal: 14, marginLeft: 20, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
              <Text style={{ color: 'white' }}>{item.message}</Text>

            </View>
          </View>}



      </View>
    );
  }


  addAction() {

    const options2 = {
      quality: 0.5,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };



    ImagePicker.showImagePicker(options2, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        //  this.setState({
        //    avatarSource: source,
        //    showImg: response.uri 

        //  });



      }
    });


  }



  showImagePicker = async () => {
    console.warn("showImagePicker");
    if (Platform.OS == "android" && Platform.Version > 22) {
      console.warn("grantif");
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      ]);

      if (
        granted["android.permission.CAMERA"] != "granted" ||
        granted["android.permission.WRITE_EXTERNAL_STORAGE"] != "granted"
      ) {
        console.warn("notgranted");
        return alert("Don't have permissions to select image.");
      }
    }
    this.setState({ mediaType: "IMAGE" });
    Alert.alert(
      'SenseCrew',
      "Choose Option",
      [
        { text: "Camera", onPress: () => this.openCamera() },
        { text: "Gallery", onPress: () => this.openGallery() },
        { text: "Cancel", onPress: () => console.log("cancelled") }
      ],
      { cancelable: false }
    );
  };

  openCamera = () => {
    CropPicker.openCamera({
      width: Dimensions.get("window").width,
      height: 400,
      cropping: true,
      freeStyleCropEnabled: true,
      avoidEmptySpaceAroundImage: false
    }).then(image => {
      const newImg = {
        original: image.path,
        thumbnail: image.path,
        type: "IMAGE",
        height: "" + image.height,
        width: "" + image.width
      };
      console.log(newImg, "the new image i updated here is");

      this.setState({
        newImg,
        showImg: image.path,

      });
    });
  };

  openGallery = () => {
    CropPicker.openPicker({
      width: Dimensions.get("window").width,
      height: 400,
      cropping: true,
      freeStyleCropEnabled: true,
      avoidEmptySpaceAroundImage: false
    }).then(image => {
      const newImg = {
        original: image.path,
        thumbnail: image.path,
        type: "IMAGE",
        height: "" + image.height,
        width: "" + image.width
      };
      console.log(newImg, "the new image i updated here is");
      //const obj = {'url': newImg.original};
      // var my_array = this.state.reportsArr ;
      // var start_index = this.state.reportsArr.length;
      // var number_of_elements_to_remove = 0;
      // my_array.splice(start_index, number_of_elements_to_remove, obj);
      // console.log(my_array);
      // //[1,2,3,4];


      //     this.setState({
      //       reportsArr : my_array});

      // console.log('i am here : ', obj)

      this.setState({
        newImg,
        showImg: image.path
      });
    });
  };



  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>

          <View style={styles.headerView}>
            <TouchableOpacity
              style={{ width: 50, height: 70, alignItems: 'center', justifyContent: 'center' }}
              onPress={() => this.goBack()}>
              <Image resizeMode="contain" style={{ width: 20, height: 20, tintColor: Colors.White }}
                source={Images.backImage} />
            </TouchableOpacity>
            <Text allowFontScaling={false} style={{ fontSize: 16, fontWeight: 'bold', color: Colors.White, alignSelf: 'center' }}>{this.props.languages.Chat}</Text>



            {/* <Image resizeMode="contain" style={{width:50,height:50}}
                    source = {Images.Logo}/> */}



            {/* <TouchableOpacity
                       style={{position:'absolute',right:50,top:0,width:40,height:70,alignItems:'center',justifyContent:'center'}}
                       onPress={() => this.openDrawerClick()}>
                    <Image resizeMode="contain" style={{width:20,height:20}}
                        source = {require('../../../assets/video-camera.png')}/>
                    </TouchableOpacity>

                    <TouchableOpacity
                       style={{position:'absolute',right:0,top:0,width:40,height:70,alignItems:'center',justifyContent:'center'}}
                       onPress={() => this.openDrawerClick()}>
                    <Image resizeMode="contain" style={{width:20,height:20}}
                        source = {require('../../../assets/phone.png')}/>
                    </TouchableOpacity> */}

          </View>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={'height'}
            keyboardVerticalOffset={Platform.OS === 'android' ? 25 : 50}>
            <View style={{ flex: 1 }}>
              {
                this.state.chatList && this.state.chatList.length > 0 ?

                  <FlatList style={styles.list}
                    data={this.state.chatList}
                    keyExtractor={(item) => {
                      return item.id;
                    }}
                    extraData={this.state.chatList}
                    ref={ref => this.flatList = ref}
                    onContentSizeChange={() => this.flatList.scrollToEnd({ animated: true })}
                    onLayout={() => this.flatList.scrollToEnd({ animated: true })}
                    getItemLayout={(data, index) => (
                      { length: this.state.chatList.length, offset: 200 * index, index }
                    )}
                    renderItem={({ item, index }) => this.renderItem(item, index)}

                  />
                  : <Text style={{
                    flex: 1,
                    marginTop: 50,
                    width: '100%',
                    textAlign: 'center',
                    fontSize: widthPercentageToDP('5.86%')
                  }}> No Data </Text>}
              <View style={styles.footer}>
                {/* <TouchableOpacity style={styles.btnSend}
                            onPress={this.addAction}
                        >
                        <Text style={{fontSize:25,color:'white'}}>+</Text>

                        </TouchableOpacity> */}
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.inputs}
                    value={this.state.newMessage}
                    placeholder="Write a message..."
                    placeholderTextColor='white'
                    underlineColorAndroid='transparent'
                    // ref="newMessage"
                    autoCorrect={false}
                    onChangeText={(newMessage) => this.setState({ newMessage })} />
                </View>

                <TouchableOpacity style={styles.btnSend}
                  onPress={() => this.sendMessage()}
                >
                  <Image style={{ width: 20, height: 20, tintColor: 'white' }}
                    source={Images.arrow}
                  />

                </TouchableOpacity>
              </View>

            </View>
          </KeyboardAvoidingView>
        </View>

        {/* {this.props.isBusy ? <Activity /> : null} */}

      </SafeAreaView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  list: {
    flex: 1,
    paddingHorizontal: 17,
    marginBottom: 20,
    backgroundColor: 'transparent'
  },
  footer: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: Colors.BLUE,
    paddingHorizontal: 10,
    padding: 10,
  },
  btnSend: {
    width: 40,
    height: 40,
    borderRadius: 360,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSend: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  inputContainer: {
    // borderBottomColor: '#6972c7',
    backgroundColor: '#6972c7',
    borderRadius: 20,
    // borderBottomWidth: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 5,
  },
  inputs: {
    height: 40,
    marginLeft: 16,
    borderBottomColor: 'lightgray',
    width: '90%',
    color: 'white'
  },
  balloon: {
    maxWidth: 250,
    padding: 15,
    borderRadius: 20,
  },
  headerView: {
    height: 70,
    width: '100%',
    backgroundColor: Colors.BLUE,
    borderColor: '#0082cb',
    borderWidth: 0,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 1, height: 1, },
    shadowColor: Colors.darkText,
    shadowOpacity: 0.5,
    // overflow: 'hidden',
    shadowRadius: 3,
    elevation: 5,
  },
  backTouchable3: {
    position: 'absolute',
    width: 50,
    height: 50,
    top: 5,
    left: 60,
    backgroundColor: 'transparent'
  },
  backTouchable1: {
    position: 'absolute',
    width: 60,
    height: 50,
    top: 50,
    left: 300
  },
  backTouchable2: {
    position: 'absolute',
    width: 60,
    height: 50,
    top: 5,
    left: 350
  },
  backTouchable: {
    position: 'absolute',
    width: 60,
    height: 50,
    top: 10,
    left: 0
  },
  backIcon: {
    position: 'absolute',
    width: 18,
    height: 18,
    top: 10,
    left: 15,
    backgroundColor: 'transparent',
  },
  backIcon1: {
    position: 'absolute',
    width: 60,
    height: 60,
    top: 0,
    left: 0,
    backgroundColor: 'transparent',
  },
  backIcon2: {
    position: 'absolute',
    width: 26,
    height: 26,
    top: 10,
    left: 15,
    backgroundColor: 'transparent',
  },
  backIcon3: {
    position: 'absolute',
    width: 22,
    height: 22,
    top: 10,
    left: 15,
    backgroundColor: 'transparent',
  },
  itemIn: {
    alignSelf: 'flex-start'
  },
  itemOut: {
    alignSelf: 'flex-end'
  },
  time: {
    alignSelf: 'flex-end',
    margin: 15,
    fontSize: 12,
    color: "#808080",
  },
  item: {
    marginVertical: 5,
    flex: 1,
    backgroundColor: "transparent",
    padding: 5,
  },
});
