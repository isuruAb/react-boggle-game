
import React, { Component } from 'react';
import './loginscreen.css';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import firebase from 'firebase';
import { auth } from '../../firebase'
import GameScreen from '../gamescreen/gamescreen';
import { Redirect } from 'react-router-dom'

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            authenticated: false
        }
    }
    styles = {
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            flex: 1,
            flexDirection: 'column',
        },
        formEle: {
            display: 'flex',
            margin: '0px 20px 20px 20px'
        }
    };

    playGame = (e) => {
        e.preventDefault();
        var provider = new firebase.auth.GoogleAuthProvider();
        // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        auth.signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            console.log("token", token);
            localStorage.setItem("token", token);
            // The signed-in user info.
            var user = result.user;
            console.log("user", user);
            // this.props.dispatch(push('/game/path'));

        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log({
                "error": errorMessage,
                errorCode: errorCode
            });
        });



    }
    componentDidMount() {
        auth.onAuthStateChanged(function (user) {
            if (user) {
                this.setState({ authenticated: true });
            } else {
                this.setState({ authenticated: false });
            }
        }.bind(this));
    }

    render() {
        return (
            <div>
                {!this.state.authenticated && <div className="App">
                    <div className="App-header">
                        <Paper elevation={1} className="loginPaper">
                            <h1>Boggle Challenge</h1>

                            <form noValidate autoComplete="off" style={this.styles.container}>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    style={this.styles.formEle}
                                    onClick={(e) => this.playGame(e)}
                                >
                                    Login with Gmail
                                </Button>
                            </form>

                        </Paper>

                    </div>
                </div>}
                {this.state.authenticated &&
                    <Redirect to='/game' />
                }
            </div>

        );
    }
}

export default LoginScreen;