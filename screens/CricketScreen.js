import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import bg from "../assets/bg3.png";

export default function CricketScreen() {
  const [APIData, setAPIData] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    const fetchCricketSeries = async () => {
      const url = 'https://cricket-live-data.p.rapidapi.com/fixtures';
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '3455a83f0bmsh71b1957663a85cdp1cea5fjsnf45e363ccc97',
          'x-rapidapi-host': 'cricket-live-data.p.rapidapi.com',
        },
      };
      const response = await fetch(url, options);
      const Json_Data = await response.json();
      const uniqueData = [];
      const seenIds = new Set();
      Json_Data.results.forEach((match) => {
        if (!seenIds.has(match.id)) {
          seenIds.add(match.id);
          uniqueData.push(match);
        }
      });
      setAPIData(uniqueData);
    };

    fetchCricketSeries();
  }, []);

  const renderMatchDetails = () => {
    if (selectedMatch) {
      const dateString = selectedMatch.date;
      const date = new Date(dateString);

      const year = date.getFullYear();
      const monthShort = date.toLocaleString('en-US', { month: 'short' });
      const day = date.getDate();

      return (
        <View style={styles.card}>
          <View style={styles.yearContainer}>
            <Text style={styles.yearTextTop}>{year}</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.dateTextTop}>{monthShort}</Text>
            <Text style={styles.dateTextBottom}>{day}</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.cardtitle}>{selectedMatch.match_title.replace(/,\s*\.$/, '')}</Text>
            <Text style={styles.description}>Details: {selectedMatch.match_subtitle}</Text>
            <Text style={styles.description}>Status: {selectedMatch.status}</Text>
            <Text style={styles.description}>Venue: {selectedMatch.venue}</Text>
          </View>
        </View>
      );
    }
  };

  return (
    <ImageBackground source={bg} style={styles.background}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.titleannouncement}>Catch the Thrill of Cricket – Every Match, Every Moment!</Text>
          <Text style={styles.title}>View Match Information</Text>
          {APIData.length > 0 ? (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedMatch}
                style={styles.picker}
                dropdownIconColor="white"
                onValueChange={(itemValue) => setSelectedMatch(itemValue)}
              >
                <Picker.Item label="Select a match" value={null} style={styles.pickerItem} />
                {APIData.map((match) => (
                  <Picker.Item
                    key={match.id}
                    label={`${match.home.name} vs ${match.away.name}`}
                    value={match}
                    style={styles.pickerItem}
                  />
                ))}
              </Picker>
            </View>
          ) : (
            <Text style={styles.loading}>Loading matches...</Text>
          )}
          {renderMatchDetails()}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    padding: 16,
    marginTop: 24,
    marginBottom: 24,
    backgroundColor: 'rgba(100, 255, 230, 0.2)',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  titleannouncement:{
    color: 'lightgreen',
    fontSize: 29,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  pickerContainer: {
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: '#4C4C4C',
    marginVertical: 10,
  },
  picker: {
    color: 'white',
    height: 65,
    fontSize: 16,
  },
  pickerItem: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  loading: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
  },
  card: {
    marginTop: 20,
    backgroundColor: 'lightyellow',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateContainer: {
    width: 60,
    height: 70,
    position: 'absolute',
    top: 16, 
    right: 16, 
    backgroundColor: '#424242',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    elevation: 2,
    borderColor: 'black',
    borderWidth: 2,
    zIndex: 10,
  },
  yearContainer: {
    width: 80,
    height: 50,
    position: 'absolute',
    top: 0, 
    left: 16, 
    alignItems: 'left',
    justifyContent: 'center',
    paddingVertical: 4,
    zIndex: 10,
  },
  dateTextTop: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateTextBottom: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  yearTextTop: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },
  contentContainer: {
    backgroundColor: '#BBBFFF',
    marginTop: 50,
    width: '100%',
  },
  cardtitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 40,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  description: {
    color: 'black',
    fontSize: 18,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
});