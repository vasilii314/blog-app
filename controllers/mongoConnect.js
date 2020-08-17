module.exports = (error) => {
  if (error) {
    return console.log("Unable to connect to database...");
  }

  console.log("Connected...");
};
