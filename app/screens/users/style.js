import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  listContent: {
    flex: 1,
    width: '100%',
    padding: 20,
    backgroundColor: '#fff'
  },
  accordionHeader: {
		position: 'relative',
		elevation: 1,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#f7f7f7',
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowOffset: {
    	width: 5,
    	height: 5,
    },
  },
  subContent: {
    width: '100%',
    height: 300,
    backgroundColor: '#fff'
  },
  userItem: {
    height: 50,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#ececec',
    borderBottomWidth: 1,
    flexDirection:'row',
  },
  userName: {
    fontSize: 16,
    width: '94%',
    marginTop: 5,
  },
  rightArrow: {
    alignItems:'flex-end', 
    justifyContent: 'flex-end'
  },
  label: {
    margin: 10,
    color: '#000000'
  },
  inputItem: {
    borderWidth: 1,
    borderColor: '#000000',
    margin: 10
  },
  titleText: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 5,
  }
});

export default styles;
