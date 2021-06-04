import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  TextInput,
  ImageBackground,
  Dimensions
} from "react-native";
import {Avatar  } from 'react-native-elements';
import FormButton from "../components/FormButton";
import SocialButton from "../components/SocialButton";
import axios from "react-native-axios";
import sanitizeHtml from "sanitize-html";
import * as Google from "expo-google-app-auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
const signUp = ({ navigation }) => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [numberPhone, setNumberPhone] = useState();
  const [googleId, setGoogleId] = useState();
  const { width, height } = Dimensions.get("window")
  const [mailError, setMailError] = useState();
  const [nameError, setNameError] = useState();
  const [lastError, setLastError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [phoneError, setPhoneError] = useState();
  const clientAndroid =
  "243989333682-su88apj7ge9mu2htk24ohn2nm3bkahra.apps.googleusercontent.com";
const ClientIos =
  "243989333682-hv3kans8v99sf2jlfd6nrrhiehl1o7qf.apps.googleusercontent.com";
  const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const passformat = /^(?=.*\d)(?=.*[a-z])[a-zA-Z0-9]{8,}$/;
  const phoneFormat = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);

      await AsyncStorage.setItem("signIn", jsonValue);
      console.log("store in my function ", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };
  const nameValidator = () => {
    if (!firstName) {
      setNameError("fill you name please*");
      return false;
    } else {
      return true;
    }
  };
  const signInAsync = async () => {
    console.log("LoginScreen.js 6 | loggin in");
    try {
      const { type, user } = await Google.logInAsync({
        iosClientId: ClientIos,
        androidClientId: clientAndroid,
      });
      console.log("************ from gooooooogle", user);
      if (type === "success") {
        // Then you can use the Google REST API
        console.log("LoginScreen.js 17 | success, navigating to profile");

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
      console.log("LoginScreen.js 19 | error with login", error);
    }
  };

  const lastValidator = () => {
    if (!lastName) {
      setLastError("fill you last name please*");
      return false;
    } else {
      return true;
    }
  };
  const emailvalidator = () => {
    if (!email) {
      setMailError("enter your email please*");
      return false;
    } else if (!email.match(mailformat)) {
      setMailError("email not valid check your email again*");
      return false;
    } else if (email.match(mailformat)) {
      setMailError();
      return true;
    } else {
      return true;
    }
  };

  const passwordValid = () => {
    if (!password) {
      setPasswordError("you should enter your password*");
      return false;
    } else if (password.length < 6 || password.length > 20) {
      setPasswordError("the password should be 8 caractere  minimum*");
      return false;
    } else if (password.match(passformat)) {
      setPasswordError();
      return true;
    } else {
      return true;
    }
  };
  const phoneValidator = () => {
    if (!numberPhone) {
      setPhoneError("you should enter your phone number*");
      return false;
    } else if (!numberPhone.match(phoneFormat)) {
      setPhoneError("please a correct phone number*");
      return false;
    } else if (numberPhone.match(phoneFormat)) {
      setPhoneError();
      return true;
    } else {
      return true;
    }
  };

  const register = () => {
    let forms = {
      firstName: sanitizeHtml(firstName),
      lastName: sanitizeHtml(lastName),
      email: sanitizeHtml(email),
      password,
      numberPhone,
    };

    if (
      JSON.stringify(forms) ===
        JSON.stringify({ firstName, lastName, email, password, numberPhone }) &&
      emailvalidator() &&
      nameValidator() &&
      passwordValid() &&
      phoneValidator() &&
      lastValidator()
    ) {
      axios
        .post("http://localhost:3333/api/register", {
          firstName,
          lastName,
          email,
          password,
          numberPhone,
        })
        .then((res) => {
          if(res.status===200){
            navigation.navigate("SingIn");
          }
          
        })
        .catch((err) => console.log(err.message));
    } else {
      alert("you are passing a wrong information check again please");
    }
  };

  return (
    
      
      <View style={styles.container}>
      <ImageBackground
				style={{ width: width, height: height}}
				source={require("../../assets/Home_Page/back.jpg")}
			  >
        <Text style={styles.text}>Create an account</Text>
        <Input 
          labelValue={firstName}
          onChangeText={(firstName) => setFirstName(firstName)}
          placeholder="FirstName"
          leftIcon={
            <Icon
              name='user'
              size={24}
              color='black'
            />
          }
          onBlur={() => nameValidator()}
        />
        <Text style={{ color: "red" }}>{nameError}</Text>

        <Input 
          labelValue={lastName}
          onChangeText={(lastName) => setLastName(lastName)}
          placeholder="LastName"
          leftIcon={
            <Icon
              name='user'
              size={24}
              color='black'
            />
          }
          autoCorrect={false}
          onBlur={() => lastValidator()}
        />
        <Text style={{ color: "red" }}>{lastError}</Text>

        <Input 
          labelValue={email}
          onChangeText={(userEmail) => setEmail(userEmail)}
          onBlur={() => emailvalidator()}
          placeholder="email@address.com"
          leftIcon={
            <Icon
              name='envelope'
              size={24}
            />
          }
          autoCorrect={false}
        />
        <Text style={{ color: "red" }}>{mailError}</Text>
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
          onBlur={() => passwordValid()}
        />
        <Text style={{ color: "red" }}>{passwordError}</Text>

        <Input 
          labelValue={numberPhone}
          onChangeText={(userNumberPhone) => setNumberPhone(userNumberPhone)}
          placeholder="phone number"
          leftIcon={
            <Icon
              name='phone'
              size={24}
            />
          }
          autoCorrect={false}
          onBlur={() => {
            phoneValidator();
          }}
        />
        <Text style={{ color: "red" }}>{phoneError}</Text>
        <FormButton buttonTitle="Sign Up" onPress={() => register()} />
        <View>
        
          <SocialButton
            buttonTitle="Sign Up with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() => signInAsync()}
          />
          
        </View>
        {/* ) : null} */}

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("SingIn")}
        >
          <Text style={styles.navButtonText}>Have an account? Sign In</Text>
        </TouchableOpacity>
          </ImageBackground>
      </View>
    
    
  );
};

export default signUp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafd",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontFamily: "Kufam-SemiBoldItalic",
    fontSize: 28,
    marginBottom: 10,
    color: "#051d5f",
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#2e64e5",
    fontFamily: "Lato-Regular",
  },

  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 35,
    justifyContent: "center",
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: "400",
    fontFamily: "Lato-Regular",
    color: "grey",
  },
});
