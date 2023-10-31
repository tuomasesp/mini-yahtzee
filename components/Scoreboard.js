import { useState, useEffect } from 'react';
import { Text, View, Pressable } from 'react-native';
import { Datatable } from 'react-native-paper';
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

    const getScoreboardData = async() => {
        try {
            const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
            if (jsonValue !== null) {
                let tmpScores = JSON.parse(jsonValue);
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

    return(
        <>
            <Header />
            <View>
                <Text>Scoreboard here</Text>
                {scores.length === 0 ?
                    <Text>Scoreboard is empty</Text>
                    :
                    scores.map((player, index) => {
                        index < NBR_OF_SCOREBOARD_ROWS && 
                        <Datatable.Row
                        key={player.key}>
                            <Datatable.Cell><Text>{index + 1}</Text></Datatable.Cell>
                            <Datatable.Cell><Text>{player.name}</Text></Datatable.Cell>
                            <Datatable.Cell><Text>{player.data}</Text></Datatable.Cell>
                            <Datatable.Cell><Text>{player.time}</Text></Datatable.Cell>
                            <Datatable.Cell><Text>{player.points}</Text></Datatable.Cell>
                        </Datatable.Row>
                    })
                }
            </View>
            <View>
                <Pressable
                onPress={() => clearScoreboard()}>
                    <Text>CLEAR SCOREBOARD</Text>
                </Pressable>
            </View>
            <Footer />
        </>
    )
}