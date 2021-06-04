import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Header from '../components/header'; 
import About from '../scenes/about'
import React from 'react'


const screens = {
   
    Home: {
        screen:About ,
        navigationOptions: ({navigation})=> {
            return {
                headerTitle : () => <Header navigation={navigation} title=''/>
                
            }
        }
    },  

}
const AboutStack = createStackNavigator(screens);
export default createAppContainer(AboutStack);