import React, { Component } from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBD2mSOLHaHvK5RLj2iI_CnrGjE2Yr5_zw",
    authDomain: "login-register-ad11e.firebaseapp.com",
    projectId: "login-register-ad11e",
    storageBucket: "login-register-ad11e.appspot.com",
    messagingSenderId: "409595969593",
    appId: "1:409595969593:web:a49d316cbdeaab4d780de8",
    measurementId: "G-83M7DH7C9W"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // flag=0 >>> Register Page flag=1>>>Login page
            flag: 0,
            message: null,
        }
    }

    //  which page is show Signin  or   Signup page
    selectPageHandler = () => {
        this.setState({ flag: !this.state.flag, message: null });
    }

    //>>>>> Signup handler Start
    registrationHandler = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const confirmPassword = event.target.confirmPassword.value;
        if (password !== confirmPassword) {
            this.setState({ message: "password don't match" }, () => {
                console.log(email, password, confirmPassword);
            })
            return;
        }
        const auth = firebase.auth();
        const authPromice = auth.createUserWithEmailAndPassword(email, password);
        authPromice
            .then((data) => {
                auth.currentUser.sendEmailVerification();
                this.setState({ message: "Registration Succefully" }, () => {
                    event.target.email.value = "";
                    event.target.password.value = "";
                    event.target.confirmPassword.value = "";
                })
            })
            .catch((error) => {
                this.setState({ message: error.message })
                //console.log(error.message);
            });

    }
    //>>>>> Signup handler End

    //         >>> sign in handler  Start
    loginHandler = (event) => {
        event.preventDefault();
        const auth = firebase.auth();
        const email = event.target.email.value;
        const password = event.target.password.value;
        auth.signInWithEmailAndPassword(email, password)
            .then((data) => {
                if (data.user.emailVerified === true) {
                    this.setState({ message: "Login Succesfull" })
                    console.log(data);
                } else {
                    this.setState({ message: "Your email is not verified yet" })

                }

            }).catch((error) => {
                this.setState({ message: error.message })
            })
    }

    //         >>> sign in handler  End

    render() {
        return (
            <div >
                {this.state.flag
                    ? <Login login={this.loginHandler} message={this.state.message} select={this.selectPageHandler} />
                    : <Register message={this.state.message} register={this.registrationHandler} select={this.selectPageHandler} />}
            </div>
        )
    }
}


export default App
