import { useState } from 'react';
import { TextInput, Text, View, Pressable, Keyboard } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Header from './Header'
import Footer from './Footer'
import { NBR_OF_DICES, NBR_OF_THROWS, MAX_SPOT, MIN_SPOT, BONUS_POINTS_LIMIT, BONUS_POINTS } from '../constants/Game';
import styles from '../styles/style';


export default Home = ({ navigation }) => {

    const [playerName, setPlayerName] = useState('')
    const [hasPlayerName, setHasPlayerName] = useState(false)

    const handlePlayerName = (value) => {
        if (value.trim().length > 0 ) {
            setHasPlayerName(true);
            Keyboard.dismiss();
        }
    }

    return(
        <>
            <Header />
            <View style={styles.container}>
                <MaterialCommunityIcons name='dice-multiple' size={80} color='turquoise'/>
                {!hasPlayerName ? 
                <>
                    <Text style={styles.h2}>For scoreboard enter your name:</Text>
                    <TextInput onChangeText={setPlayerName} autoFocus={true} placeholderTextColor='snow' placeholder='Enter your name here.' cursorColor='snow' style={styles.input} />
                    <Pressable 
                        onPress={() => handlePlayerName(playerName)} style={styles.button}
                        >
                        
                        <Text style={styles.buttonText}>OK</Text>
                    </Pressable>
                </>
                :
                <>
                <Text style={styles.h2}>Rules of the game</Text>
                <Text multiline='true' style={styles.instruction}>
                    THE GAME: Upper section of the classic Yahtzee
                    dice game. You have {NBR_OF_DICES} dices and
                    for the every dice you have {NBR_OF_THROWS} 
                    throws. After each throw you can keep dices in
                    order to get same dice spot counts as many as
                    possible. In the end of the turn you must select
                    your points from {MIN_SPOT} to {MAX_SPOT}.
                    Game ends when all points have been selected.
                    The order for selecting those is free.
                </Text>
                <Text multiline='true' style={styles.instruction}>
                    POINTS: After each turn game calculates the sum
                    for the dices you selected. Only the dices having
                    the same spot count are calculated. Inside the
                    game you can not select same points from
                    {MIN_SPOT} to {MAX_SPOT} again.
                </Text>
                <Text multiline='true' style={styles.instruction}>
                    GOAL: To get points as much as possible.
                    {BONUS_POINTS_LIMIT} points is the limit of
                    getting bonus which gives you {BONUS_POINTS}
                    points more
                </Text>
                <Text style={styles.h2}>Good luck, {playerName}</Text>
                <Pressable
                style={styles.button}
                    onPress={() => navigation.navigate('Gameboard', {player: playerName})}
                >
                    <Text style={styles.buttonText}>PLAY</Text>
                </Pressable>
                </>
            }
            </View>
            <Footer />
        </>
    )
}