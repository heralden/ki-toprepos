import React from 'react';
import './PageButtons.css';

const PageButtons = ({ page, last, onClick }) => (
  <div className="Button-group">
    <button type="button" id="prev" aria-label="Previous"
      onClick={onClick} disabled={page === 0}>
      &laquo;
    </button>
    <span className="Page">{page + 1}</span>
    <button type="button" id="next" aria-label="Next"
      onClick={onClick} disabled={last}>
      &raquo;
    </button>
  </div>
);

export default PageButtons;
