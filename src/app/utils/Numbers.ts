export default {
  toDollars: (value: number = 0) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  }
}
