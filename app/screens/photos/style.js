import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    backgroundColor: '#fff'
  },
  listContent: {
    flex: 1,
    width: '100%',
    padding: 20,
    backgroundColor: '#fff'
  },
  detailContent: {
    flex: 1,
    padding: 20
  },
  listView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    width: (width - 25) / 2,
    height: (width - 50) / 2,
  },
  gridItemImage: {
    width: '100%',
    height: '100%',
    padding:10,
  },
  userItem: {
    flexDirection: 'row',
    height: 60,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#ececec',
    borderBottomWidth: 1,
  },
  rightArrow: {
    alignItems:'flex-end', 
    justifyContent: 'flex-end'
  },
  avatar: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  inputItem: {
    borderWidth: 1,
    borderColor: '#000000',
    margin: 10,
    width
  },
  titleText: {
    fontSize: 16,
    width: '94%',
    marginTop: 7,
  },
  label: {
    margin: 10,
    color: '#000000'
  },
  containerView: {
    width: '100%',
    height: '100%'
  },
  img: {
    width: '100%',
    height: '70%'
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
    marginTop: 30,
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
    marginTop: 30,
    backgroundColor: '#ececec',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ececed'
  },
});

export default styles;
