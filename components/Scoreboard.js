import { useState, useEffect } from 'react';
import { Text, View, Pressable } from 'react-native';
import { DataTable } from 'react-native-paper';
import Header from './Header';
import Footer from './Footer';
import { NBR_OF_SCOREBOARD_ROWS, SCOREBOARD_KEY } from '../constants/Game';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/style';

export default Scoreboard = ({ navigation }) => {

    const [scores, setScores] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getScoreboardData();
        });
        return unsubscribe;
    }, [navigation]);

    const getScoreboardData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
            if (jsonValue !== null) {
                let tmpScores = JSON.parse(jsonValue);
                tmpScores.sort((a, b) => parseFloat(b.points) - parseFloat(a.points))
                setScores(tmpScores);
            }
        }
        catch(e) {
            console.log('Read error: ' + e);
        }
    }

    const clearScoreboard = async() => {
        try {
            await AsyncStorage.clear();
            setScores([]);
        }
        catch(e) {
            console.log('Clear error: ' + e);
        }
    }
    scores;

    return(
        <>
            <Header />
            <View style={styles.scoreboard}>
                <Text style={styles.h2}>Top points</Text>
            </View>
            <View style={styles.scores}>
                {scores.length === 0 ?
                    <Text style={styles.gameboardText}>Scoreboard is empty</Text>
                    :
                    scores.map((player, index) => (
                        index < NBR_OF_SCOREBOARD_ROWS &&
                        <DataTable.Row style={styles.datatable} key={player.key}>
                            <DataTable.Cell><Text style={styles.scoresText}>{index + 1}</Text></DataTable.Cell>
                            <DataTable.Cell><Text style={styles.scoresText}>{player.name}</Text></DataTable.Cell>
                            <DataTable.Cell><Text style={styles.scoresText}>{player.date}</Text></DataTable.Cell>
                            <DataTable.Cell><Text style={styles.scoresText}>{player.time}</Text></DataTable.Cell>
                            <DataTable.Cell><Text style={styles.scoresText}>{player.points}</Text></DataTable.Cell>
                        </DataTable.Row>
                        
                    ))
                }
            </View>
            <View style={styles.scoreboard}>
                <Pressable
                onPress={() => clearScoreboard()} style={styles.button}>
                    <Text style={styles.buttonText}>CLEAR SCOREBOARD</Text>
                </Pressable>
            </View>
            <Footer />
        </>
    )
}