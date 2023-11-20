import { TouchableHighlight, Text, TouchableOpacity } from "react-native";
import * as gStyle from "./globalStyle";

export const Button_continue = ({ onPress, title, ButtonStyle, TextStyle, underlayColor }) => {
    const defaultUnderlayColor = '#19274A';

    return (
        <TouchableHighlight
            style={[gStyle.ButtonStyles.button_continue, ButtonStyle]}
            onPress={onPress}
            underlayColor={underlayColor || defaultUnderlayColor} //underlayColor указать для светлой кнопки
        >
            <Text style={[gStyle.Texts.button_ts, TextStyle]}>
                {title ? title : 'Продолжить'}
            </Text>
        </TouchableHighlight >
    );
}

export const Button_skip = ({ onPress }) => {
    return (
        <TouchableOpacity>
            <Text style={[gStyle.Texts.button_skip_ts, {
                alignItems: 'center',
                justifyContent: 'center',
            }]}>
                Пропустить
            </Text>
        </TouchableOpacity>
    );
}