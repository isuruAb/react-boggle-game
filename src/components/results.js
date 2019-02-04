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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class ResultsDialog extends Component {
    handleClose = () => {
        this.props.onClose();
    };

    wrondWords=()=>{
        let wrongwords=0;
        for(let i=0;i<this.props.result.length;i++){
            if(this.props.result[i][1]===0){
                wrongwords=wrongwords+1;
            }
        }
        return wrongwords;
    }
    render() {
        const { classes, onClose, selectedValue, ...other } = this.props;
        
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
                <DialogTitle id="simple-dialog-title">Selected Words</DialogTitle>
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
                        label={"Wrong Words: "+this.wrondWords()}
                        color="secondary"
                        variant="outlined"
                    />
                    <h2>Overall Score: {this.props.finalresult}</h2>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Word</TableCell>
                                <TableCell align="right">Points</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.result.map(row => (
                                <TableRow key={row[0]}>
                                    <TableCell component="th" scope="row">
                                        {row[0]}
                                    </TableCell>
                                    <TableCell align="right">{row[1]}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
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
