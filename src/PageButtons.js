import React, { Component } from 'react';
import './PageButtons.css';

const PageButtons = ({ page, last }) => (
  <div className="Button-group">
    <button type="button" 
      className={page === 0 ? "Button-back Button-disabled" : "Button-back"}>
      «
    </button>
    <span className="Current-page">{page + 1}</span>
    <button type="button" 
      className={last ? "Button-next Button-disabled" : "Button-next"}>
      »
    </button>
  </div>
);

export default PageButtons;
