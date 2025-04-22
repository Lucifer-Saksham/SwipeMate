import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import {
  FaArrowLeft,
  FaTrash,
  FaBed,
  FaMapMarkerAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

export default function Favorites() {
  const [likedProperties, setLikedProperties] = useState([]);
  const [currentImageIndices, setCurrentImageIndices] = useState({});
  const router = useRouter();

  useEffect(() => {
    const storedLikedProperties = localStorage.getItem("likedProperties");
    if (storedLikedProperties) {
      try {
        const parsed = JSON.parse(storedLikedProperties);
        const properties = Array.isArray(parsed) ? parsed : [];
        const propertiesWithImages = properties.map((property) => {
          if (!property.images) {
            property.images = [
              `/assets/properties/property${property.id}/img1.jpg`,
              `/assets/properties/property${property.id}/img2.jpg`,
              `/assets/properties/property${property.id}/img3.jpg`,
            ];
          }
          return property;
        });

        setLikedProperties(propertiesWithImages);
        const imageIndices = {};
        propertiesWithImages.forEach((property) => {
          imageIndices[property.id] = 0;
        });

        setCurrentImageIndices(imageIndices);
      } catch (e) {
        console.error("Error parsing liked properties:", e);
        setLikedProperties([]);
      }
    }
  }, []);

  const removeProperty = (id) => {
    const updatedProperties = likedProperties.filter(
      (property) => property.id !== id
    );
    setLikedProperties(updatedProperties);
    localStorage.setItem("likedProperties", JSON.stringify(updatedProperties));
    const updatedIndices = { ...currentImageIndices };
    delete updatedIndices[id];
    setCurrentImageIndices(updatedIndices);
  };

  const clearAllFavorites = () => {
    setLikedProperties([]);
    setCurrentImageIndices({});
    localStorage.removeItem("likedProperties");
  };

  const handlePrevImage = (id, e) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndices((prev) => {
      const currentIndex = prev[id] || 0;
      const property = likedProperties.find((p) => p.id === id);
      const imagesCount = property?.images?.length || 1;
      return {
        ...prev,
        [id]: currentIndex === 0 ? imagesCount - 1 : currentIndex - 1,
      };
    });
  };

  const handleNextImage = (id, e) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndices((prev) => {
      const currentIndex = prev[id] || 0;
      const property = likedProperties.find((p) => p.id === id);
      const imagesCount = property?.images?.length || 1;
      return {
        ...prev,
        [id]: currentIndex === imagesCount - 1 ? 0 : currentIndex + 1,
      };
    });
  };

  const getCurrentImage = (property) => {
    if (!property) return "";
    if (!property.images || property.images.length === 0) return property.image;

    const index = currentImageIndices[property.id] || 0;
    return property.images[index];
  };

  return (
    <div className="favorites-container">
      <Head>
        <title>SwipeMate - Your Favorite Properties</title>
        <meta name="description" content="View your favorite properties" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="main-content">
        <div className="header">
          <h1 className="page-title">Your Liked Properties</h1>
          <div className="buttons-container">
            {likedProperties.length > 0 && (
              <button className="clear-button" onClick={clearAllFavorites}>
                <FaTrash style={{ marginRight: "0.5rem" }} /> Clear All
              </button>
            )}
            <button
              className="browse-button"
              onClick={() => router.push("/home")}
            >
              <FaArrowLeft style={{ marginRight: "0.5rem" }} /> Continue
              Browsing
            </button>
          </div>
        </div>

        {likedProperties.length === 0 ? (
          <div className="no-properties">
            <h2>No Liked Properties Yet</h2>
            <p>Start swiping right on properties you like!</p>
            <button
              className="start-button"
              onClick={() => router.push("/home")}
            >
              Start Browsing{" "}
              <FaArrowLeft
                style={{ marginLeft: "0.5rem", transform: "rotate(180deg)" }}
              />
            </button>
          </div>
        ) : (
          <div className="properties-grid">
            {likedProperties.map((property) => (
              <div key={property.id} className="property-card">
                <div
                  className={`property-header ${property.type.toLowerCase()}`}
                ></div>
                <div className="property-content">
                  <div className="property-image-container">
                    <div
                      className="property-image"
                      style={{
                        backgroundImage: `url(${getCurrentImage(property)})`,
                      }}
                    >
                      <div className="property-price">{property.price}</div>

                      <button
                        className="remove-icon-button"
                        onClick={() => removeProperty(property.id)}
                        aria-label="Remove from favorites"
                      >
                        <FaTrash />
                      </button>

                      {property.images && property.images.length > 1 && (
                        <div className="image-navigation">
                          <button
                            className="nav-button prev-button"
                            onClick={(e) => handlePrevImage(property.id, e)}
                            aria-label="Previous image"
                          >
                            <FaChevronLeft />
                          </button>
                          <div className="image-indicators">
                            {property.images.map((_, index) => (
                              <span
                                key={index}
                                className={`indicator ${
                                  index === currentImageIndices[property.id]
                                    ? "active"
                                    : ""
                                }`}
                              />
                            ))}
                          </div>
                          <button
                            className="nav-button next-button"
                            onClick={(e) => handleNextImage(property.id, e)}
                            aria-label="Next image"
                          >
                            <FaChevronRight />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <h3 className="property-title">
                    {property.title ||
                      `${property.type} in ${property.location}`}
                  </h3>

                  <div className="property-address">
                    <FaMapMarkerAlt style={{ marginRight: "5px" }} />
                    {property.location}
                  </div>

                  <div
                    className={`property-type ${property.type.toLowerCase()}`}
                  >
                    {property.type}
                  </div>

                  <div className="property-details">
                    <div className="property-detail">
                      <FaBed /> {property.bedrooms} Bedrooms
                    </div>
                  </div>

                  <div className="property-footer">
                    <button
                      className="remove-button"
                      onClick={() => removeProperty(property.id)}
                    >
                      <FaTrash style={{ marginRight: "4px" }} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
