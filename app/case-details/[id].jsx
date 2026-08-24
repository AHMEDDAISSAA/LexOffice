import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { mockCases } from '../../data/mockCases';

const DETAIL_TABS = ['Overview', 'Documents', 'Timeline', 'Notes', 'Invoices'];

const STATUS_COLOR = {
  Active: Colors.accentGreen,
  Pending: Colors.accentOrange,
  Closed: Colors.textSecondary,
};


function InfoRow({ label, value }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value ?? '—'}</Text>
    </View>
  );
}

export default function CaseDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState('Overview');

  const caseData = mockCases.find((c) => c.id === id) ?? mockCases[0];
  const statusColor = STATUS_COLOR[caseData.status] ?? Colors.textSecondary;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar style="light" animated={true} />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace('/(tabs)/cases');
              }
            }}
            style={styles.backBtn}
          >
            <Ionicons name="arrow-back" size={20} color={Colors.white} />
          </Pressable>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle} numberOfLines={1}>{caseData.title}</Text>
            <Text style={styles.headerSub}>Case # {caseData.id}</Text>
          </View>
          <Pressable style={styles.menuBtn}>
            <Ionicons name="ellipsis-vertical" size={20} color={Colors.white} />
          </Pressable>
        </View>

        {/* Status banner */}
        <View style={[styles.statusBanner, { backgroundColor: statusColor + '18' }]}>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          <Text style={[styles.statusText, { color: statusColor }]}>{caseData.status}</Text>
          {caseData.nextHearing && (
            <>
              <View style={styles.bannerSep} />
              <Ionicons name="calendar-outline" size={13} color={Colors.textSecondary} />
              <Text style={styles.bannerDate}>Next Hearing: {caseData.nextHearing}</Text>
            </>
          )}
        </View>

        {/* Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabsScroll}
          contentContainerStyle={styles.tabsContent}
        >
          {DETAIL_TABS.map((tab) => (
            <Pressable
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab}
              </Text>
            </Pressable>
          ))}
        </ScrollView>


        <ScrollView
          key={activeTab}
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
        >
  {activeTab === 'Overview' && (

            <>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>Case Information</Text>
                <InfoRow label="Client" value={caseData.client} />
                <InfoRow label="Opposing Party" value={caseData.opposingParty} />
                <InfoRow label="Court" value={caseData.court} />
                <InfoRow label="Judge" value={caseData.judge} />
                <InfoRow label="Start Date" value={caseData.startDate} />
                <InfoRow label="Next Hearing" value={caseData.nextHearing} />
                <InfoRow label="Case Type" value={caseData.caseType} />
              </View>

            
              <View style={styles.actionsRow}>
                {[
                  { icon: 'document-text-outline', label: 'Add Doc' },
                  { icon: 'calendar-outline', label: 'Schedule' },
                  { icon: 'create-outline', label: 'Add Note' },
                  { icon: 'cash-outline', label: 'Invoice' },
                ].map((a) => (
                  <Pressable key={a.label} style={styles.actionItem}>
                    <View style={styles.actionIcon}>
                      <Ionicons name={a.icon} size={20} color={Colors.primary} />
                    </View>
                    <Text style={styles.actionLabel}>{a.label}</Text>
                  </Pressable>
                ))}
              </View>

              {/* Recent activity */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Recent Activity</Text>
                {[
                  { icon: 'document-attach-outline', text: 'Employment Contract.pdf added', time: '2 days ago', color: Colors.primary },
                  { icon: 'calendar-outline', text: 'Hearing scheduled for Aug 25', time: '3 days ago', color: Colors.accentGreen },
                  { icon: 'create-outline', text: 'Case notes updated', time: '1 week ago', color: Colors.accentOrange },
                ].map((a, i) => (
                  <View key={i} style={[styles.activityRow, i > 0 && styles.activityBorder]}>
                    <View style={[styles.activityIcon, { backgroundColor: a.color + '18' }]}>
                      <Ionicons name={a.icon} size={16} color={a.color} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.activityText}>{a.text}</Text>
                      <Text style={styles.activityTime}>{a.time}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </>
          )}

          {activeTab === 'Documents' && (
            
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Case Documents</Text>
              {['Employment Contract.pdf', 'Evidence_01.pdf', 'Court Notice.pdf'].map((doc, i) => (
                <View key={i} style={[styles.docRow, i > 0 && styles.activityBorder]}>
                  <View style={styles.docIcon}>
                    <Ionicons name="document-text" size={20} color={Colors.accentRed} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.docName}>{doc}</Text>
                    <Text style={styles.docMeta}>PDF · Added recently</Text>
                  </View>
                  <Ionicons name="download-outline" size={18} color={Colors.textSecondary} />
                </View>
              ))}
            </View>
          )}

          {activeTab === 'Timeline' && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Case Timeline</Text>
              {[
                { date: 'Jan 15, 2025', event: 'Case Opened', done: true },
                { date: 'Feb 10, 2025', event: 'Initial Hearing', done: true },
                { date: 'Apr 20, 2025', event: 'Document Submission', done: true },
                { date: 'Aug 25, 2025', event: 'Next Court Hearing', done: false },
              ].map((t, i, arr) => (
                <View key={i} style={styles.timelineItem}>
                  <View style={styles.timelineLeft}>
                    <View style={[styles.timelineDot, t.done && styles.timelineDotDone]} />
                    {i < arr.length - 1 && <View style={styles.timelineLine} />}
                  </View>
                  <View style={styles.timelineContent}>
                    <Text style={styles.timelineDate}>{t.date}</Text>
                    <Text style={styles.timelineEvent}>{t.event}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {(activeTab === 'Notes' || activeTab === 'Invoices') && (
            <View style={styles.emptyTab}>
              <Ionicons name="document-outline" size={48} color={Colors.border} />
              <Text style={styles.emptyTabText}>No {activeTab.toLowerCase()} yet</Text>
              <Pressable style={styles.emptyTabBtn}>
                <Text style={styles.emptyTabBtnText}>+ Add {activeTab.slice(0, -1)}</Text>
              </Pressable>
            </View>
          )}
        </ScrollView>

        {/* Edit button */}
        <View style={styles.footer}>
          <Pressable style={styles.editBtn}>
            <Ionicons name="create-outline" size={18} color={Colors.white} />
            <Text style={styles.editBtnText}>Edit Case</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.primary },
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingTop: Spacing.xs, paddingBottom: Spacing.xl },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.primary,
    gap: Spacing.sm,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: { flex: 1 },
  headerTitle: { fontSize: 17, fontWeight: '700', color: Colors.white },
  headerSub: { ...Typography.caption, color: 'rgba(255,255,255,0.65)' },
  menuBtn: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Status banner
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  statusText: { fontSize: 13, fontWeight: '700' },
  bannerSep: { width: 1, height: 14, backgroundColor: Colors.border, marginHorizontal: 4 },
  bannerDate: { ...Typography.caption, color: Colors.textSecondary },

  // Tabs
  tabsScroll: {
    height: 48,
    flexGrow: 0,
    flexShrink: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tabsContent: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  tab: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    justifyContent: 'center',
    height: 48,
  },
  tabActive: { borderBottomColor: Colors.primary },
  tabText: { ...Typography.body, color: Colors.textSecondary, fontWeight: '500' },
  tabTextActive: { color: Colors.primary, fontWeight: '700' },

  // Card
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.sm,
    ...Shadow.card,
  },
  cardTitle: { ...Typography.h3, color: Colors.textPrimary, marginBottom: Spacing.md },

  // Info rows
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  infoLabel: { ...Typography.body, color: Colors.textSecondary },
  infoValue: { ...Typography.body, color: Colors.textPrimary, fontWeight: '500', flex: 1, textAlign: 'right' },

  // Quick actions
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.md,
  },
  actionItem: { alignItems: 'center', gap: 6 },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: Radius.lg,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.card,
  },
  actionLabel: { ...Typography.caption, color: Colors.textSecondary },

  // Activity
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
  },
  activityBorder: { borderTopWidth: 1, borderTopColor: Colors.border },
  activityIcon: {
    width: 34,
    height: 34,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityText: { ...Typography.body, color: Colors.textPrimary },
  activityTime: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },

  // Documents tab
  docRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
  },
  docIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    backgroundColor: Colors.accentRed + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  docName: { ...Typography.body, color: Colors.textPrimary, fontWeight: '500' },
  docMeta: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },

  // Timeline
  timelineItem: { flexDirection: 'row', gap: Spacing.md, paddingBottom: Spacing.md },
  timelineLeft: { alignItems: 'center', width: 20 },
  timelineDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.border,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  timelineDotDone: { backgroundColor: Colors.accentGreen, borderColor: Colors.accentGreen },
  timelineLine: { width: 2, flex: 1, backgroundColor: Colors.border, marginTop: 4 },
  timelineContent: { flex: 1, paddingTop: -2 },
  timelineDate: { ...Typography.caption, color: Colors.textSecondary },
  timelineEvent: { ...Typography.body, color: Colors.textPrimary, fontWeight: '500', marginTop: 2 },

  // Empty tab
  emptyTab: {
    alignItems: 'center',
    paddingTop: Spacing.xl,
    gap: Spacing.sm,
  },
  emptyTabText: { ...Typography.body, color: Colors.textSecondary },
  emptyTabBtn: {
    marginTop: Spacing.sm,
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
  },
  emptyTabBtnText: { color: Colors.white, fontWeight: '600' },

  // Footer
  footer: {
    backgroundColor: Colors.card,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    padding: Spacing.md,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    paddingVertical: 14,
  },
  editBtnText: { color: Colors.white, fontSize: 16, fontWeight: '700' },
});
