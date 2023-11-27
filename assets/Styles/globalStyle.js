import { Component } from "react";
import { StyleSheet, TextComponent } from "react-native";

export const Colors = StyleSheet.create({
    main_color: '#F8FBFF',
    main_accent_color: '#425585',
    secondary_accent_color: '#ADCBE8',
    third_accent_color: '#ECF2FF'
})

export const TextColors = StyleSheet.create({
    black: '#242424',
    white: '#ffffff',
    disabled: '#d3d3d3',
    enabled: '#797979'
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
        color: TextColors.black,
        lineHeight: 20,
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
    container: {
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
    },
    headline: {
        ...Texts.title,
        textAlign: 'center',
        marginBottom: 30,
        marginTop: 20
    },
    title: {
        width: '100%',
        height: 110,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 20,

    },
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
        gap: 15,
        height: 94,
        backgroundColor: Colors.third_accent_color,
        borderRadius: 32,
        flexDirection: 'row',
        borderTopWidth: 0,
        flex: 1,
        zIndex: 3,
        paddingLeft: 15,
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

export const Info = StyleSheet.create({
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
    },
})

export const News = StyleSheet.create({

})

export const Cards = StyleSheet.create({
    form: {
        width: '100%',
        flexDirection: 'column',
        gap: 10,
    },
    special_ts: {
        ...TextColors.black,
        paddingHorizontal: '5%',
        width: '100%',
        fontFamily: 'reg',
        fontSize: 16
    },
    container: {
        fontSize: 16,
        color: TextColors.black,
        fontFamily: 'reg',
        width: '90%'
    },
    input: {
        borderRadius: 12,
        borderColor: TextColors.disabled,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '5%',
        height: 45,
        alignItems: 'center'
    },
    input_focused: {
        borderRadius: 12,
        borderColor: TextColors.enabled,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '5%',
        height: 45,
        alignItems: 'center',
    },
    drop: {
        width: '80%',
        borderRadius: 12,
        borderColor: TextColors.disabled,
        borderWidth: 1,
        padding: 10,
        flexDirection: 'column',
        gap: 3,
        zIndex: 4,
    },
    drop_component: {
        width: '100%',
        justifyContent: 'center',
        height: 30,
        paddingHorizontal: '3%',
    },
    drop_component_focused: {
        width: '100%',
        justifyContent: 'center',
        height: 30,
        borderRadius: 8,
        backgroundColor: TextColors.disabled,
        paddingHorizontal: '3%',

    },
    disabled: {

    },
    input_limited: {
        borderRadius: 12,
        borderColor: '#d3d3d3',
        borderWidth: 1,
        flexDirection: 'column',
        paddingLeft: '5%',
        paddingTop: 5,
        height: 'auto',
        alignItems: 'center'
    },
    limited_container: {
        paddingVertical: 10,
        paddingRight: '5%',
        width: '100%'
    },
    limited_down_container: {
        width: '100%',
        flexDirection: 'row-reverse',
        gap: 10
    },
    limited_icon_container: {
        paddingTop: 4,
        paddingLeft: 2,
        paddingRight: 8,
        paddingBottom: 5,
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    limited_icon: {
        width: 9,
        height: 9,
        borderBottomRightRadius: 8,
        borderColor: TextColors.disabled,
        borderBottomWidth: 2,
        borderRightWidth: 2,
    },
    input_drop: {

    }
})