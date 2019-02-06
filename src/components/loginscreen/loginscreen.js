
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import './loginscreen.css';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Route } from 'react-router-dom'


class LoginScreen extends Component {
    constructor(props) {
        super();
        this.state = {
            name: ''
        }
    }
    styles = {
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            flex: 1,
            width: '400px',
            flexDirection: 'column',
        },
        formEle: {
            display: 'flex',
            margin: '0px 20px 20px 20px'
        }
    };
    handleChange(e) {
        this.setState({ name: e.target.value })
    }
    playGame(history) {
        if (this.state.name.length !== 0) {
            history.push('/game/' + this.state.name);

        }
        else {
            alert("Please Enter Your Name");
        }
    }
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <Paper elevation={1} >
                        <h1>Boggle Challenge</h1>

                        <form noValidate autoComplete="off" style={this.styles.container}>
                            <TextField
                                id="outlined-name"
                                label="Your Name"
                                style={this.styles.formEle}
                                value={this.state.name}
                                onChange={(e) => this.handleChange(e)}
                                margin="normal"
                                variant="outlined"
                            />

                            <Route render={({ history }) => (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    style={this.styles.formEle}
                                    onClick={() => this.playGame(history)}
                                >
                                    Play
                                </Button>
                            )} />
                        </form>

                    </Paper>

                </div>
            </div>
        );
    }
}

export default LoginScreen;