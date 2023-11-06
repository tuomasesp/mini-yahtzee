import { StyleSheet } from 'react-native';


export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'paleturquoise'
  },
  header: {
    marginTop: 30,
    marginBottom: 15,
    backgroundColor: 'turquoise',
    flexDirection: 'row'
  },
  footer: {
    marginTop: 20,
    backgroundColor: 'turquoise',
    flexDirection: 'row'
  },
  title: {
    color: 'snow',
    flex: 1,
    fontSize: 22,
    textAlign: 'center',
    margin: 10,
    fontFamily: 'Lobster'
  },
  author: {
    color: 'snow',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
    fontFamily: 'Lobster'
  },
  gameboard: {
    backgroundColor: 'paleturquoise',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  gameboardText: {
    margin: 5,
    fontFamily: 'RobotoMono'
  },
  scoreboard: {
    alignItems: 'center',
    flex: 1
  },
  scores: {
    alignItems: 'stretch',
    justifyContent: 'space-around',
    flex: 2,
  },
  scoresText: {
    fontFamily: 'RobotoMono',
    fontSize: 12
  },
  datatable: {
    flexDirection: "row",
    backgroundColor: 'turquoise'
  },
  gameinfo: {
    backgroundColor: 'black',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10
  },
  button: {
    margin: 20,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "turquoise",
    width: 145,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: "snow",
    fontSize: 15,
    fontFamily: 'RobotoMono'
  },
  input: {
    backgroundColor: 'turquoise',
    borderStyle: 'solid',
    borderColor: 'black',
    padding: 10,
    marginLeft: 10,
    marginRight: 140,
    marginTop: 20,
    marginBottom: 30,
    fontFamily: 'RobotoMono'
  },
  instruction: {
    marginBottom: 5,
    marginTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 12,
    fontFamily: 'RobotoMono'
  },
  h2: {
    fontSize: 16,
    paddingLeft: 10,
    marginTop: 20,
    fontFamily: 'RobotoMono'
  },
  player: {
    fontSize: 14,
    fontFamily: 'RobotoMono'
  }
});