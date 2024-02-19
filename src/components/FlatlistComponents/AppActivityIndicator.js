import { ActivityIndicator } from "react-native";
import AppColors from "../../assets/colors/Appcolors";
import { useContext } from "react";
import { ThemeContext } from "@rneui/themed";

export default () => {
    const { darkThemeActivator } = useContext(ThemeContext);
    return (
        <ActivityIndicator size="small" color={darkThemeActivator ? AppColors.white : AppColors.black} style={{ alignSelf: 'center' }}/>

    )
}