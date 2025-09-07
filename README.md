# GitHub Fetch API

A Next.js application that interacts with the GitHub API to fetch and display repository information and markdown content.

## 🚀 Live Demo

**Live Site:** [https://github-fetch-api.vercel.app/](https://github-fetch-api.vercel.app/)

**GitHub Repository:** [https://github.com/kayes360/github-fetch-api](https://github.com/kayes360/github-fetch-api)

## 📋 Features

✅ Fetch Markdown content from a public GitHub repository (e.g., content/hello.md)

✅ Render it using React Markdown

✅ Create, Edit, and Delete local drafts

✅ Publish all drafts to GitHub as Markdown files via the GitHub API

✅ Uses Lucide React for icons

 

## 🏃‍♂️ Running Locally

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- GitHub Personal Access Token

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/kayes360/github-fetch-api.git
   cd github-fetch-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
  
   
   Add your GitHub API key to `.env`:
   ```env
   GITHUB_API_KEY=your_github_personal_access_token_here(access_token_is_shared_with_email_submisstion)
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.
 
 

## 📦 Dependencies

### Main Dependencies
- `next` - React framework for production
- `react` - JavaScript library for building user interfaces
- `react-dom` - React package for working with the DOM
- `lucide-react` - Beautiful & consistent icon toolkit
- `react-markdown` - Markdown component for React 
 
 

