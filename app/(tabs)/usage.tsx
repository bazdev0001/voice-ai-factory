import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from '../../components/ui/Card';
import { Colors } from '../../constants/colors';

const MOCK_TOP_REASONS = [
  { reason: 'Appointment scheduling', count: 48 },
  { reason: 'Hours & location', count: 31 },
  { reason: 'Price inquiry', count: 24 },
  { reason: 'Service information', count: 17 },
  { reason: 'Complaint handling', count: 7 },
];

export default function UsageScreen(): React.JSX.Element {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Usage Dashboard</Text>
      <Text style={styles.period}>July 2026</Text>

      <View style={styles.statsGrid}>
        <Card style={styles.statCard}>
          <Text style={styles.statValue}>127</Text>
          <Text style={styles.statLabel}>Calls Made</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statValue}>634</Text>
          <Text style={styles.statLabel}>Minutes Used</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statValue}>$63.40</Text>
          <Text style={styles.statLabel}>Cost This Month</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statValue}>4.8m</Text>
          <Text style={styles.statLabel}>Avg Call Length</Text>
        </Card>
      </View>

      <Text style={styles.sectionTitle}>Top Call Reasons</Text>
      <Card>
        {MOCK_TOP_REASONS.map((item, index) => (
          <View key={item.reason} style={[styles.reasonRow, index === MOCK_TOP_REASONS.length - 1 ? styles.lastRow : null]}>
            <View style={styles.reasonInfo}>
              <Text style={styles.reasonRank}>#{index + 1}</Text>
              <Text style={styles.reasonText}>{item.reason}</Text>
            </View>
            <View style={styles.reasonBar}>
              <View style={[styles.reasonBarFill, { width: `${(item.count / 48) * 100}%` }]} />
            </View>
            <Text style={styles.reasonCount}>{item.count}</Text>
          </View>
        ))}
      </Card>

      <Text style={styles.sectionTitle}>Daily Calls (Last 7 Days)</Text>
      <Card>
        <View style={styles.barChart}>
          {[12, 18, 9, 22, 15, 27, 24].map((count, index) => (
            <View key={index} style={styles.barWrapper}>
              <View style={[styles.bar, { height: (count / 27) * 80 }]} />
              <Text style={styles.barLabel}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</Text>
            </View>
          ))}
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: Colors.text, marginBottom: 4 },
  period: { fontSize: 15, color: Colors.primary, marginBottom: 24, fontWeight: '500' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 32 },
  statCard: { width: '47%', alignItems: 'center' },
  statValue: { fontSize: 26, fontWeight: 'bold', color: Colors.primary },
  statLabel: { fontSize: 12, color: Colors.textSecondary, marginTop: 4, textAlign: 'center' },
  sectionTitle: { fontSize: 14, fontWeight: '600', color: Colors.textSecondary, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 },
  reasonRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Colors.border, gap: 8 },
  lastRow: { borderBottomWidth: 0 },
  reasonInfo: { flexDirection: 'row', alignItems: 'center', width: 180, gap: 8 },
  reasonRank: { fontSize: 12, color: Colors.textSecondary, width: 24 },
  reasonText: { fontSize: 13, color: Colors.text, flex: 1 },
  reasonBar: { flex: 1, height: 6, backgroundColor: Colors.surfaceLight, borderRadius: 3, overflow: 'hidden' },
  reasonBarFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: 3 },
  reasonCount: { fontSize: 13, color: Colors.textSecondary, width: 28, textAlign: 'right' },
  barChart: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', height: 100, paddingBottom: 24 },
  barWrapper: { alignItems: 'center', flex: 1, gap: 4 },
  bar: { width: 20, backgroundColor: Colors.primary, borderRadius: 4, minHeight: 4 },
  barLabel: { fontSize: 11, color: Colors.textSecondary },
});
