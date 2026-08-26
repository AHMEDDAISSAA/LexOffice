import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
console.disableYellowBox = true;

const CELL_SIZE = 42;

export const getStyles = (colors) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.primary },
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingBottom: Spacing.xl },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: colors.primary,
  },
  headerTitle: { fontSize: 22, fontWeight: '700', color: colors.white },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Month nav
  monthNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
  },
  navBtn: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.card,
  },
  monthLabel: { fontSize: 17, fontWeight: '700', color: colors.textPrimary },

  // Day names
  dayNames: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  dayName: {
    flex: 1,
    textAlign: 'center',
    ...Typography.caption,
    fontWeight: '700',
    color: colors.textSecondary,
  },

  // Grid
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.lg,
    rowGap: 6,
    marginBottom: Spacing.lg,
  },
  cell: {
    width: `${100 / 7}%`,
    height: CELL_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.full,
  },
  cellSelected: {
    backgroundColor: colors.primary,
  },
  cellToday: {
    backgroundColor: colors.primary + '18',
  },
  cellText: { fontSize: 14, color: colors.textPrimary, fontWeight: '500' },
  cellTextSelected: { color: colors.white, fontWeight: '700' },
  cellTextToday: { color: colors.primary, fontWeight: '700' },
  eventDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.accentOrange,
    marginTop: 2,
  },
  eventDotSelected: { backgroundColor: colors.white },

  // Events section
  eventsSection: {
    paddingHorizontal: Spacing.lg,
  },
  eventsDayLabel: {
    ...Typography.caption,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: Spacing.md,
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: Radius.lg,
    marginBottom: Spacing.sm,
    overflow: 'hidden',
    ...Shadow.card,
  },
  timeCol: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    minWidth: 80,
  },
  eventTime: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  eventStrip: {
    width: 4,
    alignSelf: 'stretch',
  },
  eventContent: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  eventTitle: { ...Typography.h3, color: colors.textPrimary },
  eventSub: { ...Typography.caption, color: colors.textSecondary, marginTop: 2 },
  eventMenu: { padding: Spacing.md },

  // Add event
  addEventBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    justifyContent: 'center',
  },
  addEventText: { ...Typography.body, color: colors.primary, fontWeight: '600' },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: colors.card,
    borderTopLeftRadius: Radius.lg * 1.5,
    borderTopRightRadius: Radius.lg * 1.5,
    padding: Spacing.lg,
    paddingBottom: Spacing.xl + 10,
    ...Shadow.card,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  closeBtn: {
    padding: 4,
  },
  fieldGroup: {
    marginBottom: Spacing.md,
  },
  fieldLabel: {
    ...Typography.caption,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 6,
  },
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.textPrimary,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  categoryChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  categoryChipTextActive: {
    color: colors.white,
  },
  modalActions: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  submitButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: Radius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.white,
  },
  emptyEventsText: {
    ...Typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    marginVertical: Spacing.md,
    fontStyle: 'italic',
  },
});
