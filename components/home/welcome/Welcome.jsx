import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from "react-native";

import styles from "./welcome.style";
import { icons, SIZES } from "../../../constants";

const jobTypes = ["Fulltime", "Parttime", "Contractor", "Intern"];
const Welcome = ({ searchTerm, setSearchTerm, handleClick, selectedCity, activeJobType, onJobTypeChange }) => {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>You are searching for jobs in this location:</Text>
        <Text style={styles.welcomeMessage}>{selectedCity}</Text>
        <Text style={styles.userName}>Select job type:</Text>
      </View>
      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                onJobTypeChange(item);
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder="What are you looking for?"
            onSubmitEditing={handleClick}
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image source={icons.search} resizeMode="contain" style={styles.searchBtnImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Welcome;
