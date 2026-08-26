import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { mockRecentFiles } from '../../data/mockDocuments';
import { useTheme } from '../../constants/theme';

const { width } = Dimensions.get('window');

// Simulated document pages
const DOC_PAGES = [
  {
    heading: 'EMPLOYMENT CONTRACT',
    body: [
      'This Employment Agreement ("Agreement") is entered into as of January 15, 2025, between Doe & Partners Law Firm ("Employer") and John Smith ("Employee").',
      '',
      '1. POSITION AND DUTIES',
      'Employee agrees to serve as Senior Associate Attorney. Employee shall perform such duties as are customarily performed by one holding such position.',
      '',
      '2. COMPENSATION',
      'Employer shall pay Employee a base salary of $120,000 per year, payable in accordance with Employer\'s regular payroll schedule.',
      '',
      '3. BENEFITS',
      'Employee shall be entitled to participate in all benefit plans and programs that Employer makes generally available to its employees.',
    ],
  },
];

export default function DocumentViewer() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { colors, isDark } = useTheme();
  const [zoom, setZoom] = useState(1);
  const [page, setPage] = useState(1);
  const totalPages = 3;

  const styles = createStyles(colors);
  const file = mockRecentFiles.find((f) => f.id === id) ?? mockRecentFiles[0];

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
              router.replace('/(tabs)/documents');
            }
          }}
          style={styles.backBtn}
        >
          <Ionicons name="arrow-back" size={20} color={colors.white} />
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle} numberOfLines={1}>{file.name}</Text>
          <Text style={styles.headerSub}>Page {page} of {totalPages}</Text>
        </View>
        <Pressable style={styles.menuBtn}>
          <Ionicons name="ellipsis-vertical" size={20} color={colors.white} />
        </Pressable>
      </View>

      {/* Document viewer */}
      <ScrollView
        style={styles.viewerScroll}
        contentContainerStyle={styles.viewerContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Page card */}
        <View style={[styles.pageCard, { transform: [{ scale: zoom }] }]}>
          {/* Document header */}
          <View style={styles.docHeader}>
            <Text style={styles.docHeading}>{DOC_PAGES[0].heading}</Text>
            <View style={styles.docDivider} />
          </View>

          {DOC_PAGES[0].body.map((line, i) => (
            <Text key={i} style={line.match(/^\d\./) ? styles.docSectionHead : styles.docBody}>
              {line}
            </Text>
          ))}

          {/* Simulated more text */}
          <Text style={styles.docBody}>
            {'4. TERM\nThis Agreement shall commence on the date first written above and shall continue until terminated by either party upon thirty (30) days written notice.\n\n5. CONFIDENTIALITY\nEmployee agrees to keep confidential all proprietary information and trade secrets of the Employer during and after the term of this Agreement.'}
          </Text>

          {/* Signature block */}
          <View style={styles.sigBlock}>
            <View style={styles.sigLine}>
              <View style={styles.sigLineRule} />
              <Text style={styles.sigLabel}>Employer Signature</Text>
            </View>
            <View style={styles.sigLine}>
              <View style={styles.sigLineRule} />
              <Text style={styles.sigLabel}>Employee Signature</Text>
            </View>
          </View>

          {/* Page number */}
          <Text style={styles.pageNum}>1 / {totalPages}</Text>
        </View>
      </ScrollView>

      {/* Bottom toolbar */}
      <View style={styles.toolbar}>
        {/* Page nav */}
        <View style={styles.pageNav}>
          <Pressable
            style={[styles.navBtn, page === 1 && styles.navBtnDisabled]}
            onPress={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            <Ionicons name="chevron-back" size={18} color={page === 1 ? colors.border : colors.textPrimary} />
          </Pressable>
          <Text style={styles.pageIndicator}>{page} / {totalPages}</Text>
          <Pressable
            style={[styles.navBtn, page === totalPages && styles.navBtnDisabled]}
            onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            <Ionicons name="chevron-forward" size={18} color={page === totalPages ? colors.border : colors.textPrimary} />
          </Pressable>
        </View>

        {/* Actions */}
        <View style={styles.toolbarActions}>
          <Pressable style={styles.toolBtn} onPress={() => setZoom((z) => Math.max(0.6, z - 0.2))}>
            <Ionicons name="remove" size={18} color={colors.textPrimary} />
          </Pressable>
          <Pressable style={styles.toolBtn} onPress={() => setZoom((z) => Math.min(2, z + 0.2))}>
            <Ionicons name="add" size={18} color={colors.textPrimary} />
          </Pressable>
          <Pressable style={styles.toolBtn}>
            <Ionicons name="share-outline" size={18} color={colors.textPrimary} />
          </Pressable>
          <Pressable style={styles.toolBtn}>
            <Ionicons name="create-outline" size={18} color={colors.textPrimary} />
          </Pressable>
          <Pressable style={[styles.toolBtn, styles.toolBtnMark]}>
            <Ionicons name="bookmark-outline" size={18} color={colors.white} />
          </Pressable>
        </View>
      </View>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (colors) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.primary },
  container: { flex: 1, backgroundColor: '#2C2C2E' },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    backgroundColor: colors.primary,
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
  headerTitle: { fontSize: 15, fontWeight: '700', color: colors.white },
  headerSub: { ...Typography.caption, color: 'rgba(255,255,255,0.6)' },
  menuBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Viewer
  viewerScroll: { flex: 1 },
  viewerContent: {
    padding: Spacing.md,
    alignItems: 'center',
  },
  pageCard: {
    width: width - Spacing.lg * 2,
    backgroundColor: colors.white,
    borderRadius: 4,
    padding: Spacing.xl,
    ...Shadow.card,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    minHeight: 500,
  },

  // Document content
  docHeader: { alignItems: 'center', marginBottom: Spacing.lg },
  docHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
    letterSpacing: 1.5,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  docDivider: { width: '100%', height: 2, backgroundColor: '#1A1A1A' },
  docSectionHead: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1A1A1A',
    marginTop: Spacing.sm,
    marginBottom: 4,
  },
  docBody: {
    fontSize: 11,
    color: '#333',
    lineHeight: 18,
    marginBottom: 6,
  },

  // Signature
  sigBlock: {
    marginTop: Spacing.xl,
    gap: Spacing.lg,
  },
  sigLine: { gap: 6 },
  sigLineRule: { height: 1, backgroundColor: '#888', marginBottom: 4 },
  sigLabel: { fontSize: 10, color: '#666' },
  pageNum: { textAlign: 'center', fontSize: 10, color: '#999', marginTop: Spacing.lg },

  // Toolbar
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  pageNav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  navBtn: {
    width: 32,
    height: 32,
    borderRadius: Radius.full,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBtnDisabled: { opacity: 0.4 },
  pageIndicator: { ...Typography.caption, fontWeight: '700', color: colors.textPrimary },
  toolbarActions: { flexDirection: 'row', gap: 6 },
  toolBtn: {
    width: 34,
    height: 34,
    borderRadius: Radius.md,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolBtnMark: { backgroundColor: colors.primary },
});
