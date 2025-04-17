import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import PropertyCard from "../components/PropertyCard";
import { useRouter } from "next/router";

// Sample data for properties
const propertyData = [
  {
    id: 1,
    title: "Modern Apartment with Garden View",
    location: "Mumbai",
    price: "₹ 42,000/month",
    bedrooms: 2,
    type: "Apartment",
    image: "/assets/properties/property1.jpg",
    images: [
      "/assets/properties/property1/img1.jpg",
      "/assets/properties/property1/img2.jpg",
      "/assets/properties/property1/img3.jpg",
    ],
    color: "#ef4444",
    rating: 4.7,
  },
  {
    id: 2,
    title: "Luxurious White Villa with Pool",
    location: "Delhi",
    price: "₹ 58,000/month",
    bedrooms: 4,
    type: "Villa",
    image: "/assets/properties/property2.jpg",
    images: [
      "/assets/properties/property2/img1.jpg",
      "/assets/properties/property2/img2.jpg",
      "/assets/properties/property2/img3.jpg",
    ],
    color: "#f59e0b",
    rating: 4.9,
  },
  {
    id: 3,
    title: "Modern Interior Apartment",
    location: "Bangalore",
    price: "₹ 35,000/month",
    bedrooms: 2,
    type: "Apartment",
    image: "/assets/properties/property3.jpg",
    images: [
      "/assets/properties/property3/img1.jpg",
      "/assets/properties/property3/img2.jpg",
      "/assets/properties/property3/img3.jpg",
    ],
    color: "#4ade80",
    rating: 4.5,
  },
  {
    id: 4,
    title: "Elegant House with Spacious Yard",
    location: "Delhi",
    price: "₹ 62,000/month",
    bedrooms: 3,
    type: "House",
    image: "/assets/properties/property4.jpg",
    images: [
      "/assets/properties/property4/img1.jpg",
      "/assets/properties/property4/img2.jpg",
      "/assets/properties/property4/img3.jpg",
    ],
    color: "#3b82f6",
    rating: 4.8,
  },
  {
    id: 5,
    title: "Contemporary Hillside Residence",
    location: "Mumbai",
    price: "₹ 85,000/month",
    bedrooms: 4,
    type: "Villa",
    image: "/assets/properties/property5.jpg",
    images: [
      "/assets/properties/property5/img1.jpg",
      "/assets/properties/property5/img2.jpg",
      "/assets/properties/property5/img3.jpg",
    ],
    color: "#8b5cf6",
    rating: 4.6,
  },
  {
    id: 6,
    title: "Urban Luxury Home with City View",
    location: "Bangalore",
    price: "₹ 72,000/month",
    bedrooms: 3,
    type: "Villa",
    image: "/assets/properties/property6.jpg",
    images: [
      "/assets/properties/property6/img1.jpg",
      "/assets/properties/property6/img2.jpg",
      "/assets/properties/property6/img3.jpg",
    ],
    color: "#ec4899",
    rating: 4.3,
  },
  {
    id: 7,
    title: "Cozy Studio Apartment",
    location: "Mumbai",
    price: "₹ 28,000/month",
    bedrooms: 1,
    type: "Studio",
    image: "/assets/properties/property1.jpg",
    images: [
      "/assets/properties/property1/img1.jpg",
      "/assets/properties/property1/img2.jpg",
      "/assets/properties/property1/img3.jpg",
    ],
    color: "#06b6d4",
    rating: 4.2,
  },
  {
    id: 8,
    title: "Family Home with Garden",
    location: "Delhi",
    price: "₹ 48,000/month",
    bedrooms: 3,
    type: "House",
    image: "/assets/properties/property3.jpg",
    images: [
      "/assets/properties/property3/img1.jpg",
      "/assets/properties/property3/img2.jpg",
      "/assets/properties/property3/img3.jpg",
    ],
    color: "#14b8a6",
    rating: 4.4,
  },
  {
    id: 9,
    title: "Tech Park Adjacent Apartment",
    location: "Bangalore",
    price: "₹ 39,000/month",
    bedrooms: 2,
    type: "Apartment",
    image: "/assets/properties/property5.jpg",
    images: [
      "/assets/properties/property5/img1.jpg",
      "/assets/properties/property5/img2.jpg",
      "/assets/properties/property5/img3.jpg",
    ],
    color: "#a855f7",
    rating: 4.1,
  },
];

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedProperties, setLikedProperties] = useState([]);
  const [noMoreProperties, setNoMoreProperties] = useState(false);
  const cardRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    // Initialize properties
    setProperties(propertyData);

    // Load liked properties from localStorage if available
    const storedLikedProperties = localStorage.getItem("likedProperties");
    if (storedLikedProperties) {
      setLikedProperties(JSON.parse(storedLikedProperties));
    }
  }, []);

  // Save liked properties to localStorage whenever it changes
  useEffect(() => {
    if (likedProperties.length > 0) {
      localStorage.setItem("likedProperties", JSON.stringify(likedProperties));
    } else {
      localStorage.removeItem("likedProperties");
    }
  }, [likedProperties]);

  const handleSwipeLeft = (id) => {
    // Go to next property
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      if (newIndex >= properties.length) {
        setNoMoreProperties(true);
      }
      return newIndex;
    });
  };

  const handleSwipeRight = (id) => {
    // Add the property to liked properties
    const likedProperty = properties.find((property) => property.id === id);
    if (likedProperty) {
      // Check if the property is already in liked properties to prevent duplicates
      const isDuplicate = likedProperties.some(
        (property) => property.id === id
      );
      if (!isDuplicate) {
        setLikedProperties((prev) => [...prev, likedProperty]);
      }
    }

    // Go to next property
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      if (newIndex >= properties.length) {
        setNoMoreProperties(true);
      }
      return newIndex;
    });
  };

  const resetBrowsing = () => {
    setCurrentIndex(0);
    setNoMoreProperties(false);
  };

  const goToFavorites = () => {
    router.push("/favorites");
  };

  return (
    <div className="home-container">
      <Head>
        <title>SwipeMate - Browse Properties</title>
        <meta
          name="description"
          content="Browse and swipe through available properties"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="main-content">
        <div className="content-wrapper">
          <div className="card-container">
            {noMoreProperties ? (
              <div className="no-more-properties">
                <h2>No More Properties</h2>
                <p>You've seen all available properties.</p>
                <div className="no-more-buttons">
                  <button className="reset-button" onClick={resetBrowsing}>
                    Start Again
                  </button>
                  <button className="favorites-button" onClick={goToFavorites}>
                    View Favorites
                  </button>
                </div>
              </div>
            ) : (
              properties.length > 0 &&
              currentIndex < properties.length && (
                <div className="property-card-wrapper">
                  <PropertyCard
                    ref={cardRef}
                    property={properties[currentIndex]}
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                  />
                </div>
              )
            )}
          </div>

          <div className="swipe-controls">
            <button
              className="swipe-button dislike"
              onClick={() => handleSwipeLeft(properties[currentIndex]?.id)}
              disabled={noMoreProperties}
            >
              Skip
            </button>
            <button
              className="swipe-button like"
              onClick={() => handleSwipeRight(properties[currentIndex]?.id)}
              disabled={noMoreProperties}
            >
              Like
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
