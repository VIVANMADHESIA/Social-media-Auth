import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken, Profile } from 'react-native-fbsdk-next';
import { useAuth } from '../context/AuthContext';

// Initialize Google Sign-In
GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID', // Get this from Google Cloud Console
});

const AuthScreen = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      
      if (userInfo.user) {
        await login({
          id: userInfo.user.id,
          name: userInfo.user.name || '',
          email: userInfo.user.email,
          photoUrl: userInfo.user.photo || undefined,
          provider: 'google',
        });
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // User cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // Operation in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Error', 'Play services not available or outdated');
      } else {
        Alert.alert('Error', 'Something went wrong with Google Sign In');
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      
      if (result.isCancelled) {
        throw new Error('User cancelled the login process');
      }
      
      const data = await AccessToken.getCurrentAccessToken();
      
      if (!data) {
        throw new Error('Something went wrong obtaining access token');
      }
      
      const currentProfile = await Profile.getCurrentProfile();
      
      if (currentProfile) {
        await login({
          id: currentProfile.userID,
          name: currentProfile.name || '',
          email: currentProfile.email || '',
          photoUrl: currentProfile.imageURL,
          provider: 'facebook',
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong with Facebook Sign In');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../assets/logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
      </View>

      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity 
          style={[styles.socialButton, styles.googleButton]}
          onPress={handleGoogleSignIn}
          disabled={isLoading}
        >
          <Image 
            source={require('../assets/google-icon.png')} 
            style={styles.socialIcon}
          />
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.socialButton, styles.facebookButton]}
          onPress={handleFacebookSignIn}
          disabled={isLoading}
        >
          <Image 
            source={require('../assets/facebook-icon.png')} 
            style={styles.socialIcon}
          />
          <Text style={[styles.socialButtonText, styles.facebookButtonText]}>
            Continue with Facebook
          </Text>
        </TouchableOpacity>
      </View>

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#4285F4" />
        </View>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          By continuing, you agree to our{' '}
          <Text style={styles.link}>Terms of Service</Text> and{' '}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 40,
  },
  socialButtonsContainer: {
    width: '100%',
    gap: 16,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  googleButton: {
    borderColor: '#DDDDDD',
    backgroundColor: '#FFFFFF',
  },
  facebookButton: {
    borderColor: '#1877F2',
    backgroundColor: '#1877F2',
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  facebookButtonText: {
    color: '#FFFFFF',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    marginBottom: 20,
  },
  footerText: {
    textAlign: 'center',
    color: '#666666',
    fontSize: 14,
  },
  link: {
    color: '#4285F4',
    fontWeight: '500',
  },
});

export default AuthScreen;