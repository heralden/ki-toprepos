import React, { Component } from 'react';
import './ItemList.css';

const ItemList = ({ items }) => (
  <ul>
    {items.map((e, i) => 
      <Item data={e} key={i} />
    )}
  </ul>
);

export default ItemList;

const Item = ({ data }) => (
  <li className="Item">
    <a className="Item-name" href={data.html_url}> 
      {data.full_name}
    </a>
    <span className="Item-stars">{data.stargazers_count}</span>
    <span className="Item-size">{data.size}</span>
    <span className="Item-created">{data.created_at}</span>
    <span className="Item-updated">{data.updated_at}</span>
    <p className="Item-desc">{data.description}</p>
  </li>
);
