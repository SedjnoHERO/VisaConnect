import react from "react";
import { Text, View } from "react-native";
import { InfoCells } from '../../../assets/Styles/Consts';

export default function Info({ navigation }) {
    return (
        <View style={{ flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row' }}>
                <InfoCells />
                <InfoCells />
            </View>
        </View>
    );
}

//починить
//использовать flatlist + specificInfo для создания страниц о подробной информации