import React, { useState } from 'react'

function App() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [compressedImage, setCompressedImage] = useState(null)
  const [originalSize, setOriginalSize] = useState(0)
  const [compressedSize, setCompressedSize] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setOriginalSize(file.size)
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target.result)
        compressImage(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const compressImage = (imageData) => {
    setIsLoading(true)
    const img = new Image()
    img.src = imageData
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      // Set canvas dimensions to half of the original image
      canvas.width = img.width / 2
      canvas.height = img.height / 2

      // Draw the image on canvas with reduced size
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      // Convert to base64 with reduced quality
      const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.5)
      setCompressedImage(compressedDataUrl)

      // Calculate compressed size
      const base64String = compressedDataUrl.split(',')[1]
      const compressedBytes = atob(base64String).length
      setCompressedSize(compressedBytes)
      setIsLoading(false)
    }
  }

  const downloadImage = () => {
    if (compressedImage) {
      const link = document.createElement('a')
      link.href = compressedImage
      link.download = 'compressed-image.jpg'
      link.click()
    }
  }

  return (
    <div className="app">
      <h1>Image Compressor</h1>
      <p>Upload an image to compress it by half</p>

      <div className="upload-container">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          id="imageInput"
          className="file-input"
        />
        <label htmlFor="imageInput" className="upload-label">
          {!selectedImage ? (
            <div className="upload-placeholder">
              <span>Click to upload or drag and drop</span>
              <span className="upload-hint">Supports: JPG, PNG, WebP</span>
            </div>
          ) : (
            <img src={selectedImage} alt="Original" className="preview-image" />
          )}
        </label>
      </div>

      {isLoading && <div className="loading">Compressing image...</div>}

      {compressedImage && !isLoading && (
        <div className="result-container">
          <div className="image-comparison">
            <div className="image-box">
              <h3>Original</h3>
              <img src={selectedImage} alt="Original" className="preview-image" />
              <p>Size: {(originalSize / 1024).toFixed(2)} KB</p>
            </div>
            <div className="image-box">
              <h3>Compressed</h3>
              <img src={compressedImage} alt="Compressed" className="preview-image" />
              <p>Size: {(compressedSize / 1024).toFixed(2)} KB</p>
            </div>
          </div>
          <div className="compression-stats">
            <p>Compression Ratio: {((1 - compressedSize / originalSize) * 100).toFixed(2)}%</p>
            <button onClick={downloadImage} className="download-button">
              Download Compressed Image
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App