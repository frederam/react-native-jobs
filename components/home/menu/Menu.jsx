import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { COLORS, images } from "../../../constants";

const Menu = () => {
  return (
    <View
      style={{
        flex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.lightWhite,
        zIndex: 1,
      }}
    >
      <View style={{ marginTop: 50, marginLeft: 20, flex: 1, gap: 10 }}>
        <Image
          source={images.profile}
          resizeMode="cover"
          style={{
            width: '20%',
            height: '20%',
            borderRadius: 10,
          }}
        />
        <Text style={{ fontSize: 24 }}>Developed by Frederick Valle</Text>
      </View>
    </View>
  );
};

export default Menu;
