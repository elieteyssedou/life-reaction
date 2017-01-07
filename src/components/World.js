import React, { Component } from 'react';
import Line from './Line';

export default class World extends Component {
  constructor(props) {
    super(props);

    var map = this.initMap();
    var lines = this.generateLines(map);

    this.resetMap = this.resetMap.bind(this);
    this.pause = this.pause.bind(this);

    this.state = {
      map: map,
      lines: lines,
      pause: false
    };
  }

  initMap() {
    var map = []

    for(var y=0; y < this.props.size; y++) {
      var line = []
      for(var x=0; x < this.props.size; x++) {
        line.push(false);
      }
      map.push(line)
    }

    this.seedMap(map);

    return map;
  }

  resetMap() {
    var map = this.initMap();
    var lines = this.generateLines(map);

    this.setState({
      map: map,
      lines: lines
    });
  }

  seedMap(map) {
    map[this.props.size / 2][this.props.size / 2] = true;
    map[this.props.size / 2 - 2][this.props.size / 2] = true;
    map[this.props.size / 2 - 2][this.props.size / 2 - 1] = true;
    map[this.props.size / 2 - 2][this.props.size / 2 + 1] = true;
    map[this.props.size / 2 + 2][this.props.size / 2] = true;
    map[this.props.size / 2 + 2][this.props.size / 2 - 1] = true;
    map[this.props.size / 2 + 2][this.props.size / 2 + 1] = true;
  }

  generateMap(exMap) {
    var map = exMap.map(
      (line, y) => {
        return line.map(
          (cell, x) => {
            return this.computeStateForCell(cell, x, y, exMap);
          }
        )
      }
    );

    if (Math.floor(Math.random() * this.props.rand) === 0) {
      let x = Math.floor(Math.random() * this.props.size);
      let y = Math.floor(Math.random() * this.props.size);

      map[y][x] = true;
      if (x + 1 < this.props.size) map[y][x + 1] = true;
      if (y + 1 < this.props.size) map[y + 1][x] = true;
      if (x + 1 < this.props.size && y + 1< this.props.size) map[y + 1][x + 1] = true;
    }

    return map;
  }


  // Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
  // Any live cell with two or three live neighbours lives on to the next generation.
  // Any live cell with more than three live neighbours dies, as if by overpopulation.
  // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
  computeStateForCell(cell, x, y, exMap) {
    var neighbours = this.getNeighboursNumber(x, y, exMap)

    if (cell) {
      if (neighbours === 2 || neighbours === 3) return true;
      else return false;
    }
    return neighbours === 3 ? true : false;
  }

  getNeighboursNumber(x, y, map) {
    var n = 0;

    var toCheck = [
      [x - 1, y - 1], [x, y - 1], [x + 1, y - 1],
      [x - 1, y], [x + 1, y],
      [x - 1, y + 1], [x, y + 1], [x + 1, y + 1]
    ]

    toCheck.map(
      (coords) => {
        if (coords[0] >= 0 && coords[0] < this.props.size
          && coords[1] >= 0 && coords[1] < this.props.size) {
          if (map[coords[1]][coords[0]]) n += 1;
        }
        return n;
      }
    )

    return n;
  }

  generateLines(map) {
    var tab = [];

    for(var i=0; i < this.props.size; i++) {
      let line = <Line key={i} cells={ map[i] } />;
      tab.push(line);
    }

    return tab;
  }

  tick() {
    if (this.state.pause) return;

    this.setState((prevState) => ({
      map: this.generateMap(prevState.map)
    }));

    this.setState((prevState) => ({
      lines: this.generateLines(this.state.map)
    }));
  }

  pause() {
    this.setState((prevState) => ({
      pause: !prevState.pause
    }));
  }

  pauseIcon() {
    return this.state.pause ? 'fa-play' : 'fa-pause';
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), this.props.period);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        <div className='World'>{ this.state.lines }</div>
        <br/>
        <div className='Buttons'>
          <a href='#' className="fa fa-step-backward" onClick={ this.resetMap } ></a>
          <a href='#' className={'fa ' + this.pauseIcon() } onClick={ this.pause } ></a>
        </div>
      </div>
    );
  }
}
