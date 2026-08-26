import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { I18nProvider } from '../constants/i18n';
import { ThemeProvider } from '../constants/theme';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="case-details/[id]" />
          <Stack.Screen name="document-viewer/[id]" />
          <Stack.Screen name="clients" />
          <Stack.Screen name="add-case" />
          <Stack.Screen name="edit-case" />
          <Stack.Screen name="settings" />
        </Stack>
      </I18nProvider>
    </ThemeProvider>
  );
}