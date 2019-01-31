import React, { Component } from 'react';
import './App.css';

class App extends Component {
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
  board = [
    ['T', 'A', 'P', '*'],
    ['E', 'A', 'K', 'S'],
    ['O', 'B', 'R', 'S'],
    ['S', '*', 'X', 'D']
  ];

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

    let row_limit = this.board.length;
    let column_limit = this.board.length;
    
    //Check Existance
    if(this.finalIndex.length!==0){
      for(let index=0;index<this.finalIndex.length;index++){
        if(this.finalIndex[index][0]===selectedIndex[0]&&this.finalIndex[index][1]===selectedIndex[1]){
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
        this.finalIndex.push([selectedIndex[0],selectedIndex[1]]);
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
      this.finalIndex.push([selectedIndex[0],selectedIndex[1]]);

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
  render() {

    return (
      <div className="App">
        <header className="App-header">

          <div id="row01" style={this.styles.rowstyle} >
            <div id="00" onClick={(e) => this.selectChar(e, this.board[0][0])} style={this.styles.colstyle}>{this.board[0][0]}</div>
            <div id="01" onClick={(e) => this.selectChar(e, this.board[0][1])} style={this.styles.colstyle}>{this.board[0][1]}</div>
            <div id="02" onClick={(e) => this.selectChar(e, this.board[0][2])} style={this.styles.colstyle}>{this.board[0][2]}</div>
            <div id="03" onClick={(e) => this.selectChar(e, this.board[0][3])} style={this.styles.colstyle}>{this.board[0][3]}</div>
          </div>
          <div id="row02" style={this.styles.rowstyle}>
            <div id="10" onClick={(e) => this.selectChar(e, this.board[1][0])} style={this.styles.colstyle}>{this.board[1][0]}</div>
            <div id="11" onClick={(e) => this.selectChar(e, this.board[1][1])} style={this.styles.colstyle}>{this.board[1][1]}</div>
            <div id="12" onClick={(e) => this.selectChar(e, this.board[1][2])} style={this.styles.colstyle}>{this.board[1][2]}</div>
            <div id="13" onClick={(e) => this.selectChar(e, this.board[1][3])} style={this.styles.colstyle}>{this.board[1][3]}</div>
          </div>
          <div id="row03" style={this.styles.rowstyle}>
            <div id="20" onClick={(e) => this.selectChar(e, this.board[2][0])} style={this.styles.colstyle}>{this.board[2][0]}</div>
            <div id="21" onClick={(e) => this.selectChar(e, this.board[2][1])} style={this.styles.colstyle}>{this.board[2][1]}</div>
            <div id="22" onClick={(e) => this.selectChar(e, this.board[2][2])} style={this.styles.colstyle}>{this.board[2][2]}</div>
            <div id="23" onClick={(e) => this.selectChar(e, this.board[2][3])} style={this.styles.colstyle}>{this.board[2][3]}</div>
          </div>
          <div id="row04" style={this.styles.rowstyle}>
            <div id="30" onClick={(e) => this.selectChar(e, this.board[3][0])} style={this.styles.colstyle}>{this.board[3][0]}</div>
            <div id="31" onClick={(e) => this.selectChar(e, this.board[3][1])} style={this.styles.colstyle}>{this.board[3][1]}</div>
            <div id="32" onClick={(e) => this.selectChar(e, this.board[3][2])} style={this.styles.colstyle}>{this.board[3][2]}</div>
            <div id="33" onClick={(e) => this.selectChar(e, this.board[3][3])} style={this.styles.colstyle}>{this.board[3][3]}</div>
          </div>

        </header>
      </div>
    );
  }
}

export default App;
