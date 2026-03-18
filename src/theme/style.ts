import Colors from '../theme/colors';
import Fonts from '../theme/fonts';
import { StyleSheet } from 'react-native';

export const Style = StyleSheet.create({
    // ============================================
    // LAYOUT & CONTAINER
    // ============================================
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundDark,
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    topBar: {
        height: 8,
        backgroundColor: Colors.primary,
    },
    
    // ============================================
    // HEADER
    // ============================================
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 20,
        backgroundColor: Colors.backgroundDark,
    },
    headerTitle: {
        fontSize: 28,
        fontFamily: Fonts.bold,
        color: Colors.textOnDark,
    },
    headerBadge: {
        backgroundColor: Colors.primaryLight,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    headerBadgeText: {
        fontSize: 14,
        fontFamily: Fonts.medium,
        color: Colors.primary,
    },
    headerProfilePicture: {
        width: 40,
        height: 40,
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: Colors.primary,
    },
    
    // ============================================
    // SEARCH
    // ============================================
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.backgroundDark,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1,
        marginVertical: 5,
        marginHorizontal: 10,
        borderColor: Colors.border,
    },
    searchInput: {
        flex: 1,
        backgroundColor: Colors.backgroundDark,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
        fontFamily: Fonts.regular,
        color: Colors.textOnDark,
    },
    
    // ============================================
    // INPUT FIELDS
    // ============================================
    inputContainer: {
        position: 'relative',
    },
    input: {
        backgroundColor: Colors.inputBackground,
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRadius: 8,
        marginBottom: 15,
        fontSize: 16,
        fontFamily: Fonts.regular,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    infoIcon: {
        position: 'absolute',
        right: 10,
        top: 12,
    },
    
    // ============================================
    // LIST & CHAT ITEMS
    // ============================================
    listContainer: {
        paddingTop: 20,
        paddingBottom: 20,
    },
    chatItem: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 12,
        alignItems: 'center',
        backgroundColor: Colors.ChatColorRead,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    chatItemUnread: {
        backgroundColor: Colors.ChatColorUnread,
    },
    chatContent: {
        flex: 1,
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    chatName: {
        fontSize: 16,
        fontFamily: Fonts.medium,
        color: Colors.textOnDark,
    },
    chatNameUnread: {
        fontFamily: Fonts.bold,
        color: Colors.primaryLight,
    },



    // ============================================
    // AVATAR & INDICATORS
    // ============================================
    avatarContainer: {
        position: 'relative',
        marginRight: 12,
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        borderWidth: 2,
        borderColor: Colors.border,
    },
    onlineIndicator: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: Colors.online,
        borderWidth: 2,
        borderColor: Colors.overlayButton,
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },
    
    // ============================================
    // TIMESTAMPS & BADGES
    // ============================================
    rightContainer: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        minHeight: 50,
    },
    timestamp: {
        fontSize: 13,
        fontFamily: Fonts.regular,
        color: Colors.primaryLight,
    },
    timestampUnread: {
        fontFamily: Fonts.medium,
        color: Colors.primaryLight,
    },
    unreadBadge: {
        minWidth: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 6,
        marginTop: 4,
    },
    unreadText: {
        color: Colors.textOnDark,
        fontSize: 12,
        fontFamily: Fonts.bold,
    },
    
    // ============================================
    // MESSAGES
    // ============================================
    lastMessage: {
        fontSize: 14,
        fontFamily: Fonts.regular,
        color: '#aaaaaa',
    },
    lastMessageUnread: {
        fontFamily: Fonts.medium,
        color: Colors.textOnDark,
    },
    
    // ============================================
    // EMPTY STATE
    // ============================================
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    emptyText: {
        fontSize: 18,
        fontFamily: Fonts.bold,
        color: Colors.textOnDark,
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        fontFamily: Fonts.regular,
        color: Colors.textSecondary,
        textAlign: 'center',
    },
    
    // ============================================
    // BUTTONS
    // ============================================
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 18,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
    },
    buttonDisabled: {
        backgroundColor: Colors.border,
    },
    buttonText: {
        fontSize: 16,
        fontFamily: Fonts.bold,
        color: Colors.textOnDark,
    },
    buttonContainer: {
        width: '100%',
        maxWidth: 300,
        gap: 16,
    },
    
    // Floating Action Button
    fab: {
        position: 'absolute',
        right: 40,
        bottom: 40,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    fabIcon: {
        fontSize: 32,
        color: Colors.textOnDark,
        fontFamily: Fonts.regular,
        fontWeight: '300',
    },
    
    // Close Button (top right)
    closeButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 10,
    },
    closeText: {
        fontSize: 30,
        color: Colors.textOnDark,
    },
    
    // Back Button (top left)
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 1000,
        backgroundColor: Colors.overlayDark,
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginTop: 200,
        borderRadius: 8,
    },
    backButtonText: {
        fontSize: 14,
        fontFamily: Fonts.medium,
        color: Colors.textOnDark,
    },
    
    // ============================================
    // MENU / DEBUG
    // ============================================
    menuContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 32,
        fontFamily: Fonts.bold,
        color: Colors.textOnDark,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: Fonts.regular,
        color: Colors.textSecondary,
        marginBottom: 40,
    },
    
    // ============================================
    // LINKS & FORGOT PASSWORD
    // ============================================
    forgotPassword: {
        alignItems: 'center',
    },
    forgotPasswordText: {
        color: Colors.link,
        fontSize: 14,
        fontFamily: Fonts.regular,
        marginTop: 15,
    },
    
    // ============================================
    // MODAL
    // ============================================
    overlay: {
        flex: 1,
        backgroundColor: Colors.overlay,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    popupContainer: {
        backgroundColor: Colors.backgroundLight,
        borderRadius: 16,
        padding: 24,
        width: '100%',
        maxWidth: 400,
        alignItems: 'center',
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },

    slideupContainer: {
        flex: 1,
        backgroundColor: Colors.backgroundDarkHighlight,
    },

    slideupHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 20,
        backgroundColor: Colors.backgroundDarkHighlight,
    },

    slideupSearchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.backgroundDark,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1,
        marginVertical: 5,
        marginHorizontal: 10,
        borderColor: Colors.border,
    },

    slideupListItem: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 12,
        alignItems: 'center',
        backgroundColor: Colors.backgroundDarkHighlight,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },

    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    iconText: {
        fontSize: 32,
        color: Colors.textOnDark,
        fontFamily: Fonts.bold,
    },
    message: {
        fontSize: 16,
        fontFamily: Fonts.regular,
        color: Colors.textOnLight,
        marginBottom: 24,
        textAlign: 'center',
        lineHeight: 24,
    },
    confirmButton: {
        backgroundColor: Colors.primary,
    },
    confirmButtonText: {
        color: Colors.buttonText,
        fontSize: 16,
        fontFamily: Fonts.medium,
    },
    cancelButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: Colors.border,
    },
    cancelButtonText: {
        color: Colors.textOnLight,
        fontSize: 16,
        fontFamily: Fonts.medium,
    },
    modalTitle: {
        fontSize: 32,
        fontFamily: Fonts.bold,
        color: Colors.textHeadline,
        marginBottom: 8,
    },
})