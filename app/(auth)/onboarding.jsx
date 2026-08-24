import { useRef, useState } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    Pressable,
    Dimensions,
    Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, PlayfairDisplay_700Bold, PlayfairDisplay_400Regular } from '@expo-google-fonts/playfair-display';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { onboardingSlides } from '../../data/onboardingSlides';
import {styles} from './onboarding_style'

const { width } = Dimensions.get('window');

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

export default function Onboarding() {
    const [fontsLoaded] = useFonts({
        PlayfairDisplay_700Bold,
        PlayfairDisplay_400Regular,
    });
    const router = useRouter();
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;

    const isCover = currentIndex === 0;
    const isLast = currentIndex === onboardingSlides.length - 1;

    const handleMomentumScrollEnd = (e) => {
        const index = Math.round(e.nativeEvent.contentOffset.x / width);
        setCurrentIndex(index);
    };

    const goNext = () => {
        if (isLast) {
            router.replace('/(auth)/sign-in');
        } else {
            flatListRef.current?.scrollToOffset({
                offset: (currentIndex + 1) * width,
                animated: true,
            });
        }
    };

    const goBack = () => {
        flatListRef.current?.scrollToOffset({
            offset: (currentIndex - 1) * width,
            animated: true,
        });
    };

    const goToSignIn = () => router.replace('/(auth)/sign-in');

    const renderSlide = ({ item }) => {
        if (item.type === 'cover') {
            return (
                <View style={[styles.slide, styles.coverSlide]}>
                    <View style={styles.coverContent}>
                        <Image
                            source={require('../../assets/images/logo law.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <Text style={styles.coverTitle}>{item.title}</Text>
                        <Text style={styles.coverSubtitle}>{item.subtitle}</Text>
                        <Text style={styles.coverTagline}>{item.tagline}</Text>
                    </View>
                </View>
            );
        }

        return (
            <View style={[styles.slide, styles.contentSlide]}>
                {/* Illustration */}
                <View style={styles.illustrationContainer}>
                    <Image
                        source={item.image}
                        style={styles.illustration}
                        resizeMode="contain"
                    />
                </View>

                {/* Text */}
                <View style={styles.textContainer}>
                    <Text style={styles.contentTitle}>{item.title}</Text>
                    <Text style={styles.contentSubtitle}>{item.subtitle}</Text>
                </View>
            </View>
        );
    };

    // Interpolate background color smoothly during scroll
    const backgroundColor = scrollX.interpolate({
        inputRange: [0, width, width * 2],
        outputRange: [Colors.primary, Colors.background, Colors.background],
        extrapolate: 'clamp',
    });

    return (
        <AnimatedSafeAreaView
            style={[
                styles.container,
                { backgroundColor },
            ]}
        >
            <StatusBar style={isCover ? 'light' : 'dark'} animated={true} />

            {/* Back button — visible on slides 2 & 3 */}
            {!isCover && (
                <View style={styles.topBar}>
                    <Pressable onPress={goBack} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={20} color={Colors.textPrimary} />
                    </Pressable>
                </View>
            )}

            {/* Slides — swipe enabled */}
            <FlatList
                ref={flatListRef}
                data={onboardingSlides}
                renderItem={renderSlide}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEnabled={true}
                bounces={false}
                onMomentumScrollEnd={handleMomentumScrollEnd}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            />

            {/* Dots */}
            <View style={styles.dotsContainer}>
                {onboardingSlides.map((_, index) => {
                    const inputRange = [
                        (index - 1) * width,
                        index * width,
                        (index + 1) * width,
                    ];
                    const dotWidth = scrollX.interpolate({
                        inputRange,
                        outputRange: [6, 20, 6],
                        extrapolate: 'clamp',
                    });
                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.4, 1, 0.4],
                        extrapolate: 'clamp',
                    });

                    return (
                        <Animated.View
                            key={index}
                            style={[
                                styles.dot,
                                { width: dotWidth, opacity },
                                isCover ? styles.dotOnDark : styles.dotOnLight,
                            ]}
                        />
                    );
                })}
            </View>

            {/* Footer */}
            {isCover ? (
                <View style={styles.buttonWrapper}>
                    <Pressable
                        style={({ pressed }) => [
                            styles.getStartedButton,
                            pressed && styles.getStartedButtonPressed,
                        ]}
                        onPress={goNext}
                    >
                        <Text style={styles.getStartedText}>Get Started</Text>
                    </Pressable>
                </View>
            ) : (
                <View style={styles.footer}>
                    <Pressable onPress={goToSignIn}>
                        <Text style={styles.skipText}>Skip</Text>
                    </Pressable>

                    <Pressable
                        onPress={goNext}
                        style={({ pressed }) => [
                            styles.nextButton,
                            pressed && styles.nextButtonPressed,
                        ]}
                    >
                        <Text style={styles.nextButtonText}>
                            {isLast ? 'Get Started' : 'Next'}
                        </Text>
                        <Ionicons
                            name={isLast ? 'checkmark' : 'arrow-forward'}
                            size={18}
                            color={Colors.white}
                        />
                    </Pressable>
                </View>
            )}
        </AnimatedSafeAreaView>
    );
}

