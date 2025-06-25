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
              src={bird.img_url}
              alt={bird.name}
              className="bird-detail-image"
            />
          </div>
          <div className="bird-info-section">
            <h1 className="bird-title">{bird.bird_name}</h1>

            <div className="bird-details">
              <div className="detail-item">
                <h3>Wingspan</h3>
                <p>{bird.wingspan} cm</p>
              </div>
            </div>

            <div className="bird-details">
              <div className="detail-item">
                <h3>Range</h3>
                <p>{bird.range}</p>
              </div>

              <div className="detail-item">
                <h3>Diet</h3>
                <p>{bird.diet}</p>
              </div>

              <div className="detail-item">
                <h3>Description</h3>
                <p>{bird.bird_description}</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirdDetail;