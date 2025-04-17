import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    location: "",
    sortBy: "",
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const applyFilters = () => {
    // Here you would apply the filters to your data
    console.log("Applying filters:", filters);
    setIsFilterOpen(false);
    // Implementation would depend on how your app manages state
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/">
          <div className="navbar-logo">
            <span className="swipe-text">Swipe</span>
            <span className="mate-text">Mate</span>
          </div>
        </Link>

        <div className="navbar-toggle" onClick={toggleMenu}>
          <span className="menu-icon"></span>
          <span className="menu-icon"></span>
          <span className="menu-icon"></span>
        </div>

        <ul className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <li
            className={`navbar-item ${
              router.pathname === "/home" ? "active" : ""
            }`}
          >
            <Link href="/home">
              <div className="navbar-link">Home</div>
            </Link>
          </li>
          <li
            className={`navbar-item ${
              router.pathname === "/favorites" ? "active" : ""
            }`}
          >
            <Link href="/favorites">
              <div className="navbar-link">Favorites</div>
            </Link>
          </li>
          <li
            className={`navbar-item ${
              router.pathname === "/profile" ? "active" : ""
            }`}
          >
            <Link href="/profile">
              <div className="navbar-link">Profile</div>
            </Link>
          </li>
          <li className="navbar-item filter-item">
            <div className="navbar-link" onClick={toggleFilter}>
              Filter
            </div>
          </li>
        </ul>
      </div>

      {isFilterOpen && (
        <div className="filter-dropdown">
          <div className="filter-content">
            <div className="filter-header">
              <h3>Filter Options</h3>
              <button className="close-button" onClick={toggleFilter}>
                ✕
              </button>
            </div>

            <div className="filter-section">
              <label>Location</label>
              <select
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
              >
                <option value="">Select Location</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
              </select>
            </div>

            <div className="filter-section">
              <label>Sort By</label>
              <div className="sort-options">
                <button
                  className={`sort-button ${
                    filters.sortBy === "price-asc" ? "active" : ""
                  }`}
                  onClick={() =>
                    handleFilterChange({
                      target: { name: "sortBy", value: "price-asc" },
                    })
                  }
                >
                  Price: Low to High
                </button>
                <button
                  className={`sort-button ${
                    filters.sortBy === "price-desc" ? "active" : ""
                  }`}
                  onClick={() =>
                    handleFilterChange({
                      target: { name: "sortBy", value: "price-desc" },
                    })
                  }
                >
                  Price: High to Low
                </button>
                <button
                  className={`sort-button ${
                    filters.sortBy === "rating" ? "active" : ""
                  }`}
                  onClick={() =>
                    handleFilterChange({
                      target: { name: "sortBy", value: "rating" },
                    })
                  }
                >
                  Highest Rating
                </button>
              </div>
            </div>

            <div className="filter-actions">
              <button className="apply-button" onClick={applyFilters}>
                Apply Filters
              </button>
              <button
                className="reset-button"
                onClick={() => setFilters({ location: "", sortBy: "" })}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
