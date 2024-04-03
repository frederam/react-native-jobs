import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Stack, useRouter, useLocalSearchParams, useGlobalSearchParams } from "expo-router";
import { useCallback, useState, useMemo } from "react";

import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";

const tabs = ["About", "Qualifications", "Responsibilities", "Benefits"];

const jobDetails = () => {
  const params = useGlobalSearchParams();
  const router = useRouter();

  const { data, isLoading, error, reFetch } = useFetch("job-details", { job_id: params.id });

  const [activeTab, setActiveTab] = useState(tabs[0]);

  const onRefresh = useCallback(() => {
    reFetch()
  }, []);

  const displayTabContent = useMemo(() => {
    switch (activeTab) {
      case "About":
        return <JobAbout info={data[0]?.job_description ?? "No data provided"} />;
      case "Qualifications":
        return <Specifics title="Qualifications" points={data[0]?.job_highlights?.Qualifications ?? ["N/A"]} />;
      case "Responsibilities":
        return <Specifics title="Responsibilities" points={data[0]?.job_highlights?.Responsibilities ?? ["N/A"]} />;
      case "Benefits":
        return <Specifics title="Benefits" points={data[0]?.job_highlights?.Benefits ?? ["N/A"]} />;
      default:
        return null;
    }
  }, [activeTab, data]);

  const renderedTabs = tabs.filter(tab => {
    if (tab === "About") {
       return data[0]?.job_description;
    }
    return data[0]?.job_highlights?.[tab];
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite, marginBottom: 16 }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => <ScreenHeaderBtn iconUrl={icons.left} dimension="60%" handlePress={() => router.back()} />,
          headerRight: () => <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />,
          headerTitle: "",
        }}
      />
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
        >
          {isLoading && !data[0] ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data?.length === 0 ? (
            <Text>No data</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data[0]?.employer_logo}
                jobTitle={data[0]?.job_title}
                companyName={data[0]?.employer_name}
                location={data[0]?.job_city + ', ' + data[0]?.job_country}
              />
              <JobTabs tabs={renderedTabs} activeTab={activeTab} setActiveTab={setActiveTab} />
              {displayTabContent}
            </View>
          )}
        </ScrollView>
        <JobFooter url={data[0]?.job_google_link ?? "https://careers.google.com/jobs/results"} />
      </>
    </SafeAreaView>
  );
};

export default jobDetails;
