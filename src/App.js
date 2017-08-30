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
    }).then(json => this.setState(prevState => ({
      repos: prevState.repos.concat({
        full_name: json.full_name,
        html_url: json.html_url,
        description: json.description,
        created_at: json.created_at,
        updated_at: json.updated_at,
        size: json.size, // Git Repo size in KB
        stargazers_count: json.stargazers_count,
      })
    }))).catch(ex =>
      console.warn("fetch exception", ex)
    )
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
        <ItemList 
          items={items} 
        />
        <PageButtons 
          page={this.state.page} 
          last={last}
        />
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
