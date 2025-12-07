import React, { useState, useRef } from 'react';
import { FaCloudUploadAlt, FaTrash } from 'react-icons/fa';

const ImageUpload = ({ onImageChange, previewUrl, error }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (file) => {
    // Check if file is an image
    if (file && file.type.match('image.*')) {
      onImageChange(file);
    } else {
      // Handle invalid file type
      console.error('Please select a valid image file');
    }
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="image-upload-container">
      {previewUrl ? (
        <div className="image-preview-container">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="image-preview"
          />
          <button 
            className="remove-image-btn"
            onClick={handleRemoveImage}
          >
            <FaTrash />
          </button>
        </div>
      ) : (
        <div
          className={`upload-area ${isDragging ? 'dragging' : ''} ${error ? 'error' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <FaCloudUploadAlt className="upload-icon" />
          <p className="upload-text">
            Drag and drop an image here, or click to select
          </p>
          <p className="upload-subtext">
            Supported formats: JPG, PNG, GIF
          </p>
          <button
            className="upload-button"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
          >
            <FaCloudUploadAlt /> Upload Image
          </button>
          <input 
            type="file" 
            accept="image/*"
            onChange={handleInputChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
        </div>
      )}
      
      {error && (
        <p className="error-text">{error}</p>
      )}

      <style jsx>{`
        .image-upload-container {
          width: 100%;
        }
        
        .image-preview-container {
          position: relative;
          margin-bottom: 16px;
        }
        
        .image-preview {
          width: 100%;
          height: auto;
          border-radius: 4px;
          max-height: 200px;
          object-fit: cover;
        }
        
        .remove-image-btn {
          position: absolute;
          top: 8px;
          right: 8px;
          background-color: rgba(0,0,0,0.5);
          color: white;
          border: none;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        
        .remove-image-btn:hover {
          background-color: rgba(0,0,0,0.7);
        }
        
        .upload-area {
          border: 2px dashed #ccc;
          border-radius: 4px;
          padding: 24px;
          text-align: center;
          background-color: transparent;
          transition: all 0.2s ease;
          cursor: pointer;
          margin-bottom: 16px;
        }
        
        .upload-area.dragging {
          border-color: #1976d2;
          background-color: rgba(25, 118, 210, 0.04);
        }
        
        .upload-area.error {
          border-color: #d32f2f;
        }
        
        .upload-icon {
          font-size: 40px;
          color: #999;
          margin-bottom: 8px;
        }
        
        .upload-area.dragging .upload-icon {
          color: #1976d2;
        }
        
        .upload-text {
          font-size: 16px;
          margin-bottom: 8px;
        }
        
        .upload-subtext {
          font-size: 14px;
          color: #666;
          margin-bottom: 16px;
        }
        
        .upload-button {
          background-color: #1976d2;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 8px 16px;
          font-size: 14px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        
        .upload-button:hover {
          background-color: #1565c0;
        }
        
        .error-text {
          color: #d32f2f;
          font-size: 12px;
          margin-top: 4px;
        }
      `}</style>
    </div>
  );
};

export default ImageUpload; 