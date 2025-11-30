export const formatPrice = (amount) => {
  return `₹${amount.toFixed(2)}`;
};

export const searchFilter = (items, query) => {
  if (!query) return items;
  return items.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );
};
