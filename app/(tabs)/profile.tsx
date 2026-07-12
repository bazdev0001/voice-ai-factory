import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { signOut } from '../../services/auth';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Colors } from '../../constants/colors';

export default function ProfileScreen(): React.JSX.Element {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignOut = async (): Promise<void> => {
    try {
      setLoading(true);
      await signOut();
    } catch {
      Alert.alert('Error', 'Could not sign out. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Profile</Text>

      <Card style={styles.accountCard}>
        <Text style={styles.label}>Account Email</Text>
        <Text style={styles.value}>{user?.email ?? 'Not available'}</Text>
      </Card>

      <Card style={styles.planCard}>
        <Text style={styles.label}>Current Plan</Text>
        <Text style={styles.planValue}>Starter</Text>
        <Text style={styles.planDetails}>1 active agent · 1,000 min/mo</Text>
      </Card>

      <Button
        title="Sign Out"
        onPress={handleSignOut}
        loading={loading}
        variant="outline"
        style={styles.signOutButton}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: Colors.text, marginBottom: 24 },
  accountCard: { marginBottom: 12 },
  planCard: { marginBottom: 24 },
  label: { fontSize: 12, color: Colors.textSecondary, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 },
  value: { fontSize: 16, color: Colors.text },
  planValue: { fontSize: 20, fontWeight: 'bold', color: Colors.primary, marginBottom: 4 },
  planDetails: { fontSize: 13, color: Colors.textSecondary },
  signOutButton: { marginTop: 8 },
});
