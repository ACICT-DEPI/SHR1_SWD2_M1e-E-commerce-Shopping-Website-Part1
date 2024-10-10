
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ImageSlider = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/carousels'); // Updated API endpoint
        const data = await response.json();

        if (data.status === 'success') {
          setSlides(data.data.carousels); // Set the slides from the fetched data
        }
      } catch (error) {
        console.error('Error fetching slides:', error);
      }
    };

    fetchSlides();
  }, []);

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
  }, [slides]);

  return (
    <div
      className="slider-container"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '100vw',
        margin: '0 auto',
        overflow: 'hidden',
      }}
    >
      {slides.map((slide, index) => (
        <motion.div
          key={slide._id} // Use unique id from the slide
          className={`slide ${index === currentIndex ? 'active' : ''}`}
          initial={{ opacity: 0, x: 100 }}
          animate={{
            opacity: index === currentIndex ? 1 : 0,
            x: index === currentIndex ? 0 : (index < currentIndex ? -100 : 100),
          }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          style={{
            display: index === currentIndex ? 'block' : 'none',
            position: 'relative',
          }}
        >
          <img
            src={slide.image.url} // Use the correct image URL
            alt={`slide-${index}`}
            style={{
              width: '100%',
              height: '100vh',
              objectFit: 'cover',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              zIndex: 1,
            }}
          />
          <div
            className="slide-content"
            style={{
              position: 'absolute',
              bottom: '5%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'black',
              textAlign: 'center',
              width: '100%',
              maxWidth: '600px',
              zIndex: 2,
            }}
          >
            <h1
              style={{
                fontSize: '2.2rem',
                fontWeight: 'bold',
                color: '#fff',
              }}
            >
              {slide.title} {/* Use the slide title */}
            </h1>
            <h2
              style={{
                fontSize: '1.7rem',
                color: '#fff',
                textShadow: '3px 3px 4px rgba(0, 0, 0, 0.5)',
                marginBottom: '80px',
              }}
            >
              {slide.description} {/* Use the slide description */}
            </h2>
            <a
              href="/product"
              style={{
                display: 'block',
                margin: '0 auto',
                padding: '15px 100px',
                fontSize: '1.7rem',
                color: 'black',
                backgroundColor: 'white',
                borderRadius: '10px',
                width: 'fit-content',
                minWidth: '150px',
                textAlign: 'center',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'lightgray')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
            >
              {slide.buttonText}
            </a>
          </div>
        </motion.div>
      ))}
      <div
        className="bullet-container"
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '10px',
          zIndex: 2,
        }}
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              width: '25px',
              height: '20px',
              borderRadius: '50%',
              border: '3px solid lightgray',
              backgroundColor: index === currentIndex ? 'white' : 'transparent',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>
      <style>
        {`
          @media (max-width: 768px) {
            .slider-container img {
              height: 50vh;
            }
            .slide-content h1 {
              font-size: 1.5rem;
            }
            .slide-content button {
              font-size: 0.9rem;
              padding: 8px 16px;
            }
          }

          @media (max-width: 480px) {
            .slider-container img {
              height: 40vh;
            }
            .slide-content h1 {
              font-size: 1.2rem;
            }
            .slide-content button {
              font-size: 0.8rem;
              padding: 6px 12px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ImageSlider;
