import React from "react";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { Octicons } from "@expo/vector-icons";

const styles = StyleSheet.create({
  // view: {
  //   marginTop: 50,
  // },

  // text: {
  //   left: "35%",
  //   fontSize: 20,
  // },

  // img: {
  //   width: "10%",
  //   height: "10%",
  //   borderRadius: 10,
  //   resizeMode: "contain",
  // },

  // btn: {
  //   display: "flex",
  //   width: "90%",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   alignSelf: "center",
  //   backgroundColor: "grey",
  //   padding: 10,
  //   borderRadius: 5,
  // },
  espacio: {
    marginTop: 40,
  },
  contProd: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    borderColor: "#c8c8c8",
    borderWidth: 1,
    margin: 12,
    borderRadius: 20,
    elevation: 5,
    backgroundColor: "#c8c8c8",
    
  },
  favoritos: {
    position: "absolute",
    fontSize: 20,
    top: 22,
    right: 60,
    zIndex: 999,
  },

  contFoto: {
    width: 120,
    height: 120,
    backgroundColor: "white",
    borderRadius: 10,
    margin: 10,
    marginLeft: 14,
  },

  img: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode: "contain",
  },

  contDatos: {
    width:200,
    margin: 10,
  },

  nombre: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 5,
  },

  precio: {
    position: "absolute",
    bottom: 0,
    // marginTop: 5,
    fontWeight: "bold",
  },
});

export default function Favorito({ navigation, item }) {
  return (
      <Pressable
        onPress={() => navigation.navigate("DetalleProducto", { id: item.id })}
      >  
        <View style={styles.contProd}>
          <View style={styles.contFoto}>
            <Image source={{ uri: item.imagen }} style={styles.img} alt="uwu" />
          </View>
          <View style={styles.contDatos}>
            <Text style={styles.nombre}>{item.nombre}</Text>
            <Text style={styles.precio}>${item.precio}</Text>
          </View>
        </View>
      </Pressable>
  );
}
