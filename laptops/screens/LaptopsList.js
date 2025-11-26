import { View, Text, StyleSheet, FlatList } from "react-native";
import { Button, ListItem } from "@rneui/base";
import { getAllLaptops } from "../rest_client/laptops.js";
import { useState } from "react";

export const LaptopsList = () => {
    const [laptopsList, setLaptopsList] = useState([]);

    const LaptopItem = ({ laptop }) => {
        return <ListItem>
            <ListItem.Content>
                <ListItem.Title>{laptop.marca} {laptop.modelo}</ListItem.Title>
                <ListItem.Subtitle>{laptop.procesador} - {laptop.memoria} - {laptop.disco}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    }

    const fnRefreshList = (latops) => {
        console.log("Refrescando lista de laptops..., ", latops);
        setLaptopsList(latops);
    }

    return <View>
        <Text>LISTA DE LAPTOPS</Text>
        <Button
            title="Consultar"
            onPress={()=>{
                getAllLaptops(fnRefreshList);
            }}
        />
        <FlatList
            data={laptopsList}
            renderItem={({item})=>{
                return <LaptopItem laptop={item} />
            }}
            
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

