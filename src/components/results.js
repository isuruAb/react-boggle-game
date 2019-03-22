import React, { Component } from 'react';
import './results.css';
import FaceIcon from '@material-ui/icons/Face';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';

import Demo from './leaderboard';
class ResultsDialog extends Component {
    handleClose = () => {
        this.props.onClose();
    };

    wrondWords = () => {
        let wrongwords = 0;
       // console.log("this.props.result.length",this.props.result.length);
        for (let i = 0; i < this.props.result.length; i++) {
            //console.log("this.props.result[i][1]",this.props.result[i][1]);

            if (this.props.result[i][1] === 0) {
                wrongwords = wrongwords + 1;
            }
        }
        return wrongwords;
    }

    render() {
        const { classes, onClose, selectedValue, ...other } = this.props;

        return (
            <Dialog  fullScreen={true} className="modalwrap" onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
                <DialogTitle id="simple-dialog-title">Score Card</DialogTitle>
                <DialogContent>

                    <Chip
                        icon={<FaceIcon />}
                        label={"All Words: " + this.props.result.length}
                        clickable
                        className="allWordChip"
                        color="primary"
                        deleteIcon={<DoneIcon />}
                        variant="outlined"
                    />
                    <Chip
                        icon={<FaceIcon />}
                        label={"Wrong Words: " + this.wrondWords()}
                        color="secondary"
                        variant="outlined"
                    />
                    <h2>Overall Score: {this.props.finalresult}</h2>
                    <Demo
                        result={this.props.result}
                        users={this.props.users}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Replay
                    </Button>
                </DialogActions>

            </Dialog>
        );
    }
}

export default ResultsDialog;
