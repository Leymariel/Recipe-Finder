# README

## Student Information

- **Name**: Lawrence Leymarie
- **Email**: [leymarie@chapman.edu](mailto:leymarie@chapman.edu)
- **Student ID**: 2370408

## Design Principles of the Site
Color Palette: The site employs an inviting color palette that includes shades of green, white, and gray. Green evokes feelings of freshness and vitality, suitable for a recipe-focused site, while white and gray provide a clean and modern background that enhances readability.

**Fonts**: The site uses a combination of sans-serif fonts for body text and headings. The primary font is "Roboto", known for its readability and friendly appearance, which makes the website's content approachable and easy to navigate.

**Layout**: The layout is responsive and user-friendly, featuring a grid-based design for recipe cards and a straightforward navigation menu. The use of cards helps in organizing information neatly and makes the interface visually engaging.

## Purpose of the Site
The primary purpose of the site is to provide a user-friendly platform where users can search, browse, and save their favorite recipes. It serves as a culinary resource, offering detailed recipe instructions and ingredients lists. The site exists to simplify meal planning and to inspire culinary creativity, catering to both novice cooks and experienced chefs.

## Responsiveness on Multiple Screen Sizes
Yes, the site is designed to look good on multiple screen sizes. It employs a responsive design that adjusts layout components based on the device's screen size. This ensures that whether a user is on a desktop, tablet, or smartphone, the experience remains functional and aesthetically pleasing.

The site is deployed on Netlify, showcasing its live version which can be accessed through the provided link.

https://main--glowing-banoffee-c34301.netlify.app/

## Use of State to Track User Interaction
The site uses React state management extensively to track user interactions. Here are a few examples:

**Search Query State**: Manages the input state of the recipe search bar.
Favorites State: Keeps track of the user's favorite recipes, allowing for quick access and manipulation (add/remove).

**Recipes List State**: Stores the list of recipes fetched based on search criteria or selected categories.

## Data Sources
**Internal Source**: The site internally manages user data like search queries and selected recipes which are stored transiently via React state.

**Third-Party API**: The site integrates with the "Spoonacular API" to fetch a vast array of recipes, this was used to get a basic card to represent the dish. The openai API was used to generate a recipe based on the the acutal chosen recipe.

## Data Persistence
The site uses Firebase Firestore, a third-party NoSQL database, to persist data such as user profiles, favorite recipes, and any custom user-generated content. This ensures that user data is safely stored and can be retrieved or modified in real-time, providing a seamless user experience across different sessions and devices.