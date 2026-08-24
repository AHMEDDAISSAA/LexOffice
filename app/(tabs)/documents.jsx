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
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { mockFolders, mockRecentFiles } from '../../data/mockDocuments';

const FOLDER_ICONS = {
  Contracts: { icon: 'document-text', color: '#4A90D9' },
  'Court Files': { icon: 'folder-open', color: Colors.accentOrange },
  Evidence: { icon: 'warning', color: Colors.accentRed },
  Agreements: { icon: 'reader', color: Colors.accentGreen },
  Certificates: { icon: 'ribbon', color: Colors.gold },
  Templates: { icon: 'copy', color: Colors.primary },
};

export default function Documents() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filteredFolders = mockFolders.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar style="light" animated={true} />
      <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Documents</Text>
        <Pressable style={styles.addButton}>
          <Ionicons name="add" size={22} color={Colors.white} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Search */}
        <View style={styles.searchWrap}>
          <Ionicons name="search-outline" size={18} color={Colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search documents..."
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

        {/* Folders grid */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Folders</Text>
          <Pressable>
            <Text style={styles.seeAll}>Manage</Text>
          </Pressable>
        </View>

        <View style={styles.foldersGrid}>
          {filteredFolders.map((folder) => {
            const meta = FOLDER_ICONS[folder.name] ?? { icon: 'folder', color: Colors.primary };
            return (
              <Pressable
                key={folder.id}
                style={({ pressed }) => [styles.folderCard, pressed && styles.folderCardPressed]}
                onPress={() => {}}
              >
                <View style={[styles.folderIconWrap, { backgroundColor: meta.color + '18' }]}>
                  <Ionicons name={meta.icon} size={26} color={meta.color} />
                </View>
                <Text style={styles.folderName} numberOfLines={1}>{folder.name}</Text>
                <Text style={styles.folderCount}>{folder.count} files</Text>
              </Pressable>
            );
          })}
        </View>

        {/* Recent Files */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Files</Text>
          <Pressable>
            <Text style={styles.seeAll}>See All</Text>
          </Pressable>
        </View>

        <View style={styles.filesList}>
          {mockRecentFiles.map((file) => (
            <Pressable
              key={file.id}
              style={({ pressed }) => [styles.fileCard, pressed && styles.fileCardPressed]}
              onPress={() => router.push(`/document-viewer/${file.id}`)}
            >
              {/* PDF icon */}
              <View style={styles.pdfIcon}>
                <Ionicons name="document-text" size={22} color={Colors.accentRed} />
                <Text style={styles.pdfLabel}>PDF</Text>
              </View>

              <View style={styles.fileInfo}>
                <Text style={styles.fileName} numberOfLines={1}>{file.name}</Text>
                <Text style={styles.fileMeta}>{file.size} · {file.date}</Text>
              </View>

              <Pressable style={styles.fileMenu}>
                <Ionicons name="ellipsis-vertical" size={18} color={Colors.textSecondary} />
              </Pressable>
            </Pressable>
          ))}
        </View>

        {/* Upload button */}
        <Pressable style={styles.uploadBtn}>
          <View style={styles.uploadIcon}>
            <Ionicons name="cloud-upload-outline" size={22} color={Colors.white} />
          </View>
          <View>
            <Text style={styles.uploadTitle}>Upload Document</Text>
            <Text style={styles.uploadSub}>PDF, DOC, DOCX up to 50MB</Text>
          </View>
        </Pressable>
      </ScrollView>
      </View>
    </SafeAreaView>
  );
}

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

  // Section headers
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  sectionTitle: { ...Typography.h3, color: Colors.textPrimary },
  seeAll: { ...Typography.caption, color: Colors.primary, fontWeight: '600' },

  // Folders
  foldersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  folderCard: {
    width: '30%',
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    ...Shadow.card,
  },
  folderCardPressed: { opacity: 0.8 },
  folderIconWrap: {
    width: 52,
    height: 52,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  folderName: { ...Typography.caption, fontWeight: '700', color: Colors.textPrimary, textAlign: 'center' },
  folderCount: { fontSize: 10, color: Colors.textSecondary, marginTop: 2 },

  // Files
  filesList: { paddingHorizontal: Spacing.lg, gap: Spacing.sm },
  fileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    gap: Spacing.sm,
    ...Shadow.card,
  },
  fileCardPressed: { opacity: 0.85 },
  pdfIcon: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: Colors.accentRed + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pdfLabel: { fontSize: 8, fontWeight: '700', color: Colors.accentRed, marginTop: -2 },
  fileInfo: { flex: 1 },
  fileName: { ...Typography.h3, color: Colors.textPrimary },
  fileMeta: { ...Typography.caption, color: Colors.textSecondary, marginTop: 3 },
  fileMenu: { padding: 4 },

  // Upload
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.primary,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    borderRadius: Radius.lg,
    padding: Spacing.md,
  },
  uploadIcon: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadTitle: { fontSize: 15, fontWeight: '700', color: Colors.white },
  uploadSub: { ...Typography.caption, color: 'rgba(255,255,255,0.65)', marginTop: 2 },
});
