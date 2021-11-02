import React, {useState} from 'react';
import {Alert, KeyboardAvoidingView, Modal, Platform, ScrollView, Text, View} from "react-native";
import {RectButton} from "react-native-gesture-handler";
import {Feather} from "expo-vector-icons";
import uuid from 'react-native-uuid';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";

import {styles} from "./styles";

import Header from "../../components/Header";
import Background from "../../components/Background";
import CategorySelect from "../../components/CategorySelect";
import {theme} from "../../global/styles/theme";
import GuildIcon from "../../components/GuildIcon";
import SmallInput from "../../components/SmallInput";
import TextArea from "../../components/TextArea";
import ListHeader from "../../components/ListHeader";
import Button from "../../components/Button";
import ModalView from "../../components/ModalView";
import Guilds from "../Guilds";
import {GuildProps} from "../../components/Appointment";

import {COLLECTION_APPOINTMENTS} from "../../configs/database";

export default function AppointmentCreate() {
    const navigation = useNavigation();

    const [category, setCategory] = useState('1');
    const [modal, setModal] = useState(false);
    const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [description, setDescription] = useState('');


    function handleSelectCategory(categoryId: string) {
        categoryId === category ? setCategory('') : setCategory(categoryId);
    }

    function handleSelectGuild(guildSelect: GuildProps) {
        setGuild(guildSelect);
        setModal(false);
    }

    async function handleSave(){

        if(!guild.id){
            Alert.alert('Selecione a sua guild');
            return;
        }

        if(day === '' || month === '' || hour === '' || minute === '' || description === ''){
            Alert.alert('Por favor, preencha todos os campos');
            return;
        }

        if(parseInt(day) > 31){
            Alert.alert('Dia inválido');
            return;
        }

        if(parseInt(month) > 12){
            Alert.alert('Mês invalido');
            return;
        }

        if(parseInt(hour) > 24){
            Alert.alert('Hora inválida');
            return;
        }

        if(parseInt(month) > 60){
            Alert.alert('Minuto inválido');
            return;
        }

        const newAppointment = {
            id: uuid.v4(),
            guild,
            category,
            date: `${day}/${month} às ${hour}:${minute}h`,
            description
        }

        const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const appointments = storage ? JSON.parse(storage) : [];

        await AsyncStorage.setItem(COLLECTION_APPOINTMENTS,JSON.stringify([...appointments, newAppointment]));

        navigation.navigate('Home');
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <Background>
                <View
                    style={{height: 95}}
                >
                    <Header
                        title="Agendar Partida"
                    />
                </View>
                <ScrollView>
                    <Text style={[styles.label, {
                        marginLeft: 24,
                        marginTop: 36,
                        marginBottom: 18
                    }]}>
                        Categoria
                    </Text>

                    <CategorySelect
                        categorySelected={category}
                        setCategory={handleSelectCategory}
                        hasCheckBox
                    />

                    <View style={styles.form}>
                        <RectButton
                            onPress={() => setModal(true)}
                        >
                            <View style={styles.select}>

                                {
                                    guild.icon ? <GuildIcon guildId={guild.id} iconId={guild.icon}/> : <View style={styles.image}/>
                                }

                                <View style={styles.selectBody}>
                                    <Text style={styles.label}>
                                        {
                                            guild.name ? guild.name : 'Selecione um servidor'
                                        }
                                    </Text>
                                </View>

                                <Feather
                                    name="chevron-right"
                                    color={theme.colors.heading}
                                    size={18}
                                />

                            </View>
                        </RectButton>

                        <View style={styles.field}>
                            <View>
                                <Text style={styles.label}>Dia e mês</Text>
                                <View style={styles.column}>
                                    <SmallInput
                                        maxLength={2}
                                        value={day}
                                        onChangeText={setDay}
                                    />
                                    <Text style={styles.divider}> / </Text>
                                    <SmallInput
                                        maxLength={2}
                                        value={month}
                                        onChangeText={setMonth}
                                    />
                                </View>
                            </View>
                            <View>
                                <Text style={styles.label}>Hora e minuto</Text>
                                <View style={styles.column}>
                                    <SmallInput
                                        maxLength={2}
                                        value={hour}
                                        onChangeText={setHour}
                                    />
                                    <Text style={styles.divider}> : </Text>
                                    <SmallInput
                                        maxLength={2}
                                        value={minute}
                                        onChangeText={setMinute}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>

                    <View>
                        <ListHeader title="Descrição" subTitle="Max 100 caracteres"/>

                        <View style={styles.textArea}>
                            <TextArea
                                maxLength={100}
                                autoCorrect={false}
                                autoCapitalize="none"
                                numberOfLines={5}
                                value={description}
                                onChangeText={setDescription}
                            />
                        </View>
                    </View>

                    <View style={styles.footer}>
                        <Button
                            title="Agendar"
                            onPress={handleSave}
                        />
                    </View>

                </ScrollView>
            </Background>
            <ModalView
                visible={modal}
                closeModal={() => setModal(false)}
            >
                <Guilds
                    handleSelectGuild={handleSelectGuild}
                />
            </ModalView>
        </KeyboardAvoidingView>
    )
}
