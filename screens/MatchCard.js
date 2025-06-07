import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const MatchCard = ({
  team1Name, team2Name,
  team1Logo, team2Logo,
  venue, status,
  leagueName, leagueCountry, leagueLogo, leagueSeason, leagueRound,
  team1Goals, team2Goals,
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.leagueContainer}>
        <Image source={{ uri: leagueLogo }} style={styles.leagueLogo} />
        <Text style={styles.leagueText}>
          {leagueName} ({leagueCountry}) - {leagueSeason}, {leagueRound}
        </Text>
      </View>

      <View style={styles.matchContainer}>
        <View style={styles.teamContainer}>
          <Image source={{ uri: team1Logo }} style={styles.teamLogo} />
          <Text style={styles.teamName}>{team1Name}</Text>
        </View>

        <View style={styles.matchInfoContainer}>
          <Text style={styles.time}>{status}</Text>
          <Text style={styles.venue}>{venue}</Text>
        </View>

        <View style={styles.teamContainer}>
          <Image source={{ uri: team2Logo }} style={styles.teamLogo} />
          <Text style={styles.teamName}>{team2Name}</Text>
        </View>
      </View>

      <View style={styles.scoreContainer}>
        <Text style={styles.score}>{team1Goals} - {team2Goals}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
    marginVertical: 10,
  },
  leagueContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  leagueLogo: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  leagueText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  matchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  teamContainer: {
    alignItems: 'center',
    flex: 1,
  },
  teamLogo: {
    width: 50,
    height: 50,
  },
  teamName: {
    color: 'green',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  matchInfoContainer: {
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  time: {
    color: 'blue',
    fontSize: 22,
    fontWeight: 'bold',
  },
  venue: {
    color: 'black',
    fontSize: 12,
    textAlign: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
  },
  score: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default MatchCard;