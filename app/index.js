import { useState } from "react";
import { View, SafeAreaView, TouchableOpacity, Text, TextInput, Image } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, SIZES } from "../constants";
import styles from "../components/home/welcome/welcome.style";
import { ScreenHeaderBtn, Menu } from '../components'

const Home = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    if (searchTerm) {
      router.push(`/home/${encodeURIComponent(searchTerm)}`);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerRight: () => (
            <>
              <ScreenHeaderBtn
                iconUrl={isMenuOpen ? icons.close : icons.menu}
                dimension="60%"
                handlePress={toggleMenu}
              />
            </>
          ),
          headerTitle: "",
        }}
      />
      <View style={{ flex: 1, padding: SIZES.medium }}>
        <View style={styles.container}>
          <Text style={styles.userName}>Hello!</Text>
          <Text style={styles.welcomeMessage}>Please enter your city.</Text>
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
              placeholder="City you want to look for"
            />
          </View>

          <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
            <Image source={icons.chevronRight} resizeMode="contain" style={styles.searchBtnImage} />
          </TouchableOpacity>
        </View>
      </View>
      {isMenuOpen && <Menu />}
    </SafeAreaView>
  );
};

export default Home;
