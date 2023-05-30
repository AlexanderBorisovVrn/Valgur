export const debounce = (fn: (...args: any[]) => void) => {
  let counter = 0;
  return (...args: any[]) => {
    ++counter;
    if (counter < 2) {
      return;
    }
    fn(...args);
    counter = 0;
  };
};
