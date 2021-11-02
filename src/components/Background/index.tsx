import React, {ReactNode} from "react";

import {styles} from "./styles";
import {LinearGradient} from "expo-linear-gradient";
import {theme} from "../../global/styles/theme";

type Props = {
    children: ReactNode;
}

export default function Background({children}: Props){
    const {secondary80,secondary100} = theme.colors;
    return(
        <LinearGradient
            colors={[secondary80, secondary100]}
            style={styles.container}
        >
            {children}
        </LinearGradient>
    )
}
