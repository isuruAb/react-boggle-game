import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      board: []
    };

  }
  styles = {
    rowstyle: {
      display: 'flex',
      width: '300px',
      height: '50px'
    },
    colstyle: {
      flex: 1,
      background: '#67DAF9'
    }
  };


  getBoard = () => {

    axios.get('/api/v1/boggle/board').then(response => {
      const chars = response.data.data;
      this.setState({ board: chars })
    });
  }

  finalWord = [];
  finalIndex = [];
  neigbour_arr = [];
  selectChar(e, params) {
    console.log(e.target.id);
    console.log(params);
    let selectedIndex = e.target.id.split("");

    for (var i = 0; i < selectedIndex.length; i++) {
      selectedIndex[i] = parseInt(selectedIndex[i], 10);
    }

    let row_limit = 4;
    let column_limit = 4;

    //Check Existance
    if (this.finalIndex.length !== 0) {
      for (let index = 0; index < this.finalIndex.length; index++) {
        if (this.finalIndex[index][0] === selectedIndex[0] && this.finalIndex[index][1] === selectedIndex[1]) {
          alert("You can't select same character again");
          return;
        }
      }
    }

    if (this.neigbour_arr.length !== 0) {
      let isNeigbour = false;


      for (let neigbour = 0; neigbour < this.neigbour_arr.length; neigbour++) {
        if (selectedIndex[0] === this.neigbour_arr[neigbour][0] && selectedIndex[1] === this.neigbour_arr[neigbour][1]) {
          console.log('They are equal!', JSON.stringify(this.neigbour_arr[neigbour]));
          isNeigbour = true;

        }
      }
      if (!isNeigbour) {
        alert("you need to select a neigbour");
        return;
      }
      else {
        this.finalWord.push(params);
        this.finalIndex.push([selectedIndex[0], selectedIndex[1]]);
        document.getElementById(e.target.id).style.background = '#345678';

        this.neigbour_arr = [];

        if (row_limit > 0) {
          for (var x = Math.max(0, selectedIndex[1] - 1); x <= Math.min(selectedIndex[1] + 1, row_limit - 1); x++) {
            for (var y = Math.max(0, selectedIndex[0] - 1); y <= Math.min(selectedIndex[0] + 1, column_limit - 1); y++) {
              if (x !== selectedIndex[1] || y !== selectedIndex[0]) {
                this.neigbour_arr.push([y, x]);
              }
            }
          }
          console.log("neigbour_arr", this.neigbour_arr);
        }
      }
    }
    else {
      this.finalWord.push(params);
      this.finalIndex.push([selectedIndex[0], selectedIndex[1]]);

      document.getElementById(e.target.id).style.background = '#345678';

      console.log('no length else');
      this.neigbour_arr = [];

      if (row_limit > 0) {
        for (let x = Math.max(0, selectedIndex[1] - 1); x <= Math.min(selectedIndex[1] + 1, row_limit - 1); x++) {
          for (let y = Math.max(0, selectedIndex[0] - 1); y <= Math.min(selectedIndex[0] + 1, column_limit - 1); y++) {
            if (x !== selectedIndex[1] || y !== selectedIndex[0]) {
              this.neigbour_arr.push([y, x]);
            }
          }
        }
        console.log("neigbour_arr", this.neigbour_arr);
      }
    }

    console.log("this.finalWord", this.finalWord);

    console.log("this.finalIndex", this.finalIndex);


  }

  submitToCheck() {

    axios.post('/api/v1/boggle/word', {
      word: this.finalWord
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  componentDidMount() {
    this.getBoard();
  }
  render() {
    console.log("this.state.board", this.state.board);
    return (
      <div className="App">
        <header className="App-header">

          <div id="row01" style={this.styles.rowstyle} >
            <div id="00" onClick={(e) => this.selectChar(e, this.state.board[0])} style={this.styles.colstyle}>{this.state.board[0]}</div>
            <div id="01" onClick={(e) => this.selectChar(e, this.state.board[1])} style={this.styles.colstyle}>{this.state.board[1]}</div>
            <div id="02" onClick={(e) => this.selectChar(e, this.state.board[2])} style={this.styles.colstyle}>{this.state.board[2]}</div>
            <div id="03" onClick={(e) => this.selectChar(e, this.state.board[3])} style={this.styles.colstyle}>{this.state.board[3]}</div>
          </div>
          <div id="row02" style={this.styles.rowstyle}>
            <div id="10" onClick={(e) => this.selectChar(e, this.state.board[4])} style={this.styles.colstyle}>{this.state.board[4]}</div>
            <div id="11" onClick={(e) => this.selectChar(e, this.state.board[5])} style={this.styles.colstyle}>{this.state.board[5]}</div>
            <div id="12" onClick={(e) => this.selectChar(e, this.state.board[6])} style={this.styles.colstyle}>{this.state.board[6]}</div>
            <div id="13" onClick={(e) => this.selectChar(e, this.state.board[7])} style={this.styles.colstyle}>{this.state.board[7]}</div>
          </div>
          <div id="row03" style={this.styles.rowstyle}>
            <div id="20" onClick={(e) => this.selectChar(e, this.state.board[8])} style={this.styles.colstyle}>{this.state.board[8]}</div>
            <div id="21" onClick={(e) => this.selectChar(e, this.state.board[9])} style={this.styles.colstyle}>{this.state.board[9]}</div>
            <div id="22" onClick={(e) => this.selectChar(e, this.state.board[10])} style={this.styles.colstyle}>{this.state.board[10]}</div>
            <div id="23" onClick={(e) => this.selectChar(e, this.state.board[11])} style={this.styles.colstyle}>{this.state.board[11]}</div>
          </div>
          <div id="row04" style={this.styles.rowstyle}>
            <div id="30" onClick={(e) => this.selectChar(e, this.state.board[12])} style={this.styles.colstyle}>{this.state.board[12]}</div>
            <div id="31" onClick={(e) => this.selectChar(e, this.state.board[13])} style={this.styles.colstyle}>{this.state.board[13]}</div>
            <div id="32" onClick={(e) => this.selectChar(e, this.state.board[14])} style={this.styles.colstyle}>{this.state.board[14]}</div>
            <div id="33" onClick={(e) => this.selectChar(e, this.state.board[15])} style={this.styles.colstyle}>{this.state.board[15]}</div>
          </div>
          <div onClick={() => this.submitToCheck()}>Submit</div>

        </header>
      </div>
    );
  }
}

export default App;
