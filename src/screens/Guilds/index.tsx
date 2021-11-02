import React, {useEffect, useState} from "react";
import {FlatList, View} from "react-native";

import {styles} from "./style";

import Guild from "../../components/Guild";
import ListDivider from "../../components/ListDivider";
import {GuildProps} from "../../components/Appointment";
import Load from "../../components/Load";
import {api} from "../../services/api";

type Props = {
    handleSelectGuild: (guild: GuildProps) => void
}

export default function Guilds({handleSelectGuild}: Props){
    const [guilds, setGuilds] = useState<GuildProps[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchGuild(){
        const response = await api.get('/users/@me/guilds');

        setGuilds(response.data);
        setLoading(false);
    }

    useEffect(() => {
        fetchGuild();
    }, [])

    return(
        <View style={styles.container}>
            {
                loading ? (
                    <Load/>
                ) : (
                    <FlatList
                        data={guilds}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => (
                            <Guild
                                data={item}
                                onPress={() => handleSelectGuild(item)}
                            />
                        )}
                        ItemSeparatorComponent={() => <ListDivider/>}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom: 20, paddingTop: 10}}
                        style={styles.guild}
                    />
                )
            }
        </View>
    )
}
