import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
// import { WebView } from 'react-native-webview';

const AdminScreen = () => {
  const adminPanelUrl = 'https://your-admin-panel.com';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* <WebView source={{ uri: adminPanelUrl }} /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AdminScreen;
