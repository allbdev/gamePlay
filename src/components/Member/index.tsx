import React from "react";
import {Text, View} from "react-native";
import Avatar from "../Avatar";
import {styles} from "./styles";
import {theme} from "../../global/styles/theme";

export type MemberProps = {
    length: string;
    id: string,
    username: string,
    avatar_url: string,
    status: string,
}

type Props = {
    data: MemberProps
}

export default function Member({data}: Props){
    const isOnline = data.status === 'online';

    return(
        <View style={styles.container}>
            <Avatar urlImage={data.avatar_url}/>

            <View>
                <Text style={styles.title}>
                    { data.username }
                </Text>

                <View style={styles.status}>

                    <View style={[
                        styles.bulletStatus,
                        {
                            backgroundColor: isOnline ? theme.colors.on : theme.colors.primary
                        }
                    ]}/>

                    <Text style={styles.nomeStatus}>
                        {isOnline ? 'Disponível' : 'Ocupado'}
                    </Text>
                </View>
            </View>

        </View>
    )
}
