import { useState, useRef, useEffect, forwardRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PropertyCard = forwardRef(
  ({ property, onSwipeLeft, onSwipeRight }, ref) => {
    const cardRef = useRef(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
      if (ref) {
        ref.current = {
          swipeLeft: () => onSwipeLeft(property.id),
          swipeRight: () => onSwipeRight(property.id),
        };
      }
    }, [ref, property.id, onSwipeLeft, onSwipeRight]);

    const handlePrevImage = (e) => {
      e.stopPropagation();
      e.preventDefault();
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? (property.images?.length || 1) - 1 : prevIndex - 1
      );
    };

    const handleNextImage = (e) => {
      e.stopPropagation();
      e.preventDefault();
      setCurrentImageIndex((prevIndex) =>
        prevIndex === (property.images?.length || 1) - 1 ? 0 : prevIndex + 1
      );
    };

    const displayImage = property.images?.[currentImageIndex] || property.image;

    return (
      <div className="card-stack">
        <div
          ref={cardRef}
          className="property-card"
          style={{ borderTop: `4px solid ${property.color}` }}
        >
          <div className="property-image-container">
            <div
              className="property-image"
              style={{
                backgroundImage: `url(${displayImage})`,
                backgroundColor: property.color,
              }}
            >
              <div className="property-gradient"></div>
              <div className="property-price">{property.price}</div>

              {property.images && property.images.length > 1 && (
                <div className="image-navigation">
                  <button
                    className="nav-button prev-button"
                    onClick={handlePrevImage}
                    aria-label="Previous image"
                  >
                    <FaChevronLeft />
                  </button>
                  <div className="image-indicators">
                    {property.images.map((_, index) => (
                      <span
                        key={index}
                        className={`indicator ${
                          index === currentImageIndex ? "active" : ""
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    className="nav-button next-button"
                    onClick={handleNextImage}
                    aria-label="Next image"
                  >
                    <FaChevronRight />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="property-details">
            <h3 className="property-title">{property.title}</h3>
            <div className="property-info">
              <span className="property-location">📍 {property.location}</span>
              <span className="property-bedrooms">
                🛏️ {property.bedrooms} BHK
              </span>
            </div>
            <div className="property-type">{property.type}</div>
          </div>
        </div>
      </div>
    );
  }
);

PropertyCard.displayName = "PropertyCard";

export default PropertyCard;
