import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useAuth } from '../context/AuthContext';

const ProfileScreen = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      Alert.alert('Error', 'Failed to log out');
      console.error(error);
    }
  };

  const handleEditProfile = () => {
    Alert.alert('Coming Soon', 'Profile editing will be available in a future update');
  };

  const handleConnectAccount = () => {
    Alert.alert('Coming Soon', 'Additional account connections will be available in a future update');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <Image
          source={user?.photoUrl ? { uri: user.photoUrl } : require('../assets/default-avatar.png')}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{user?.name}</Text>
        <Text style={styles.profileEmail}>{user?.email}</Text>
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.connectedAccountsSection}>
        <Text style={styles.sectionTitle}>Connected Accounts</Text>
        
        <View style={styles.accountItem}>
          <Image
            source={
              user?.provider === 'google'
                ? require('../assets/google-icon.png')
                : require('../assets/facebook-icon.png')
            }
            style={styles.accountIcon}
          />
          <View style={styles.accountInfo}>
            <Text style={styles.accountName}>
              {user?.provider === 'google' ? 'Google' : 'Facebook'}
            </Text>
            <Text style={styles.accountEmail}>{user?.email}</Text>
          </View>
          <Text style={styles.connectedText}>Connected</Text>
        </View>

        <TouchableOpacity 
          style={styles.connectButton}
          onPress={handleConnectAccount}
        >
          <Text style={styles.connectButtonText}>Connect Another Account</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.securitySection}>
        <Text style={styles.sectionTitle}>Security</Text>
        
        <TouchableOpacity style={styles.securityItem}>
          <Text style={styles.securityItemText}>Change Password</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.securityItem}>
          <Text style={styles.securityItemText}>Two-Factor Authentication</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.securityItem}>
          <Text style={styles.securityItemText}>Privacy Settings</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  logoutButton: {
    padding: 8,
  },
  logoutText: {
    color: '#FF3B30',
    fontWeight: '600',
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 16,
  },
  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#4285F4',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  connectedAccountsSection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    borderRadius: 12,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  accountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  accountIcon: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  accountInfo: {
    flex: 1,
  },
  accountName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  accountEmail: {
    fontSize: 14,
    color: '#666666',
  },
  connectedText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  connectButton: {
    marginTop: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  connectButtonText: {
    color: '#4285F4',
    fontWeight: '600',
  },
  securitySection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  securityItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  securityItemText: {
    fontSize: 16,
    color: '#333333',
  },
});

export default ProfileScreen;