import { useEffect, useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import { NBR_OF_DICES, NBR_OF_THROWS, MAX_SPOT, MIN_SPOT, BONUS_POINTS_LIMIT, BONUS_POINTS, SCOREBOARD_KEY } from '../constants/Game';
import styles from '../styles/style';
import { Container, Row, Col } from 'react-native-flex-grid';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';



let board = []

export default Gameboard = ({ navigation, route }) => {
    
    const [playerName, setPlayerName] = useState('');
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [status, setStatus] = useState('Throw dices');
    const [gameEndStatus, setGameEndStatus] = useState(false);
    // Mitkä nopat ovat valittuna
    const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
    // Noppien silmäluvut
    const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0));
    // Onko silmäluvulle valittu pisteet?
    const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(MAX_SPOT).fill(false));
    // Kerätyt pisteet
    const [dicePointsTotal, setDicePointsTotal] = useState(new Array(MAX_SPOT).fill(0));
    // Tulostaulun pisteet
        const [scores, setScores] = useState([]);
    // Kokonaispisteet
    const [totalPoints, setTotalPoints] = useState(0);

    useEffect(() => {
        if (playerName === '' && route.params?.player) {
            setPlayerName(route.params.player);
        }
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getScoreboardData();
        });
        return unsubscribe;
    }, [navigation]);

    const dicesRow = [];
    for ( let dice = 0; dice < NBR_OF_DICES; dice++) {
        dicesRow.push(
            <Col key={'dice' + dice}>
                <Pressable key={'dice' + dice} 
                onPress={() => selectDice(dice)}
                >
                <MaterialCommunityIcons
                    name={board[dice]}
                    key={'dice' + dice}
                    size={50}
                    color={getDiceColor(dice)}>
                </MaterialCommunityIcons>
                </Pressable>
            </Col>
        )
    }

    const pointsRow = [];
    for ( let spot = 0; spot < MAX_SPOT; spot++) {
        pointsRow.push(
            <Col key={'pointsRow' + spot}>
                <Text key={'pointsRow' + spot}>{getSpotTotal(spot)}
                </Text>
            </Col>
        );
    }

    const pointsToSelectRow = [];
    for ( let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
        pointsToSelectRow.push(
            <Col key={'buttonsRow' + diceButton}>
                <Pressable 
                    key={'buttonsRow' + diceButton} 
                    onPress={() => selectDicePoints(diceButton)}
                    >
                    <MaterialCommunityIcons
                        name={'numeric-' + (diceButton + 1) + '-box'}
                        key={'buttonsRow' + diceButton}
                        size={35}
                        color={getDicePointsColor(diceButton)}
                    >
                    </MaterialCommunityIcons>
                </Pressable>
            </Col>
        )
    }

    const selectDicePoints = (i) => {
        if (nbrOfThrowsLeft === 0) {
            let selectedPoints = [...selectedDicePoints];
            let points = [...dicePointsTotal];
            if (!selectedPoints[i]) {
                selectedPoints[i] = true;
                let nbrOfDices = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1 : total), 0);
                points[i] = nbrOfDices * (i + 1);
            }
            else {
                setStatus('You already selected points for ' + (i + 1));
                return points[i];
            }
            setDicePointsTotal(points);
            setSelectedDicePoints(selectedPoints);
            getTotalPoints(points)
            return points[i];
            }
        else {
            setStatus('Throw ' + NBR_OF_THROWS + ' times before setting points.')
        }
    }

    // pvm ja aika
    let date = new Date()
    let stringDate = date.toDateString()
    let stringTime = date.toTimeString()
    let substringedDate = stringDate.substring(4);
    let substringedTime = stringTime.substring(0, 5)

    const savePlayerPoints = async() => {
        const newKey = scores.length + 1;
        const playerPoints = {
            key: newKey,
            name: playerName,
            date: substringedDate,
            time: substringedTime,
            points: totalPoints
        }
        try {
            const newScore = [...scores, playerPoints];
            const jsonValue = JSON.stringify(newScore);
            await AsyncStorage.setItem(SCOREBOARD_KEY, jsonValue);
        }
        catch (e) {
            console.log('Save error: ' + e);
        }
    }

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

    const throwDices = () => {
        if (nbrOfThrowsLeft === 0 && !gameEndStatus) {
            setStatus('Select your points before the next throw');
            return 1;
        }
        else if (nbrOfThrowsLeft === 0 && gameEndStatus) {
            setGameEndStatus(false);
            diceSpots.fill(0);
            dicePointsTotal.fill(0);
        }
        let spots = [...diceSpots];
        for ( let i = 0; i < NBR_OF_DICES; i++ ) {
            if (!selectedDices[i]) {
                let randomNumber = Math.floor(Math.random() * 6 + 1);
                board[i] = 'dice-' + randomNumber;
                spots[i] = randomNumber;
            }
        }
        setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
        setDiceSpots(spots);
        setStatus('Select and throw dices again');
    }

    function getSpotTotal(i) {
        return dicePointsTotal[i];
    }

    const selectDice = (i) => {
        if (nbrOfThrowsLeft < NBR_OF_THROWS && !gameEndStatus) {
            let dices = [...selectedDices]
            dices[i] = selectedDices[i] ? false : true;
            setSelectedDices(dices)
        }
        else {
            setStatus('You have to throw the dices first.')
        }
    }

    function getDiceColor(i) {
        return selectedDices[i] ? 'black' : 'turquoise'
    }

    function getDicePointsColor(i) {
        return selectedDicePoints[i] && !gameEndStatus ? 'black' : 'turquoise'
    }

    const checkBonusPoints = () => {
        if (board.every((val, i ,arr) => val === arr[0] && nbrOfThrowsLeft === 0)) {
            setStatus('Points selected, throw again');
            setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        }
        else if (nbrOfThrowsLeft === 0) {
            setStatus('Select points');
            setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        }
        else if (nbrOfThrowsLeft === 0 && dicePointsTotal[i]) {
            setStatus('Game over')
            setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        }
        else {
            setStatus('Keep on throwing')
        }
    }

    const getTotalPoints = (points) => {
        setTotalPoints(points[0]+points[1]+points[2]+points[3]+points[4]+points[5])
    }

    return(
        <>
            <Header />
            <View style={styles.gameboard}>
                <Container fluid>
                    <Row>{dicesRow}</Row>
                </Container>
                <Text style={styles.gameboardText}>Throws left: {nbrOfThrowsLeft}</Text>
                <Text style={styles.gameboardText}>{status}</Text>
                <Pressable
                    onPress={()=> throwDices()} style={styles.button}>
                    <Text style={styles.buttonText}>THROW DICES</Text>
                </Pressable>
                <Text style={styles.gameboardText}>Total: {totalPoints}</Text>
                <Text style={styles.gameboardText}>You are {63 - totalPoints} points away from bonus</Text>
                <Container fluid>
                    <Row>{pointsRow}</Row>
                </Container>
                <Container fluid>
                    <Row>{pointsToSelectRow}</Row>
                </Container>
                <Pressable
                 onPress= {() => savePlayerPoints()}  style={styles.button}>
                    <Text style={styles.buttonText}>SAVE POINTS</Text>
                </Pressable>
                <Text style={styles.player}>Player: {playerName}</Text>
            </View>
            <Footer />
        </>
    )
}