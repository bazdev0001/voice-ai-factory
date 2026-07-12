import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';
import { Card } from '../../components/ui/Card';
import { Colors } from '../../constants/colors';

export default function DashboardScreen(): React.JSX.Element {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back</Text>
        <Text style={styles.email}>{user?.email ?? 'User'}</Text>
      </View>

      <Text style={styles.sectionTitle}>Quick Stats</Text>
      <View style={styles.statsRow}>
        <Card style={styles.statCard}>
          <Text style={styles.statValue}>3</Text>
          <Text style={styles.statLabel}>Active Agents</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statValue}>127</Text>
          <Text style={styles.statLabel}>Calls Today</Text>
        </Card>
      </View>

      <Text style={styles.sectionTitle}>Your Agents</Text>
      <Card style={styles.agentCard}>
        <View style={styles.agentRow}>
          <View style={styles.agentInfo}>
            <Text style={styles.agentName}>Reception AI</Text>
            <Text style={styles.agentPhone}>+1 (555) 000-APEX</Text>
          </View>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Live</Text>
          </View>
        </View>
        <Text style={styles.agentStats}>42 calls today · 3.2 min avg</Text>
      </Card>

      <TouchableOpacity
        style={styles.createButton}
        onPress={(): void => { router.push('/(tabs)/create'); }}
      >
        <Text style={styles.createButtonText}>+ Create New Voice AI</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 24,
  },
  header: {
    marginBottom: 32,
  },
  greeting: {
    fontSize: 14,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  email: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  statLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  agentCard: {
    marginBottom: 12,
  },
  agentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  agentPhone: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  statusBadge: {
    backgroundColor: Colors.success,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: Colors.white,
    fontWeight: '600',
  },
  agentStats: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  createButton: {
    marginTop: 24,
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  createButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
