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
- In your VSCode terminal, run the commands: 
- `git clone https://github.com/mirandashor/Mixlist-Senior-Capstone.git`
- `cd Mixlist-Senior-Capstone`

### 3. Install Dependencies
Backend: 
- Open a terminal in the **/server** directory (\Mixlist-Senior-Capstone\server)
- Run the following commands:
- `cd server`
- `npm install`

Frontend:
- Open a terminal in the **/client** directory (\Mixlist-Senior-Capstone\client)
- Run the following commands:
- `cd client`
- `npm install`

Navigating to each respective terminal can be done by 'cd server' and 'cd client' commands, or right click each folder and 'open in integrated terminal' 

### 4. Configure Environment Variables 
Necessary Variables:
- Spotify API Key
- LastFM API Key
- frontend URL
- redirect URI

Configuration: <br>
- Create a `.env` file inside the **/server** directory and add the following components: <br>
```env
SPOTIFY_CLIENT_ID=(your-spotify-key)

SPOTIFY_CLIENT_SECRET=(your-spotify-secret-key)

LASTFM_API_KEY=(your-lastfm-key)

FRONTEND_URL=(your-frontend-url)

REDIRECT_URI=http:(your-localhost)/auth/callback
```

### 5. Run the Application
Backend: In the **/server** terminal, run:
- `cd server`
- `npm run dev`

Frontend: In the **/client** terminal, run:
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

Navigating to the terminal can be done by 'cd server' and 'cd client' commands, or right click each folder and 'open in integrated terminal'
