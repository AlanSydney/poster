import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  buttonContainer: {
    width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderColor: '#aaaaaa',
    backgroundColor: '#ec4563',
  }
});

export default styles;
