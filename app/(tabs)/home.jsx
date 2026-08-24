import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, Radius, Shadow } from '../../constants/spacing';

const stats = [
  { label: 'Cases', value: '34', icon: 'briefcase-outline', color: Colors.primary },
  { label: "Today's Meetings", value: '4', icon: 'calendar-outline', color: Colors.accentGreen },
  { label: 'Pending Documents', value: '18', icon: 'document-text-outline', color: Colors.accentOrange },
  { label: 'Unpaid Invoices', value: '6', icon: 'cash-outline', color: Colors.accentRed },
];

const quickActions = [
  { label: 'New Case', icon: 'briefcase-outline' },
  { label: 'Upload Doc', icon: 'cloud-upload-outline' },
  { label: 'New Client', icon: 'person-add-outline' },
  { label: 'Schedule', icon: 'calendar-outline' },
];

const recentCases = [
  { id: '1', title: 'Corporate vs Smith', type: 'Corporate Law', next: 'Aug 25, 2025', status: 'Active' },
  { id: '2', title: 'Divorce Settlement', type: 'Emma Johnson', next: 'Aug 25, 2025', status: 'Active' },
  { id: '3', title: 'Land Dispute Case', type: 'ABC Company', next: 'Sep 02, 2025', status: 'Pending' },
];

const statusColor = {
  Active: Colors.accentGreen,
  Pending: Colors.accentOrange,
  Closed: Colors.textSecondary,
};

export default function Home() {
  const router = useRouter();
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar style="light" animated={true} />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Good Morning,</Text>
              <Text style={styles.name}>Ahmedddd aissa 👋</Text>
            </View>
            <Pressable style={styles.notifButton}>
              <Ionicons name="notifications-outline" size={22} color={Colors.white} />
              <View style={styles.notifBadge} />
            </Pressable>
          </View>

          {/* Date */}
          <Text style={styles.dateText}>{today}</Text>

        {/* Stats grid */}
        <View style={styles.statsGrid}>
          {stats.map((s, i) => (
            <View key={i} style={styles.statCard}>
              <View style={[styles.statIconWrap, { backgroundColor: s.color + '18' }]}>
                <Ionicons name={s.icon} size={22} color={s.color} />
              </View>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </View>
        <View style={styles.quickActions}>
          {quickActions.map((a, i) => (
            <Pressable
              key={i}
              style={styles.quickActionItem}
              onPress={() => {
                if (a.label === 'New Client') router.push('/clients');
              }}
            >
              <Pressable
              key={i}
              style={styles.quickActionItem}
              onPress={() => {
                if (a.label === 'New Case') router.push('/new-case');
              }}
            ></Pressable>
              <View style={styles.quickActionIcon}>
                <Ionicons name={a.icon} size={22} color={Colors.primary} />
              </View>
              <Text style={styles.quickActionLabel}>{a.label}</Text>
            </Pressable>
          ))}
        </View>
        

        {/* Recent Cases */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Cases</Text>
          <Pressable>
            <Text style={styles.seeAll}>See All</Text>
          </Pressable>
        </View>
        <View style={styles.caseList}>
          {recentCases.map((c) => (
            <Pressable
              key={c.id}
              style={({ pressed }) => [styles.caseCard, pressed && { opacity: 0.85 }]}
              onPress={() => router.push(`/case-details/${c.id}`)}
            >
              <View style={styles.caseIconWrap}>
                <Ionicons name="document-text-outline" size={20} color={Colors.primary} />
              </View>
              <View style={styles.caseInfo}>
                <Text style={styles.caseTitle}>{c.title}</Text>
                <Text style={styles.caseMeta}>{c.type}</Text>
                <Text style={styles.caseNext}>Next Hearing: {c.next}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: statusColor[c.status] + '20' }]}>
                <Text style={[styles.statusText, { color: statusColor[c.status] }]}>{c.status}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.primary },
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingBottom: Spacing.xl },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: 40,
  },
  greeting: { fontSize: 14, color: 'rgba(255,255,255,0.7)' },
  name: { fontSize: 22, fontWeight: '700', color: Colors.white, marginTop: 2 },
  notifButton: {
    width: 42,
    height: 42,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifBadge: {
    position: 'absolute',
    top: 8,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accentOrange,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  dateText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    paddingHorizontal: Spacing.lg,
    marginTop: -28,
    marginBottom: Spacing.sm,
  },

  // Stats
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
    marginTop: 30,
  },
  statCard: {
    width: '47%',
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    ...Shadow.card,
  },
  statIconWrap: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  statValue: { fontSize: 26, fontWeight: '700', color: Colors.textPrimary },
  statLabel: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },

  // Sections
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  sectionTitle: { ...Typography.h3, color: Colors.textPrimary },
  seeAll: { ...Typography.caption, color: Colors.primary, fontWeight: '600' },

  // Quick Actions
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: Spacing.md,
  },
  quickActionItem: { alignItems: 'center', gap: 6 },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: Radius.lg,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.card,
  },
  quickActionLabel: { ...Typography.caption, color: Colors.textSecondary, textAlign: 'center' },

  // Cases
  caseList: { paddingHorizontal: Spacing.lg, gap: Spacing.sm },
  caseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    gap: Spacing.sm,
    ...Shadow.card,
  },
  caseIconWrap: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    backgroundColor: Colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  caseInfo: { flex: 1 },
  caseTitle: { ...Typography.h3, color: Colors.textPrimary },
  caseMeta: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  caseNext: { ...Typography.caption, color: Colors.textSecondary, marginTop: 1 },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.sm,
  },
  statusText: { fontSize: 11, fontWeight: '700' },
});
