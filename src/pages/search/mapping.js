import React, { Component } from "react";
import {
  blockMapping,
  detailCam,
  findBlockNum,
} from "../../components/SearchFunctions";

import "./mapping.css";

export default class Mapping extends Component {
  constructor() {
    super();

    this.state = {
      result: [],
      camera: "",
      blocksId: [],
    };
  }

  async componentDidMount() {
    const data = {
      user_id: this.props.user_id,
      video_name: this.props.video_name,
    };
    let block_id = [];
    let block_num = [];
    blockMapping(data).then(async (res) => {
      res.map((tran) => {
        if (!block_id.includes(tran.block_id)) block_id.push(tran.block_id);
      });
      await Promise.all(
        block_id.map(async (block, index) => {
          let res = await findBlockNum(block);
          if (res.block_num) {
            block_num.push(res.block_num);
          }
        })
      );
      this.setState({
        result: block_num,
      });
    });
    // console.log(block_id,block_num)
    detailCam(this.props.cam_id).then((res) => {
      this.setState({
        camera: res,
      });
    });
    this.initialGrid();
  }

  initialGrid = () => {
    let tempData = [];
    let temp = [];
    var count = 0;
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 24; j++) {
        temp.push(count);
        count++;
      }
      tempData.push(temp);
      temp = [];
    }
    this.setState({ blocksId: tempData });
  };

  render() {
    const { result, camera, blocksId } = this.state;
    return (
      <div>
        {camera !== "" && (
          <div>
            <div class="block-group-mapping x10-mapping">
              {blocksId.map((_array) => (
                <div>
                  {_array.map((element) => (
                    <button
                      class={
                        result.includes(element)
                          ? "button block selected-mapping"
                          : "button block"
                      }
                      key={element}
                    />
                  ))}
                </div>
              ))}
            </div>
            <img
              src={require(`../../asset/${camera.slice(10)}.png`)}
              style={{ width: "1024px", height: "576px" }}
            />
          </div>
        )}
      </div>
    );
  }
}
