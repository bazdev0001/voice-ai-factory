import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, Alert } from 'react-native';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Colors } from '../../constants/colors';

export default function DeployScreen(): React.JSX.Element {
  const [testCallModal, setTestCallModal] = useState<boolean>(false);

  const handleTestCall = (): void => {
    setTestCallModal(true);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Deployment Status</Text>

      <Card style={styles.statusCard}>
        <View style={styles.statusRow}>
          <View style={styles.statusDot} />
          <Text style={styles.statusLabel}>Deployed</Text>
        </View>
        <Text style={styles.agentName}>Reception AI</Text>
        <Text style={styles.deployedAt}>Deployed on Jul 12, 2026 at 09:00 AM</Text>
      </Card>

      <Text style={styles.sectionTitle}>Phone Number</Text>
      <Card>
        <Text style={styles.phoneNumber}>+1 (555) 000-APEX</Text>
        <Text style={styles.phoneNote}>Inbound calls are active and routed to your agent</Text>
      </Card>

      <Text style={styles.sectionTitle}>Infrastructure</Text>
      <Card>
        <View style={styles.infraRow}>
          <Text style={styles.infraLabel}>Voice Engine</Text>
          <View style={styles.infraBadge}>
            <Text style={styles.infraBadgeText}>Active</Text>
          </View>
        </View>
        <View style={styles.infraRow}>
          <Text style={styles.infraLabel}>Phone Line</Text>
          <View style={styles.infraBadge}>
            <Text style={styles.infraBadgeText}>Active</Text>
          </View>
        </View>
        <View style={styles.infraRow}>
          <Text style={styles.infraLabel}>Call Recording</Text>
          <View style={styles.infraBadge}>
            <Text style={styles.infraBadgeText}>Active</Text>
          </View>
        </View>
        <View style={[styles.infraRow, styles.lastRow]}>
          <Text style={styles.infraLabel}>Transcription</Text>
          <View style={styles.infraBadge}>
            <Text style={styles.infraBadgeText}>Active</Text>
          </View>
        </View>
      </Card>

      <Button
        title="Test Call"
        onPress={handleTestCall}
        variant="secondary"
        style={styles.testBtn}
      />

      <Button
        title="Pause Agent"
        onPress={(): void => { Alert.alert('Paused', 'Agent has been paused'); }}
        variant="outline"
        style={styles.pauseBtn}
      />

      <Modal visible={testCallModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <Card style={styles.modalCard}>
            <Text style={styles.modalIcon}>📞</Text>
            <Text style={styles.modalTitle}>Test Call Initiated</Text>
            <Text style={styles.modalText}>
              Test call initiated to +1 (555) 000-APEX{'\n'}Your agent is answering...
            </Text>
            <Button title="Close" onPress={(): void => setTestCallModal(false)} />
          </Card>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: Colors.text, marginBottom: 24 },
  statusCard: { marginBottom: 24 },
  statusRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  statusDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.success, marginRight: 8 },
  statusLabel: { fontSize: 14, color: Colors.success, fontWeight: '600' },
  agentName: { fontSize: 22, fontWeight: 'bold', color: Colors.text, marginBottom: 4 },
  deployedAt: { fontSize: 13, color: Colors.textSecondary },
  sectionTitle: { fontSize: 14, fontWeight: '600', color: Colors.textSecondary, marginBottom: 12, marginTop: 20, textTransform: 'uppercase', letterSpacing: 0.5 },
  phoneNumber: { fontSize: 24, fontWeight: 'bold', color: Colors.primary, marginBottom: 4 },
  phoneNote: { fontSize: 13, color: Colors.textSecondary },
  infraRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Colors.border },
  lastRow: { borderBottomWidth: 0 },
  infraLabel: { fontSize: 15, color: Colors.text },
  infraBadge: { backgroundColor: Colors.success + '33', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  infraBadgeText: { fontSize: 12, color: Colors.success, fontWeight: '600' },
  testBtn: { marginTop: 24 },
  pauseBtn: { marginTop: 12 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end', padding: 24, paddingBottom: 40 },
  modalCard: { alignItems: 'center', padding: 32 },
  modalIcon: { fontSize: 48, marginBottom: 16 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: Colors.text, marginBottom: 8 },
  modalText: { fontSize: 14, color: Colors.textSecondary, textAlign: 'center', marginBottom: 24, lineHeight: 22 },
});
