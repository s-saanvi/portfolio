# Local Setup Guide

Follow these steps to run the portfolio website locally.

## Prerequisites
- **Node.js**: version 22.x+ is recommended.
- **npm**: (comes with Node.js).

## Step-by-Step Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd devportfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables (Optional):**
   If you need to access the `/admin/login` and `/admin/write` pages, you need to set up authentication credentials.
   Create a `.env` file in the root of the project:
   ```bash
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=password
   JWT_SECRET=super-secret-key
   ```

4. **Run the local development server:**
   ```bash
   npm run dev
   ```

5. **Preview the built static site:**
   If you want to build and serve the production version locally:
   ```bash
   npm run build
   npm run preview
   ```
   By default, the site will be available at `http://localhost:4321/`.
