import React from "react";
import {Text, TouchableOpacity, TouchableOpacityProps, View} from "react-native";
import {Feather} from "expo-vector-icons";

import {theme} from "../../global/styles/theme";
import {styles} from "./style";

import GuildIcon from "../GuildIcon";

import {GuildProps} from "../Appointment";

type Props = & TouchableOpacityProps & {
    data: GuildProps
}

export default function Guild({data, ...rest}: Props){
    return(
        <TouchableOpacity
            style={styles.container}
            activeOpacity={.7}
            {...rest}
        >
            <GuildIcon
                guildId={data.id}
                iconId={data.icon}
            />

            <View style={styles.content}>
                <View>
                    <Text style={styles.title}>
                        {data.name}
                    </Text>
                    <Text style={styles.type}>
                        {data.owner ? 'Administrador' : 'Convidado'}
                    </Text>
                </View>
            </View>

            <Feather
                name="chevron-right"
                color={theme.colors.heading}
                size={24}
            />
        </TouchableOpacity>
    )
}
