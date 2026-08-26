import { useState } from 'react';
import {View,Text,ScrollView,Pressable,Modal,TextInput,KeyboardAvoidingView,Platform,ActivityIndicator} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { getStyles } from './calendar_style';
import { useTheme } from '../../constants/theme';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const CATEGORIES = ['Court Hearing', 'Client Meeting', 'Contract Review', 'Deadline'];

const EVENT_COLORS = {
  'Court Hearing': Colors.accentRed,
  'Client Meeting': Colors.accentGreen,
  'Contract Review': Colors.accentOrange,
  'Deadline': Colors.primary,
};

const INITIAL_EVENTS = [
  { id: 'e1', day: 1, month: 7, year: 2025, time: '10:00 AM', title: 'Court Hearing', subtitle: 'Corporate vs Smith', category: 'Court Hearing' },
  { id: 'e2', day: 1, month: 7, year: 2025, time: '11:30 AM', title: 'Client Meeting', subtitle: 'John Smith', category: 'Client Meeting' },
  { id: 'e3', day: 1, month: 7, year: 2025, time: '02:00 PM', title: 'Contract Review', subtitle: 'Review employment contract', category: 'Contract Review' },
  { id: 'e4', day: 15, month: 7, year: 2025, time: '09:00 AM', title: 'Deadline', subtitle: 'File motion to dismiss', category: 'Deadline' },
  { id: 'e5', day: 20, month: 7, year: 2025, time: '03:00 PM', title: 'Client Meeting', subtitle: 'ABC Company Strategy', category: 'Client Meeting' },
];

export default function Calendar() {
  const { colors, isDark } = useTheme();
  const styles = getStyles(colors);
  const [currentDate, setCurrentDate] = useState(new Date(2025, 7, 1)); // August 2025
  const [selectedDay, setSelectedDay] = useState(1);
  const [events, setEvents] = useState(INITIAL_EVENTS);

  // Modal State
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newTime, setNewTime] = useState('10:00 AM');
  const [newCategory, setNewCategory] = useState('Court Hearing');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthLabel = `${MONTH_NAMES[month]} ${year}`;
  const startDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const todayDate = new Date();
  const isCurrentMonth = todayDate.getFullYear() === year && todayDate.getMonth() === month;
  const currentTodayDay = isCurrentMonth ? todayDate.getDate() : -1;

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

  // Filter events for selected day
  const selectedEvents = events.filter(
    (e) => e.day === selectedDay && e.month === month && e.year === year
  );

  const handleAddEvent = () => {
    if (!newTitle.trim()) return;

    const newEvent = {
      id: Date.now().toString(),
      day: selectedDay,
      month,
      year,
      title: newCategory,
      subtitle: newSubtitle.trim() ? `${newTitle.trim()} - ${newSubtitle.trim()}` : newTitle.trim(),
      time: newTime.trim() || '09:00 AM',
      category: newCategory,
    };

    setEvents((prev) => [...prev, newEvent]);
    setNewTitle('');
    setNewSubtitle('');
    setNewTime('10:00 AM');
    setModalVisible(false);
  };

  const handleDeleteEvent = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar style="light" animated={true} />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Calendar</Text>
          <Pressable style={styles.addButton} onPress={() => setModalVisible(true)}>
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
            {cells.map((day, idx) => {
              const hasEvents = day && events.some((e) => e.day === day && e.month === month && e.year === year);
              const isToday = day === currentTodayDay;

              return (
                <Pressable
                  key={idx}
                  style={[
                    styles.cell,
                    day === selectedDay && styles.cellSelected,
                    isToday && day !== selectedDay && styles.cellToday,
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
                          isToday && day !== selectedDay && styles.cellTextToday,
                        ]}
                      >
                        {day}
                      </Text>
                      {/* Event dot */}
                      {hasEvents && (
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
              );
            })}
          </View>

          {/* Selected day events */}
          <View style={styles.eventsSection}>
            <Text style={styles.eventsDayLabel}>
              {MONTH_NAMES[month]} {selectedDay}, {year}
            </Text>

            {selectedEvents.length === 0 ? (
              <Text style={styles.emptyEventsText}>No events scheduled for this day</Text>
            ) : (
              selectedEvents.map((event) => {
                const color = EVENT_COLORS[event.category] || EVENT_COLORS[event.title] || Colors.primary;
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

                    <Pressable
                      style={styles.eventMenu}
                      onPress={() => handleDeleteEvent(event.id)}
                    >
                      <Ionicons name="trash-outline" size={16} color={Colors.accentRed} />
                    </Pressable>
                  </View>
                );
              })
            )}

            {/* Add event button */}
            <Pressable style={styles.addEventBtn} onPress={() => setModalVisible(true)}>
              <Ionicons name="add-circle" size={20} color={Colors.primary} />
              <Text style={styles.addEventText}>Add Event</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>

      {/* Add Event Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContainer}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Event for {MONTH_NAMES[month]} {selectedDay}</Text>
              <Pressable style={styles.closeBtn} onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={22} color={Colors.textSecondary} />
              </Pressable>
            </View>

            {/* Event Category */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Category</Text>
              <View style={styles.categoryContainer}>
                {CATEGORIES.map((cat) => (
                  <Pressable
                    key={cat}
                    style={[
                      styles.categoryChip,
                      newCategory === cat && styles.categoryChipActive,
                    ]}
                    onPress={() => setNewCategory(cat)}
                  >
                    <Text
                      style={[
                        styles.categoryChipText,
                        newCategory === cat && styles.categoryChipTextActive,
                      ]}
                    >
                      {cat}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Event Title */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Event Title</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Hearing Preparation"
                placeholderTextColor={Colors.textSecondary}
                value={newTitle}
                onChangeText={setNewTitle}
              />
            </View>

            {/* Subtitle / Details */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Subtitle / Case Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Case #2025-001"
                placeholderTextColor={Colors.textSecondary}
                value={newSubtitle}
                onChangeText={setNewSubtitle}
              />
            </View>

            {/* Time */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Time</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. 10:00 AM"
                placeholderTextColor={Colors.textSecondary}
                value={newTime}
                onChangeText={setNewTime}
              />
            </View>

            {/* Modal Actions */}
            <View style={styles.modalActions}>
              <Pressable
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.submitButton,
                  !newTitle.trim() && { opacity: 0.5 },
                ]}
                disabled={!newTitle.trim()}
                onPress={handleAddEvent}
              >
                <Text style={styles.submitButtonText}>Save Event</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}




