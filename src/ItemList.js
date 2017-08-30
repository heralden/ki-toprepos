import React from 'react';
import './ItemList.css';

const ItemList = ({ items }) => (
  <div className="Item-list">
    {items.map((e, i) => 
      <Item data={e} key={i} />
    )}
  </div>
);

export default ItemList;

const Item = ({ data }) => (
  <div className="Item">
    <a className="Item-name" href={data.html_url}> 
      {data.full_name}
    </a>
    <span className="Item-stars">★ {data.stargazers_count}</span>
    <span className="Item-created">{onlyDate(data.created_at)}</span>
    <span className="Item-size">{data.size} KB</span>
    <br/>
    <p className="Item-desc">{data.description}</p>
  </div>
);

const onlyDate = str => str.slice(0,10)
