import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { mockEvents } from '../../data/mockEvents';

// Build a simple August 2025 calendar
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const TODAY = 26; // highlight today (jour fixe pour la démo)

const EVENT_COLORS = {
  'Court Hearing': Colors.accentRed,
  'Client Meeting': Colors.accentGreen,
  'Contract Review': Colors.accentOrange,
  'Deadline': Colors.primary,
};

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 7, 1)); // Août 2025
  const [selectedDay, setSelectedDay] = useState(26);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthLabel = `${MONTH_NAMES[month]} ${year}`;
  const startDay = new Date(year, month, 1).getDay(); // jour de la semaine du 1er
  const totalDays = new Date(year, month + 1, 0).getDate(); // nb de jours du mois

  const goPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Build grid cells
  const cells = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);

  const selectedEvents = mockEvents;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar style="light" animated={true} />
      <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Calendar</Text>
        <Pressable style={styles.addButton}>
          <Ionicons name="add" size={22} color={Colors.white} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Month nav */}
        <View style={styles.monthNav}>
        <Pressable style={styles.navBtn} onPress={goPrevMonth}>
          <Ionicons name="chevron-back" size={18} color={Colors.textPrimary} />
        </Pressable>
        <Text style={styles.monthLabel}>{monthLabel}</Text>
        <Pressable style={styles.navBtn} onPress={goNextMonth}>
          <Ionicons name="chevron-forward" size={18} color={Colors.textPrimary} />
        </Pressable>
      </View>

        {/* Day names */}
        <View style={styles.dayNames}>
          {DAYS.map((d, i) => (
            <Text key={i} style={styles.dayName}>{d}</Text>
          ))}
        </View>

        {/* Calendar grid */}
        <View style={styles.grid}>
          {cells.map((day, idx) => (
            <Pressable
              key={idx}
              style={[
                styles.cell,
                day === selectedDay && styles.cellSelected,
                day === TODAY && day !== selectedDay && styles.cellToday,
              ]}
              onPress={() => day && setSelectedDay(day)}
              disabled={!day}
            >
              {day && (
                <>
                  <Text
                    style={[
                      styles.cellText,
                      day === selectedDay && styles.cellTextSelected,
                      day === TODAY && day !== selectedDay && styles.cellTextToday,
                    ]}
                  >
                    {day}
                  </Text>
                  {/* Event dot */}
                  {(day === 26 || day === 20 || day === 15) && (
                    <View
                      style={[
                        styles.eventDot,
                        day === selectedDay && styles.eventDotSelected,
                      ]}
                    />
                  )}
                </>
              )}
            </Pressable>
          ))}
        </View>

        {/* Selected day events */}
        <View style={styles.eventsSection}>
          <Text style={styles.eventsDayLabel}>
            {MONTH_NAMES[month]} {selectedDay}, {year}
          </Text>

          {selectedEvents.map((event) => {
            const color = EVENT_COLORS[event.title] ?? Colors.primary;
            return (
              <View key={event.id} style={styles.eventCard}>
                {/* Time column */}
                <View style={styles.timeCol}>
                  <Text style={styles.eventTime}>{event.time}</Text>
                </View>

                {/* Color strip */}
                <View style={[styles.eventStrip, { backgroundColor: color }]} />

                {/* Content */}
                <View style={styles.eventContent}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventSub}>{event.subtitle}</Text>
                </View>

                <Pressable style={styles.eventMenu}>
                  <Ionicons name="ellipsis-vertical" size={16} color={Colors.textSecondary} />
                </Pressable>
              </View>
            );
          })}

          {/* Add event button */}
          <Pressable style={styles.addEventBtn}>
            <Ionicons name="add-circle" size={20} color={Colors.primary} />
            <Text style={styles.addEventText}>Add Event</Text>
          </Pressable>
        </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const CELL_SIZE = 42;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.primary },
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingBottom: Spacing.xl },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.primary,
  },
  headerTitle: { fontSize: 22, fontWeight: '700', color: Colors.white },
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
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.card,
  },
  monthLabel: { fontSize: 17, fontWeight: '700', color: Colors.textPrimary },

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
    color: Colors.textSecondary,
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
    backgroundColor: Colors.primary,
  },
  cellToday: {
    backgroundColor: Colors.primary + '18',
  },
  cellText: { fontSize: 14, color: Colors.textPrimary, fontWeight: '500' },
  cellTextSelected: { color: Colors.white, fontWeight: '700' },
  cellTextToday: { color: Colors.primary, fontWeight: '700' },
  eventDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.accentOrange,
    marginTop: 2,
  },
  eventDotSelected: { backgroundColor: Colors.white },

  // Events section
  eventsSection: {
    paddingHorizontal: Spacing.lg,
  },
  eventsDayLabel: {
    ...Typography.caption,
    fontWeight: '700',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: Spacing.md,
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
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
    color: Colors.textSecondary,
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
  eventTitle: { ...Typography.h3, color: Colors.textPrimary },
  eventSub: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  eventMenu: { padding: Spacing.md },

  // Add event
  addEventBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    justifyContent: 'center',
  },
  addEventText: { ...Typography.body, color: Colors.primary, fontWeight: '600' },
});
