import React from 'react';
import { X } from 'lucide-react';
import './BirdDetail.css';

const BirdDetail = ({ bird, onClose }) => {
  return (
    <div className="bird-detail">
      <button onClick={onClose} className="back-button">
        <X size={16} />
        Back to Grid
      </button>
      
      <div className="bird-detail-content">
        <div className="bird-detail-grid">
          <div className="bird-image-section">
            <img
              src={bird.image.replace('80', '400')}
              alt={bird.name}
              className="bird-detail-image"
            />
          </div>
          <div className="bird-info-section">
            <h1 className="bird-title">{bird.name}</h1>
            <p className="bird-scientific-name">{bird.species}</p>
            
            <div className="bird-details">
              <div className="detail-item">
                <h3>Habitat</h3>
                <p>{bird.habitat}</p>
              </div>
              
              <div className="detail-item">
                <h3>Diet</h3>
                <p>{bird.diet}</p>
              </div>
              
              <div className="detail-description">
                <p>
                  This beautiful bird is known for its distinctive appearance and behavior. 
                  Click the back button to return to the grid and explore more birds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirdDetail;