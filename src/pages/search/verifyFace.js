import React, { Component } from "react";
import { verifyTier } from "../../components/SearchFunctions";

import "./search.css";

export default class VerifyFace extends Component {
  constructor() {
    super();

    this.state = {
      tier: [],
      picture: "",
      selected: 0,
      msg: "Loading . . ."
    };
  }

  async componentDidMount() {
    var temp = [];
    while (temp.length == 0) {
      const res = await verifyTier();
      temp = res;
    }
    this.setState({
      tier: temp,
    });
    if(temp[0]===''){
      this.setState({
        msg: 'Can not found! Plaese press Cancel.'
      })
    }
  }

  className = (id) => {
    if (id === this.state.selected) {
      return "center row ranking-box selected-id";
    } else return "center row ranking-box";
  };

  onClickPicture = (id) => {
    this.props.selectedId(id);
    this.setState({
      selected: id,
    });
  };

  render() {
    const { tier, msg } = this.state;
    return (
      <div class="center">
        {tier.length > 0 ? (
          <div class="select-userId" style={{ width: "50%" }}>
            {tier.map((element) => (
              <div
                class={this.className(element.id)}
                onClick={() => this.onClickPicture(element.id)}
              >
                <img
                  src={this.props.pictureUrl}
                  width="200"
                  style={{ borderRadius: "6px", objectFit: "contain" }}
                />
                <img
                  src={`data:image/png;base64,${element.base64}`}
                  width="200"
                  style={{
                    borderRadius: "6px",
                    marginLeft: "1rem",
                    objectFit: "contain",
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div class="center" style={{paddingTop:'5rem',paddingBottom:'5rem'}}>
            <h3 class="title is-3">{msg}</h3>
          </div>
        )}
      </div>
    );
  }
}
