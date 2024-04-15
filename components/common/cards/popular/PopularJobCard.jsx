import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SvgCssUri } from "react-native-svg/css";

import styles from "./popularjobcard.style";

import { useImageEffect } from "../../../../utils/uneImageEffect";

const PopularJobCard = ({ item, selectedJob, handleCardPress }) => {
  const placeholder = require("../../../../assets/logo_placeholder.jpg");
  const imageSource = useImageEffect(item.employer_logo, placeholder);

  return (
    <TouchableOpacity style={styles.container(selectedJob, item)} onPress={() => handleCardPress(item)}>
      <TouchableOpacity style={styles.logoContainer}>
        {imageSource && imageSource?.svgUri ? (
          <SvgCssUri width="100%" height="100%" uri={imageSource?.svgUri} />
        ) : (
          <Image source={imageSource} resizeMode="contain" style={styles.logoImage} />
        )}
      </TouchableOpacity>
      <Text style={styles.companyName} numberOfLines={1}>
        {item.employer_name}
      </Text>
      <View style={styles.infoContainer}>
        <Text style={styles.jobName(selectedJob, item)} numberOfLines={1}>
          {item.job_title}
        </Text>
        <Text style={styles.location}>{item.job_city + ", " + item.job_country}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PopularJobCard;
