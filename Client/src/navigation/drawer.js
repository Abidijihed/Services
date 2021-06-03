import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import SingInStack from './signInStack';
import SingUpStack from './singUpStack';
import ProfileStack from './profileStack';
import FoundUs from './FoundUsStack';
import ContactStack from './ContactStack'



const screens = {
    SingUp:{
        screen:SingUpStack
    },
    SignIn:{
        screen:SingInStack
    },
  
    Profile:{
        screen: ProfileStack
    },
    FoundUs :{
        screen:FoundUs
    },
    Contact : {
        screen: ContactStack
    }
}
const RootDrawerNavigator = createDrawerNavigator(screens)
export default createAppContainer(RootDrawerNavigator)
