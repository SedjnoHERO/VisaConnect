import { TouchableHighlight, Text, TouchableOpacity, TextInput, View, SafeAreaView } from "react-native";
import * as gStyle from "./globalStyle";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";


export const Button_continue = ({ onPress, title, ButtonStyle, TextStyle, underlayColor, disabled }) => {
    const defaultUnderlayColor = '#19274A';

    const handlePress = () => {
        if (!disabled) {
            onPress();
        }
    };

    return (
        <TouchableHighlight
            style={[gStyle.ButtonStyles.button_continue, ButtonStyle, disabled && { opacity: 0.5 }]}
            onPress={handlePress}
            underlayColor={underlayColor || defaultUnderlayColor}
            disabled={disabled}
        >
            <Text style={[gStyle.Texts.button_ts, TextStyle]}>
                {title ? title : 'Продолжить'}
            </Text>
        </TouchableHighlight>
    );
}


export const Button_skip = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={[gStyle.Texts.button_skip_ts, {
                alignItems: 'center',
                justifyContent: 'center',
            }]}>
                Пропустить
            </Text>
        </TouchableOpacity>
    );
}

export const Inputs = ({ TextPlaceHolder, secure, valueInfo, ChangeText }) => {
    const secureDefault = false;
    return (
        <TextInput
            style={[gStyle.Inputs.Input, gStyle.Inputs.PlaceHolder]}
            placeholder={TextPlaceHolder}
            placeholderTextColor='rgba(36, 36, 36, 0.6)'
            value={valueInfo}
            secureTextEntry={secure || secureDefault}
            editable={true}
            onChangeText={ChangeText}
            autoCorrect={false}
            textContentType='none'
        />
    );
}

export const createCard = ({ }) => {
    return (
        <View>

        </View>
    );
}

export const CustomIcon = ({ focused, iconName, FolderName }) => {
    const iconColor = focused ? gStyle.Colors.main_color : gStyle.TextColors.black;
    const backgroundColor = focused ? gStyle.Colors.main_accent_color : gStyle.Colors.secondary_accent_color;

    return (
        <View style={[gStyle.BottomTabStyle.icon, { backgroundColor }]}>
            <FolderName name={iconName} size={30} color={iconColor} />
        </View>
    );
};



export const Title = ({ text }) => {
    const navigation = useNavigation();
    const goBack = () => {
        navigation.goBack();
    };
    return (
        <View style={gStyle.Info.title}>
            <TouchableOpacity style={gStyle.gPage.for_title} onPress={goBack}><MaterialIcons name='keyboard-backspace' size={24} color={gStyle.TextColors.black} /></TouchableOpacity>
            <View style={gStyle.gPage.for_title}><Text style={{ ...gStyle.gPage.title, marginBottom: 0 }}>{text}</Text></View>
        </View>
    )
}
