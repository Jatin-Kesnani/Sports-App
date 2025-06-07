import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { View, Text, StyleSheet, Image, ScrollView, ImageBackground } from 'react-native';
import bg from "../assets/bg3.png";
import MatchCard from './MatchCard';

export default function FootballScreen() {
  const [APIData, setAPIData] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState('');

  useEffect(() => {
    const fetchFootballFixtures = async () => {
      const url = 'https://api-football-v1.p.rapidapi.com/v3/fixtures?date=2021-01-29';
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': 'b679e3ba08mshc672e9c00ae88abp157bb8jsnda250f8e6099',
          'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
        },
      };
      const response = await fetch(url, options);
      const Json_Data = await response.json();
      // console.log(Json_Data.response);
      setAPIData(Json_Data.response);
    };

    fetchFootballFixtures();
  }, []);

  const renderMatchDetails = () => {
    if (selectedMatch) {
      const dateString = selectedMatch.fixture.date;
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
            <MatchCard
              team1Name={selectedMatch.teams.home.name}
              team2Name={selectedMatch.teams.away.name}
              team1Logo={selectedMatch.teams.home.logo}
              team2Logo={selectedMatch.teams.away.logo}
              venue={selectedMatch.fixture.venue.name}
              status={selectedMatch.fixture.status.long}
              leagueName={selectedMatch.league.name}
              leagueCountry={selectedMatch.league.country}
              leagueLogo={selectedMatch.league.logo}
              leagueSeason={selectedMatch.league.season}
              leagueRound={selectedMatch.league.round}
              team1Goals={selectedMatch?.goals?.home ?? 0}
              team2Goals={selectedMatch?.goals?.away ?? 0}
            />
          </View>
        </View> 
      );
    }
  };

  return (
    <ImageBackground source={bg} style={styles.background}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.titleannouncement}>Live the Glory of Football – Your One-Stop for All Match Updates!</Text>
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
                {APIData.map((match, index) => (
                  <Picker.Item
                    key={index}
                    label={`${match.teams.home.name} vs ${match.teams.away.name}`}
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
  contentContainer: {
    backgroundColor: '#BBBFFF',
    marginTop: 50,
    width: '100%',
  },
  description: {
    color: 'black',
    fontSize: 18,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  logo: {
    width: 50,
    height: 30,
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
  yearTextTop: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
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
  cardtitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 40,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
});