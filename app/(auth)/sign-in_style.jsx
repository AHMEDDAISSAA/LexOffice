import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
console.disableYellowBox = true;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  backButton: {
    marginTop: Spacing.sm,
    width: 40,
    height: 40,
    borderRadius: Radius.full,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.card,
  },

  // Header
 headerSection: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: Spacing.sm,
    marginBottom: Spacing.lg,
},
logoImage: {
    width: 280,
    height: 280,
    marginBottom: -Spacing.sm, // rapproche le titre du logo
},
  logoSmall: {
    width: 52,
    height: 52,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
  },

  // Form
  form: {
    gap: 4,
  },
  fieldGroup: {
    marginBottom: Spacing.md,
  },
  label: {
    ...Typography.caption,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 6,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    height: 52,
    ...Shadow.card,
  },
  inputRowFocused: {
    borderColor: Colors.primary,
  },
  inputIcon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.textPrimary,
  },
  eyeButton: {
    padding: 4,
  },

  // Forgot
  forgotWrap: {
    alignSelf: 'flex-end',
    marginBottom: Spacing.lg,
    marginTop: -4,
  },
  forgotText: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '600',
  },

  // Sign In button
  signInButton: {
    backgroundColor: Colors.primary,
    height: 52,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  signInButtonPressed: {
    backgroundColor: Colors.primaryLight,
  },
  signInButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },

  // Divider
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },

  // Google
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.card,
    height: 52,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    ...Shadow.card,
  },
  googleButtonPressed: {
    backgroundColor: Colors.background,
  },
  googleButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
  },

  // Sign Up link
  signUpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.xl,
  },
  signUpPrompt: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  signUpLink: {
    ...Typography.body,
    color: Colors.primary,
    fontWeight: '700',
  },

  // Toast
  toast: {
    position: 'absolute',
    bottom: 40,
    left: Spacing.lg,
    right: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.md,
    ...Shadow.card,
  },
  toastText: {
    color: Colors.white,
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
  },
});