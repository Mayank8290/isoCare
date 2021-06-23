import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  Platform,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Keyboard
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
// // import axios from 'axios'
// import Activity from '../../components/ActivityIndicator'
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import { DrawerActions } from 'react-navigation';
import SocketIOClient from 'socket.io-client';
// import { getConfiguration , setConfiguration} from '../../utils/configuration';





export default class ChatClass extends React.Component {

  that = this;
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      mainViewTop: 0,
      selectedItem: '',
      dataSource: []

    };

    const { navigation } = props;

    this.didFocusListener = navigation.addListener(
      'didFocus',
      this.componentDidFocus,
    );


  }



  _keyboardDidShow() {
    if (Platform.OS == "android") {

    } else {
      this.setState({
        mainViewTop: 250

      });
    }

  }

  _keyboardDidHide() {
    this.setState({
      mainViewTop: 0
    });
  }




  componentDidFocus = payload => {
    const { params } = payload.action;
    console.log("hurrayyyyyy");
    // this.getData();



  };


  // //        getData(){

  // // this.chatHistoryAPICall();


  //        }


  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }



  componentWillMount() {

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



    this.socket = SocketIOClient('http://51.255.130.8:3002');
    this.socket.on('connect', () => {

      let data = { 'sender': '507f1f77bcf86cd799439011', 'receiver': '507f1f77bcf86cd799439012' }
      socket.emit('setUser', data)
      console.log('connected -----');
      console.log('connected with  -----', url, getConfiguration('user_id'));

    });


    //  setConfiguration('Socket', this.socket);

    this.socket.on('addMessage', (data) => {
      console.log('Data recieved from server', data);

    });





  }




  getEverything() {


    this.props.getEverythingAPI('123', '123')
      .then(() => this.afterGetEverything())
      .catch(e => this.showAlert(e.message, 300));

  }

  afterGetEverything() {

    console.log("isBusy value --- ", this.props.isBusyGetEveryThing);
    console.log("response value --- ", this.props.responseGetEveryThing);
    // this.props.navigation.navigate('DisputesScreen');


    //this.chatHistoryAPICall();




  }




  showAlert(message, duration) {
    this.setState({ autoLogin: false });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      alert(message);
    }, duration);
  }

  chatHistoryAPICall() {
    this.props
      .getChatHistoroyAPI(this.state.selectedItem._id)
      .then(() => this.afterChatHistory())
      .catch(e => this.showAlert(e.message, 300));
  }

  afterChatHistory() {
    console.log("isBusy value --- ", this.props.isBusyChatHistory);
    console.log("response value --- ", this.props.responseChatHistory);

    var chats = this.props.responseChatHistory.response.data;
    this.setState({ dataSource: chats });

  }











  componentWillUnmount() {

  }


  showAlert(message, duration) {
    this.setState({ autoLogin: false });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      alert(message);
    }, duration);
  }

  goBack() {
    this.props.navigation.goBack();
  }

  sendMessage() {


    // socket.in(setChatId, function(res){  console.log(res)  }



    //  var artistId = '507f1f77bcf86cd799439012';
    //  var socketVar = SocketIOClient('http://51.255.130.8:3002');
    //  socketVar.emit('sendMessage', {
    //  msg: this.state.message,
    //  customerId : '507f1f77bcf86cd799439011',
    //  artistId : artistId,
    //  byCustomer : true,
    //  byArtist: false });


    //    this.setState({message : ''});





  }







  render() {

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#1c1c1a" }}>
        <View style={styles.headerView}>
          <TouchableOpacity
            style={styles.backTouchable}
            onPress={() => this.goBack()}>
            <Image resizeMode="contain" style={styles.backIcon}
              source={require('../../../assets/backwhite.png')} />
          </TouchableOpacity>
          <Text allowFontScaling={false} style={styles.title}>Chat</Text>
        </View>


        <View style={{ flex: 1, backgroundColor: '#f1f1f1' }}>

          <FlatList
            style={{ flex: 1 }}
            data={this.state.dataSource}
            renderItem={({ item }) =>
              <View style={{ width: 'auto', height: 50, marginVertical: 7, marginHorizontal: 10 }}>
                {item.byCustomer == true ?
                  <View style={{ height: '100%', width: 'auto', borderRadius: 7, backgroundColor: '#27d65d', position: 'absolute', top: 0, right: 0, justifyContent: 'center' }}>
                    <Text> {item.msg} </Text>

                  </View>
                  :
                  <View style={{ height: '100%', width: 'auto', borderRadius: 7, backgroundColor: '#ccd3ce', position: 'absolute', top: 0, left: 0, justifyContent: 'center' }}>
                    <Text> {item.msg} </Text>

                  </View>
                }



              </View>
            }
          />



        </View>



        <View style={{
          width: '100%', height: 80, marginBottom: this.state.mainViewTop, shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: 0
          },
          shadowRadius: 2,
          shadowOpacity: 1.0, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
        }}>



          <View style={{ height: 40, width: '70%', borderRadius: 20, backgroundColor: '#f1f1f1' }}>

            <TextInput
              style={styles.searchTextInput}
              placeholder="Write your message here"
              placeholderTextColor={'gray'}
              autoCorrect={false}
              onChangeText={(message) => this.setState({ message })}
              value={this.state.message}
            />

          </View>

          <TouchableOpacity
            style={{ width: '25%', height: '100%', justifyContent: 'center', alignItems: 'center', marginLeft: 2 }}
            onPress={() => this.sendMessage()}>
            <Image resizeMode="contain" style={{ width: 25, height: 25 }}
              source={require('../../../assets/send.png')} />
          </TouchableOpacity>






        </View>





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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },




  lowerView: {
    backgroundColor: '#f1f1f1',
    width: wp('100%'),
    height: 'auto',
    marginTop: 0
  },
  headingBG: {
    marginTop: 10,
    width: '100%',
    height: 'auto',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tileIcon: {
    width: 18,
    height: 40,
    marginLeft: 30,
    marginTop: -5
  },
  tile: { width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', height: 40, borderColor: 'gray', borderBottomWidth: 0.7, backgroundColor: 'transparent', marginTop: 0 },
  searchTextInput: {
    height: '100%',
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    borderColor: 'gray',
    borderRadius: 0,
    fontSize: wp('4.8%'),
    // fontFamily: "CharlieDisplay-Regular",
    paddingBottom: 5

  },

  touchableForgotPassword: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 0,
    height: 30


  },
  arrowTile: {

    backgroundColor: 'transparent',
    width: '100%',
    height: wp('16%'),
    marginTop: wp('4%'),
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 0,
    borderColor: '#818e97'
  },
  touchableArrow: {
    backgroundColor: '#f05798',
    position: 'absolute',
    right: 0,
    height: wp('16%'),
    width: wp('16%'),
    borderRadius: wp('8%'),
    justifyContent: 'center',
    alignItems: 'center'
  },
  arrowIcon: {
    width: wp('9.33%'),
    height: wp('9.33%')
  },
  title: {
    fontSize: wp('4.8%'),
    color: 'white',
    // fontFamily: "CharlieDisplay-Semibold"
  },
  backTouchable: {
    position: 'absolute',
    width: 60,
    height: 50,
    top: 0,
    backgroundColor: 'transparent',
    left: 0
  },
  headerView: {
    height: 40,
    width: '100%',
    backgroundColor: '#1c1c1a',
    borderColor: '#0082cb',
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backIcon: {

    position: 'absolute',
    width: 22,
    height: 22,
    top: 10,
    left: 15,
    backgroundColor: 'transparent',

  },
  txtAlready: {
    color: 'black',
    fontSize: 18,
    //  fontFamily: "CharlieDisplay-Regular"
  },
  txtSignIn: {
    color: 'black',
    fontSize: 18,
    //  fontFamily: "CharlieDisplay-Semibold"
  },
  status: { marginLeft: 15, marginLeft: 10, color: 'black', fontSize: wp('4.8%') },
  statusValue: { marginLeft: 10, color: 'gray', marginRight: 10, fontSize: wp('4.8%') },
  loadDetail: {
    width: 'auto',
    height: 'auto',
    backgroundColor: 'transparent',
    marginVertical: 7,
    marginHorizontal: 5,
    alignItems: 'center',
    borderColor: 'gray',
    borderBottomWidth: 0,
    paddingVertical: 5
  },
  tileFeedback: {
    backgroundColor: 'transparent',
    width: 'auto',
    height: wp('120%'),
    marginTop: 30,
    marginHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1.0,
    borderColor: '#818e97',
    borderRadius: 5
  },




});
