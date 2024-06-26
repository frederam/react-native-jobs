import React, { useRef, useState, useEffect } from "react";
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View } from "react-native";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { Text, SafeAreaView } from "react-native";

import { ScreenHeaderBtn, NearbyJobCard } from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import styles from "../../styles/search";
import useFetch from "../../hook/useFetch";

const JobSearch = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const flatListRef = useRef(null);

  const { data, isLoading, error, reFetch } = useFetch("search", {
    query: params.id + " " + params.city,
    page: page,
    num_pages: 1,
    employment_types: params.type,
  });

  const handlePagination = (direction) => {
    if (direction === "left" && page > 1) {
      setPage(page - 1);
    } else if (direction === "right") {
      setPage(page + 1);
    }
  };
  const scrollToTop = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  };
  useEffect(() => {
    scrollToTop();
    reFetch();
  }, [page]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => <ScreenHeaderBtn iconUrl={icons.left} dimension="60%" handlePress={() => router.back()} />,
          headerTitle: "",
        }}
      />

      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={({ item }) => (
          <NearbyJobCard job={item} handleNavigate={() => router.push(`/job-details/${item.job_id}`)} />
        )}
        keyExtractor={(item) => item.job_id}
        contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
        ListHeaderComponent={() => (
          <>
            <View style={styles.container}>
              <Text style={styles.searchTitle}>{params.id}</Text>
              <Text style={styles.noOfSearchedJobs}>Job Opportunities in {params.city}</Text>
            </View>
            <View style={styles.loaderContainer}>
              {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
              ) : (
                error && <Text>Oops something went wrong</Text>
              )}
            </View>
          </>
        )}
        ListFooterComponent={() =>
          data?.length > 0 ? (
            <View style={styles.footerContainer}>
              <TouchableOpacity
                disabled={isLoading}
                style={styles.paginationButton}
                onPress={() => handlePagination("left")}
              >
                <Image source={icons.chevronLeft} style={styles.paginationImage} resizeMode="contain" />
              </TouchableOpacity>
              <View style={styles.paginationTextBox}>
                <Text style={styles.paginationText}>{page}</Text>
              </View>
              <TouchableOpacity
                disabled={isLoading}
                style={styles.paginationButton}
                onPress={() => handlePagination("right")}
              >
                <Image source={icons.chevronRight} style={styles.paginationImage} resizeMode="contain" />
              </TouchableOpacity>
            </View>
          ) : (
            !isLoading && <Text style={{ alignSelf: "center" }}>No results found</Text>
          )
        }
      />
    </SafeAreaView>
  );
};

export default JobSearch;
