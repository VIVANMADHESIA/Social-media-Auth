 # React Native Authentication App

## Overview
This is a React Native authentication app that allows users to sign in using Google or Facebook authentication. The app includes an authentication context for managing user sessions and provides a profile screen to display user information.

## Features
- Google and Facebook authentication
- Secure user session management with AsyncStorage
- Navigation using React Navigation
- Profile screen with user details and logout functionality

## Installation
1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd <project-folder>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Link dependencies for React Native:
   ```sh
   npx react-native link
   ```

## Configuration
### Google Sign-In
1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project and enable the Google Sign-In API.
3. Generate a web client ID and replace `YOUR_WEB_CLIENT_ID` in `AuthScreen.tsx`.

### Facebook Sign-In
1. Go to the [Meta Developers](https://developers.facebook.com/)
2. Create an app and configure Facebook Login.
3. Add your Facebook App ID and required permissions.

## Running the App
For Android:
```sh
npx react-native run-android
```
For iOS:
```sh
npx react-native run-ios
```

## File Structure
```
root/
├── src/
│   ├── context/
│   │   ├── AuthContext.tsx  # Manages authentication state
│   ├── screens/
│   │   ├── AuthScreen.tsx    # Handles user login
│   │   ├── ProfileScreen.tsx # Displays user profile and logout
│   ├── App.tsx               # Main entry point with navigation
```

## Dependencies
- React Native
- @react-navigation/native
- @react-navigation/native-stack
- @react-native-async-storage/async-storage
- react-native-google-signin
- react-native-fbsdk-next

## License
This project is licensed under the MIT License.

