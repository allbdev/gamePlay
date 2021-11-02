import React from 'react';
import {ActivityIndicator, Alert, Image, Text, View} from "react-native";

import {styles} from "./styles";
import {theme} from "../../global/styles/theme";

import IllustrationImg from '../../assets/illustration.png'

import ButtonIcon from "../../components/ButtonIcon";
import Background from "../../components/Background";

import {useAuth} from "../../hooks/auth";

export default function SignIn() {
    const {loading, signIn} = useAuth();

    async function handleSignIn() {

        try{
            await signIn();
        } catch (e){
            Alert.alert(e);
        }

    }

    return (
        <Background>
            <View style={styles.container}>
                <Image
                    source={IllustrationImg}
                    resizeMode="stretch"
                    style={styles.image}
                />
                <View style={styles.content}>
                    <Text style={styles.title}>
                        Conecte-se {`\n`}e organize suas {`\n`}jogatinas
                    </Text>
                    <Text style={styles.subTitle}>
                        Crie grupos para jogar seus games {`\n`}favoritos com seus amigos
                    </Text>

                    {
                        loading ? (
                            <ActivityIndicator
                                color={theme.colors.primary}
                            />
                            )  : (
                                <ButtonIcon
                                    title="Entrar com discord"
                                    onPress={handleSignIn}
                                />
                            )
                    }
                </View>
            </View>
        </Background>
    )
}
