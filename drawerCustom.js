import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, Button, ImageBackground, StatusBar } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import { AsyncStorage } from 'react-native';
import Colors from './src/utils/Colors'
import Images from './src/utils/Images';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSelectedLanguage } from './src/modules/Language'
class drawerCustom extends Component {

  navigateToScreen = (route) => (
    () => {
      // if (route == 'Login') {
      //   console.log('reset here');
      //   setConfiguration('user_id', '');

      //   try {
      //     AsyncStorage.setItem('user_id', '')
      //   } catch (e) {
      //     // saving error
      //   }



      // }
      const navigateAction = NavigationActions.navigate({
        routeName: route
      });
      this.props.navigation.dispatch(DrawerActions.closeDrawer());
      this.props.navigation.dispatch(navigateAction);

    })



  constructor(props) {
    super(props)

    this.state = {
      languages: {}
    };

    this.getData();

  }




  componentDidMount() {
    console.log("drawerprops", this.props);
  }


  async getData() {

    const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');
    console.log("selectedlanguage", selectedLanguage);

    if (selectedLanguage == "" || selectedLanguage == null || selectedLanguage.toLocaleLowerCase() == "english") {
      this.props.getSelectedLanguage("english")
        .then(() => this.setLanguages())
        .catch(e => this.showAlert(e.message, 300));
    }
    else if (selectedLanguage.toLocaleLowerCase() == "punjabi") {
      this.props.getSelectedLanguage("punjabi")
        .then(() => this.setLanguages())
        .catch(e => this.showAlert(e.message, 300));
    }
    else if (selectedLanguage.toLocaleLowerCase() == "hindi") {
      this.props.getSelectedLanguage("hindi")
        .then(() => this.setLanguages())
        .catch(e => this.showAlert(e.message, 300));
    }
  }


  // bookAppointment: require('./../../assets/icon_BookAppointment.png'),
  // chatDoctor: require('./../../assets/icon_chat.png'),
  // askQuery: require('./../../assets/askQuery.png'),
  // ivfG: require('./../../assets/icon_guide_.png'),
  // ivfBlogs: require('./../../assets/icon_blogs.png'),
  // patient: require('./../../assets/icon_patients.png'),
  // logoutIcon: require('./../../assets/logout.png'),




  render() {
    StatusBar.setHidden(false, 'none')

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.White} barStyle="light-content" />

        <View style={{ height: 100, backgroundColor: Colors.White, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 2, borderColor: Colors.seprator }}>

          <Image resizeMode="contain" style={{ width: '70%', height: '80%' }}
            source={Images.Logo}
          />
        </View>

        <View style={styles.screenContainer}>
          <ScrollView style={{ width: '100%', height: '100%' }}>



            <TouchableOpacity style={styles.tile} onPress={() => this.props.navigation.navigate('HomeScreen')} >
              <Image resizeMode="contain" style={styles.tileIcon}
                source={Images.homeM}
              />
              <Text allowFontScaling={false} style={styles.tileTitle}>{this.props.languages ? this.props.languages.Home : ""}</Text>
            </TouchableOpacity>

            {/* <View style={{width:'100%',height:1,backgroundColor:'lightgrey',marginTop:20}}></View> */}

            <TouchableOpacity style={styles.tile} onPress={this.navigateToScreen('QuestionsScreen')}>
              <Image resizeMode="contain" style={styles.tileIcon}
                source={Images.questionM}
              />
              <Text allowFontScaling={false} style={styles.tileTitle}>{this.props.languages ? this.props.languages.Questionnaire : ""}</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.tile} onPress={this.navigateToScreen('TrainingScreen')}>
              <Image resizeMode="contain" style={styles.tileIcon}
                source={Images.trainingM}
              />
              <Text allowFontScaling={false} style={styles.tileTitle}>{this.props.languages ? this.props.languages.Training : ""}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tile} onPress={this.navigateToScreen('VitalsScreen')}>
              <Image resizeMode="contain" style={styles.tileIcon}
                source={Images.vitalM}
              />
              <Text allowFontScaling={false} style={styles.tileTitle}>{this.props.languages ? this.props.languages.Vitals : ""}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tile} onPress={this.navigateToScreen('ProfileScreen')}>
              <Image resizeMode="contain" style={styles.tileIcon}
                source={Images.userMenu}
              />
              <Text allowFontScaling={false} style={styles.tileTitle}>{this.props.languages ? this.props.languages.Profile : ""}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tile} onPress={() =>
              this.props.navigation.navigate('LanguageScreen', {
                isLanguage: true,
              })
            }  >
              <Image resizeMode="contain" style={styles.tileIcon}
                source={Images.translation}
              />
              <Text allowFontScaling={false} style={styles.tileTitle}>{this.props.languages ? this.props.languages.Language : ""}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tile} >


            </TouchableOpacity>

          </ScrollView>
        </View>



      </View>
    )
  }
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: 150,
  },
  headerText: {
    color: '#fff8f8',
  },
  screenContainer: {
    paddingTop: 0,
    marginBottom: 180

  },
  screenStyle: {
    height: 30,
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center'
  },
  screenTextStyle: {
    fontSize: 20,
    marginLeft: 20
  },
  tile: {
    height: 40,
    width: '100%',
    marginTop: 10,
    backgroundColor: 'transparent',
    flexDirection: 'row'

  },
  tileIcon: {
    width: 25,
    height: 25,
    marginTop: 17,
    marginLeft: 20,

  },
  tileTitle: {
    marginTop: 19,
    fontSize: 17,
    color: 'black',
    marginLeft: 20
  },
  tileArrow: {
    position: 'absolute',
    width: 15,
    height: 15,
    top: 15,
    right: 18
  }

});

const mapStateToProps = state => ({
  isBusy: state.GetInformationReducer.isBusy,
  response: state.GetInformationReducer,
  languages: state.LanguageReducer.languages
});

export default connect(
  mapStateToProps,
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      getSelectedLanguage: bindActionCreators(getSelectedLanguage, dispatch),
    };
  }
)(drawerCustom);
// export default drawerCustom;
