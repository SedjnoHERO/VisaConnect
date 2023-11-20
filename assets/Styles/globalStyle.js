import { StyleSheet } from "react-native";

export const Colors = StyleSheet.create({
    main_color: '#F8FBFF',
    main_accent_color: '#425585',
    secondary_accent_color: '#ADCBE8',
    third_accent_color: '#ECF2FF'
})

export const TextColors = StyleSheet.create({
    black: '#242424',
    white: '#ffffff',
})

export const ButtonStyles = StyleSheet.create({
    button_continue: {
        width: 390,
        height: 60,
        marginBottom: 20,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.main_accent_color,
    },
    button_skip: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    pressed: {
        backgroundColor: '#19274A',
    }
});

export const Texts = StyleSheet.create({
    button_ts: {
        fontFamily: 'med',
        fontSize: 24,
        color: TextColors.white,
    },
    button_skip_ts: {
        fontFamily: 'light',
        fontSize: 14,
        color: TextColors.black,
    },
    headline_ts: {
        fontFamily: 'bold',
        fontSize: 32,
        color: TextColors.black,
    },
})

export const Welcomes_location = StyleSheet.create({
    headlines_location: {
        left: 20,
        top: 130,
    },
    buttons_location: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignContent: 'center',
        alignItems: 'center',
        bottom: 40,

    }
})

export const gPage = StyleSheet.create({
    page: {
        backgroundColor: Colors.main_color,
        flex: 1,
    }
})