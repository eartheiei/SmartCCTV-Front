import React, { Component } from "react";

export default class Pagination extends Component {
  constructor() {
    super();

    this.state = {
      allPage: [],
      currentResult: [],
      currentPage: 1
    };
  }

  componentDidMount() {
    this.setPage(this.props.result, 1);
  }

  componentWillReceiveProps(nextprops) {
    const temp = [];
    var count = 1;
    for (var i = 0; i < nextprops.result.length; i++) {
      if (i % 10 == 1) {
        temp.push(count);
        count++;
      }
    }
    this.setState({
      allPage: temp
    });
    this.setPage(nextprops.result, 1);
  }

  setPage = (result, currentPage) => {
    var resultIndex = [];
    var index;
    if (currentPage * 10 > result.length) {
      index = result.length - (currentPage - 1) * 10;
    } else {
      index = currentPage * 10;
    }
    var start = index >= 10 ? index - 10 : 0 + ((currentPage-1)*10);
    const end = index >= 10 ? 10 : index;

    for (var i = 0; i < end; i++) {
      resultIndex[i] = start;
      start++;
    }

    this.setState({
      currentResult: resultIndex,
      currentPage: currentPage
    });
  };

  onClickPage = state => {
    const { allPage } = this.state;
    var temp = state
      ? this.state.currentPage + 1
      : this.state.currentPage - 1;
    if (temp > allPage[allPage.length - 1]) temp = allPage[allPage.length - 1];
    if (temp < allPage[0]) temp = allPage[0];
    this.setState({
      currentPage: temp
    });
    this.setPage(this.props.result, temp);
  };

  render() {
    const { allPage, currentResult, currentPage } = this.state;
    const { result } = this.props;
    return (
      <div style={{ marginTop: "2rem" }}>
        <label class="label">Result({result.length})</label>
        <table class="table is-fullwidth" style={{ marginTop: "1rem" }}>
          <thead>
            <tr>
              <th></th>
              <th class="has-text-centered">Camera id</th>
              <th class="has-text-centered">Video name</th>
            </tr>
          </thead>
          <tbody>
            {currentResult.map(element => (
              <tr key={result[element].tran_id}>
                <td class="has-text-centered">
                  <input type="checkbox" />
                </td>
                <td class="has-text-centered">{result[element].cam_id}</td>
                <td class="has-text-centered">{result[element].video_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {result.length >= 1 ? (
          <nav
            class="pagination is-centered"
            role="navigation"
            aria-label="pagination"
          >
            <a
              class="pagination-previous"
              onClick={() => this.onClickPage(false)}
            >
              Previous
            </a>
            <a class="pagination-next" onClick={() => this.onClickPage(true)}>
              Next page
            </a>
            <ul class="pagination-list">
              <li>
                <label class="label pagination-link">
                  {currentPage}/{allPage[allPage.length - 1]}
                </label>
              </li>
            </ul>
          </nav>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
