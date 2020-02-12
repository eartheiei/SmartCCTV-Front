import React, { Component } from "react";

import "./block.css";

export class BlockScope extends Component {
  constructor() {
    super();

    this.state = {
      blocksId: [],
      active: []
    };
  }

  componentDidMount() {
    this.initialGrid(this.props.grid);
  }

  componentWillReceiveProps(nextprops) {
    this.initialGrid(nextprops.grid);
  }

  initialGrid = grid => {
    var value;
    if (grid == 1) value = 4;
    else if (grid == 5) value = 8;
    else value = 10;
    let tempData = [];
    let temp = [];
    var count = 0;
    for (let i = 0; i < value; i++) {
      for (let j = 0; j < value; j++) {
        temp.push(count);
        count++;
      }
      tempData.push(temp);
      temp = [];
    }
    this.setState({ blocksId: tempData, active: [] });
  };

  classGrid() {
    const { grid } = this.props;
    if (grid == 1) {
      return "block-group x1";
    } else if (grid == 5) {
      return "block-group x5";
    } else {
      return "block-group x10";
    }
  }

  classActive = id => {
    const { active } = this.state;
    if (active) {
      active.map(element => {
        if (element === id) return "button block is-active";
        else return "button block";
      });
    } else return "button block";
  };

  handleBlock = id => {
    const { active } = this.state;
    var tempData = active;
    var status = false;
    tempData.forEach(element => {
      if (element === id) {
        tempData.splice(tempData.indexOf(id), 1);
        status = true;
      }
    });
    if(!status)tempData.push(id);
    this.setState({ active: tempData });
    console.log(active);
  };

  render() {
    const { blocksId } = this.state;
    return (
      <div class={this.classGrid()}>
        {blocksId.map(_array => (
          <div>
            {_array.map(element => (
              <button
                class="button block"//{this.classActive(element)}
                key={element}
                onClick={e => this.handleBlock(element, e)}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
}
