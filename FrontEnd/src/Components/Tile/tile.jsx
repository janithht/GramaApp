import React from 'react';

import './tile.css';

const Tile = ({ text, image, onClick }) => {
    return (
      <div className="dashboard-tile" onClick={onClick}>
        <div className="tile-content">
          {image && <div className="tile-image"><img src={image} alt={text} /></div>}
          <div className="tile-text">{text}</div>
        </div>
      </div>
    );
  };
  
  export default Tile;