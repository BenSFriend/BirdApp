import React from 'react';

const ViewToggle = ({ currentView, onToggle }) => {
  return (
    <button onClick={onToggle} className="view-toggle">
      {currentView === 'gallery' ? 'Switch to List' : 'Switch to Gallery'}
    </button>
  );
};

export default ViewToggle;