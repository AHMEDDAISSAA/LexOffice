import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Switch,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Spacing, Radius, Shadow } from '../constants/spacing';
import { useI18n } from '../constants/i18n';
import { useTheme } from '../constants/theme';

const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English (UK)' },
  { code: 'fr', name: 'Français', native: 'French' },
  { code: 'ar', name:'العربية',  native: 'Arabic' },
];

export default function Settings() {
  const router = useRouter();
  const { t, langCode, switchLanguage } = useI18n();
  const { colors, themeMode, setThemeMode, isDark } = useTheme();
  const styles = createStyles(colors);

  const [isLangModalVisible, setIsLangModalVisible] = useState(false);

  // Derive selected language from context
  const selectedLanguage = LANGUAGES.find((l) => l.code === langCode) || LANGUAGES[0];

  const handleThemeChange = (mode) => {
    setThemeMode(mode);
  };

  const handleSelectLanguage = (lang) => {
    switchLanguage(lang.code);   // ← changes language globally
    setIsLangModalVisible(false);
  };

  const handleClearCache = () => {
    Alert.alert(
      'Clear Cache',
      'Are you sure you want to clear temporary app cache (42.5 MB)?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear Cache',
          style: 'destructive',
          onPress: () => Alert.alert('Success', 'App cache cleared successfully!'),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar style={isDark ? "light" : "dark"} animated={true} />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace('/(tabs)/profile');
              }
            }}
          >
            <Ionicons name="arrow-back" size={22} color={colors.white} />
          </Pressable>
          <Text style={styles.headerTitle}>{t('settings.title')}</Text>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Ionicons name="color-palette-outline" size={20} color={colors.primary} />
              <Text style={styles.sectionTitle}>{t('settings.appearance')}</Text>
            </View>

            
            

            
            <View style={styles.themeSelectorRow}>
              {[
                { key: 'light', icon: 'sunny-outline' },
                { key: 'dark', icon: 'moon-outline' },
                { key: 'system', icon: 'phone-portrait-outline' },
              ].map((item) => (
                <Pressable
                  key={item.key}
                  style={[
                    styles.themeCard,
                    themeMode === item.key && styles.themeCardActive,
                  ]}
                  onPress={() => handleThemeChange(item.key)}
                >
                  <Ionicons
                    name={item.icon}
                    size={22}
                    color={themeMode === item.key ? colors.white : (isDark ? colors.textPrimary : colors.primary)}
                  />
                  <Text
                    style={[
                      styles.themeCardLabel,
                      themeMode === item.key && styles.themeCardLabelActive,
                    ]}
                  >
                    {t(`settings.${item.key}`)}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Ionicons name="language-outline" size={20} color={colors.primary} />
              <Text style={styles.sectionTitle}>{t('settings.language')}</Text>
            </View>

            <Pressable style={styles.settingRow} onPress={() => setIsLangModalVisible(true)}>
              <View style={styles.settingTextGroup}>
                <Text style={styles.settingLabel}>{t('settings.appLanguage')}</Text>
                <Text style={styles.settingSub}>{t('settings.selectLanguage')}</Text>
              </View>
              <View style={styles.langValueBadge}>
                <Text style={styles.langFlag}>{selectedLanguage.flag}</Text>
                <Text style={styles.langValueText}>{selectedLanguage.name}</Text>
                <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
              </View>
            </Pressable>
          </View>

          
          {/* Section 5: Cache & Maintenance */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Ionicons name="hardware-chip-outline" size={20} color={colors.primary} />
              <Text style={styles.sectionTitle}>{t('settings.storage')}</Text>
            </View>

            <Pressable style={styles.settingRow} onPress={handleClearCache}>
              <View style={styles.settingTextGroup}>
                <Text style={styles.settingLabel}>{t('settings.clearCache')}</Text>
                <Text style={styles.settingSub}>{t('settings.clearCacheSub')}</Text>
              </View>
              <Ionicons name="trash-outline" size={20} color={colors.accentRed} />
            </Pressable>
          </View>
        </ScrollView>

        {/* Language Picker Modal */}
        <Modal
          visible={isLangModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsLangModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.xs }}>
                  <Ionicons name="globe-outline" size={22} color={colors.primary} />
                  <Text style={styles.modalTitle}>{t('settings.chooseLanguage')}</Text>
                </View>
                <Pressable onPress={() => setIsLangModalVisible(false)} style={styles.closeBtn}>
                  <Ionicons name="close" size={20} color={colors.textSecondary} />
                </Pressable>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                {LANGUAGES.map((lang) => {
                  const isSelected = selectedLanguage.code === lang.code;
                  return (
                    <Pressable
                      key={lang.code}
                      style={[
                        styles.langItem,
                        isSelected && styles.langItemSelected,
                      ]}
                      onPress={() => handleSelectLanguage(lang)}
                    >
                      <Text style={styles.langItemFlag}>{lang.flag}</Text>
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.langItemName, isSelected && styles.langItemNameSelected]}>
                          {lang.name}
                        </Text>
                        <Text style={styles.langItemNative}>{lang.native}</Text>
                      </View>
                      {isSelected && (
                        <Ionicons name="checkmark-circle" size={22} color={colors.primary} />
                      )}
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (colors) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: colors.primary,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
  },

  // Scroll Content
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },

  // Section Card
  sectionCard: {
    backgroundColor: colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    ...Shadow.card,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
    paddingBottom: Spacing.xs + 2,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sectionTitle: {
    ...Typography.h3,
    color: colors.textPrimary,
  },

  // Setting Row
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.xs + 2,
  },
  rowBorder: {
    paddingBottom: Spacing.sm,
    marginBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border + '60',
  },
  settingTextGroup: {
    flex: 1,
    paddingRight: Spacing.md,
  },
  settingLabel: {
    ...Typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  settingSub: {
    ...Typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },

  // Theme Cards
  themeSelectorRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  themeCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    backgroundColor: colors.background,
    borderWidth: 1.5,
    borderColor: colors.border,
    gap: 6,
  },
  themeCardActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  themeCardLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  themeCardLabelActive: {
    color: colors.white,
  },

  // Language Badge
  langValueBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.background,
    paddingHorizontal: Spacing.sm + 4,
    paddingVertical: 6,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  langFlag: {
    fontSize: 16,
  },
  langValueText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.card,
    borderTopLeftRadius: Radius.lg * 1.5,
    borderTopRightRadius: Radius.lg * 1.5,
    padding: Spacing.lg,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: Spacing.md,
    marginBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: Radius.full,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Language Item
  langItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.md,
    marginBottom: Spacing.xs,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  langItemSelected: {
    backgroundColor: colors.primary + '10',
    borderColor: colors.primary,
  },
  langItemFlag: {
    fontSize: 26,
  },
  langItemName: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  langItemNameSelected: {
    color: colors.primary,
  },
  langItemNative: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
