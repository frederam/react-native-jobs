import { useState } from "react";
import { View, ScrollView, SafeAreaView, Keyboard } from "react-native";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";

import { COLORS, icons, SIZES } from "../../constants";
import { Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome, Menu } from "../../components";

const Home = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeJobType, setActiveJobType] = useState("Fulltime");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleJobTypeChange = (jobType) => {
    setActiveJobType(jobType);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => <ScreenHeaderBtn iconUrl={icons.left} dimension="60%" handlePress={() => router.back()} />,
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

      <View>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always">
          <View style={{ flex: 1, padding: SIZES.medium }}>
            <Welcome
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCity={params.id}
              activeJobType={activeJobType}
              onJobTypeChange={handleJobTypeChange}
              handleClick={() => {
                if (searchTerm) {
                  Keyboard.dismiss();
                  router.push(`/search/${encodeURIComponent(searchTerm.trim())}?city=${encodeURIComponent(params.id)}&type=${activeJobType}`);
                }
              }}
            />

            <Popularjobs city={params.id} />
            <Nearbyjobs city={params.id} />
          </View>
        </ScrollView>
      </View>
      {isMenuOpen && <Menu />}
    </SafeAreaView>
  );
};

export default Home;
