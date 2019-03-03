import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  menuItem: {
    height: 60,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderColor: '#61A282',
    borderBottomWidth: 0.5
  },
  iconImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain'
  },
  icon: {
    marginLeft: 10,
    width: '10%',
  },
  menuItemText: {
    fontSize: 15,
    marginLeft: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#777',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  email: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
    marginBottom: 20,
  },
  nameContainer: {
    flexDirection: 'column',
    marginLeft: 20,
    marginTop: 15 
  }
})

export default styles;
