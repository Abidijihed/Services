import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Header from '../components/header'; 
import Choice from '../scenes/Choice'
import React from 'react'


const screens = {
   
    Home: {
        screen:Choice ,
        navigationOptions: ({navigation})=> {
            return {
                headerTitle : () => <Header navigation={navigation} title=''/>
                
            }
        }
    },  

}
const ChoiceStack = createStackNavigator(screens);
export default createAppContainer(ChoiceStack);