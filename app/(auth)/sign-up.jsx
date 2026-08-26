import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import {styles} from './sign-up_style';

export default function SignUp() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [lawFirm, setLawFirm] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const [focusedField, setFocusedField] = useState(null);

  const handleCreateAccount = () => {
    // TODO: real auth
    router.replace('/(tabs)/home');
  };

  const inputStyle = (field) => [
    styles.inputRow,
    focusedField === field && styles.inputRowFocused,
  ];

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Back */}
          <Pressable
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace('/(auth)/sign-in');
              }
            }}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={20} color={Colors.textPrimary} />
          </Pressable>

          {/* Header */}
          <View style={styles.headerSection}>
            <Image
              source={require('../../assets/images/logo_9anoun.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Join and manage your law office
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Full Name */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Full Name</Text>
              <View style={inputStyle('name')}>
                <Ionicons
                  name="person-outline"
                  size={18}
                  color={focusedField === 'name' ? Colors.primary : Colors.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your name"
                  placeholderTextColor={Colors.textSecondary}
                  value={fullName}
                  onChangeText={setFullName}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>

            {/* Email */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={inputStyle('email')}>
                <Ionicons
                  name="mail-outline"
                  size={18}
                  color={focusedField === 'email' ? Colors.primary : Colors.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor={Colors.textSecondary}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>

            {/* Phone */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Phone</Text>
              <View style={inputStyle('phone')}>
                <Ionicons
                  name="call-outline"
                  size={18}
                  color={focusedField === 'phone' ? Colors.primary : Colors.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Phone Number"
                  placeholderTextColor={Colors.textSecondary}
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>

            {/* Law Firm */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Law Firm</Text>
              <View style={inputStyle('firm')}>
                <Ionicons
                  name="business-outline"
                  size={18}
                  color={focusedField === 'firm' ? Colors.primary : Colors.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Your Law Firm"
                  placeholderTextColor={Colors.textSecondary}
                  value={lawFirm}
                  onChangeText={setLawFirm}
                  onFocus={() => setFocusedField('firm')}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>

            {/* Password */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={inputStyle('password')}>
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color={focusedField === 'password' ? Colors.primary : Colors.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor={Colors.textSecondary}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                />
                <Pressable
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                >
                  <Ionicons
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={18}
                    color={Colors.textSecondary}
                  />
                </Pressable>
              </View>
            </View>

            {/* Confirm Password */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Confirm Password</Text>
              <View style={inputStyle('confirm')}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={18}
                  color={focusedField === 'confirm' ? Colors.primary : Colors.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor={Colors.textSecondary}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirm}
                  onFocus={() => setFocusedField('confirm')}
                  onBlur={() => setFocusedField(null)}
                />
                <Pressable
                  onPress={() => setShowConfirm(!showConfirm)}
                  style={styles.eyeButton}
                >
                  <Ionicons
                    name={showConfirm ? 'eye-outline' : 'eye-off-outline'}
                    size={18}
                    color={Colors.textSecondary}
                  />
                </Pressable>
              </View>
            </View>

            {/* Terms checkbox */}
            <Pressable
              style={styles.termsRow}
              onPress={() => setAgreed(!agreed)}
            >
              <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
                {agreed && (
                  <Ionicons name="checkmark" size={12} color={Colors.white} />
                )}
              </View>
              <Text style={styles.termsText}>
                I accept the{' '}
                <Text style={styles.termsLink}>Terms & Conditions</Text>
              </Text>
            </Pressable>

            {/* Create Account button */}
            <Pressable
              style={({ pressed }) => [
                styles.createButton,
                pressed && styles.createButtonPressed,
                !agreed && styles.createButtonDisabled,
              ]}
              onPress={handleCreateAccount}
              disabled={!agreed}
            >
              <Text style={styles.createButtonText}>Create Account</Text>
            </Pressable>
          </View>

          {/* Sign In link */}
          <View style={styles.signInRow}>
            <Text style={styles.signInPrompt}>Already have an account? </Text>
            <Pressable
              onPress={() => {
                if (router.canGoBack()) {
                  router.back();
                } else {
                  router.replace('/(auth)/sign-in');
                }
              }}
            >
              <Text style={styles.signInLink}>Sign In</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


