import { TouchableHighlight, Text, TouchableOpacity, TextInput, View, SafeAreaView } from "react-native";
import * as gStyle from "./globalStyle";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { CaretUpDown } from 'phosphor-react-native';
import { Drop } from '../../screens/Components/cards/cardsDB'


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

export const DropInput = ({ headline, dropType, onChange }) => {
    const [focused, setFocused] = useState(false);
    const [selectedItem, setSelectedItem] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const handlePress = () => {
        setFocused(true);
        setIsVisible(!isVisible);
    };

    const handleFocus = () => {
        setFocused(true);
        setIsVisible(true);
    };

    const handleBlur = () => {
        setFocused(false);
    };

    const handleInputChange = (text) => {
        setSelectedItem(text);
        onChange(text);
        setIsVisible(false);
    };

    return (
        <View style={{ ...gStyle.Cards.form, gap: 5, alignItems: 'flex-end' }}>
            <View style={gStyle.Cards.form}>
                <Text style={gStyle.Cards.special_ts}>{headline}</Text>
                <TouchableOpacity onPress={handlePress}>
                    <View style={focused ? gStyle.Cards.input_focused : gStyle.Cards.input}>
                        <TextInput
                            style={gStyle.Cards.container}
                            placeholder={'Выбрать'}
                            placeholderTextColor={gStyle.TextColors.disabled}
                            value={selectedItem}
                            onChangeText={handleInputChange}
                            maxLength={30}
                            onBlur={handleBlur}
                            onFocus={handleFocus}
                            editable={false}
                        />
                        <CaretUpDown
                            size={24}
                            color={focused ? gStyle.TextColors.enabled : gStyle.TextColors.disabled}
                        />
                    </View>
                </TouchableOpacity>
            </View>
            <Drop
                dropType={dropType}
                setSelectedItem={setSelectedItem}
                isVisible={isVisible}
                selectedItem={selectedItem}
                setIsVisible={setIsVisible}
                onSelectItem={onChange}
            />
        </View>
    );
};



export const InputLimited = ({ length, headline, onChange }) => {
    const [inputText, setInputText] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [currentLength, setCurrentLength] = useState(0);

    const handleFocus = () => {
        setIsFocused(true);
    };
    const handleBlur = () => {
        setIsFocused(false);
    };
    const handleTextChange = (text) => {
        onChange(text);
        setInputText(text);
        setCurrentLength(text.length);
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
                        onChangeText={handleTextChange}
                        maxLength={length}
                        multiline={true}
                    />
                </View>
                <View style={gStyle.Cards.limited_down_container}>
                    <View style={gStyle.Cards.limited_icon_container}>
                        <View style={{ ...gStyle.Cards.limited_icon, borderColor: isFocused ? gStyle.TextColors.enabled : gStyle.TextColors.disabled }} />
                    </View>
                    <Text style={{ fontFamily: 'reg', fontSize: 12, color: isFocused ? gStyle.TextColors.enabled : gStyle.TextColors.disabled }}>{currentLength}/{length}</Text>
                </View>
            </View>
        </View>
    )
}

export const DefInput = ({ headline, text, active, onChange }) => {
    const [focused, setFocused] = useState(false);
    const [inputText, setInputText] = useState('');

    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        setFocused(false);
    };

    const handleInputChange = (text) => {
        setInputText(text);
        onChange(text);
    };

    return (
        <View style={{ flexDirection: 'column', gap: 10 }}>
            <Text style={[{ paddingHorizontal: '5%', fontFamily: 'reg', fontSize: 16, color: active ? gStyle.TextColors.black : gStyle.TextColors.disabled }]}>{headline}</Text>
            <View style={{ borderRadius: 12, borderColor: focused ? '#797979' : '#d3d3d3', borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '5%', height: 45, alignItems: 'center' }}>
                <TextInput
                    style={gStyle.Cards.container}
                    placeholder={text}
                    placeholderTextColor="#d3d3d3"
                    value={inputText}
                    onChangeText={handleInputChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    editable={active}
                />
            </View>
        </View>
    );
};


