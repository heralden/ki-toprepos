import React, { Component } from 'react';
import './App.css';
import ItemList from './ItemList';
import PageButtons from './PageButtons';

const ITEMS_PER_PAGE = 20;
const reqUrl = "https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&per_page=100";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      page: 0
    };
  }

  componentDidMount() {
    fetch(reqUrl).then(res => {
      if (res.ok) return res.json();
      console.warn("fetch failure", res);
    }).then(json => {
      this.setState({ repos: json.items });
    }).catch(ex =>
      console.warn("fetch exception", ex)
    )
  }

  handleClick = e => {
    let dir = e.target.id, target;
    if (dir === "prev")
      target = this.state.page - 1;
    else if (dir === "next")
      target = this.state.page + 1;

    this.setState(
      { page: target },
      () => window.scrollTo(0, 0)
    );
  }

  render() {
    let items = paginate(
      this.state.repos, 
      ITEMS_PER_PAGE, 
      this.state.page
    );

    let last = isLastPage(
      this.state.repos.length,
      ITEMS_PER_PAGE,
      this.state.page
    );

    return (
      <div className="App">
        <h1 className="App-title">
          Top GitHub JavaScript Repositories
        </h1>
        {this.state.repos.length ? (
          <div>
            <ItemList 
              items={items} 
            />
            <PageButtons 
              page={this.state.page} 
              last={last}
              onClick={this.handleClick}
            />
          </div>
          ) : <div className="App-loader"/>}
      </div>
    );
  }
}

export default App;

/* Returns new array with itemCount elements, counting 
 * from index number pageNumber * itemCount. */
const paginate = (arr, itemCount, pageNumber) => 
  arr.filter((e, i) =>
    i >= itemCount * pageNumber && 
    i < itemCount * (pageNumber + 1)
  )

const isLastPage = (totalItems, itemCount, pageNumber) =>
  totalItems <= itemCount * (pageNumber + 1)
