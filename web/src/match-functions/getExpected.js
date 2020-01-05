const getExpected = (a, b) => {
  return 1 / (1 + Math.pow(10, ((b - a) / 400)));
};

export default getExpected;