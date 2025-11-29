import { View, Text, StyleSheet, FlatList, TouchableHighlight } from "react-native";
import { Button, ListItem, FAB } from "@rneui/base";
import { getAllContacts } from "../rest_client/contactos";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

export const ContactsList = ({ navigation }) => {
    const [contactsList, setContactsList] = useState([]);

    const fnRefreshList = (contacts) => {
        console.log("Refrescando lista de contactos..., ", contacts);
        setContactsList(contacts);
    }

    useFocusEffect(
        useCallback(() => {
            console.log("Pantalla enfocada, refrescando lista...");
            getAllContacts(fnRefreshList);
        }, [])
    );

    const ContactItem = ({ contact }) => {
        return <TouchableHighlight onPress={()=>{
            navigation.navigate('ContactsFormNav',{contactParam:contact});
        }}>
            <ListItem>
                <ListItem.Content>
                    <ListItem.Title>{contact.nombre} {contact.apellido}</ListItem.Title>
                    <ListItem.Subtitle>{contact.celular}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        </TouchableHighlight>
    }

    
    return <View style={styles.container}>
        
        <FlatList
            data={contactsList}
            renderItem={({ item }) => {
                return <ContactItem contact={item} />
            }}
        />
        <FAB
            title="+"
            onPress={() => { navigation.navigate('ContactsFormNav',{}) }}
        />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
    },
});
