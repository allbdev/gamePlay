import React, {useEffect, useState} from 'react';
import {Alert, FlatList, ImageBackground, Platform, Share, Text, View} from "react-native";
import Background from "../../components/Background";
import Header from "../../components/Header";
import {BorderlessButton} from "react-native-gesture-handler";
import {Fontisto} from '@expo/vector-icons';
import {useRoute} from "@react-navigation/native";
import * as Linking from 'expo-linking';

import {styles} from "./styles";

import {theme} from "../../global/styles/theme";

import BannerImg from '../../assets/banner.png'

import ListHeader from "../../components/ListHeader";
import Member, {MemberProps} from "../../components/Member";
import ListDivider from "../../components/ListDivider";
import ButtonIcon from "../../components/ButtonIcon";

import {AppointmentProps} from "../../components/Appointment";
import {api} from "../../services/api";
import Load from '../../components/Load';

type Params = {
    guildSelected: AppointmentProps;
}

type GuildWidget = {
    id: string,
    name: string,
    instant_invite: string,
    members: MemberProps;
    presence_count: number
}

export default function AppointmentDetails() {
    const route = useRoute();
    const { guildSelected } = route.params as Params;

    const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
    const [loading, setLoading] = useState(true);

    async function fetchGuildWidget(){
        setLoading(true);
        try {
            const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
            console.log(response.data);
            if(response.data)
                setWidget(response.data);

        } catch {
            Alert.alert('Verifique as configurações do servidor, será que o widget está habilitado?');
        } finally {
            setLoading(false);
        }
    }

    function handleShareInvitation(){
        const message = Platform.OS === 'ios' ? `Junte-se a ${guildSelected.guild.name}` : widget.instant_invite;

        Share.share({
            message,
            url: widget.instant_invite
        })
    }

    function handleOpenGuild(){
        Linking.openURL(widget.instant_invite);
    }

    useEffect(() => {
        fetchGuildWidget();
    }, [])

    return (
        <Background>
            <View
                style={{height: 95}}
            >
                <Header
                    title="Detalhes"
                    action={
                        (guildSelected.guild.owner && widget.instant_invite) && (
                            <BorderlessButton
                                onPress={handleShareInvitation}
                            >
                                <Fontisto
                                    name="share"
                                    size={24}
                                    color={theme.colors.primary}
                                />
                            </BorderlessButton>
                        )
                    }
                />
            </View>

            <ImageBackground source={BannerImg} style={styles.banner}>
                <View style={styles.bannerContent}>
                    <Text style={styles.title}>
                        {guildSelected.guild.name}
                    </Text>

                    <Text style={styles.subTitle}>
                        {guildSelected.description}
                    </Text>
                </View>
            </ImageBackground>

            {
                loading ? (
                    <Load/>
                ) : (
                    widget.members ? (
                        <>
                            <ListHeader title="Jogadores" subTitle={`Total: ${widget.members.length}`}/>

                            <FlatList
                                data={widget.members}
                                keyExtractor={item => item.id}
                                ItemSeparatorComponent={() => <ListDivider/>}
                                renderItem={({item}) => (
                                    <Member
                                        data={item}
                                    />
                                )}
                                contentContainerStyle={{paddingBottom: 20}}
                                style={styles.members}
                            />
                        </>
                    ) : (
                        <Text style={[styles.subTitle, {
                            paddingHorizontal: 24,
                            paddingVertical: 30
                        }]}>
                            Widget do servidor está desabilitado
                        </Text>
                    )
                )

            }

            {
                (guildSelected.guild.owner && widget.instant_invite) && (
                    <View style={styles.footer}>
                        <ButtonIcon onPress={handleOpenGuild} title='Entrar no servidor do Discord'/>
                    </View>
                )
            }

        </Background>
    )
}
