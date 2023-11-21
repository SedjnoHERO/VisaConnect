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
    },
    article_ts: {
        fontFamily: 'light',
        fontSize: 12,
        color: TextColors.black
    },
    title: {
        fontFamily: 'med',
        fontSize: 20,
        color: TextColors.black,
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
    },
    title: {
        ...Texts.title,
        textAlign: 'center',
        marginBottom: 40,
        marginTop: 20
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

export const BottomTabStyle = StyleSheet.create({
    navigator: {
        position: 'absolute',
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        height: 94,
        backgroundColor: Colors.third_accent_color,
        borderRadius: 32,
        flexDirection: 'row',
        borderTopWidth: 0,
        flex: 1,
        zIndex: 3,
        paddingTop: 32,
        paddingBottom: 32,
    },
    icon: {
        width: 60,
        height: 60,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export const InfoCellsStyle = StyleSheet.create({
    cells: {
        backgroundColor: Colors.third_accent_color,
        width: 175,
        aspectRatio: 1,
        padding: 10,
        margin: 10,
        borderRadius: 24,
    },
    grid: {
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
    },
    headline: {
        ...Texts.normal_ts,
        marginBottom: 10,
        marginTop: 10,
    }
})