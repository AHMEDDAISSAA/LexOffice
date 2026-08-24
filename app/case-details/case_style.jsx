import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, Radius, Shadow } from '../../constants/spacing';

export const styles = StyleSheet.create({
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
    paddingBottom: 40,
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