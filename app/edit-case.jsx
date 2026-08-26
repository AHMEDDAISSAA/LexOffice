import { useState, useEffect } from 'react';
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
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Spacing, Radius, Shadow } from '../constants/spacing';
import { mockCases } from '../data/mockCases';

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

export default function EditCase() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const caseData = mockCases.find((c) => c.id === id) || mockCases[0];

  const [title, setTitle] = useState(caseData?.title || '');
  const [client, setClient] = useState(caseData?.client || '');
  const [status, setStatus] = useState(caseData?.status || 'Active');
  const [caseType, setCaseType] = useState(caseData?.caseType || 'Corporate Law');
  const [opposingParty, setOpposingParty] = useState(caseData?.opposingParty || '');
  const [court, setCourt] = useState(caseData?.court || '');
  const [judge, setJudge] = useState(caseData?.judge || '');
  const [nextHearing, setNextHearing] = useState(caseData?.nextHearing || '');
  const [startDate, setStartDate] = useState(caseData?.startDate || '');
  const [notes, setNotes] = useState(caseData?.notes || '');

  useEffect(() => {
    if (caseData) {
      setTitle(caseData.title || '');
      setClient(caseData.client || '');
      setStatus(caseData.status || 'Active');
      setCaseType(caseData.caseType || 'Corporate Law');
      setOpposingParty(caseData.opposingParty || '');
      setCourt(caseData.court || '');
      setJudge(caseData.judge || '');
      setNextHearing(caseData.nextHearing || '');
      setStartDate(caseData.startDate || '');
      setNotes(caseData.notes || '');
    }
  }, [id]);

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Required Field', 'Please enter a case title.');
      return;
    }
    if (!client.trim()) {
      Alert.alert('Required Field', 'Please enter the client name.');
      return;
    }

    const index = mockCases.findIndex((c) => c.id === (id || caseData.id));
    if (index !== -1) {
      mockCases[index] = {
        ...mockCases[index],
        title: title.trim(),
        client: client.trim(),
        status,
        caseType,
        opposingParty: opposingParty.trim(),
        court: court.trim(),
        judge: judge.trim(),
        nextHearing: nextHearing.trim(),
        startDate: startDate.trim(),
        notes: notes.trim(),
      };
    }

    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/cases');
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Case',
      `Are you sure you want to delete Case #${caseData.id}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const index = mockCases.findIndex((c) => c.id === (id || caseData.id));
            if (index !== -1) {
              mockCases.splice(index, 1);
            }
            router.replace('/(tabs)/cases');
          },
        },
      ]
    );
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
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>Edit Case</Text>
              <Text style={styles.headerSub}>Case #{caseData.id}</Text>
            </View>
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
                <Ionicons name="create-outline" size={20} color={Colors.primary} />
                <Text style={styles.sectionTitle}>Case Details</Text>
              </View>

              {/* Case Title */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Case Title <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Case Title"
                  placeholderTextColor={Colors.textSecondary}
                  value={title}
                  onChangeText={setTitle}
                />
              </View>

              {/* Client Name */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Client Name <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Client Name"
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
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.chipRowHorizontal}
                >
                  {CASE_TYPES.map((ct) => (
                    <Pressable
                      key={ct}
                      style={[styles.chip, caseType === ct && styles.chipActive]}
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
                  placeholder="Opposing Party"
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
                  placeholder="Court Jurisdiction"
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
                  placeholder="Presiding Judge"
                  placeholderTextColor={Colors.textSecondary}
                  value={judge}
                  onChangeText={setJudge}
                />
              </View>
            </View>

            {/* Section 3: Dates */}
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
                  placeholder="e.g. Aug 28, 2025"
                  placeholderTextColor={Colors.textSecondary}
                  value={nextHearing}
                  onChangeText={setNextHearing}
                />
              </View>

              {/* Start Date */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Start Date</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Jan 15, 2025"
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
                  placeholder="Case notes or summary..."
                  placeholderTextColor={Colors.textSecondary}
                  value={notes}
                  onChangeText={setNotes}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>
            </View>

            {/* Save & Delete Buttons */}
            <Pressable
              style={({ pressed }) => [
                styles.saveButton,
                pressed && styles.saveButtonPressed,
              ]}
              onPress={handleSave}
            >
              <Ionicons name="save-outline" size={20} color={Colors.white} />
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.deleteButton,
                pressed && styles.deleteButtonPressed,
              ]}
              onPress={handleDelete}
            >
              <Ionicons name="trash-outline" size={20} color={Colors.accentRed} />
              <Text style={styles.deleteButtonText}>Delete Case</Text>
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
  headerTitleContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.white,
  },
  headerSub: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
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
    minHeight: 90,
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

  // Buttons
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: Radius.md,
    marginTop: Spacing.xs,
    ...Shadow.card,
  },
  saveButtonPressed: {
    backgroundColor: Colors.primaryLight,
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.card,
    borderWidth: 1.5,
    borderColor: Colors.accentRed + '40',
    paddingVertical: 14,
    borderRadius: Radius.md,
    marginBottom: Spacing.xl,
  },
  deleteButtonPressed: {
    backgroundColor: Colors.accentRed + '10',
  },
  deleteButtonText: {
    color: Colors.accentRed,
    fontSize: 15,
    fontWeight: '600',
  },
});
