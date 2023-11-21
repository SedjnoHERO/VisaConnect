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
    normal_ts: {
        fontFamily: 'med',
        fontSize: 18,
        color: TextColors.black
    }
})

export const Welcomes_location = StyleSheet.create({
    headlines_location: {
        left: 11,
        top: 130,
    },
    buttons_location: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignContent: 'center',
        alignItems: 'center',
        bottom: 80,

    }
})

export const userLog = StyleSheet.create({
    inputs_reg: {
        top: 240,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'column',
        alignContent: 'center',
    },
    inputs_log: {
        top: 270,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'column',
        alignContent: 'center',
    }
})

export const gPage = StyleSheet.create({
    page: {
        backgroundColor: Colors.main_color,
        flex: 1,
    }
})

export const Inputs = StyleSheet.create({
    Input: {
        width: 390,
        height: 60,
        borderRadius: 12,
        borderWidth: 0.8,
        borderColor: TextColors.black,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,

    },
    PlaceHolder: {
        fontFamily: 'reg',
        fontSize: 20,
        textAlign: 'left',
        paddingLeft: 20,
        color: TextColors.black,

    },
    textBefore: {
        ...Texts.normal_ts,
        marginBottom: 10
    }
})