import React from "react";
import {View, Text} from "react-native";
import {RectButton, RectButtonProps} from "react-native-gesture-handler";
import {SvgProps} from "react-native-svg";
import {LinearGradient} from "expo-linear-gradient";

import {styles} from "./styles";
import {theme} from "../../global/styles/theme";

type Props = RectButtonProps & {
    title: string;
    icon: React.FC<SvgProps>;
    checked?: boolean;
    hasCheckBox?: boolean
}

export default function Category({title,icon: Icon,checked = false,hasCheckBox = false, ...rest}: Props){
    const {secondary40, secondary50, secondary75, secondary80,secondary100} = theme.colors;

    return(
        <RectButton
            {...rest}
        >
            <LinearGradient
                colors={[secondary80,secondary100]}
                style={styles.container}
            >
                <LinearGradient
                    style={[styles.content, {opacity: checked ? 1 : .4}]}
                    colors={[checked ? secondary75 : secondary50,secondary40]}
                >
                    {
                        hasCheckBox && (
                            <View
                                style={checked ? styles.checked : styles.check}
                            />
                        )
                    }
                    <Icon
                        width={48}
                        height={48}
                    />
                    <Text style={styles.title}>
                        {title}
                    </Text>
                </LinearGradient>
            </LinearGradient>
        </RectButton>
    )
}
