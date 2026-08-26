import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { mockCases } from '../../data/mockCases';
import { useI18n } from '../../constants/i18n';
import { useTheme } from '../../constants/theme';

const TABS = ['All', 'Active', 'Pending', 'Closed'];

const STATUS_COLOR = {
  Active: Colors.accentGreen,
  Pending: Colors.accentOrange,
  Closed: Colors.textSecondary,
};

const CASE_ICON = {
  Active: 'briefcase',
  Pending: 'time',
  Closed: 'checkmark-circle',
};

export default function Cases() {
  const router = useRouter();
  const { t } = useI18n();
  const { colors, isDark } = useTheme();
  const styles = createStyles(colors);
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = mockCases.filter((c) => {
    const matchTab = activeTab === 'All' || c.status === activeTab;
    const matchSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.client.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const counts = TABS.reduce((acc, t) => {
    acc[t] = t === 'All' ? mockCases.length : mockCases.filter((c) => c.status === t).length;
    return acc;
  }, {});

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar style="light" animated={true} />
      <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('cases.title')}</Text>
        <Pressable style={styles.addButton} onPress={() => router.push('/add-case')}>
          <Ionicons name="add" size={22} color={Colors.white} />
        </Pressable>
      </View>

      {/* Search */}
      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={18} color={Colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={t('cases.searchPlaceholder')}
          placeholderTextColor={Colors.textSecondary}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <Pressable onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={18} color={Colors.textSecondary} />
          </Pressable>
        )}
      </View>

      {/* Filter tabs */}
      <View style={styles.tabsRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
          {TABS.map((tab) => (
            <Pressable
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {t(`cases.${tab.toLowerCase()}`)}
              </Text>
              <View style={[styles.tabBadge, activeTab === tab && styles.tabBadgeActive]}>
                <Text style={[styles.tabBadgeText, activeTab === tab && styles.tabBadgeTextActive]}>
                  {counts[tab]}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Cases list */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="folder-open-outline" size={52} color={Colors.border} />
            <Text style={styles.emptyText}>{t('cases.noCasesFound')}</Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            onPress={() => router.push(`/case-details/${item.id}`)}
          >
            {/* Left icon */}
            <View style={[styles.cardIcon, { backgroundColor: STATUS_COLOR[item.status] + '18' }]}>
              <Ionicons name={CASE_ICON[item.status]} size={20} color={STATUS_COLOR[item.status]} />
            </View>

            {/* Info */}
            <View style={styles.cardInfo}>
              <View style={styles.cardTopRow}>
                <Text style={styles.cardId}>Case #{item.id}</Text>
                <View style={[styles.badge, { backgroundColor: STATUS_COLOR[item.status] + '20' }]}>
                  <View style={[styles.dot, { backgroundColor: STATUS_COLOR[item.status] }]} />
                  <Text style={[styles.badgeText, { color: STATUS_COLOR[item.status] }]}>
                    {item.status}
                  </Text>
                </View>
              </View>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardClient}>{item.client}</Text>
              {item.nextHearing && (
                <View style={styles.hearingRow}>
                  <Ionicons name="calendar-outline" size={12} color={colors.textSecondary} />
                  <Text style={styles.hearingText}>Next: {item.nextHearing}</Text>
                </View>
              )}
            </View>

            <Ionicons name="chevron-forward" size={18} color={colors.border} />
          </Pressable>
        )}
      />
      </View>
    </SafeAreaView>
  );
}

const createStyles = (colors) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.primary },
  container: { flex: 1, backgroundColor: colors.background },

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

  // Search
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    height: 46,
    ...Shadow.card,
  },
  searchIcon: { marginRight: Spacing.sm },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
  },

  // Tabs
  tabsRow: { marginBottom: Spacing.sm },
  tabsScroll: { paddingHorizontal: Spacing.lg, gap: Spacing.sm },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    borderRadius: Radius.full,
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  tabActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tabText: { ...Typography.caption, fontWeight: '600', color: colors.textSecondary },
  tabTextActive: { color: colors.white },
  tabBadge: {
    minWidth: 20,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  tabBadgeActive: { backgroundColor: 'rgba(255,255,255,0.25)' },
  tabBadgeText: { fontSize: 10, fontWeight: '700', color: colors.textSecondary },
  tabBadgeTextActive: { color: colors.white },

  // List
  list: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xl, gap: Spacing.sm },

  // Card
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    gap: Spacing.sm,
    ...Shadow.card,
  },
  cardPressed: { opacity: 0.85 },
  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardInfo: { flex: 1 },
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 },
  cardId: { ...Typography.caption, color: colors.textSecondary },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.full,
  },
  dot: { width: 6, height: 6, borderRadius: 3 },
  badgeText: { fontSize: 11, fontWeight: '700' },
  cardTitle: { ...Typography.h3, color: colors.textPrimary, marginBottom: 2 },
  cardClient: { ...Typography.caption, color: colors.textSecondary },
  hearingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  hearingText: { ...Typography.caption, color: colors.textSecondary },

  // Empty
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 80, gap: Spacing.sm },
  emptyText: { ...Typography.body, color: colors.textSecondary },
});
