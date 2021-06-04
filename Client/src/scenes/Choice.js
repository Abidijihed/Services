import React, { Component } from 'react'
import { StyleSheet, Text, View,Image ,Dimensions,TouchableOpacity} from "react-native";

export default class choice extends Component {
    constructor(props){
        super(props)
        this.state={
            
        }
    }
    render() {
        return (


  <View style={styles.container}>

<TouchableOpacity
style={styles.navButton}>
    <Image 
 style={styles.image}
source={require("../../assets/Home_Page/jihed2.jpg")}/>
  <Text style={styles.navButtonText}>Client</Text> 
</TouchableOpacity>
<br />
<br />
<TouchableOpacity
style={styles.navButton}>
    <Image 
 style={styles.image}
source={require("../../assets/Home_Page/jihed2.jpg")}/>
  <Text style={styles.navButtonText}>Client</Text> 
</TouchableOpacity>
</View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "greay",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      },
navButtonText: {
    justifyContent:'center',
    textAlign:'center',
    fontSize: 24,
    color: "white",
    fontFamily: "Lato-Regular",
     marginTop:-45,
     marginLeft:60
  },
  navButton:{
      backgroundColor:'#556B2F',
      borderRadius:20,
      width:250,
      height:70
      
  },
  image:{
      width:70,
      height:70,
      marginLeft:20
  }

})