import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { mockUser } from '../../data/mockUser';

const MENU_SECTIONS = [
  {
    title: 'Account',
    items: [
      { icon: 'person-outline', label: 'Personal Information', route: null },
      { icon: 'business-outline', label: 'Law Firm', route: null },
    ],
  },
  {
    title: 'Security',
    items: [
      { icon: 'shield-checkmark-outline', label: 'Security', route: null },
      { icon: 'notifications-outline', label: 'Notifications', route: null },
    ],
  },
  {
    title: 'Billing',
    items: [
      { icon: 'card-outline', label: 'Subscription', route: null },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: 'help-circle-outline', label: 'Help & Support', route: null },
      { icon: 'log-out-outline', label: 'Logout', route: '/(auth)/sign-in', danger: true },
    ],
  },
];

function InitialAvatar({ name }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  return (
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>{initials}</Text>
    </View>
  );
}

export default function Profile() {
  const router = useRouter();
  const user = mockUser;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar style="light" animated={true} />
      <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Hero card */}
        <View style={styles.heroCard}>
          <InitialAvatar name={user.fullName} />
          <Text style={styles.heroName}>{user.fullName}</Text>
          <Text style={styles.heroRole}>{user.role}</Text>

          {/* Quick info row */}
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="briefcase-outline" size={16} color={Colors.gold} />
              <Text style={styles.infoText}>34 Cases</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoItem}>
              <Ionicons name="people-outline" size={16} color={Colors.gold} />
              <Text style={styles.infoText}>5 Clients</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoItem}>
              <Ionicons name="star-outline" size={16} color={Colors.gold} />
              <Text style={styles.infoText}>4.9 ★</Text>
            </View>
          </View>
        </View>

        {/* Contact info pills */}
        <View style={styles.contactRow}>
          <View style={styles.contactPill}>
            <Ionicons name="mail-outline" size={14} color={Colors.primary} />
            <Text style={styles.contactText} numberOfLines={1}>{user.email}</Text>
          </View>
          <View style={styles.contactPill}>
            <Ionicons name="call-outline" size={14} color={Colors.primary} />
            <Text style={styles.contactText}>{user.phone}</Text>
          </View>
        </View>

        {/* Menu sections */}
        {MENU_SECTIONS.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionLabel}>{section.title}</Text>
            <View style={styles.menuCard}>
              {section.items.map((item, idx) => (
                <Pressable
                  key={item.label}
                  style={({ pressed }) => [
                    styles.menuItem,
                    idx < section.items.length - 1 && styles.menuItemBorder,
                    pressed && styles.menuItemPressed,
                  ]}
                  onPress={() => item.route && router.replace(item.route)}
                >
                  <View style={[styles.menuIconWrap, item.danger && styles.menuIconDanger]}>
                    <Ionicons
                      name={item.icon}
                      size={18}
                      color={item.danger ? Colors.accentRed : Colors.primary}
                    />
                  </View>
                  <Text style={[styles.menuLabel, item.danger && styles.menuLabelDanger]}>
                    {item.label}
                  </Text>
                  <Ionicons
                    name="chevron-forward"
                    size={16}
                    color={item.danger ? Colors.accentRed : Colors.border}
                  />
                </Pressable>
              ))}
            </View>
          </View>
        ))}

        {/* App version */}
        <Text style={styles.version}>LexOffice v1.0.0</Text>
      </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.primary },
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingBottom: Spacing.xl },

  // Hero
  heroCard: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: Radius.full,
    backgroundColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.white,
  },
  heroName: { fontSize: 22, fontWeight: '700', color: Colors.white, marginBottom: 4 },
  heroRole: { ...Typography.body, color: 'rgba(255,255,255,0.7)', marginBottom: Spacing.lg },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: Radius.lg,
    paddingVertical: Spacing.sm + 2,
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  infoItem: { flexDirection: 'row', alignItems: 'center', gap: 6, flex: 1, justifyContent: 'center' },
  infoText: { fontSize: 13, fontWeight: '600', color: Colors.white },
  infoDivider: { width: 1, height: 18, backgroundColor: 'rgba(255,255,255,0.2)' },

  // Contact
  contactRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  contactPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.card,
    borderRadius: Radius.md,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    ...Shadow.card,
  },
  contactText: { ...Typography.caption, color: Colors.textPrimary, fontWeight: '500', flex: 1 },

  // Sections
  section: { marginTop: Spacing.md, paddingHorizontal: Spacing.lg },
  sectionLabel: {
    ...Typography.caption,
    fontWeight: '700',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: Spacing.sm,
  },
  menuCard: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    ...Shadow.card,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: Colors.border },
  menuItemPressed: { backgroundColor: Colors.background },
  menuIconWrap: {
    width: 36,
    height: 36,
    borderRadius: Radius.md,
    backgroundColor: Colors.primary + '12',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIconDanger: { backgroundColor: Colors.accentRed + '12' },
  menuLabel: { flex: 1, ...Typography.body, fontWeight: '500', color: Colors.textPrimary },
  menuLabelDanger: { color: Colors.accentRed },

  // Version
  version: {
    textAlign: 'center',
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: Spacing.lg,
  },
});
