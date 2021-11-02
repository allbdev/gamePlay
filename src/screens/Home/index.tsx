import React, {useCallback, useState} from "react";
import {FlatList, View} from "react-native";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {COLLECTION_APPOINTMENTS} from "../../configs/database";

import {styles} from "./styles";

import Profile from "../../components/Profile";
import ButtonAdd from "../../components/ButtonAdd";
import ListHeader from "../../components/ListHeader";
import Background from "../../components/Background";
import Appointment, {AppointmentProps} from "../../components/Appointment";
import ListDivider from "../../components/ListDivider";
import CategorySelect from "../../components/CategorySelect";
import Load from "../../components/Load";

export default function Home() {
    const navigation = useNavigation();
    const [category, setCategory] = useState('');
    const [loading, setLoaging] = useState(true);

    const [appointments, setAppointments] = useState<AppointmentProps[]>([]);

    function handleSelectCategory(categoryId: string) {
        categoryId === category ? setCategory('') : setCategory(categoryId);
    }

    function handleAppointmentDetails(guildSelected: AppointmentProps) {
        navigation.navigate('AppointmentDetails',{
            guildSelected
        });
    }

    function handleAppointmentCreate() {
        navigation.navigate('AppointmentCreate');
    }

    async function loadAppointments(){
        setLoaging(true);
        const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const appoints: AppointmentProps[] = storage ? JSON.parse(storage) : [];

        if(category !== ''){
            setAppointments(appoints.filter(item => item.category === category));
        }else{
            setAppointments(appoints);
        }

        setLoaging(false);
    }

    useFocusEffect(useCallback(() => {
        loadAppointments();
    },[category]))

    return (
        <Background>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Profile/>
                    <ButtonAdd
                        onPress={handleAppointmentCreate}
                    />
                </View>

                <CategorySelect
                    categorySelected={category}
                    setCategory={handleSelectCategory}
                />

                {
                    loading ? (
                        <Load/>
                    ) : (
                        <>
                            <ListHeader
                                title="Partidas agendadas"
                                subTitle={`Total: ${appointments.length}`}
                            />
                            <FlatList
                                data={appointments}
                                keyExtractor={item => item.id}
                                renderItem={({item}) => (
                                    <Appointment
                                        data={item}
                                        onPress={() => handleAppointmentDetails(item)}
                                    />
                                )}
                                style={styles.matches}
                                showsVerticalScrollIndicator={false}
                                ItemSeparatorComponent={() => <ListDivider/>}
                                contentContainerStyle={{paddingBottom: 20}}
                            />
                        </>
                    )
                }
            </View>
        </Background>
    )
}
