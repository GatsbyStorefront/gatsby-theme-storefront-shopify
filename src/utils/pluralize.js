const pluralize = (count, singular, plural) => {
  if (count % 10 === 1 && count % 100 !== 11) {
    return `${count} ${singular}`;
  } else {
    return `${count} ${plural}`;
  }
};

export default pluralize;
