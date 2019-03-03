import 'react-native';
import renderer from 'react-test-renderer';


describe('PostScreen Test', () => {
  it('Rendered successfully!', () => {
    const tree = renderer.create('<PostScreen />').toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('VirtualizedList Rendered successfully!', () => {
    const tree = renderer.create('<VirtualizedList />').toJSON();
    expect(tree).toMatchSnapshot();
  });
});
