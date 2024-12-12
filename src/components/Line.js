import React, { Component } from 'react';
import Cell from './Cell';

export default class Line extends Component {
  generateCells() {
    return this.props.cells.map(
      (cell, i) => {
        return <Cell key={i} state={ cell } toggleState={() => { this.props.toggleCellState(i) }} />;
      }
    );
  }

  render() {
    return (
      <div className='Line'>{ this.generateCells() }</div>
    );
  }
}
