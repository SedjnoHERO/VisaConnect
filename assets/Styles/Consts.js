import { TouchableHighlight, Text, TouchableOpacity, TextInput, View, SafeAreaView } from "react-native";
import * as gStyle from "./globalStyle";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { CaretUpDown } from 'phosphor-react-native';


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
        <View style={gStyle.gPage.title}>
            <TouchableOpacity style={gStyle.gPage.container} onPress={goBack}><MaterialIcons name='keyboard-backspace' size={24} color={gStyle.TextColors.black} /></TouchableOpacity>
            <View style={{ ...gStyle.gPage.container, flex: 10 }}><Text numberOfLines={1} style={{ ...gStyle.gPage.headline, marginBottom: 0 }}>{text}</Text></View>
            <View style={gStyle.gPage.container}></View>
        </View>
    )
}

export const DropInput = ({ headline }) => {
    const [inputText, setInputText] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = () => {
        setIsFocused(true);
    };
    const handleBlur = () => {
        setIsFocused(false);
    };
    return (
        <View style={{ ...gStyle.Cards.form, gap: 5, alignItems: 'flex-end' }}>
            <View style={gStyle.Cards.form}>
                <Text style={gStyle.Cards.special_ts}>{headline}</Text>
                <View style={isFocused ? gStyle.Cards.input_focused : gStyle.Cards.input}>
                    <TextInput
                        style={gStyle.Cards.container}
                        placeholder={'Выбрать'}
                        placeholderTextColor={gStyle.TextColors.disabled}
                        value={inputText}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChangeText={setInputText}
                        maxLength={30}
                    />
                    <CaretUpDown size={24} color={isFocused ? gStyle.TextColors.enabled : gStyle.TextColors.disabled} />
                </View>
            </View>
            {isFocused && <Drop />}
        </View>
    )
}

// связать с БД, оформить в БД, сделать уникальными для county и type
export const Drop = ({ }) => {
    return (
        <View style={gStyle.Cards.drop}>
            <View style={gStyle.Cards.drop_component}><Text style={{ ...gStyle.Texts.article_ts, fontFamily: 'reg' }}>Туристическая</Text></View>
            <View style={gStyle.Cards.drop_component}><Text style={{ ...gStyle.Texts.article_ts, fontFamily: 'reg' }}>Гостевая</Text></View>
            <View style={gStyle.Cards.drop_component}><Text style={{ ...gStyle.Texts.article_ts, fontFamily: 'reg' }}>Бизнес-виза</Text></View>
            <View style={gStyle.Cards.drop_component_focused}><Text style={{ ...gStyle.Texts.article_ts, fontFamily: 'reg' }}>Рабочая</Text></View>
            <View style={gStyle.Cards.drop_component}><Text style={{ ...gStyle.Texts.article_ts, fontFamily: 'reg' }}>Студенческая</Text></View>
            <View style={gStyle.Cards.drop_component}><Text style={{ ...gStyle.Texts.article_ts, fontFamily: 'reg' }}>На постоянное место жительства</Text></View>
        </View>
    )

}

export const InputLimited = ({ length, headline }) => {
    const [inputText, setInputText] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = () => {
        setIsFocused(true);
    };
    const handleBlur = () => {
        setIsFocused(false);
    };
    return (
        <View style={gStyle.Cards.form}>
            <Text style={gStyle.Cards.special_ts}>{headline}</Text>
            <View style={isFocused ? { ...gStyle.Cards.input_limited, borderColor: gStyle.TextColors.enabled } : gStyle.Cards.input_limited}>
                <View style={{ paddingVertical: 5, paddingRight: '5%', width: '100%', height: 'auto' }}>
                    <TextInput
                        style={gStyle.Cards.container}
                        placeholder={'Текст'}
                        placeholderTextColor={gStyle.TextColors.disabled}
                        value={inputText}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChangeText={setInputText}
                        maxLength={length}
                        multiline={true}
                    />
                </View>
                <View style={gStyle.Cards.limited_down_container}>
                    <View style={gStyle.Cards.limited_icon_container}>
                        <View style={{ ...gStyle.Cards.limited_icon, borderColor: isFocused ? gStyle.TextColors.enabled : gStyle.TextColors.disabled }} />
                    </View>
                    <Text style={{ fontFamily: 'reg', fontSize: 12, color: isFocused ? gStyle.TextColors.enabled : gStyle.TextColors.disabled }}>0/{length}</Text>
                </View>
            </View>
        </View>
    )
}

export const DefInput = ({ headline, text }) => {
    const [focused, setFocused] = useState(false);
    const [inputText, setInputText] = useState('');

    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        setFocused(false);
    };

    return (
        <View style={{ flexDirection: 'column', gap: 10 }}>
            <Text style={[{ paddingHorizontal: '5%', fontFamily: 'reg', fontSize: 16, color: '#d3d3d3' }]}>{headline}</Text>
            <View style={{ borderRadius: 12, borderColor: focused ? '#797979' : '#d3d3d3', borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '5%', height: 45, alignItems: 'center' }}>
                <TextInput
                    style={{ flex: 1, fontSize: 16, color: '#d3d3d3', fontFamily: 'reg' }}
                    placeholder={text}
                    placeholderTextColor="#d3d3d3"
                    value={inputText}
                    onChangeText={setInputText}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </View>
        </View>
    );
};


