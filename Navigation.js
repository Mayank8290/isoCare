import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import DrawerCustom from './drawerCustom';

import login from './src/Container/Login'
// import overview from './src/Container/OverView';
import password from './src/Container/Password'
import otpScreen from './src/Container/OtpScreen'
import changePassword from './src/Container/ChangePassword'
import register from './src/Container/Register'
import home from './src/Container/Home'
import ForgotPassword from './src/Container/ForgotPassword'
import profile from './src/Container/Profile'
import editProfile from './src/Container/EditProfile'

import myAppointment from './src/Container/MyAppointments'
import myReports from './src/Container/MyReports';
import myDocuments from './src/Container/MyDocuments'
import about from './src/Container/About'

import covidHome from './src/Container/CovidHome';
import training from './src/Container/Training'
import vitals from './src/Container/Vitals'
import questions from './src/Container/Questions';
import chat from './src/Container/Chat'
import bookAppointment from './src/Container/BookAppointment'
import vitalHistory from './src/Container/VitalHistory'
import employeeHome from './src/Container/EmployeeHome'
import Language from './src/Container/Language'

const ProfileNavigation = createStackNavigator({


    ProfileScreen: {
        screen: profile,
        navigationOptions: {
            gestureEnabled: false,
            title: 'Profile'

        },
    },
    EditProfileScreen: {
        screen: editProfile,
        navigationOptions: {
            gestureEnabled: false,
            title: 'Profile'

        },
    },



}, {
    headerMode: 'none'
}
);




const HomeNav = createStackNavigator({

    // HomeScreen: {
    //     screen: home ,
    //     navigationOptions: {
    //         gestureEnabled: false,
    //         title:'Profile'

    //     },
    // },

    CovidHomeScreen: {
        screen: covidHome,
        navigationOptions: {
            gestureEnabled: false,
            title: 'Profile'

        },
    },

    LanguageScreen: {
        screen: Language,
        navigationOptions: {
            gestureEnabled: false,
            title: "Language"
        }
    },

    VitalsScreen: {
        screen: vitals,
        navigationOptions: {
            gestureEnabled: false,
            title: 'Profile'

        },
    },
    QuestionsScreen: {
        screen: questions,
        navigationOptions: {
            gestureEnabled: false,
            title: 'Profile'

        },
    },
    TrainingScreen: {
        screen: training,
        navigationOptions: {
            gestureEnabled: false,
            title: 'Profile'

        },
    },
    ProfileScreen: {
        screen: profile,
        navigationOptions: {
            gestureEnabled: false,
            title: 'Profile'

        },
    },
    EditProfileScreen: {
        screen: editProfile,
        navigationOptions: {
            gestureEnabled: false,
            title: 'Profile'

        },
    },

    ChatScreen: {
        screen: chat,
        navigationOptions: {
            gestureEnabled: false,
            title: 'Profile'

        },
    },


    VitalHistoryScreen: {
        screen: vitalHistory,
        navigationOptions: {
            gestureEnabled: false,
            title: 'Profile'

        },
    },

}, {
    headerMode: 'none'
}
);




const EmployeeHomeNav = createStackNavigator({

    HomeEmpScreen: {
        screen: employeeHome,
        navigationOptions: {
            gestureEnabled: false,
            title: 'Profile'

        },
    },


    VitalsScreen: {
        screen: vitals,
        navigationOptions: {
            gestureEnabled: false,
            title: 'Profile'

        },
    },



    VitalHistoryScreen: {
        screen: vitalHistory,
        navigationOptions: {
            gestureEnabled: false,
            title: 'Profile'

        },
    },

}, {
    headerMode: 'none'
}
);



const DrawerNav = createDrawerNavigator({



    HomeScreen: {
        screen: HomeNav,
        navigationOptions: {
            gesturesEnabled: false,
        },
    },



}
    , {
        contentComponent: DrawerCustom,
        contentOptions: {
            tintColor: '#a6a5ab'
        }
    },

);



const MyLoginNavigation = createStackNavigator({


    overviewScreen: {
        screen: Language,
        navigationOptions: {
            gestureEnabled: false,
        },
    },
    LoginScreen: {
        screen: login,
        navigationOptions: {
            gestureEnabled: false,
        },
    },

    PasswordScreen: {
        screen: password,
        navigationOptions: {
            gestureEnabled: false,
        },
    },
    OtpScreen: {
        screen: otpScreen,
        navigationOptions: {
            gestureEnabled: false,
        },
    },

    ForgotPasswordScreen: {
        screen: ForgotPassword,
        navigationOptions: {
            gestureEnabled: false,
        },
    },
    RegisterScreen: {
        screen: register,
        navigationOptions: {
            gestureEnabled: false,
        },
    },

    ChangePasswordScreen: {
        screen: changePassword,
        navigationOptions: {
            gestureEnabled: false,
        },
    },
    HomeScreen: {
        screen: DrawerNav,
        navigationOptions: {
            gestureEnabled: false,
        },
    },
    HomeEmpScreen: {
        screen: EmployeeHomeNav,
        navigationOptions: {
            gestureEnabled: false,
        },
    },



    // ProfileNavigationScreen: {
    //     screen: ProfileNavigation,
    //     navigationOptions: {
    //         gestureEnabled: false,
    //     },
    // },




}, {
    headerMode: 'none'
}
);


const MyLoginNavigation1 = createStackNavigator({

    Product: {
        screen: bookAppointment,
        navigationOptions: {
            gestureEnabled: false,
        },
    },


}, {
    headerMode: 'none'
}
);





export default createAppContainer(MyLoginNavigation);
