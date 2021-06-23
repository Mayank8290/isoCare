const Config = {
    //NAVIGATION
    Login: 'Login',
    Register: 'Register',
    Password: 'Password',
    Dashboard: 'Dashboard',
    DrawerStack: 'DrawerStack',
    DriverDetails: 'DriverDetails',
    PanicScreen: 'PanicScreen',
    VerifyOTP: 'VerifyOTP',
    ChangePassword: 'ChangePassword',
    SideMenu: 'SideMenu',
    HelpSupport: 'HelpSupport',
    Profile: 'Profile',
    EditProfile: 'EditProfile',
    NeedHelp: 'NeedHelp',
    AddCard: 'AddCard',
    CarSchedule: 'CarSchedule',
    MyTrips: 'MyTrips',
    PaymentMethod: 'PaymentMethod',
    Payments: 'Payments',
    BookingDetails: 'BookingDetails',
    AboutUs: 'AboutUs',

    //................................................

    // API CONFIG
    URL: 'http://43.255.154.115/swasthika_main/',
    login: 'check_phone_number',
    kHeaderValues: {
        'Content-Type': 'application/json',
    },
    kMethodPostKey: 'post',
    kMethodGetKey: 'get',
    english: {
        Home: 'Home',
        Questionnaire: 'Questionnaire',
        Training: "Training",
        Profile: "Profile",
        Vitals: "Vitals",
        Welcome: "Welcome",
        Today_is: "Today is",
        We_are_at_day_of_your_Recovery: "We are at day of your Recovery",
        You_have_unread_message: "You have unread message",
        Today_Activity: "Today's Activity",
        Today_Activities: "Today's Activities",
        Your_Questionnaire_for_today: "Your Questionnaire for today",
        How_are_you_feeling_Today: "How are you feeling Today?",
        Good: "Good",
        Bad: "Bad",
        How_is_your_mood: "How is your mood?",
        How_was_your_night: "How was your night?",
        What_is_your_temperature: "What is your temperature",
        other: "other (optional)",
        Videos: "Videos",
        Documents: "Documents",
        Images: "Images",
        History: "History",
        Systolic_Blood_Pressure: "Systolic Blood Pressure",
        Diastolic_Blood_Pressure: "Diastolic Blood Pressure",
        Pulse: "Pulse",
        temperature: "temperature",
        SPO2: "SPO2 (Oxygen Saturation)",
        RR: "RR",
        Urine: "Urine (Output in ML)",
        Creatinine: "Creatinine",
        Email: "Email",
        Password: "Password",
        Submit: "Submit",
        Register: "Register",
        Doctor_Consultation: "Doctor Consultation",
        Nurse_Consultation: "Nurse Consultation",
        Task_Pending: "Task Pending",
        editProfile: "Edit Profile",
        Login: "Login",
        You_have: "You have",
        unread_message: "unread message",
        We_are_at: "We are at",
        day: "Day",
        your_Recovery: "of your Recovery",
        Name: "Name",
        Phone: "Phone",
        Address: "Address",
        Sign_In: "Sign In",
        Save: "Save",
        Chat: "Chat",
        Language: "Language",
        Change_Language: "Change Language",
        Nurse_Magistrate: "Nurse/Magistrate Consultation",
        diet_consultation: "Dietitian Consultation",
        psyc_consultation: "Psychiatrist Consultation",
        task_completed: "Task Completed",
        select_all_answers: "Please select all answers",
        submitted_successfully: "Answers submitted successfully",
        OK: "OK",
        Enter_Systolic: "Enter Systolic BP",
        Enter_Diastolic: "Enter Diastolic BP",
        Enter_Pluse_Rate: "Enter Pulse Rate",
        Enter_Temprature: "Enter Temperature",
        Enter_spo: "Enter Spo2",
        Enter_rr: "Enter RR",
        Vital_submitted: "Vitals submitted successffuly",
        Success: "Success",
        select_language: "Please select Language.",
        saved_language: "Language is changed Successfully!",
        Alert: "Alert",
        logout_message: "Are you sure, you want to log out?",
        logout: "Logout",
        cancel: "Cancel",
        enter_email_login: "Please enter your email login.",
        enter_pass_login: "Please enter password to login.",
        successfully_registed: "Successfully Registered",
        enter_your_name: "Please enter your name",
        enter_your_email: "Please enter your email",
        enter_valid_email: "Please enter valid email",
        enter_phone: "Please enter your phone",
        enter_valid_phone: "Please enter valid phone",
        enter_password: "Please enter password",
        range: "Range",
        tandctext:"Agree to terms and condition",
    },
    punjabi: {
        Home: 'ਹੋਮ',
        Questionnaire: 'ਪ੍ਰਸ਼ਨਾਵਲੀ',
        Training: "ਟ੍ਰੇਨਿੰਗ/ਸਿੱਖਿਆ",
        Profile: "ਪ੍ਰੋਫਾਈਲ",
        Vitals: "ਨਬਜ਼",
        Welcome: "ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ",
        Today_is: "ਅੱਜ ਦੀ ਤਾਰੀਖ਼",
        We_are_at_day_of_your_Recovery: "ਅੱਜ ਤੁਹਾਡੇ ਇਲਾਜ ਦਾ -- ਦਿਨ ਹੈ",
        You_have_unread_message: "ਤੁਹਾਡੇ ਕੋਲ -- ਨਾ ਪੜੇ ਮੈਸੇਜ ਹਨ",
        Today_Activity: "ਅੱਜ ਦੀ ਗਤੀਵਿਧੀ",
        Today_Activities: "ਅੱਜ ਦੀਆਂ ਗਤੀਵਿਧੀਆਂ",
        Your_Questionnaire_for_today: "ਅੱਜ ਵਾਸਤੇ ਤੁਹਾਡੇ ਲਈ ਜ਼ਰੂਰੀ ਪ੍ਰਸ਼ਨ",
        How_are_you_feeling_Today: "ਅੱਜ ਤੁਸੀਂ ਕਿਵੇਂ ਮਹਿਸੂਸ ਕਰ ਰਹੇ ਹੋ?",
        Good: "ਚੰਗਾ",
        Bad: "ਮਾੜਾ",
        How_is_your_mood: "ਤੁਹਾਡਾ ਮੂਡ ਕਿਹੋ ਜਿਹਾ ਹੈ?",
        How_was_your_night: "ਤੁਹਾਡੀ ਰਾਤ ਕਿਵੇਂ ਬੀਤੀ?",
        What_is_your_temperature: "ਤੁਹਾਡਾ ਤਾਪਮਾਨ ਕਿੰਨਾ ਹੈ?",
        other: "ਹੋਰ (ਵਿਕਲਪਿਕ)",
        Videos: "ਵੀਡੀਓ",
        Documents: "ਦਸਤਾਵੇਜ਼",
        Images: "ਫੋਟੋਆਂ",
        History: "ਪਿਛੋਕੜ",
        Systolic_Blood_Pressure: "ਸਾਇਸਟੋਲਿਕ ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ",
        Diastolic_Blood_Pressure: "ਡਾਇਸਟੋਲਿਕ ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ",
        Pulse: "ਨਬਜ਼",
        temperature: "ਤਾਪਮਾਨ",
        SPO2: "ਐਸਪੀਓ2 (ਆਕਸੀਜਨ ਸੰਤ੍ਰਿਪਤਾ)",
        RR: "RR",
        Urine: "ਪਿਸ਼ਾਬ (ਮਿਲੀ ਲੀਟਰ ਵਿੱਚ ਆਉਟਪੁੱਟ)",
        Creatinine: "ਕਰੀਏਟੀਨਾਈਨ",
        Email: "ਈਮੇਲ",
        Password: "ਪਾਸਵਰਡ",
        Submit: "ਸਬਮਿਟ",
        Register: "ਰਜਿਸਟਰ",
        Doctor_Consultation: "ਡਾਕਟਰ ਦੀ ਸਲਾਹ",
        Nurse_Consultation: "ਨਰਸ ਦੀ ਸਲਾਹ",
        Task_Pending: "ਇਹ ਕੰਮ ਰਹਿੰਦਾ ਹੈ",
        editProfile: "ਸੋਧ ਪ੍ਰੋਫ਼ਾਈਲ",
        You_have: "ਤੁਹਾਡੇ ਕੋਲ",
        unread_message: "ਨਾ ਪੜੇ ਮੈਸੇਜ ਹਨ",
        We_are_at: "ਤੁਹਾਡੇ ਇਲਾਜ ਦਾ",
        day: "ਅੱਜ",
        your_Recovery: "ਦਿਨ ਹੈ",
        Login: "ਲਾਗਿਨ",
        Name: "ਨਾਮ",
        Phone: "ਫੋਨ",
        Address: "ਪਤਾ",
        Sign_In: "ਸਾਈਨ - ਇਨ",
        Save: "ਸੇਵ",
        Chat: "ਗੱਲਬਾਤ",
        Language: "ਭਾਸ਼ਾ",
        Change_Language: "ਭਾਸ਼ਾ ਬਦਲੋ",
        Nurse_Magistrate: "ਨਰਸ / ਮੈਜਿਸਟਰੇਟ ਦੀ ਸਲਾਹ",
        diet_consultation: "ਡਾਇਟੀਸ਼ੀਅਨ ਮਸ਼ਵਰਾ",
        psyc_consultation: "ਮਾਨਸਿਕ ਰੋਗਾਂ ਦੀ ਮਸ਼ਵਰਾ",
        task_completed: "ਕੰਮ ਪੂਰਾ ਹੋਇਆ",
        select_all_answers: "ਕਿਰਪਾ ਕਰਕੇ ਸਾਰੇ ਜਵਾਬ ਚੁਣੋ",
        submitted_successfully: "ਉੱਤਰ ਸਫਲਤਾਪੂਰਵਕ ਪੇਸ਼ ਕੀਤੇ ਗਏ",
        OK: "ਠੀਕ ਹੈ",
        Enter_Systolic: "ਸਿਸਟੋਲਿਕ ਬੀਪੀ ਦਰਜ ਕਰੋ",
        Enter_Diastolic: "ਡਾਇਸਟੋਲਿਕ ਬੀਪੀ ਦਰਜ ਕਰੋ",
        Enter_Pluse_Rate: "ਪਲਸ ਰੇਟ ਦਰਜ ਕਰੋ",
        Enter_Temprature: "ਤਾਪਮਾਨ ਦਾਖਲ ਕਰੋ",
        Enter_spo: "Spo2 ਦਰਜ ਕਰੋ",
        Enter_rr: "RR ਦਰਜ ਕਰੋ",
        Vital_submitted: "ਮਹੱਤਵਪੂਰਨ ਸਫਲਤਾਪੂਰਵਕ ਪੇਸ਼ ਕੀਤਾ",
        Success: "ਸਫਲਤਾ",
        select_language: "ਕਿਰਪਾ ਕਰਕੇ ਭਾਸ਼ਾ ਦੀ ਚੋਣ ਕਰੋ.",
        saved_language: "ਭਾਸ਼ਾ ਸਫਲਤਾਪੂਰਵਕ ਬਦਲੀ ਗਈ ਹੈ!",
        Alert: "ਚੇਤਾਵਨੀ",
        logout_message: "ਕੀ ਤੁਸੀਂ ਪੱਕਾ ਲਾਗ ਆਉਟ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ?",
        logout: "ਨਿਕਾਸ",
        cancel: "ਰੱਦ ਕਰੋ",
        enter_email_login: "ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਈਮੇਲ ਲੌਗਇਨ ਦਾਖਲ ਕਰੋ.",
        enter_pass_login: "ਲਾਗਇਨ ਕਰਨ ਲਈ ਪਾਸਵਰਡ ਦਿਓ ਜੀ.",
        successfully_registed: "ਲਾਗਇਨ ਕਰਨ ਲਈ ਪਾਸਵਰਡ ਦਿਓ ਜੀ",
        enter_your_name: "ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਨਾਮ ਦਰਜ ਕਰੋ",
        enter_your_email: "ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੀ ਈਮੇਲ ਦਰਜ ਕਰੋ",
        enter_valid_email: "ਕਿਰਪਾ ਕਰਕੇ ਵੈਧ ਈਮੇਲ ਦਰਜ ਕਰੋ",
        enter_phone: "ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਫੋਨ ਦਰਜ ਕਰੋ",
        enter_valid_phone: "ਕਿਰਪਾ ਕਰਕੇ ਵੈਧ ਫੋਨ ਦਾਖਲ ਕਰੋ",
        enter_password: "ਪਾਸਵਰਡ ਦਿਓ ਜੀ",
        range: "ਸੀਮਾ",
        tandctext:"ਨਿਯਮ ਅਤੇ ਸ਼ਰਤ ਨਾਲ ਸਹਿਮਤ",
    },
    hindi: {

    }


}


//COMMON STATUS
export const SUCCESS = 'success';
export const FAILURE = 'failure';
export const ERROR = 'Something went wrong!!';

//EVENT STATUS
export const PENDING = 'pending';
export const COMPLETED = 'completed';
export const CONFIRMED = 'confirmed';
export const INROUTE = 'inroute';
export const INPROCESS = 'inprocess';
export const INTERESTED = 'interested';
export const STARTED = 'started';
export const FINISH = 'finish';
export const CANCEL = 'cancel';




export const data = [{
    "_id": "5d64c0e254548f7aade622c1",
    "modelId": "5d5155c9582af4648aa8fce3",
    "eventId": {
        "eventLocation": {
            "type": "Point",
            "coordinates": [18.34567, 12.34567]
        },
        "eventDetailDoc": "https://otomatic.s3.us-east-2.amazonaws.com/1566879332625female.png",
        "eventCoverImage": "https://otomatic.s3.us-east-2.amazonaws.com/15668793329961562562579139log.png",
        "_id": "5d64ae655c63df67eedcc4dc",
        "userID": "123232434567",
        "eventName": "jklfsdg",
        "eventDate": "2020-01-02T00:00:00.000Z",
        "eventStartTime": "12.50",
        "eventEndTime": "4.30",
        "eventAddress": "mohali 4 phase",
        "eventProducts": "fdsafdf",
        "eventDistributor": "adsf",
        "eventDress": "faf",
        "eventModel": "fasdftu",
        "eventPos": "dfghfgh",
        "eventAbout": "this is about",
        "eventStatus": "on",
        "createdAt": "2019-08-27T04:15:33.088Z"
    },
    "status": "pending",
    "createdAt": "2019-08-27T05:34:26.862Z"
}]



export default Config;