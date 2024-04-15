import { useState } from "react";
import { View, SafeAreaView, TouchableOpacity, Text, TextInput, Image, ActivityIndicator } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, SIZES } from "../constants";
import styles from "../components/home/welcome/welcome.style";
import { ScreenHeaderBtn, Menu } from "../components";
import * as Location from "expo-location";

export default function Home() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [granted, setGranted] = useState(null);
  const [error, setError] = useState(false);

  const handleLocationPress = async () => {
    try {
      setIsLoading(true);
      setError(false);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        setGranted(true);
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        const address = await Location.reverseGeocodeAsync({ latitude, longitude });
        if (address && address.length > 0) {
          const { city, region, country } = address[0];
          setSearchTerm(`${city}, ${region}, ${country}`);
        }
      } else {
        setGranted(false);
      }
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

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
            <ScreenHeaderBtn iconUrl={isMenuOpen ? icons.close : icons.menu} dimension="60%" handlePress={toggleMenu} />
          ),
          headerTitle: "",
        }}
      />
      <View style={{ flex: 1, padding: SIZES.medium, gap: 10 }}>
        <View style={styles.container}>
          <Text style={styles.userName}>Hello! Welcome to React Native Jobs.</Text>
          <Text style={styles.welcomeMessage}>Please provide your location to continue.</Text>
        </View>
        <View style={[styles.searchContainer, { marginBottom: 10 }]}>
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
              placeholder="Example: City, Region, Country"
              onSubmitEditing={handleClick}
              editable={!isLoading}
            />
          </View>
          <TouchableOpacity disabled={isLoading} style={styles.locationBtn} onPress={handleLocationPress}>
            {isLoading ? (
              <ActivityIndicator style={{ height: "100%", width: 30 }} />
            ) : (
              <Image
                source={icons.currentLocation}
                style={{ height: "100%", width: 30, justifyContent: "center", alignItems: "center" }}
                resizeMode="contain"
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity disabled={isLoading || !searchTerm} style={styles.searchBtn} onPress={handleClick}>
            <Image source={icons.chevronRight} resizeMode="contain" style={styles.searchBtnImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          {error ? (
            <Text style={[styles.userName, { fontSize: 14 }]}>
              An error ocurred while getting your location. But you can enter your location manually to continue.
            </Text>
          ) : null}
          {granted === false && !isLoading ? (
            <Text style={[styles.userName, { fontSize: 14 }]}>
              We don't have access to your location. Please allow access in your settings or enter your location
              manually.
            </Text>
          ) : null}
        </View>
        <View style={{width: '100%'}}>
          <Text style={styles.userName}>
            With this app you can search for job postings on major job sites such as LinkedIn, Indeed, Glassdoor,
            ZipRecruiter, and others.
          </Text>
        </View>
      </View>
      {isMenuOpen && <Menu />}
    </SafeAreaView>
  );
}
