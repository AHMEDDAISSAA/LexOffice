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
import { useI18n } from '../../constants/i18n';
import { useTheme } from '../../constants/theme';

const MENU_SECTIONS_DEF = [
  {
    titleKey: 'profile.account',
    items: [
      { icon: 'person-outline', labelKey: 'profile.personalInfo', route: null },
      { icon: 'business-outline', labelKey: 'profile.lawFirm', route: null },
      { icon: 'settings-outline', labelKey: 'profile.settings', route: '/settings' },
    ],
  },
  {
    titleKey: 'profile.security',
    items: [
      { icon: 'shield-checkmark-outline', labelKey: 'profile.security', route: null },
      { icon: 'notifications-outline', labelKey: 'profile.notifications', route: null },
    ],
  },
  {
    titleKey: 'profile.billing',
    items: [
      { icon: 'card-outline', labelKey: 'profile.subscription', route: null },
    ],
  },
  {
    titleKey: 'profile.support',
    items: [
      { icon: 'help-circle-outline', labelKey: 'profile.helpSupport', route: null },
      { icon: 'log-out-outline', labelKey: 'profile.logout', route: '/(auth)/sign-in', danger: true },
    ],
  },
];

function InitialAvatar({ name }) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
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
  const { t } = useI18n();
  const { colors, isDark } = useTheme();
  const styles = createStyles(colors);
  const user = mockUser;
  const MENU_SECTIONS = MENU_SECTIONS_DEF;

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
              <Ionicons name="briefcase-outline" size={16} color={colors.gold} />
              <Text style={styles.infoText}>34 Cases</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoItem}>
              <Ionicons name="people-outline" size={16} color={colors.gold} />
              <Text style={styles.infoText}>5 Clients</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoItem}>
              <Ionicons name="star-outline" size={16} color={colors.gold} />
              <Text style={styles.infoText}>4.9 ★</Text>
            </View>
          </View>
        </View>

        {/* Contact info pills */}
        <View style={styles.contactRow}>
          <View style={styles.contactPill}>
            <Ionicons name="mail-outline" size={14} color={colors.primary} />
            <Text style={styles.contactText} numberOfLines={1}>{user.email}</Text>
          </View>
          <View style={styles.contactPill}>
            <Ionicons name="call-outline" size={14} color={colors.primary} />
            <Text style={styles.contactText}>{user.phone}</Text>
          </View>
        </View>

        {/* Menu sections */}
        {MENU_SECTIONS.map((section) => (
          <View key={section.titleKey} style={styles.section}>
          <Text style={styles.sectionLabel}>{t(section.titleKey)}</Text>
            <View style={styles.menuCard}>
              {section.items.map((item, idx) => (
                <Pressable
                  key={item.label}
                  style={({ pressed }) => [
                    styles.menuItem,
                    idx < section.items.length - 1 && styles.menuItemBorder,
                    pressed && styles.menuItemPressed,
                  ]}
                  onPress={() => {
                    if (item.route) {
                      if (item.danger) {
                        router.replace(item.route);
                      } else {
                        router.push(item.route);
                      }
                    }
                  }}
                >
                  <View style={[styles.menuIconWrap, item.danger && styles.menuIconDanger]}>
                    <Ionicons
                      name={item.icon}
                      size={18}
                      color={item.danger ? colors.accentRed : colors.primary}
                    />
                  </View>
                  <Text style={[styles.menuLabel, item.danger && styles.menuLabelDanger]}>
                    {t(item.labelKey)}
                  </Text>
                  <Ionicons
                    name="chevron-forward"
                    size={16}
                    color={item.danger ? colors.accentRed : colors.border}
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

const createStyles = (colors) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.primary },
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingBottom: Spacing.xl },

  // Hero
  heroCard: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: Radius.full,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.white,
  },
  heroName: { fontSize: 22, fontWeight: '700', color: colors.white, marginBottom: 4 },
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
  infoText: { fontSize: 13, fontWeight: '600', color: colors.white },
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
    backgroundColor: colors.card,
    borderRadius: Radius.md,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    ...Shadow.card,
  },
  contactText: { ...Typography.caption, color: colors.textPrimary, fontWeight: '500', flex: 1 },

  // Sections
  section: { marginTop: Spacing.md, paddingHorizontal: Spacing.lg },
  sectionLabel: {
    ...Typography.caption,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: Spacing.sm,
  },
  menuCard: {
    backgroundColor: colors.card,
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
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  menuItemPressed: { backgroundColor: colors.background },
  menuIconWrap: {
    width: 36,
    height: 36,
    borderRadius: Radius.md,
    backgroundColor: colors.primary + '12',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIconDanger: { backgroundColor: colors.accentRed + '12' },
  menuLabel: { flex: 1, ...Typography.body, fontWeight: '500', color: colors.textPrimary },
  menuLabelDanger: { color: colors.accentRed },

  // Version
  version: {
    textAlign: 'center',
    ...Typography.caption,
    color: colors.textSecondary,
    marginTop: Spacing.lg,
  },
});
