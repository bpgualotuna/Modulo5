import { View, Text, StyleSheet, Alert } from "react-native";
import { Input, Button } from "@rneui/base";
import { useState } from "react";
import { saveLaptopRest } from "../rest_client/laptops";

export const LaptopsForm = ({navigation}) => {
    const [marca, setMarca] = useState();
    const [procesador, setProcesador] = useState();
    const [memoria, setMemoria] = useState();
    const [disco, setDisco] = useState();

    const showMessage = () =>{
        Alert.alert("Confirmacion","Laptop guardada con exito");
    }

    const saveLaptop = () => {
        console.log("Guardando laptop...")
        navigation.goBack();
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
            onPress={saveLaptop}
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