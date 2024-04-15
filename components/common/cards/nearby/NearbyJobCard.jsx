import { View, Text, TouchableOpacity, Image } from "react-native";
import { SvgCssUri } from "react-native-svg/css";

import styles from "./nearbyjobcard.style";

import { useImageEffect } from "../../../../utils/uneImageEffect";

const NearbyJobCard = ({ job, handleNavigate }) => {
  const placeholder = require("../../../../assets/logo_placeholder.jpg");
  const imageSource = useImageEffect(job.employer_logo, placeholder);
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <View style={styles.logoContainer}>
        {imageSource?.svgUri ? (
          <SvgCssUri height={50} width={50} uri={imageSource.svgUri} />
        ) : (
          <Image source={imageSource} resizeMode="contain" style={styles.logoImage} />
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {job.job_title}
        </Text>
        <Text style={styles.jobType}>{job.job_employment_type}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NearbyJobCard;
