import {StyleSheet} from "react-native";
import {theme} from "../../global/styles/theme";
import {getBottomSpace} from "react-native-iphone-x-helper";

export const styles = StyleSheet.create({
    banner: {
        width: '100%',
        height: 234
    },
    bannerContent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        marginHorizontal: 24,
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontFamily: theme.fonts.title700,
        color: theme.colors.heading
    },
    subTitle: {
        fontSize: 13,
        fontFamily: theme.fonts.text400,
        color: theme.colors.heading,
        lineHeight: 21
    },
    members: {
        margin: 24,
    },
    footer: {
        marginHorizontal: 24,
        marginBottom: getBottomSpace() + 20
    }
})
