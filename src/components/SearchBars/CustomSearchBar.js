import React, { useContext } from 'react'
import { SearchBar } from '@rneui/base';
import { ThemeContext } from '../../context/ThemeContext';
import AppSubHeaderStyle from '../../assets/styles/AppSubHeaderStyle';
import { widthPercentageToDP as wp} from 'react-native-responsive-screen';
import TranslationFile from '../../assets/translation/TranslationFile';
import AppContext from '../../context/AppContext';



const CustomSearchBar = ({ searchQuery, handleSearchOnChange }) => {
    const { theme, } = useContext(ThemeContext);
    const {language} = useContext(AppContext)


    return (
        <SearchBar
            lightTheme
            onChangeText={handleSearchOnChange}      // YE AIK FUNCTION LY RAHA HAI DISCUSSION WALI SCREEN SY
            value={searchQuery}                     // ISS MEIN WO VALUE AIY GI JO K HUM SEARCH KR RAHY HAIN VALUE MREIN DATA DISCUSSION WALI SCREEN SY AA RAHA HAI
            elevation={0}
            underlineColorAndroid={"transparent"}
            placeholder={TranslationFile[language].Search}
            placeholderTextColor={theme.headerSearchText} //light
            round
            showCancel
            containerStyle={[AppSubHeaderStyle.container(theme.headerColor)]}
            inputContainerStyle={[AppSubHeaderStyle.inputContainer, { backgroundColor: theme.headerSearchBar }]}
            // inputContainerStyle={[AppSubHeaderStyle.inputContainer, { backgroundColor:AppColors.tab}]}
            inputStyle={{ color: theme.headerSearchText }}
            searchIcon={{ color: theme.headerSearchText, size: 20 }}
            clearIcon={{ color: theme.headerSearchText }}
            leftIconContainerStyle={AppSubHeaderStyle.iconContainer}
            rightIconContainerStyle={AppSubHeaderStyle.iconContainer}
            clearTextOnFocus={true}
        />
    )
}

export default CustomSearchBar