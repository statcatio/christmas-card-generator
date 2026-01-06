import React from 'react';
import '../App.css';

export default function CardPreview({ imageUrl, message, isLoading, fontFamily = 'Georgia, serif' }) {
  return (
    <div className="card-preview-container">
      <div className="card-preview">
        {isLoading ? (
          <div className="card-loading">
            <div className="spinner"></div>
            <p>Generating your magical Christmas card...</p>
          </div>
        ) : imageUrl ? (
          <div className="card-image-wrapper">
            <img
              src={imageUrl}
              alt="Generated Christmas Card"
              className="card-image"
            />
            {/* Watermark overlay */}
            <div className="watermark-overlay">
              <img
                src="https://raw.githubusercontent.com/statcatio/christmas-card-generator/main/public/preview.png"
                alt="watermark"
                className="watermark-image watermark-top-left"
              />
              <img
                src="https://raw.githubusercontent.com/statcatio/christmas-card-generator/main/public/preview.png"
                alt="watermark"
                className="watermark-image watermark-center"
              />
              <img
                src="https://raw.githubusercontent.com/statcatio/christmas-card-generator/main/public/preview.png"
                alt="watermark"
                className="watermark-image watermark-bottom-right"
              />
            </div>
            {message && (
              <div className="card-message-overlay">
                <p className="card-message-text" style={{ fontFamily }}>{message}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="card-placeholder">
            <svg
              className="placeholder-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p>Your Christmas card will appear here</p>
            <p className="placeholder-hint">Enter a prompt and click Generate</p>
          </div>
        )}
      </div>
    </div>
  );
}
