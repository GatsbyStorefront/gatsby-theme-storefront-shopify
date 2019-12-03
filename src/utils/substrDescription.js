const substrDescription = (description = '', length = false) => {
  if (length && description.length > length) {
    //trim the string to the maximum length
    let trimmedString = description.substr(0, length);
    //re-trim if we are in the middle of a word

    if (trimmedString.lastIndexOf('.') > 0) {
      trimmedString = trimmedString.substr(
        0,
        trimmedString.lastIndexOf('.') + 1
      );
    } else {
      trimmedString =
        trimmedString.substr(
          0,
          Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))
        ) + '...';
    }
    return trimmedString;
  } else {
    return description;
  }
};

export default substrDescription;
