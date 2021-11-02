import {StyleSheet} from "react-native";
import {theme} from "../../global/styles/theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    label: {
        fontSize: 18,
        color: theme.colors.heading,
        fontFamily: theme.fonts.title700
    },
    form: {
        paddingHorizontal: 24,
        marginTop: 32
    },
    select: {
        width: '100%',
        height: 68,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: theme.colors.secondary50,
        borderWidth: 1,
        borderRadius: 8,
        paddingRight: 25,
        overflow: 'hidden'
    },
    selectBody: {
        flex: 1,
        alignItems: 'center'
    },
    image: {
        width: 64,
        height: '100%',
        backgroundColor: theme.colors.secondary50,
        borderRadius: 8,
        borderColor: theme.colors.secondary40,
        borderWidth: 1
    },
    field: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 28
    },
    column: {
        flexDirection: 'row',
        marginTop: 12
    },
    divider: {
        fontSize: 15,
        color: theme.colors.highlight,
        fontFamily: theme.fonts.text500,
        textAlign: 'center',
        textAlignVertical: 'center',
        height: '100%',
        marginHorizontal: 6
    },
    textArea: {
        marginTop: 12,
        marginHorizontal: 24
    },
    footer: {
        marginHorizontal: 24,
        marginVertical: 20,
    }
})
