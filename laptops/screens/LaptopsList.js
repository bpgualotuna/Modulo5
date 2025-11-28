import { View, Text, StyleSheet, FlatList, TouchableHighlight } from "react-native";
import { Button, ListItem, FAB } from "@rneui/base";
import { getAllLaptops } from "../rest_client/laptops.js";
import { useState, useEffect } from "react";

export const LaptopsList = ({ navigation }) => {
    const [laptopsList, setLaptopsList] = useState([]);

    useEffect(() => {
        console.log("Ejecutando la funcion de useEffect");
        getAllLaptops(fnRefreshList);
    }, []);


    const LaptopItem = ({ laptop }) => {
        return <TouchableHighlight onPress={()=>{
            navigation.navigate('LaptopsForm',{laptopParam:laptop});
        }}>
            <ListItem>
                <ListItem.Content>
                    <ListItem.Title>{laptop.marca} {laptop.modelo}</ListItem.Title>
                    <ListItem.Subtitle>{laptop.procesador} - {laptop.memoria} - {laptop.disco}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        </TouchableHighlight>
    }

    const fnRefreshList = (latops) => {
        console.log("Refrescando lista de laptops..., ", latops);
        setLaptopsList(latops);
    }

    return <View style={styles.container}>
        
        <FlatList
            data={laptopsList}
            renderItem={({ item }) => {
                return <LaptopItem laptop={item} />
            }}

        />
        <FAB
            title="+"
            onPress={() => { navigation.navigate('LaptopsForm',{}) }}
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

