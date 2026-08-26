import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
console.disableYellowBox = true;
const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    slide: {
        width,
        flex: 1,
    },

    
    coverSlide: {
        justifyContent: 'center',
        paddingHorizontal: Spacing.lg,
    },
    coverContent: {  
        alignItems: 'center',
    },
    logo: {
        width: 410,
        height: 325,
        marginBottom: Spacing.lg,
        alignSelf: 'center',
    },
    coverTitle: {
        fontFamily: 'PlayfairDisplay_700Bold',
        fontSize: 42,
        color: Colors.white,
        marginBottom: 8,
        letterSpacing: 0.3,
        lineHeight: 52,
        textAlign: 'center',
    },
    coverSubtitle: {
        fontFamily: 'System',
        fontSize: 16,
        color: 'rgba(255,255,255,0.75)',
        marginBottom: Spacing.xl,
        fontWeight: '400',
        lineHeight: 24,
        textAlign: 'center',
    },
    coverTagline: {
        fontFamily: 'System',
        fontSize: 12,
        color: 'rgba(255,255,255,0.5)',
        letterSpacing: 2,
        textTransform: 'uppercase',
        fontWeight: '600',
        textAlign: 'center',
    },

    // --- Slides 2 & 3 (content) ---
    contentSlide: {
        paddingHorizontal: Spacing.lg,
        paddingTop: Spacing.sm,
    },
    topBar: {
        paddingHorizontal: Spacing.lg,
        paddingTop: Spacing.sm,
        paddingBottom: 4,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: Radius.full,
        backgroundColor: Colors.card,
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadow.card,
    },
    illustrationContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    illustration: {
        width: width * 0.90,
        height: width * 0.90,
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: Spacing.lg,
        paddingHorizontal: Spacing.md,
    },
    contentTitle: {
        fontFamily: 'PlayfairDisplay_700Bold',
        fontSize: 32,
        color: '#1C2B4A',
        textAlign: 'center',
        marginBottom: Spacing.sm,
        lineHeight: 42,
        letterSpacing: 0.2,
    },
    contentSubtitle: {
        fontFamily: 'System',
        fontSize: 15,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 24,
        fontWeight: '400',
    },

    // --- Dots ---
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: Spacing.xs,
        marginBottom: Spacing.lg,
    },
    dot: {
        height: 6,
        borderRadius: Radius.full,
    },
    dotOnDark: {
        backgroundColor: Colors.white,
    },
    dotOnLight: {
        backgroundColor: Colors.primary,
    },

    // --- Footer slide 1 ---
    buttonWrapper: {
        paddingHorizontal: Spacing.md,
        paddingBottom: Spacing.xl,
    },
    getStartedButton: {
        backgroundColor: Colors.white,
        paddingVertical: 16,
        borderRadius: Radius.md,
        alignItems: 'center',
    },
    getStartedButtonPressed: {
        opacity: 0.85,
    },
    getStartedText: {
        color: Colors.primary,
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.3,
    },

    // --- Footer slides 2 & 3 ---
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Spacing.md,
        paddingBottom: Spacing.xl,
    },
    skipText: {
        ...Typography.body,
        color: Colors.textSecondary,
        fontSize: 19,
        fontWeight: '600',
        paddingRight: 120,  
        paddingLeft: 20,

    },
    nextButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.xs,
        backgroundColor: Colors.primary,
        paddingVertical: Spacing.sm + 4,
        paddingHorizontal: Spacing.lg,
        borderRadius: Radius.md,
    },
    nextButtonPressed: {
        backgroundColor: Colors.primaryLight,
    },
    nextButtonText: {
        ...Typography.h3,
        color: Colors.white,
    },
});
