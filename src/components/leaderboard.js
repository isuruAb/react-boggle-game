import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function TabContainer({ children, dir }) {
    return (
        <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
    },
});

class LeaderBoard extends Component {
    state = {
        value: 0,
        users:[]
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };
    render() {
        const { classes, theme } = this.props;
        const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

        return (
            <div >
                <AppBar position="static" color="default" >
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                    >
                        <Tab label="Selected Words" />
                        <Tab label="Leaderboard" />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    <TabContainer dir={theme.direction}>

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
                    </TabContainer>
                    <TabContainer dir={theme.direction}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>User</TableCell>
                                    <TableCell>Points</TableCell>
                                    <TableCell>Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.users.map(row => (
                                    <TableRow key={row.uid}>
                                        <TableCell component="th" scope="row">
                                            {row.username}
                                        </TableCell>
                                        <TableCell>{row.points}</TableCell>
                                        <TableCell>{(new Date()).toLocaleDateString('en-US', DATE_OPTIONS)}</TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TabContainer>
                </SwipeableViews>
            </div>
        );
    }
}

LeaderBoard.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(LeaderBoard);
