const isSameTitle = (v) => {
  return /^<.+>$/.test(v);
};

module.exports = isSameTitle;
