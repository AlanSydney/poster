import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    backgroundColor: '#fff'
  },
  listContent: {
    flex: 1,
    width: '100%',
    padding: 20,
    backgroundColor: '#fff'
  },
  innerContainer: {
    flex: 1,
    padding: 20
  },
  checkboxContainer: {
    marginTop: 20,
    marginBottom: 20 
  },
  userItem: {
    height: 50,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#ececec',
    borderBottomWidth: 1,
    flexDirection: 'row'
  },
  inputItem: {
    borderWidth: 1,
    borderColor: '#000000',
    margin: 10
  },
  titleText: {
    fontSize: 16,
    width: '94%',
  },
  rightArrow: {
    alignItems:'flex-end', 
    justifyContent: 'flex-end'
  },
  label: {
    margin: 10,
    color: '#000000'
  }
});

export const buttonActiveStyles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  container: {
    height: 50,
    margin: 10,
    marginTop: 20,
    backgroundColor: '#ec4563',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ec4563'
  },
});

export const buttonDisableStyles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: '#b1b1b1',
    fontWeight: 'bold',
  },
  container: {
    height: 50,
    margin: 10,
    marginTop: 20,
    backgroundColor: '#ececec',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ececed'
  },
});

export default styles;
