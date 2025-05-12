import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';

const topics = [
  'Vector space',
  'Matrix (mathematics)',
  'Determinant',
  'Eigenvalue',
  'Linear transformation',
];

export default function LinearAlgebraTopics() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [summary, setSummary] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSummary = async (topic) => {
    setLoading(true);
    setSelectedTopic(topic);
    try {
      const response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topic)}`
      );
      const data = await response.json();
      setSummary(data.extract || 'No summary found.');
      setImageUri(data.thumbnail?.source || null);
    } catch (error) {
      setSummary('Failed to fetch summary.');
      setImageUri(null);
    }
    setLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Linear Algebra Topics</Text>

      <FlatList
        data={topics}
        keyExtractor={(item) => item}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => fetchSummary(item)} style={styles.topicButton}>
            <Text style={styles.topicText}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      {loading && <ActivityIndicator size="large" color="#ffe059" style={{ marginTop: 20 }} />}

      {!loading && selectedTopic && (
        <View style={styles.summaryBox}>
          {imageUri && (
            <Image
              source={{ uri: imageUri }}
              style={styles.image}
              resizeMode="contain"
            />
          )}
          <Text style={styles.summaryTitle}>{selectedTopic}</Text>
          <Text style={styles.summaryText}>{summary}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#011121',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffe059',
    marginTop: 40,
    textAlign: 'center',
  },
  topicButton: {
    padding: 10,
    backgroundColor: '#011121',
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ffe059',
    borderRadius: 5,
  },
  topicText: {
    fontSize: 18,
    color: '#ffe059',
    textAlign: 'center',
  },
  summaryBox: {
    marginTop: 30,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffe059',
    marginBottom: 10,
    textAlign: 'center',
  },
  summaryText: {
    fontSize: 16,
    color: 'white',
    marginTop: 10,
    lineHeight: 22,
  },
  image: {
      width: '100%',
      height: 200,
      marginBottom: 15,
      borderRadius: 8,
  },
});
