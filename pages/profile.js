import { useState } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";

export default function Profile() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    preferences: {
      location: ["Delhi", "Mumbai", "Bangalore"],
      minBedrooms: 2,
      maxPrice: 50000,
      propertyTypes: ["Apartment", "Villa"],
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempUser, setTempUser] = useState(user);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setTempUser({
      ...tempUser,
      [name]: value,
    });
  };

  const handlePreferenceChange = (e) => {
    const { name, value } = e.target;

    setTempUser({
      ...tempUser,
      preferences: {
        ...tempUser.preferences,
        [name]: value,
      },
    });
  };

  const handleLocationChange = (e, index) => {
    const newLocations = [...tempUser.preferences.location];
    newLocations[index] = e.target.value;

    setTempUser({
      ...tempUser,
      preferences: {
        ...tempUser.preferences,
        location: newLocations,
      },
    });
  };

  const handleAddLocation = () => {
    setTempUser({
      ...tempUser,
      preferences: {
        ...tempUser.preferences,
        location: [...tempUser.preferences.location, ""],
      },
    });
  };

  const handleRemoveLocation = (index) => {
    const newLocations = [...tempUser.preferences.location];
    newLocations.splice(index, 1);

    setTempUser({
      ...tempUser,
      preferences: {
        ...tempUser.preferences,
        location: newLocations,
      },
    });
  };

  const handlePropertyTypeChange = (type) => {
    let newTypes;

    if (tempUser.preferences.propertyTypes.includes(type)) {
      newTypes = tempUser.preferences.propertyTypes.filter((t) => t !== type);
    } else {
      newTypes = [...tempUser.preferences.propertyTypes, type];
    }

    setTempUser({
      ...tempUser,
      preferences: {
        ...tempUser.preferences,
        propertyTypes: newTypes,
      },
    });
  };

  const handleSave = () => {
    setUser(tempUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempUser(user);
    setIsEditing(false);
  };

  const clearFavorites = () => {
    localStorage.removeItem("likedProperties");
    alert("All favorite properties have been cleared");
  };

  const [activeTab, setActiveTab] = useState("personal");

  const getPreferenceValue = (name) => {
    // ... existing code ...
  };

  const handleEditToggle = () => {
    // ... existing code ...
  };

  const [currentTheme, setTheme] = useState("light");

  return (
    <div className="profile-container">
      <Head>
        <title>SwipeMate - Your Profile</title>
        <meta name="description" content="Manage your SwipeMate profile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="main-content">
        <div className="profile-header">
          <h1>Your Profile</h1>
          {!isEditing ? (
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          ) : (
            <div className="edit-controls">
              <button className="save-button" onClick={handleSave}>
                Save
              </button>
              <button className="cancel-button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="profile-card">
          <div className="section">
            <h2>Personal Information</h2>
            <div className="form-group">
              <label>Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={tempUser.name}
                  onChange={handleInputChange}
                />
              ) : (
                <div className="info-value">{user.name}</div>
              )}
            </div>
            <div className="form-group">
              <label>Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={tempUser.email}
                  onChange={handleInputChange}
                />
              ) : (
                <div className="info-value">{user.email}</div>
              )}
            </div>
          </div>
        </div>

        <div className="profile-card">
          <div className="section">
            <h2>Property Preferences</h2>

            <div className="form-group">
              <label>Preferred Locations</label>
              {isEditing ? (
                <div className="location-inputs">
                  {tempUser.preferences.location.map((loc, index) => (
                    <div key={index} className="location-input-group">
                      <input
                        type="text"
                        value={loc}
                        onChange={(e) => handleLocationChange(e, index)}
                      />
                      <button
                        className="remove-btn"
                        onClick={() => handleRemoveLocation(index)}
                        disabled={tempUser.preferences.location.length <= 1}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    className="add-location-btn"
                    onClick={handleAddLocation}
                  >
                    + Add Location
                  </button>
                </div>
              ) : (
                <div className="info-value">
                  {user.preferences.location.join(", ")}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Minimum Bedrooms</label>
              {isEditing ? (
                <select
                  name="minBedrooms"
                  value={tempUser.preferences.minBedrooms}
                  onChange={handlePreferenceChange}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4+</option>
                </select>
              ) : (
                <div className="info-value">{user.preferences.minBedrooms}</div>
              )}
            </div>

            <div className="form-group">
              <label>Maximum Price (₹)</label>
              {isEditing ? (
                <input
                  type="number"
                  name="maxPrice"
                  value={tempUser.preferences.maxPrice}
                  onChange={handlePreferenceChange}
                />
              ) : (
                <div className="info-value">
                  ₹ {user.preferences.maxPrice.toLocaleString()}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Property Types</label>
              {isEditing ? (
                <div className="property-type-checkboxes">
                  {["Apartment", "Villa", "Studio", "Penthouse", "Cottage"].map(
                    (type) => (
                      <div key={type} className="checkbox-group">
                        <input
                          type="checkbox"
                          id={type}
                          checked={tempUser.preferences.propertyTypes.includes(
                            type
                          )}
                          onChange={() => handlePropertyTypeChange(type)}
                        />
                        <label htmlFor={type}>{type}</label>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <div className="info-value">
                  {user.preferences.propertyTypes.join(", ")}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="profile-card contact-section">
          <div className="section">
            <h2>Contact</h2>
            <div className="contact-info">
              <p>© SwipeMate 2025</p>
              <p>Contact: support@swipemate.example.com</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
