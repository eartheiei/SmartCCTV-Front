import React, { Component } from "react";

import "./block.css";

export class BlockScope extends Component {
  constructor() {
    super();

    this.state = {
      blocksId: [],
      selected: []
    };
  }

  componentDidMount() {
    this.initialGrid(this.props.grid);
  }

  componentWillReceiveProps(nextprops) {
    this.initialGrid(nextprops.grid);
    if(this.props.grid!=nextprops.grid)this.setState({selected:[]})
  }

  initialGrid = grid => {
    var value;
    if (grid == 1) value = 16;
    else if (grid == 5) value = 20;
    else value = 24;
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
    this.setState({ blocksId: tempData});
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

  handleBlock = id => {
    const { selected } = this.state;
    var tempData = selected;
    var status = false;
    tempData.forEach(element => {
      if (element === id) {
        tempData.splice(tempData.indexOf(id), 1);
        status = true;
      }
    });
    if (!status) tempData.push(id);
    this.setState({ selected: tempData });
    this.props.real(id)
    console.log(selected);
  };

  render() {
    const { blocksId, selected } = this.state;
    return (
      <div class={this.classGrid()}>
        {blocksId.map(_array => (
          <div>
            {_array.map(element => (
              <button
                class={
                  selected.includes(element)
                    ? "button block selected"
                    : "button block"
                }
                key={element}
                onClick={e => this.handleBlock(element, e)}
                //disabled
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
}
