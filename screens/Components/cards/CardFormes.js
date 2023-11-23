import react from "react";
import { TouchableOpacity, View } from "react-native";
import * as gStyle from '../../../assets/Styles/globalStyle';
import { Title } from "../../../assets/Styles/Consts";

export default function CardFormes({ navigation }) {
    return (
        <View style={gStyle.gPage.page}>
            <Title text={'Заполните информацию'} />
        </View>
    );
}