import { View, Text, StyleSheet, Alert } from "react-native";
import { Input, Button } from "@rneui/base";
import { useState } from "react";
import { saveLaptopRest, updateLaptopRest } from "../rest_client/laptops";

export const LaptopsForm = ({navigation, route}) => {
    let laptopRetrived = route.params.laptopParam;
    let isNew = true;

    if (laptopRetrived != undefined) {
        isNew = false;
    }


    const [marca, setMarca] = useState(isNew ? null : laptopRetrived.marca);
    const [procesador, setProcesador] = useState(isNew ? null : laptopRetrived.procesador);
    const [memoria, setMemoria] = useState(isNew ? null : laptopRetrived.memoria);
    const [disco, setDisco] = useState(isNew ? null : laptopRetrived.disco);

    const showMessage = () =>{
        Alert.alert("Confirmacion", isNew ? "Laptop creada con exito" : "Laptop actualizada con exito");
        navigation.goBack();
    }

    const createLaptop = () => {
        console.log("Guardando laptop...")
        saveLaptopRest(
            {
                marca: marca,
                procesador: procesador,
                memoria: memoria,
                disco: disco
            },
            showMessage
        )
    }

    const updateLaptop = () => {
        console.log("Actualizando laptop...")

        updateLaptopRest(
            {
                id: laptopRetrived.id,
                marca: marca,
                procesador: procesador,
                memoria: memoria,
                disco: disco
            },
            showMessage
        )
    }
    return <View style={styles.container}>
        <Text>Formulario de Laptops </Text>
        <Input
            value={marca}
            placeholder="Marca"
            onChangeText={(value) => {
                setMarca(value)
            }}
        />
        <Input
            value={procesador}
            placeholder="Procesador"
            onChangeText={(value) => {
                setProcesador(value)
            }}
        />
        <Input
            value={memoria}
            placeholder="Memoria"
            onChangeText={(value) => {
                setMemoria(value)
            }}
        />
        <Input
            value={disco}
            placeholder="Disco"
            onChangeText={(value) => {
                setDisco(value)
            }}
        />
        <Button
            title="Guardar"
            onPress={isNew ? createLaptop : updateLaptop}
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