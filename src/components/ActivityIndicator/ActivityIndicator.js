
import React from "react";
import {
  Container,
  ActivityIndicator,
  Content,
  Text,
  View,
  Image
} from "react-native";
import { connect } from "react-redux";
import { BallIndicator,WaveIndicator } from 'react-native-indicators';


const Activity = props => (

<View style={{
  flex: 1,
   position: 'absolute',
   top: 0,
   left: 0,
   right: 0,
   bottom: 0,
   flexDirection: 'row',
   justifyContent: 'center',
   alignItems:  'center',
   backgroundColor: 'transparent'
}}>
<View style={{
   flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:  'center',
    backgroundColor: 'black',
    opacity: 0.7
  }}>




      </View>

 <BallIndicator
   color='white'
   size={50}
 />

</View>



);

export default Activity;
