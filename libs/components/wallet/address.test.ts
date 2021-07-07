import { ellipsizeAddress } from './address';

test('should take a string and a count ', () => {
  // arrange
  const address = "2jf6a9fh49e9dk390";
  const count = 5;

  // act
  const newEllipsis = ellipsizeAddress(address, count);

  // assert
  expect(newEllipsis).toEqual(12);
})