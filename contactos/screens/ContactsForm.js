import { View, Text, StyleSheet, Alert } from "react-native";
import { Input, Button } from "@rneui/base";
import { useState } from "react";
import { saveContactRest, updateContactRest, deleteContactRest } from "../rest_client/contactos";

export const ContactsForm = ({ navigation, route }) => {
    let contactRetrived = route.params.contactParam;
    let isNew = true;

    if (contactRetrived != undefined) {
        isNew = false;
    }


    const [name, setName] = useState(isNew ? null : contactRetrived.nombre);
    const [surName, setSurName] = useState(isNew ? null : contactRetrived.apellido);
    const [phoneNumber, setPhoneNumber] = useState(isNew ? null : contactRetrived.telefono);



    const showMessage = (message) => {
        Alert.alert("Confirmacion", message);
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

    const confirmDelete = () => {
        Alert.alert("Confirmacion",
            "Esta seguto de que quiere eliminar?",
            [{
                text: "SI",
                onPress:deleteContact
            },
            {
                text: "Cancelar"
            }]);
    }

    const deleteContact =()=>{
        deleteContactRest({
            id: contactRetrived.id
        }, showMessage);
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
        {
            isNew ? <View></View> : <Button
                title="Eliminar"
                onPress={confirmDelete}
            />
        }

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
