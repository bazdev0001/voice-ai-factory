import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Colors } from '../../constants/colors';
import { saveVoiceAgent } from '../../services/firestore';

type Voice = 'male' | 'female' | 'neutral';

interface WizardState {
  name: string;
  voice: Voice;
  greeting: string;
  phoneNumber: string;
}

const TOTAL_STEPS = 4;

export default function CreateScreen(): React.JSX.Element {
  const { user } = useAuth();
  const [step, setStep] = useState<number>(1);
  const [saving, setSaving] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [state, setState] = useState<WizardState>({
    name: '',
    voice: 'female',
    greeting: '',
    phoneNumber: '',
  });

  const handleNext = (): void => {
    if (step === 1 && !state.name.trim()) {
      Alert.alert('Required', 'Please enter a name for your AI agent');
      return;
    }
    if (step === 3 && !state.greeting.trim()) {
      Alert.alert('Required', 'Please enter a greeting for your AI agent');
      return;
    }
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    }
  };

  const handleBack = (): void => {
    if (step > 1) setStep(step - 1);
  };

  const handleDeploy = async (): Promise<void> => {
    if (!user) return;
    try {
      setSaving(true);
      await saveVoiceAgent(user.uid, {
        name: state.name,
        voice: state.voice,
        greeting: state.greeting,
        phoneNumber: '+1 (555) 000-APEX',
        status: 'deployed',
        userId: user.uid,
        speakingRate: 1.0,
        tone: 'professional',
        language: 'en-US',
        accent: 'neutral',
      });
      setSaved(true);
    } catch {
      Alert.alert('Error', 'Failed to deploy agent. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = (): void => {
    setStep(1);
    setSaved(false);
    setState({ name: '', voice: 'female', greeting: '', phoneNumber: '' });
  };

  const setVoice = (v: Voice): void => setState({ ...state, voice: v });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.progressContainer}>
        {[1, 2, 3, 4].map((s) => (
          <View
            key={s}
            style={[styles.progressDot, s <= step ? styles.progressDotActive : null]}
          />
        ))}
      </View>
      <Text style={styles.stepIndicator}>Step {step} of {TOTAL_STEPS}</Text>

      {step === 1 && (
        <View>
          <Text style={styles.stepTitle}>Name Your AI Agent</Text>
          <Text style={styles.stepDesc}>Give your voice AI a name your callers will hear about.</Text>
          <Input
            label="Agent Name"
            value={state.name}
            onChangeText={(text): void => setState({ ...state, name: text })}
            placeholder="e.g. Reception AI, Sales Bot"
          />
        </View>
      )}

      {step === 2 && (
        <View>
          <Text style={styles.stepTitle}>Choose a Voice</Text>
          <Text style={styles.stepDesc}>Select the voice personality for your AI agent.</Text>
          {(['female', 'male', 'neutral'] as Voice[]).map((v) => (
            <TouchableOpacity
              key={v}
              style={[styles.voiceOption, state.voice === v ? styles.voiceOptionSelected : null]}
              onPress={(): void => setVoice(v)}
            >
              <Text style={styles.voiceIcon}>
                {v === 'female' ? '👩' : v === 'male' ? '👨' : '🧑'}
              </Text>
              <View>
                <Text style={styles.voiceLabel}>{v.charAt(0).toUpperCase() + v.slice(1)}</Text>
                <Text style={styles.voiceDesc}>
                  {v === 'female' ? 'Warm and professional female voice'
                    : v === 'male' ? 'Clear and authoritative male voice'
                    : 'Gender-neutral modern voice'}
                </Text>
              </View>
              {state.voice === v && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
          ))}
        </View>
      )}

      {step === 3 && (
        <View>
          <Text style={styles.stepTitle}>Set the Greeting</Text>
          <Text style={styles.stepDesc}>What will your AI say when it answers a call?</Text>
          <Input
            label="Opening Greeting"
            value={state.greeting}
            onChangeText={(text): void => setState({ ...state, greeting: text })}
            placeholder="e.g. Hello! Thank you for calling. How can I help you today?"
          />
          <Card style={styles.tipCard}>
            <Text style={styles.tipTitle}>Tip</Text>
            <Text style={styles.tipText}>Keep greetings under 20 words. Start with the business name for professional calls.</Text>
          </Card>
        </View>
      )}

      {step === 4 && (
        <View>
          <Text style={styles.stepTitle}>Configure Phone Number</Text>
          <Text style={styles.stepDesc}>A phone number will be assigned to your agent on deployment.</Text>
          <Card style={styles.phoneCard}>
            <Text style={styles.phoneLabel}>Assigned Number</Text>
            <Text style={styles.phoneNumber}>+1 (555) 000-APEX</Text>
            <Text style={styles.phoneNote}>Your number will be provisioned automatically</Text>
          </Card>
          <Card style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Summary</Text>
            <Text style={styles.summaryRow}>Name: <Text style={styles.summaryValue}>{state.name}</Text></Text>
            <Text style={styles.summaryRow}>Voice: <Text style={styles.summaryValue}>{state.voice}</Text></Text>
            <Text style={styles.summaryRow}>Greeting: <Text style={styles.summaryValue}>{state.greeting}</Text></Text>
          </Card>
        </View>
      )}

      <View style={styles.navRow}>
        {step > 1 && (
          <Button title="Back" onPress={handleBack} variant="outline" style={styles.navBtn} />
        )}
        {step < TOTAL_STEPS ? (
          <Button title="Next" onPress={handleNext} style={styles.navBtn} />
        ) : (
          <Button title="Deploy Agent" onPress={handleDeploy} loading={saving} style={styles.navBtn} />
        )}
      </View>

      <Modal visible={saved} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <Card style={styles.modalCard}>
            <Text style={styles.modalIcon}>🚀</Text>
            <Text style={styles.modalTitle}>Agent Deployed!</Text>
            <Text style={styles.modalText}>{state.name} is now live at +1 (555) 000-APEX</Text>
            <Button title="Create Another" onPress={handleReset} />
          </Card>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 24 },
  progressContainer: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  progressDot: { flex: 1, height: 4, borderRadius: 2, backgroundColor: Colors.surfaceLight },
  progressDotActive: { backgroundColor: Colors.primary },
  stepIndicator: { fontSize: 13, color: Colors.textSecondary, marginBottom: 24 },
  stepTitle: { fontSize: 24, fontWeight: 'bold', color: Colors.text, marginBottom: 8 },
  stepDesc: { fontSize: 15, color: Colors.textSecondary, marginBottom: 24 },
  voiceOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 12,
    backgroundColor: Colors.surface,
  },
  voiceOptionSelected: { borderColor: Colors.primary, backgroundColor: Colors.surfaceLight },
  voiceIcon: { fontSize: 32 },
  voiceLabel: { fontSize: 16, fontWeight: '600', color: Colors.text },
  voiceDesc: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
  checkmark: { marginLeft: 'auto', color: Colors.primary, fontSize: 20, fontWeight: 'bold' },
  tipCard: { marginTop: 16 },
  tipTitle: { fontSize: 13, fontWeight: '600', color: Colors.primary, marginBottom: 4 },
  tipText: { fontSize: 13, color: Colors.textSecondary },
  phoneCard: { marginBottom: 16 },
  phoneLabel: { fontSize: 13, color: Colors.textSecondary, marginBottom: 4 },
  phoneNumber: { fontSize: 22, fontWeight: 'bold', color: Colors.primary },
  phoneNote: { fontSize: 12, color: Colors.textSecondary, marginTop: 4 },
  summaryCard: { marginBottom: 24 },
  summaryTitle: { fontSize: 15, fontWeight: '600', color: Colors.text, marginBottom: 12 },
  summaryRow: { fontSize: 14, color: Colors.textSecondary, marginBottom: 6 },
  summaryValue: { color: Colors.text, fontWeight: '500' },
  navRow: { flexDirection: 'row', gap: 12, marginTop: 16 },
  navBtn: { flex: 1 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', padding: 24 },
  modalCard: { alignItems: 'center', padding: 32 },
  modalIcon: { fontSize: 48, marginBottom: 16 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: Colors.text, marginBottom: 8 },
  modalText: { fontSize: 15, color: Colors.textSecondary, textAlign: 'center', marginBottom: 24 },
});
