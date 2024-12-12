import React, { Component } from 'react';

export default class Cell extends Component {
  getColor() {
    return this.props.state ? 'Alive' : 'Dead'
  }

  render() {
    return <div className={'Cell ' + this.getColor()} onClick={() => this.props.toggleState()}></div>
  };
}
