# Himig Play 🎵

Himig Play is a personalized music streaming app powered by Spotify API, offering a seamless experience to discover, play, and enjoy your favorite tunes

## Screenshots

### Home Page

![Bookmark Landing Page - Mobile View](/screenshots/Screenshot1.png)

### Desktop View

![Bookmark Landing Page - Desktop View](/screenshots/Screenshot2.png)

### Mobile View

![Bookmark Landing Page - Desktop View](/screenshots/Screenshot3.png)

## Features 🌟

- 🎧 View your top songs, playlists, and artists.
- ▶️ Play songs using SpotifyPlayer.
- 📊 Displays personalized music statistics.
- 💻 Interactive and responsive design.
- 🪄 Clean and user-friendly interface.
- 🔗 Integration with the Spotify API for a seamless music experience.

## Getting Started 🚀

#### Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js (v16 or later)
- npm or yarn
- A Spotify Developer Account

## Run Locally

Clone the Project

```bash
git clone https://github.com/cesarpizarra/himig-play
```

Navigate to the Project Directory

```bash
cd  himig-play
```

Install dependencies

```bash
npm install
```

or

```bash
yarn install
```

Create a .env file in the root of your project and add the following variables:

```
SPOTIFY_CLIENT_ID=your-client-id
SPOTIFY_CLIENT_SECRET=your-client-secret
SPOTIFY_REDIRECT_URI=your-redirect-uri
NEXTAUTH_URL=your-nextauth-url
NEXTAUTH_SECRET=your-nextauth-secret
```

Start the app

```bash
  npm run dev
```

Visit http://localhost:3000 in your browser to explore Himig Play!

## Setting Up Spotify API 🎵

To integrate Spotify API, follow these steps:

1.  Create a Spotify Developer Account

    - Go to [Spotify for Developers](https://developer.spotify.com/)
    - Log in or sign up for a Spotify Developer Account.

2.  Create a New App

    - Navigate to the Dashboard and click Create an App.
    - Fill out the form with your app's name and description.

3.  Configure Redirect URIs

    - Go to your app's settings.
    - Add your redirect URI under Redirect URIs (e.g., http://localhost:3000/api/auth/callback/spotify).

4.  Get Your Client ID and Secret

    - In your app settings, you'll find the Client ID and Client Secret.
    - Copy these and add them to your .env file.

5.  Enable the Required Scopes
    When making requests to the Spotify API, ensure your app requests the following scopes:

    - streaming,
    - user-read-email,
    - user-follow-read,
    - user-top-read,
    - playlist-read-private,
    - playlist-modify-private,
    - playlist-modify-public,
    - user-library-read,
    - user-read-private,
    - user-read-currently-playing,
    - user-modify-playback-state,
    - user-read-playback-state,
    - user-read-recently-played

    Refer to the [ Spotify API Authorization Guide](https://developer.spotify.com/documentation/web-api/concepts/authorization/) for more details.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b new-branch`
3. Commit your changes: `git commit -m 'Add some branch'`
4. Push to the branch: `git push origin new-branch`
5. Submit a pull request :D

## License 📄

This project is licensed under the MIT License.

## Acknowledgments 🙌

Special thanks to the Spotify Developer API for making this app possible.
