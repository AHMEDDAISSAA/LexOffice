import { useState, useRef  } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Image, Animated} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { styles } from './sign-in_style';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passFocused, setPassFocused] = useState(false);
  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const [toast, setToast] = useState({ visible: false, message: '' });
  const toastAnim = useRef(new Animated.Value(0)).current;
  
  const showToast = (message) => {
  setToast({ visible: true, message });
  Animated.sequence([
    Animated.timing(toastAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
    Animated.delay(2000),
    Animated.timing(toastAnim, { toValue: 0, duration: 250, useNativeDriver: true }),
  ]).start(() => setToast({ visible: false, message: '' }));
};

const handleEmailBlur = () => {
  setEmailFocused(false);
  if (email.length > 0 && !isValidEmail(email)) {
    showToast('Please enter a valid email address');
  }
};

const handleSignIn = () => {
  if (!isValidEmail(email)) {
    showToast('Please enter a valid email address');
    return;
  }
  // TODO: real auth
  router.replace('/(tabs)/home');
};

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
                router.replace('/(auth)/onboarding');
              }
            }}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={20} color={Colors.textPrimary} />
          </Pressable>

          {/* Header */}
          {/* Header */}
          <View style={styles.headerSection}>
            <Image
              source={require('../../assets/images/9anoun.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Email */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Email</Text>
              <View
                style={[
                  styles.inputRow,
                  emailFocused && styles.inputRowFocused,
                ]}
              >
                <Ionicons
                  name="mail-outline"
                  size={18}
                  color={emailFocused ? Colors.primary : Colors.textSecondary}
                  style={styles.inputIcon}
                />
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor={Colors.textSecondary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              onFocus={() => setEmailFocused(true)}
              onBlur={handleEmailBlur}
            />
              </View>
            </View>

            {/* Password */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Password</Text>
              <View
                style={[
                  styles.inputRow,
                  passFocused && styles.inputRowFocused,
                ]}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color={passFocused ? Colors.primary : Colors.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor={Colors.textSecondary}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  onFocus={() => setPassFocused(true)}
                  onBlur={() => setPassFocused(false)}
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

            
            <Pressable style={styles.forgotWrap} onPress={() => { }}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </Pressable>

            
            <Pressable
              style={({ pressed }) => [
                styles.signInButton,
                pressed && styles.signInButtonPressed,
              ]}
              onPress={handleSignIn}
            >
              <Text style={styles.signInButtonText}>Sign In</Text>
            </Pressable>

            
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

           
            <Pressable
              style={({ pressed }) => [
                styles.googleButton,
                pressed && styles.googleButtonPressed,
              ]}
              onPress={() => { }}
            >
              <AntDesign name="google" size={18} color="#EA4335" />
              <Text style={styles.googleButtonText}>Google</Text>
            </Pressable>
          </View>

          
          <View style={styles.signUpRow}>
            <Text style={styles.signUpPrompt}>Don't have an account? </Text>
            <Pressable onPress={() => router.push('/(auth)/sign-up')}>
              <Text style={styles.signUpLink}>Sign Up</Text>
            </Pressable>
          </View>
        </ScrollView>
        {/* toast */}
        {toast.visible && (
                <Animated.View
                  style={[
                    styles.toast,
                    {
                      opacity: toastAnim,
                      transform: [
                        {
                          translateY: toastAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [20, 0],
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  <Ionicons name="alert-circle" size={18} color={Colors.white} />
                  <Text style={styles.toastText}>{toast.message}</Text>
                </Animated.View>
              )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

