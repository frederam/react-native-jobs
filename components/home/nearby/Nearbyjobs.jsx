import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

import styles from './nearbyjobs.style';
import { COLORS } from '../../../constants';
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';
import useFetch from '../../../hook/useFetch'

const Nearbyjobs = ({ city }) => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch(
    'search', {
      query: city,
      num_pages: 1,
      radius: 13,
  })

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
      </View>

      <ScrollView style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) :(
          data?.map((job) => (
            <NearbyJobCard 
              job = {job}
              key = {`nearby-job-${job?.job_id}`}
              handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
            />
          ))
        )}
      </ScrollView>
    </View>
  )
}

export default Nearbyjobs