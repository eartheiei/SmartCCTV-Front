import React, { Component } from "react";
import SearchControl from './searchControl'

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      status: 'name'
    };
  }

  onClickTabs = status => {
    this.setState({
      status: status
    })
  }

  render() {
    const { status } = this.state
    return (
      <div>
        <label className="label title is-3" style={{ marginBottom: "1rem" }}>
          Search
        </label>
        <div class="tabs">
          <ul>
            <li class={status=='name'? 'is-active':''}>
              <a onClick={()=>this.onClickTabs('name')}>Name</a>
            </li>
            <li class={status=='picture'? 'is-active':''}>
              <a onClick={()=>this.onClickTabs('picture')}>Picture</a>
            </li>
          </ul>
        </div>
        <SearchControl status={status}/>
      </div>
    );
  }
}
