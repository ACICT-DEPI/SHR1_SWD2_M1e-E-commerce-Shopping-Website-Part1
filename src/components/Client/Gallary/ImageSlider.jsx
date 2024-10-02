import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const ImageSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="slider-container"
      style={{
        position: 'relative',
        width: '100vw', 
        margin: '0 auto',
        overflow: 'hidden', 
      }}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === currentIndex ? 'active' : ''}`}
          style={{
            display: index === currentIndex ? 'block' : 'none',
            position: 'relative',
          }}
        >
          <img
            src={slide.image}
            alt={`slide-${index}`}
            style={{
              width: '100vw', 
              height: '70vh', 
              objectFit: 'fill',
            }}
          />
          <div
            className="slide-content"
            style={{
              position: 'absolute',
             bottom: '5%',
              left: '25%',
              color: 'black',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
            }}
          >
        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: 'bold', 
          color: '#fff', 
          textAlign: 'center', 
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
           }}
           >
        Find what you want in our E-commerc site
        </h1>
        <button
      style={{
        display: 'block',
        margin: '70px auto',
        padding: '10px 20px',
        fontSize: '20px',
        color: 'white',
        backgroundColor: 'gray',
        border: 'none',
        cursor: 'pointer',
      }}
      onClick={() => navigate('/product')}
    >
      {slide.buttonText}
    </button>

          </div>
        </div>
      ))}
      <button
        onClick={prevSlide}
        style={{
          position: 'absolute',
          top: '50%',
          left: '10px',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          fontSize: '24px',
          padding: '10px',
        }}
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        style={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          fontSize: '24px',
          padding: '10px',
        }}
      >
        ❯
      </button>
    </div>
  );
};

export default ImageSlider;
