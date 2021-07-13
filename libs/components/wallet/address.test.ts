import { ellipsizeAddress } from './address';

test('should match the pattern ', () => {
  // arrange
  const address = "2jf6a9fh49e9dk390";
  const count = 5;
  const regex = /[\w+\d+]..[\w+\d+]/gi

  // act
  const newEllipsis = ellipsizeAddress(address, count);

  // assert
  expect(newEllipsis).toMatch(regex);
})