import { View, Text, StyleSheet, Alert } from "react-native";
import { Input, Button } from "@rneui/base";
import { useState } from "react";
import { saveContactRest, updateContactRest } from "../rest_client/contactos";

export const ContactsForm = ({ navigation, route }) => {
    let contactRetrived = route.params.contactParam;
    let isNew = true;

    if (contactRetrived != undefined) {
        isNew = false;
    }


    const [name, setName] = useState(isNew ? null : contactRetrived.nombre);
    const [surName, setSurName] = useState(isNew ? null : contactRetrived.apellido);
    const [phoneNumber, setPhoneNumber] = useState(isNew ? null : contactRetrived.telefono);



    const showMessage = () => {
        Alert.alert("Confirmacion", isNew ? "Contacto creado con exito" : "Contacto actualizado con exito");
        navigation.goBack();
    }

    const createContact = () => {
        console.log("Guardando contacto...")

        saveContactRest(
            {
                name: name,
                surName: surName,
                phoneNumber: phoneNumber
            },
            showMessage
        )
    }

    const updateContact = () => {
        console.log("Actualizando contacto...")
        updateContactRest({
            id: contactRetrived.id,
            name: name,
            surName: surName,
            phoneNumber: phoneNumber
        },

            showMessage)
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
            onPress={isNew ? createContact : updateContact}
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
