![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![React](https://img.shields.io/badge/React-Frontend-blue)
![MySQL](https://img.shields.io/badge/Database-MySQL-orange)

# Mixlist
----
## Install Instructions

### 1. Prerequisites
You must have the following installed on your system:
- Node.js (v18 or higher recommended) - https://nodejs.org/
  - npm (included with Node.js)
- Git - https://git-scm.com/

### 2. Clone the Repository
- In your terminal, run the following commands:
```bash
git clone https://github.com/mirandashor/Mixlist-Senior-Capstone.git
```
```bash
cd Mixlist-Senior-Capstone
```

### 3. Install Dependencies
**Backend** <br>
From the project root, open a terminal in the **server/** directory:
```bash
cd server
```
Run the following command:
```bash
npm install
```

**Frontend** <br>
From the project root, open a terminal in the **client/** directory:
```bash
cd client
```
Run the following command:
```bash
npm install
```

### 4. Configure Environment Variables 
Necessary Unique External Variables:
- Spotify API Key - https://developer.spotify.com/
- LastFM API Key - https://www.last.fm/api/authentication

Configuration: <br>
- Create a `.env` file inside the **server/** directory and add the following components: <br>
```env
SPOTIFY_CLIENT_ID=your-spotify-key

SPOTIFY_CLIENT_SECRET=your-spotify-secret-key

LASTFM_API_KEY=your-lastfm-key

FRONTEND_URL=http://localhost:5173

REDIRECT_URI=http://127.0.0.1:5000/auth/callback
```
- Create a `.env` file inside the **client/** directory and add the following component:
```env
VITE_API_BASE_URL=http://localhost:5000
```
<br>

## 5. Command-line Validation Test
After completing installation, verify the project by running both the backend and frontend locally:

### 1. Start the backend server
   - Open a terminal in the **server/**' directory
   - run the command:
```bash
npm run dev
``` 
**Expected Results:**
   - The server/backend should start without errors
   - A message in the console such as **Server running on port 5000**

### 2. Start the frontend site
   - Open a second terminal in the **'client/'** directory 
   - Run the command:
```bash
npm run dev
```
**Expected Results:**
   - The client/frontend should start without errors
   - A message in the console such as **Local: http://localhost:5173/**

### 3. Verify the Application flow
   - Open the frontend URL from the console in a browser
   - Confirm the page loads successfully and all routes function without errors

----
<br>

## Library Setup
**Mixlist uses the following libraries and technologies:**

| Category | Library | Purpose |
| --- | --- | --- |
| Frontend | React | Builds the user interface |
| Frontend | Vite | Fast frontend development and building tools |
| Backend | Node.js | Server runtime |
| Backend | Express.js | Handles API routing |
| Database | SQLite | Stores temporary application data |
| API | Spotify | User and Music data |
| API | LastFM | Additional music data for recommendation algorithm |

----
<br>

## Required Path Configurations
**Project Structure:** <br>
`client/` - React + Vite frontend <br>
`server/` - Node.js + Express.js backend
<br> <br>

**Environment Files** <br>
`server/.env` - backend environment variables <br>
`client/.env` - frontend environment variables 
<br> <br>

**Key Directories** <br>
`client/src/` - frontend components and UI <br>
`server/src/routes/` - API routes and server logic <br>
`server/src/database/` - database logic and files <br>
`server/src/services/` - backend service logic

----
<br>

## Follow-on Project Instructions for future contributors
- Real-time updates
  - Allow the host to create a session, and users can join any time and the playlist will re-generate with the new taste profile in consideration
- User Profiles?

