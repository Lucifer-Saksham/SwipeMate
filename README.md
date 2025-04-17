# SwipeMate

SwipeMate is a property searching application that allows users to easily find rental properties by swiping through available options. Like a property by swiping right, or skip it by swiping left. A simple, intuitive interface for finding your perfect home.

## Features

- **Swipe Interface**: Intuitive swipe gestures to like or skip properties
- **Favorites Collection**: Keep track of properties you like
- **Profile Settings**: Customize your property preferences
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Next.js**: React framework for server-rendered applications
- **React Hooks**: useState, useEffect, useRef for state management and effects
- **CSS**: Custom CSS with CSS-in-JS styling using styled-jsx
- **CSS Animations**: Custom keyframe animations for swipe effects

## Getting Started

### Prerequisites

- Node.js 14.6.0 or newer
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd swipemate
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
swipemate/
├── components/      # Reusable React components
│   ├── Navbar.js    # Navigation bar component
│   └── PropertyCard.js  # Property card with swipe functionality
├── pages/           # Next.js pages
│   ├── _app.js      # Custom App component
│   ├── favorites.js # Saved properties page
│   ├── home.js      # Main swiping interface
│   ├── index.js     # Landing page
│   ├── login.js     # Authentication page
│   └── profile.js   # User profile settings
├── public/          # Static assets
│   └── ...
├── styles/          # Global styles
│   └── globals.css  # Global CSS styles
├── package.json     # Project dependencies and scripts
└── README.md        # Project documentation
```

## Usage

1. Visit the landing page to get started
2. Navigate to the Home page to start browsing properties
3. Swipe right on properties you like, left on ones you want to skip
4. Check your Favorites page to see properties you've liked
5. Use the Profile page to update your preferences

## Demo

Sample demo account:

- Email: demo@swipemate.com
- Password: demo123

## License

This project is licensed under the MIT License.
