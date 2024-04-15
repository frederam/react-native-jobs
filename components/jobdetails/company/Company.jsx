import React from "react";
import { View, Text, Image } from "react-native";
import { SvgCssUri } from "react-native-svg/css";

import styles from "./company.style";

import { icons } from "../../../constants";
import { useImageEffect } from "../../../utils/uneImageEffect";

const Company = ({ companyLogo, jobTitle, companyName, location }) => {
  const placeholder = require("../../../assets/logo_placeholder.jpg");
  const imageSource = useImageEffect(companyLogo, placeholder);
  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        {imageSource?.svgUri ? (
          <SvgCssUri height={50} width={50} uri={imageSource.svgUri} />
        ) : (
          <Image source={imageSource} style={styles.logoImage} resizeMode="contain" />
        )}
      </View>
      <View style={styles.jobTitleBox}>
        <Text style={styles.jobTitle}>{jobTitle}</Text>
      </View>
      <View style={styles.companyInfoBox}>
        <Text style={styles.companyName}>{companyName} / </Text>
        <View style={styles.locationBox}>
          <Image source={icons.location} resizeMode="contain" style={styles.locationImage} />
          <Text style={styles.locationName}>{location}</Text>
        </View>
      </View>
    </View>
  );
};

export default Company;
