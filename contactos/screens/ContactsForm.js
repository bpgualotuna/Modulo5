import { View, Text, StyleSheet, Alert } from "react-native";
import { Input, Button } from "@rneui/base";
import { useState } from "react";
import { saveContactRest } from "../rest_client/contactos";

export const ContactsForm = ({navigation}) => {
    const [name, setName] = useState();
    const [surName, setSurName] = useState();
    const [phoneNumber, setPhoneNumber] = useState();

    const showMessage = () =>{
        Alert.alert("Confirmacion","Contacto guardado con exito");
    }

    const saveContact = () => {
        console.log("Guardando contacto...")
        navigation.goBack();
        saveContactRest(
            {
                name: name,
                surName: surName,
                phoneNumber: phoneNumber
            },
            showMessage
        )
    }


    return <View style={styles.container}>
        <Text>Formulario de Contactos </Text>
        <Input
            value={name}
            placeholder="Nombre"
            onChangeText={(value) => {
                setName(value)
            }}
        />
        <Input
            value={surName}
            placeholder="Apellido"
            onChangeText={(value) => {
                setSurName(value)
            }}
        />
        <Input
            value={phoneNumber}
            placeholder="Teléfono"
            onChangeText={(value) => {
                setPhoneNumber(value)
            }}
        />
        <Button
            title="Guardar"
            onPress={saveContact}
        />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
