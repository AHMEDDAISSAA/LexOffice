import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as DocumentPicker from 'expo-document-picker';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { mockFolders, mockRecentFiles } from '../../data/mockDocuments';
import { useI18n } from '../../constants/i18n';
import { useTheme } from '../../constants/theme';

const FOLDER_ICONS = {
  Contracts: { icon: 'document-text', color: '#4A90D9' },
  'Court Files': { icon: 'folder-open', color: Colors.accentOrange },
  Evidence: { icon: 'warning', color: Colors.accentRed },
  Agreements: { icon: 'reader', color: Colors.accentGreen },
  Certificates: { icon: 'ribbon', color: Colors.gold },
  Templates: { icon: 'copy', color: Colors.primary },
};

const FILE_PRESETS = [
  { name: 'Retainer_Agreement_2025.pdf', folder: 'Contracts', size: '1.8 MB', type: 'PDF' },
  { name: 'Motion_To_Dismiss_Draft.docx', folder: 'Court Files', size: '2.4 MB', type: 'DOCX' },
  { name: 'Financial_Statement_Exhibit.pdf', folder: 'Evidence', size: '3.1 MB', type: 'PDF' },
  { name: 'Settlement_Proposal.pdf', folder: 'Agreements', size: '0.9 MB', type: 'PDF' },
];

export default function Documents() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const [search, setSearch] = useState('');
  const [foldersList, setFoldersList] = useState(mockFolders);
  const [recentFilesList, setRecentFilesList] = useState(mockRecentFiles);
  const { t } = useI18n();
  const styles = createStyles(colors);

  // Upload Modal State
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [docName, setDocName] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('Contracts');
  const [fileSize, setFileSize] = useState('1.5 MB');
  const [fileType, setFileType] = useState('PDF');
  const [pickedFromPhone, setPickedFromPhone] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const filteredFolders = foldersList.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredFiles = recentFilesList.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  const openUploadModal = () => {
    setDocName('');
    setSelectedFolder('Contracts');
    setFileSize('1.5 MB');
    setFileType('PDF');
    setPickedFromPhone(false);
    setIsModalVisible(true);
  };

  const pickDocumentFromPhone = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        const fileName = file.name || 'Selected_Document.pdf';
        const formattedSize = file.size
          ? file.size > 1024 * 1024
            ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
            : `${(file.size / 1024).toFixed(0)} KB`
          : '1.2 MB';

        const ext = fileName.includes('.')
          ? fileName.split('.').pop()?.toUpperCase() || 'PDF'
          : 'PDF';

        setDocName(fileName);
        setFileSize(formattedSize);
        setFileType(ext);
        setPickedFromPhone(true);
      }
    } catch (error) {
      console.log('DocumentPicker error:', error);
      Alert.alert('File Picker', 'Could not open native document picker.');
    }
  };

  const selectPreset = (preset) => {
    setDocName(preset.name);
    setSelectedFolder(preset.folder);
    setFileSize(preset.size);
    setFileType(preset.type);
    setPickedFromPhone(false);
  };

  const handleUploadDocument = () => {
    if (!docName.trim()) {
      Alert.alert('Missing Document Name', 'Please select a file or enter a document name.');
      return;
    }

    let finalName = docName.trim();
    if (!finalName.includes('.')) {
      finalName += fileType === 'PDF' ? '.pdf' : '.docx';
    }

    setIsUploading(true);

    setTimeout(() => {
      const newDoc = {
        id: `doc-${Date.now()}`,
        name: finalName,
        size: fileSize,
        date: 'Just now',
        folder: selectedFolder,
        type: fileType,
        source: pickedFromPhone ? 'Phone Storage' : 'Cloud',
      };

      // Add to recent files list
      setRecentFilesList((prev) => [newDoc, ...prev]);
      mockRecentFiles.unshift(newDoc);

      // Update folder count
      setFoldersList((prev) =>
        prev.map((f) =>
          f.name === selectedFolder ? { ...f, count: f.count + 1 } : f
        )
      );

      setIsUploading(false);
      setIsModalVisible(false);
      Alert.alert(
        'Upload Successful!',
        `"${finalName}" ${pickedFromPhone ? 'from your phone' : ''} has been added to ${selectedFolder}.`
      );
    }, 700);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar style="light" animated={true} />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{t('nav.documents')}</Text>
          <Pressable style={styles.addButton} onPress={openUploadModal}>
            <Ionicons name="add" size={22} color={Colors.white} />
          </Pressable>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
          {/* Search */}
          <View style={styles.searchWrap}>
            <Ionicons name="search-outline" size={18} color={Colors.textSecondary} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder={t('documents.searchPlaceholder') || "Search documents..."}
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
            <Text style={styles.sectionTitle}>{t('documents.folders') || "Folders"}</Text>
            <Pressable>
              <Text style={styles.seeAll}>{t('documents.manage') || "Manage"}</Text>
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
            <Text style={styles.sectionTitle}>{t('documents.recentFiles') || "Recent Files"}</Text>
            <Pressable>
              <Text style={styles.seeAll}>{t('common.seeAll') || "See All"}</Text>
            </Pressable>
          </View>

          <View style={styles.filesList}>
            {filteredFiles.map((file) => (
              <Pressable
                key={file.id}
                style={({ pressed }) => [styles.fileCard, pressed && styles.fileCardPressed]}
                onPress={() => router.push(`/document-viewer/${file.id}`)}
              >
                {/* File Icon */}
                <View style={styles.pdfIcon}>
                  <Ionicons
                    name={file.name.endsWith('.docx') ? 'document' : 'document-text'}
                    size={22}
                    color={Colors.accentRed}
                  />
                  <Text style={styles.pdfLabel}>{file.type || 'PDF'}</Text>
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
          <Pressable
            style={({ pressed }) => [styles.uploadBtn, pressed && styles.uploadBtnPressed]}
            onPress={openUploadModal}
          >
            <View style={styles.uploadIcon}>
              <Ionicons name="cloud-upload-outline" size={22} color={Colors.white} />
            </View>
            <View>
              <Text style={styles.uploadTitle}>{t('documents.uploadDocument') || "Upload Document"}</Text>
              <Text style={styles.uploadSub}>{t('documents.selectFromPhone') || "Select from phone or presets"}</Text>
            </View>
          </Pressable>
        </ScrollView>

        {/* Upload Document Modal */}
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {/* Modal Header */}
              <View style={styles.modalHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.xs }}>
                  <Ionicons name="cloud-upload" size={22} color={Colors.primary} />
                  <Text style={styles.modalTitle}>{t('documents.uploadDocument') || "Upload Document"}</Text>
                </View>
                <Pressable onPress={() => setIsModalVisible(false)} style={styles.closeBtn}>
                  <Ionicons name="close" size={20} color={Colors.textSecondary} />
                </Pressable>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                {/* Device Picker Section */}
                <Pressable
                  style={({ pressed }) => [
                    styles.phonePickerBtn,
                    pressed && styles.phonePickerBtnPressed,
                  ]}
                  onPress={pickDocumentFromPhone}
                >
                  <Ionicons name="phone-portrait-outline" size={26} color={Colors.white} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.phonePickerTitle}>{t('documents.chooseFromPhone') || "Choose File from Phone"}</Text>
                    <Text style={styles.phonePickerSub}>{t('documents.chooseFromPhoneSub') || "Open Files, Documents, or iCloud / Storage"}</Text>
                  </View>
                  <Ionicons name="folder-open-outline" size={20} color={Colors.white} />
                </Pressable>

                {/* Dropzone status banner */}
                <View style={[styles.dropZone, pickedFromPhone && styles.dropZoneSelected]}>
                  {pickedFromPhone ? (
                    <View style={{ alignItems: 'center', gap: 4 }}>
                      <Ionicons name="checkmark-circle" size={32} color={Colors.accentGreen} />
                      <Text style={styles.selectedBadgeTitle}>File Selected from Phone!</Text>
                      <Text style={styles.selectedBadgeSub} numberOfLines={1}>{docName} ({fileSize})</Text>
                    </View>
                  ) : (
                    <>
                      <Text style={styles.dropZoneTitle}>{t('documents.selectPreset') || "Or Choose a Sample Preset"}</Text>
                      <View style={styles.presetContainer}>
                        {FILE_PRESETS.map((preset, idx) => (
                          <Pressable
                            key={idx}
                            style={styles.presetChip}
                            onPress={() => selectPreset(preset)}
                          >
                            <Ionicons name="attach" size={14} color={Colors.primary} />
                            <Text style={styles.presetChipText} numberOfLines={1}>
                              {preset.name}
                            </Text>
                          </Pressable>
                        ))}
                      </View>
                    </>
                  )}
                </View>

                {/* Input 1: Document Name */}
                <View style={styles.modalInputGroup}>
                  <Text style={styles.modalLabel}>{t('documents.documentName') || "Document Name"} *</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="e.g. Court_Notice_2025.pdf"
                    placeholderTextColor={Colors.textSecondary}
                    value={docName}
                    onChangeText={setDocName}
                  />
                </View>

                {/* Input 2: Folder Choice */}
                <View style={styles.modalInputGroup}>
                  <Text style={styles.modalLabel}>{t('documents.selectFolder') || "Select Folder"}</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
                    {Object.keys(FOLDER_ICONS).map((folderName) => (
                      <Pressable
                        key={folderName}
                        style={[
                          styles.folderChip,
                          selectedFolder === folderName && styles.folderChipActive,
                        ]}
                        onPress={() => setSelectedFolder(folderName)}
                      >
                        <Text
                          style={[
                            styles.folderChipText,
                            selectedFolder === folderName && styles.folderChipTextActive,
                          ]}
                        >
                          {folderName}
                        </Text>
                      </Pressable>
                    ))}
                  </ScrollView>
                </View>

                {/* File Size & Format Row */}
                <View style={{ flexDirection: 'row', gap: Spacing.md }}>
                  <View style={[styles.modalInputGroup, { flex: 1 }]}>
                    <Text style={styles.modalLabel}>{t('documents.fileFormat') || "File Format"}</Text>
                    <View style={styles.formatRow}>
                      {['PDF', 'DOCX', 'IMG'].map((fmt) => (
                        <Pressable
                          key={fmt}
                          style={[
                            styles.formatChip,
                            fileType === fmt && styles.formatChipActive,
                          ]}
                          onPress={() => setFileType(fmt)}
                        >
                          <Text
                            style={[
                              styles.formatChipText,
                              fileType === fmt && styles.formatChipTextActive,
                            ]}
                          >
                            {fmt}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  </View>

                  <View style={[styles.modalInputGroup, { flex: 1 }]}>
                    <Text style={styles.modalLabel}>{t('documents.estimatedSize') || "Estimated Size"}</Text>
                    <TextInput
                      style={styles.modalInput}
                      value={fileSize}
                      onChangeText={setFileSize}
                      placeholder="1.5 MB"
                    />
                  </View>
                </View>

                {/* Upload Button */}
                <Pressable
                  style={({ pressed }) => [
                    styles.modalSubmitBtn,
                    pressed && styles.modalSubmitBtnPressed,
                    isUploading && { opacity: 0.7 },
                  ]}
                  onPress={handleUploadDocument}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.xs }}>
                      <ActivityIndicator color={Colors.white} size="small" />
                      <Text style={styles.modalSubmitBtnText}>{t('documents.uploading') || "Uploading..."}</Text>
                    </View>
                  ) : (
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.xs }}>
                      <Ionicons name="cloud-upload" size={18} color={Colors.white} />
                      <Text style={styles.modalSubmitBtnText}>{t('documents.uploadFile') || "Upload File"}</Text>
                    </View>
                  )}
                </Pressable>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (colors) => StyleSheet.create({
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
  searchInput: { flex: 1, fontSize: 14, color: colors.textPrimary },

  // Section headers
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  sectionTitle: { ...Typography.h3, color: colors.textPrimary },
  seeAll: { ...Typography.caption, color: colors.primary, fontWeight: '600' },

  // Folders
  foldersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  folderCard: {
    width: '30%',
    backgroundColor: colors.card,
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
  folderName: { ...Typography.caption, fontWeight: '700', color: colors.textPrimary, textAlign: 'center' },
  folderCount: { fontSize: 10, color: colors.textSecondary, marginTop: 2 },

  // Files
  filesList: { paddingHorizontal: Spacing.lg, gap: Spacing.sm },
  fileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
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
    backgroundColor: colors.accentRed + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pdfLabel: { fontSize: 8, fontWeight: '700', color: colors.accentRed, marginTop: -2 },
  fileInfo: { flex: 1 },
  fileName: { ...Typography.h3, color: colors.textPrimary },
  fileMeta: { ...Typography.caption, color: colors.textSecondary, marginTop: 3 },
  fileMenu: { padding: 4 },

  // Upload Button
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: colors.primary,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    borderRadius: Radius.lg,
    padding: Spacing.md,
  },
  uploadBtnPressed: { opacity: 0.85 },
  uploadIcon: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadTitle: { fontSize: 15, fontWeight: '700', color: colors.white },
  uploadSub: { ...Typography.caption, color: 'rgba(255,255,255,0.65)', marginTop: 2 },

  // Phone Picker Button
  phonePickerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: colors.primary,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadow.card,
  },
  phonePickerBtnPressed: {
    backgroundColor: colors.primaryLight,
  },
  phonePickerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.white,
  },
  phonePickerSub: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.75)',
  },

  // Modal Styles
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
    maxHeight: '85%',
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

  // Dropzone
  dropZone: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  dropZoneSelected: {
    backgroundColor: colors.accentGreen + '10',
    borderColor: colors.accentGreen,
  },
  dropZoneTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  selectedBadgeTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.accentGreen,
  },
  selectedBadgeSub: {
    fontSize: 12,
    color: colors.textPrimary,
    fontWeight: '500',
  },

  // Presets
  presetContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Spacing.xs,
  },
  presetChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.full,
    maxWidth: 160,
  },
  presetChipText: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: '500',
  },

  // Modal Inputs
  modalInputGroup: {
    marginBottom: Spacing.md,
  },
  modalLabel: {
    ...Typography.caption,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  modalInput: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.textPrimary,
  },

  // Folder Chips
  chipRow: {
    gap: Spacing.xs,
  },
  folderChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    borderRadius: Radius.full,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  folderChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  folderChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  folderChipTextActive: {
    color: colors.white,
  },

  // Format Chips
  formatRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  formatChip: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: Radius.md,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  formatChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  formatChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  formatChipTextActive: {
    color: colors.white,
  },

  // Submit Button
  modalSubmitBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.xs,
    marginBottom: Spacing.md,
    ...Shadow.card,
  },
  modalSubmitBtnPressed: {
    backgroundColor: colors.primaryLight,
  },
  modalSubmitBtnText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
