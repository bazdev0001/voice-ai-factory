export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  createdAt: Date;
}

export interface VoiceAgent {
  id: string;
  userId: string;
  name: string;
  voice: 'male' | 'female' | 'neutral';
  greeting: string;
  phoneNumber: string;
  status: 'draft' | 'deploying' | 'deployed' | 'paused';
  speakingRate: number;
  tone: 'professional' | 'friendly' | 'formal';
  language: string;
  accent: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CallLog {
  id: string;
  agentId: string;
  duration: number;
  callerNumber: string;
  timestamp: Date;
  reason: string;
}

export interface UsageStats {
  callsThisMonth: number;
  minutesUsed: number;
  costThisMonth: number;
  topReasons: string[];
}

export interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  style?: object;
}

export interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  label?: string;
  error?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

export interface CardProps {
  children: React.ReactNode;
  style?: object;
}
