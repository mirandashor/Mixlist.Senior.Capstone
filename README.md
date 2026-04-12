![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![React](https://img.shields.io/badge/React-Frontend-blue)
![MySQL](https://img.shields.io/badge/Database-MySQL-orange)

# Mixlist
----
## Install Instructions

### 1. Prerequisites
You must have the following installed on your system:
- Node.js - v18 or higher recommended. (https://nodejs.org/)
  - npm (included with Node.js)
- Git (https://git-scm.com/)

### 2. Clone the Repository
- git clone
- cd Mixlist-Senior-Capstone
### 3. Install Dependencies
Backend:
- `git clone`
- `npm install`

Frontend:
- `git clone`
- `npm install`

### 3. Install Dependencies
Backend:
```bash
- git clone
```
```bash
- npm install
```
Frontend:
```bash
- git clone
```
```bash
- npm install
```
### 4. Configure Environment Variables 
Necessary variables:
- Spotify API key
- LastFM API key
- frontend URL
- redirect URI

- Google OAuth

Configuration:
Create a `.env` file inside the **server** directory with the following components: <br>
<br>
SPOTIFY_CLIENT_ID=(your-spotify-key)

SPOTIFY_CLIENT_SECRET=(your-spotify-secret-key)

FRONTEND_URL=(your-frontend-url)

REDIRECT_URI=http:(your-localhost)/auth/callback

LASTFM_API_KEY=(your-lastfm-key)


### 5. Run the Application
Backend: 
- `cd server`
- `npm run dev`

Frontend: 
- `cd server`
- `npm run dev`

----
## Library Setup

----
## Required Path Configurations

----
## Follow-on Project Instructions for future contributors

----
## Command-line Validation Test
After completing installation, verify the project by running both the backend and frontend locally:

### 1. Run the backend server
   - Open a terminal in the **server**' directory (\Mixlist-Senior-Capstone\server)
   - run the command: **```npm run dev```** <br>

**Expected Results:**
   - The server/backend should start without errors
   - A message such as **Server running on port 5000**

### 2. Run the frontend
   - Open a terminal in the **'client'** directory (\Mixlist-Senior-Capstone\client)
   - Run the command:
```bash
npm run dev
```

**Expected Results:**
   - The client/frontend should start without errors
   - A message such as **Local:   http:// localhost:5173/**

### 3. Verify the Application flow
   - Open the provided frontend URL in a browser
   - Confirm the page loads successfully and all routes function without errors

Navigating to the terminal can be done by 'cd server' and 'cd client' commands, or right click the folder and 'open in integrated terminal'
