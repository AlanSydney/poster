import 'react-native';
import renderer from 'react-test-renderer';


describe('UsersScreen Test', () => {
  it('Rendered successfully!', () => {
    const tree = renderer.create('<UsersScreen />').toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('VirtualizedList Rendered successfully!', () => {
    const tree = renderer.create('<VirtualizedList />').toJSON();
    expect(tree).toMatchSnapshot();
  });
});
