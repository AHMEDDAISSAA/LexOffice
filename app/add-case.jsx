import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Spacing, Radius, Shadow } from '../constants/spacing';
import { mockCases } from '../data/mockCases';
console.disableYellowbox = true ; 

const STATUS_OPTIONS = ['Active', 'Pending', 'Closed'];

const CASE_TYPES = [
  'Corporate Law',
  'Civil Litigation',
  'Family Law',
  'Criminal Defense',
  'Real Estate',
  'Intellectual Property',
  'Labor & Employment',
];

export default function AddCase() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [status, setStatus] = useState('Active');
  const [caseType, setCaseType] = useState('Corporate Law');
  const [opposingParty, setOpposingParty] = useState('');
  const [court, setCourt] = useState('');
  const [judge, setJudge] = useState('');
  const [nextHearing, setNextHearing] = useState('');
  const [startDate, setStartDate] = useState('');
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Required Field', 'Please enter a case title.');
      return;
    }
    if (!client.trim()) {
      Alert.alert('Required Field', 'Please enter the client name.');
      return;
    }

    const nextIdNum = mockCases.length + 1;
    const paddedId = String(nextIdNum).padStart(3, '0');

    const newCase = {
      id: `2025-${paddedId}`,
      title: title.trim(),
      client: client.trim(),
      status,
      caseType,
      opposingParty: opposingParty.trim() || 'N/A',
      court: court.trim() || 'Local District Court',
      judge: judge.trim() || 'N/A',
      nextHearing: nextHearing.trim() || undefined,
      startDate: startDate.trim() || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      notes: notes.trim(),
    };

    mockCases.unshift(newCase);

    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/cases');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar style="light" animated={true} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Pressable
              style={styles.backButton}
              onPress={() => {
                if (router.canGoBack()) {
                  router.back();
                } else {
                  router.replace('/(tabs)/cases');
                }
              }}
            >
              <Ionicons name="arrow-back" size={22} color={Colors.white} />
            </Pressable>
            <Text style={styles.headerTitle}>New Case</Text>
            <Pressable style={styles.saveHeaderButton} onPress={handleSave}>
              <Text style={styles.saveHeaderButtonText}>Save</Text>
            </Pressable>
          </View>

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Section 1: Basic Information */}
            <View style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <Ionicons name="briefcase-outline" size={20} color={Colors.primary} />
                <Text style={styles.sectionTitle}>Case Information</Text>
              </View>

              {/* Case Title */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Case Title <Text style={styles.required}>*</Text></Text>
                <TextInput
                  style={styles.input}
                  placeholder="divorcing couple"
                  placeholderTextColor={Colors.textSecondary}
                  value={title}
                  onChangeText={setTitle}
                />
              </View>

              {/* Client Name */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Client Name <Text style={styles.required}>*</Text></Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. John Smith"
                  placeholderTextColor={Colors.textSecondary}
                  value={client}
                  onChangeText={setClient}
                />
              </View>

              {/* Status */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Case Status</Text>
                <View style={styles.chipRow}>
                  {STATUS_OPTIONS.map((st) => (
                    <Pressable
                      key={st}
                      style={[
                        styles.chip,
                        status === st && styles.chipActiveStatus,
                      ]}
                      onPress={() => setStatus(st)}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          status === st && styles.chipTextActive,
                        ]}
                      >
                        {st}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              {/* Case Type */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Practice Area / Category</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRowHorizontal}>
                  {CASE_TYPES.map((ct) => (
                    <Pressable
                      key={ct}
                      style={[
                        styles.chip,
                        caseType === ct && styles.chipActive,
                      ]}
                      onPress={() => setCaseType(ct)}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          caseType === ct && styles.chipTextActive,
                        ]}
                      >
                        {ct}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            </View>

            {/* Section 2: Court & Opposing Party */}
            <View style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <Ionicons name="business-outline" size={20} color={Colors.primary} />
                <Text style={styles.sectionTitle}>Court & Parties</Text>
              </View>

              {/* Opposing Party */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Opposing Party</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. ABC Company"
                  placeholderTextColor={Colors.textSecondary}
                  value={opposingParty}
                  onChangeText={setOpposingParty}
                />
              </View>

              {/* Court */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Court Jurisdiction</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. New York Supreme Court"
                  placeholderTextColor={Colors.textSecondary}
                  value={court}
                  onChangeText={setCourt}
                />
              </View>

              {/* Presiding Judge */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Presiding Judge</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Hon. Michael Adams"
                  placeholderTextColor={Colors.textSecondary}
                  value={judge}
                  onChangeText={setJudge}
                />
              </View>
            </View>

            {/* Section 3: Dates & Hearings */}
            <View style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <Ionicons name="calendar-outline" size={20} color={Colors.primary} />
                <Text style={styles.sectionTitle}>Key Dates</Text>
              </View>

              {/* Next Hearing Date */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Next Hearing Date</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Sep 15, 2025"
                  placeholderTextColor={Colors.textSecondary}
                  value={nextHearing}
                  onChangeText={setNextHearing}
                />
              </View>

              {/* Start Date */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Filing / Start Date</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Aug 26, 2025"
                  placeholderTextColor={Colors.textSecondary}
                  value={startDate}
                  onChangeText={setStartDate}
                />
              </View>
            </View>

            {/* Section 4: Notes */}
            <View style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <Ionicons name="document-text-outline" size={20} color={Colors.primary} />
                <Text style={styles.sectionTitle}>Summary & Notes</Text>
              </View>

              <View style={styles.inputGroup}>
                <TextInput
                  style={[styles.input, styles.multilineInput]}
                  placeholder="Add case summary or initial legal notes..."
                  placeholderTextColor={Colors.textSecondary}
                  value={notes}
                  onChangeText={setNotes}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>
            </View>

            {/* Primary Action Button */}
            <Pressable
              style={({ pressed }) => [
                styles.submitButton,
                pressed && styles.submitButtonPressed,
              ]}
              onPress={handleSave}
            >
              <Ionicons name="checkmark-circle-outline" size={22} color={Colors.white} />
              <Text style={styles.submitButtonText}>Create Case</Text>
            </Pressable>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.primary,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.white,
  },
  saveHeaderButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: Radius.full,
    backgroundColor: Colors.gold,
  },
  saveHeaderButtonText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 14,
  },

  // Scroll Content
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },

  // Section Card
  sectionCard: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    ...Shadow.card,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
    paddingBottom: Spacing.xs + 2,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.textPrimary,
  },

  // Form Inputs
  inputGroup: {
    marginBottom: Spacing.md,
  },
  label: {
    ...Typography.caption,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  required: {
    color: Colors.accentRed,
  },
  input: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  multilineInput: {
    minHeight: 100,
  },

  // Chips
  chipRow: {
    flexDirection: 'row',
    gap: Spacing.xs + 2,
  },
  chipRowHorizontal: {
    gap: Spacing.xs + 2,
  },
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    borderRadius: Radius.full,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipActiveStatus: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  chipTextActive: {
    color: Colors.white,
  },

  // Submit Button
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: Radius.md,
    marginTop: Spacing.sm,
    marginBottom: Spacing.xl,
    ...Shadow.card,
  },
  submitButtonPressed: {
    backgroundColor: Colors.primaryLight,
  },
  submitButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
