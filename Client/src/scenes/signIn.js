import React, { useState, useEffect } from "react";
import FormButton from "../components/FormButton";
import FromInput from "../components/FormInput";
import axios from "react-native-axios";
import { StatusBar } from "expo-status-bar"
import * as Google from "expo-google-app-auth";
import { StyleSheet, Text, View,TextInput ,Dimensions,ImageBackground, Button} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';


const { width, height } = Dimensions.get("window")
const signIn = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const clientAndroid =
  "243989333682-su88apj7ge9mu2htk24ohn2nm3bkahra.apps.googleusercontent.com";
const ClientIos =
  "243989333682-su88apj7ge9mu2htk24ohn2nm3bkahra.apps.googleusercontent.com";
 const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);

      await AsyncStorage.setItem("signIn", jsonValue);
      console.log("store in my function ", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const signInAsync = async () => {
    
    //  set item in local storage
    try {
      const { type, user } = await Google.logInAsync({
        iosClientId: ClientIos,
        androidClientId: clientAndroid,
      });
      console.log("************ from gooooooogle", user);
      if (type === "success") {
        axios
          .post(`http://192.168.1.15:3333/api/auth/signup/google`, {
            googleId: user.id,
            firstName: user.givenName,
            lastName: user.familyName,
            email: user.email,
          })
          .then((res) => {
            console.log("dataaaaaaaaaaa\n*************", res.data),
              storeData(user);
          })
          .catch((err) => console.log("### err ###", err));

        navigation.navigate("Profile", { user });
      }
    } catch (error) {
      console.log(" error with login", error);
    }
  };

  const singInx = () => {
    axios
      .post(`http://localhost:3333/api/login`, { email, password })
      .then((res) => {
        if(res.data[1]==='secsuss'){
          localStorage.setItem('id',res.data[2])
          navigation.navigate('profile')
        }

       
        if (res.data === "Invalid email") {
          alert("wrong passwrod or email ");
        } else if (res.data === "wrong password") {
          alert("wrong passwrod or email ");
      
        }
       
      });
  };

  return (
      <View style={styles.container}>
           <ImageBackground
				style={{ width: width, height: height}}
				source={require("../../assets/Home_Page/back.jpg")}
			  >
                  <View style={styles.container1}>
        <Text style={styles.text1}>Let's connecte</Text>
        <Text style={styles.text2}>l'espace qui nous rapproche</Text>     
      <Input 
       labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholder="email@address.com"
        leftIcon={
          <Icon
            name='envelope'
            size={24}
          />
        }
        autoCorrect={false}
        />
     <Input  
     labelValue={password}
     onChangeText={(userPassword) => setPassword(userPassword)} 
     placeholder="password"
     leftIcon={
       <Icon
         name='lock'
         size={24}
         color='black'
       />
     }
     secureTextEntry={true}
     />
    
                 
                  <Button
       title="Login"
        onPress={() =>singInx()}
      />
        <Text style={styles.navButtonText}>
          Don't have an acount? Create here
        </Text>
                  </View>
                  
      </ImageBackground>
      
    </View>
  );
};

export default signIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        alignItems: "center",
        alignSelf: "center",
      },
      
      navButtonText: {
        fontSize: 18,
        fontWeight: "500",
        color: "#000",
        fontFamily: "Lato-Regular",
      },
      container1:{
        justifyContent: "center",
        alignItems: "center",
    paddingTop: height/5,
      },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000",
    fontFamily: "Lato-Regular",
  },

text1:{

fontSize:40,
fontFamily:'system-ui',
color:'white'
},
text2:{
    fontSize:12,
    color:'white'
}
});
