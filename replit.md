# Overview

Trendqash Agencies is a Kenyan online earning platform website that promotes daily income opportunities through smartphone and laptop activities. The website is built as a static frontend application showcasing multiple earning platforms (TrendQash, Trenqash) with features like video watching, quiz answering, ad clicking, and referral programs. The platform targets users across Africa looking to generate income through digital activities, with claims of earning Ksh 700-1000 daily.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Technology Stack**: Pure HTML5, CSS3, and vanilla JavaScript
- **Design Pattern**: Static website with component-based styling and multiple page structure
- **Responsive Design**: Mobile-first approach using CSS media queries and flexbox layouts
- **Navigation**: Multi-page application with consistent navigation across pages (index.html, trendqash.html, trenqash.html, page2.html, page3.html)
- **Styling Strategy**: CSS custom properties for consistent theming with turquoise and gold gradient color schemes

## UI/UX Design Principles
- **Typography**: Google Fonts Inter family for modern, readable text across all weights (300-800)
- **Icons**: Font Awesome 6.4.0 for consistent iconography throughout the platform
- **Color Scheme**: Primary gradients using CSS custom properties with purple (#4b0082) and pink (#e91e63) themes
- **Layout**: Flexbox and CSS Grid for responsive layouts with max-width containers (1200px, 800px)
- **Interactive Elements**: Smooth transitions, hover effects, and mobile-friendly navigation with dark mode toggle

## Component Structure
- **Header System**: Consistent main header with title and description across all pages
- **Navigation Bar**: Sticky navigation with active page highlighting and registration CTA button
- **Content Sections**: Top stories slider, hero sections, and blog post layouts
- **Story Cards**: Interactive cards with read-more functionality and click animations

## JavaScript Architecture
- **Utility Functions**: Custom DOM helpers (`$` and `$$` functions) for efficient element selection
- **Event Handling**: Modern addEventListener patterns for user interactions
- **Animation Control**: Story slider with pause/play functionality and animation state management
- **Dark Mode**: Toggle functionality with CSS filter inversion and icon state changes
- **Performance**: Lightweight vanilla JavaScript approach avoiding framework dependencies

## Development Environment
- **Build Tools**: Node.js with http-server for local development server
- **Package Management**: NPM with minimal dependencies (only http-server)
- **File Organization**: Separate HTML pages for different platform sections with shared CSS and JavaScript
- **Deployment Ready**: Static files optimized for any web hosting platform

# External Dependencies

## CDN Resources
- **Google Fonts API**: Inter font family (weights 300-800) for consistent typography
- **Font Awesome CDN**: Version 6.4.0 for comprehensive icon library

## Development Dependencies
- **http-server**: Version 14.1.1 for local development server
- **Node.js**: Runtime environment for development tooling and package management

## Third-party Integrations
- **Content Management**: References to external WordPress-based content (trendqash.org)
- **No Authentication**: Currently no user authentication or database systems implemented
- **No APIs**: No external API integrations for dynamic content or user management
- **Static Hosting Ready**: Designed for deployment on static hosting platforms without server-side requirements