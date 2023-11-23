import react from "react";
import { TouchableOpacity, View } from "react-native";
import * as gStyle from '../../../assets/Styles/globalStyle';
import { Ionicons } from "@expo/vector-icons";

export default function Cards({ navigation }) {
    return (
        <View style={gStyle.gPage.page}>
            <TouchableOpacity onPress={() => { navigation.navigate('CardFormes') }} >
                <Ionicons name="add-circle-outline" />
            </TouchableOpacity>
        </View>
    );
}