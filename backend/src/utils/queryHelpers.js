function toArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}
function normalize(value) {
  return (value ?? "").toString().trim().toLowerCase();
}
function toNumber(value) {
  const n = Number(value);
  return Number.isNaN(n) ? null : n;
}
module.exports = {
  toArray,
  normalize,
  toNumber,
};
