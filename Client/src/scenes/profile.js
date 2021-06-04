import React from 'react'
import { Image, SafeAreaView, StyleSheet, View,Dimensions } from 'react-native'
import { Divider, Icon, Text } from 'react-native-elements'
import axios from "react-native-axios";
import * as ImagePicker from "expo-image-picker";
const { width, height } = Dimensions.get("window")
const Social = ({ name }) => (
  <Icon
    name={name}
    type="font-awesome"
    containerStyle={styles.iconContainer}
    size={32}
  />
)

class ProfileScreen extends React.Component {
constructor(props){
    super(props)
    this.state={
        data:[]
    }
}



    componentDidMount(){
      const id =localStorage.getItem('id')
      axios.get('http://localhost:3333/api/user/'+id).then((res)=>{
         
          this.setState({data:res.data})
      })
    
    }
    openImage = async () => {
        let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permission.granted === false) {
          return;
        }
    
        let picker = await ImagePicker.launchImageLibraryAsync();
    
        if (picker.cancelled === true) {
          return;
        }
        setSelectedImg({ localUri: picker.uri });
        console.log(picker);
      };
    
  render() {
   
    return (
      <SafeAreaView style={styles.container}>
         {console.log(this.state.data,'aaaaaaaaaaaaa')}
        <View style={styles.imageContainer}>
          <Image style={styles.image}  source={this.state.data.image} />
        </View>
        <Text h4 style={styles.name}>
          {this.state.data.firstName}
        </Text>
        <Text h4 style={styles.name}>
          {this.state.data.lastName}
        </Text>
        <Text style={styles.desc}>{this.state.data.email}</Text>
        <Text style={styles.desc}>{this.state.data.numberPhone}</Text>
        <Text style={styles.desc}>Fashion Designer at Amelia & Co.</Text>
        <Divider style={styles.divider}/>
        <Text style={styles.desc}>
          I love to travel. I have a cat named pickles. If he likes you, I
          probably will too.
        </Text>
        <Divider style={styles.divider} />
        <Text style={styles.desc}>Find me on Social here</Text>
        <View style={styles.socialLinks}>
          <Social name="snapchat" />
          <Social name="instagram" />
          <Social name="facebook-square" />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    margin: 20,
  },
  image: {
    width: width - 60, 
    height: height / 2 - 60, 
    borderRadius: 20,
  },
  name: {
    color: '#5E5E5E',
    alignSelf: 'flex-start',
    marginLeft: 30,
  },
  desc: {
    color: '#5E5E5E',
    alignSelf: 'flex-start',
    marginTop: 5,
    marginHorizontal: 30,
    fontSize: 14,
  },
  divider: {
    backgroundColor: '#C0C0C0',
    width: width - 60,
    margin: 20,
  },
  socialLinks: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    width: width,
    marginLeft: 40,
  },
  iconContainer: {
    paddingHorizontal: 8,
    paddingVertical: 15,
  },
})

export default ProfileScreen