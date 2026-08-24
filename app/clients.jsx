import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Spacing, Radius, Shadow } from '../constants/spacing';
import { mockClients } from '../data/mockClients';

const CLIENT_TYPE_COLORS = {
  'Corporate Client': Colors.primary,
  'Civil Client': Colors.accentGreen,
  'Criminal Client': Colors.accentRed,
  'Real Estate Client': Colors.accentOrange,
};

function ClientAvatar({ name, color }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  return (
    <View style={[styles.avatar, { backgroundColor: color + '22' }]}>
      <Text style={[styles.avatarText, { color }]}>{initials}</Text>
    </View>
  );
}

export default function ClientsScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filtered = mockClients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar style="light" animated={true} />
      <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace('/(tabs)/home');
              }
            }}
            style={styles.backBtn}
          >
            <Ionicons name="arrow-back" size={20} color={Colors.white} />
          </Pressable>
          <Text style={styles.headerTitle}>Clients</Text>
        </View>
        <Pressable style={styles.addButton}>
          <Ionicons name="add" size={22} color={Colors.white} />
        </Pressable>
      </View>

      {/* Search */}
      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={18} color={Colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search clients..."
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

      {/* Stats row */}
      <View style={styles.statsRow}>
        <View style={styles.statPill}>
          <Text style={styles.statNum}>{mockClients.length}</Text>
          <Text style={styles.statLbl}>Total</Text>
        </View>
        <View style={styles.statPill}>
          <Text style={styles.statNum}>
            {mockClients.reduce((s, c) => s + c.activeCases, 0)}
          </Text>
          <Text style={styles.statLbl}>Active Cases</Text>
        </View>
        <View style={styles.statPill}>
          <Text style={styles.statNum}>3</Text>
          <Text style={styles.statLbl}>Corporate</Text>
        </View>
      </View>

      {/* Client list */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="people-outline" size={52} color={Colors.border} />
            <Text style={styles.emptyText}>No clients found</Text>
          </View>
        }
        renderItem={({ item }) => {
          const color = CLIENT_TYPE_COLORS[item.type] ?? Colors.primary;
          return (
            <Pressable
              style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            >
              <ClientAvatar name={item.name} color={color} />

              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.typePill}>
                  <View style={[styles.typeDot, { backgroundColor: color }]} />
                  <Text style={[styles.typeText, { color }]}>{item.type}</Text>
                </View>
                <Text style={styles.casesText}>
                  Active Cases: {item.activeCases}
                </Text>
              </View>

              <Pressable style={styles.callBtn}>
                <Ionicons name="call-outline" size={16} color={Colors.primary} />
              </Pressable>

              <Ionicons name="chevron-forward" size={18} color={Colors.border} />
            </Pressable>
          );
        }}
      />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.primary },
  container: { flex: 1, backgroundColor: Colors.background },

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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
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
    backgroundColor: Colors.card,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    height: 46,
    ...Shadow.card,
  },
  searchIcon: { marginRight: Spacing.sm },
  searchInput: { flex: 1, fontSize: 14, color: Colors.textPrimary },

  // Stats
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  statPill: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: Radius.md,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    ...Shadow.card,
  },
  statNum: { fontSize: 20, fontWeight: '700', color: Colors.primary },
  statLbl: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },

  // List
  list: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xl, gap: Spacing.sm },

  // Card
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    gap: Spacing.sm,
    ...Shadow.card,
  },
  cardPressed: { opacity: 0.85 },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 17, fontWeight: '700' },
  info: { flex: 1 },
  name: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary, marginBottom: 4 },
  typePill: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 3 },
  typeDot: { width: 6, height: 6, borderRadius: 3 },
  typeText: { fontSize: 11, fontWeight: '600' },
  casesText: { ...Typography.caption, color: Colors.textSecondary },
  callBtn: {
    width: 34,
    height: 34,
    borderRadius: Radius.full,
    backgroundColor: Colors.primary + '12',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Empty
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 80, gap: Spacing.sm },
  emptyText: { ...Typography.body, color: Colors.textSecondary },
});