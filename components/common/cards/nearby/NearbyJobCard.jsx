import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./nearbyjobcard.style";

import { useImageEffect } from "../../../../utils";

const NearbyJobCard = ({ job, handleNavigate }) => {
  const placeholder = require("../../../../assets/logo_placeholder.jpg");
  const imageSource = useImageEffect(job.employer_logo, placeholder);
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image source={imageSource} resizeMode="contain" style={styles.logoImage} />
      </TouchableOpacity>
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
