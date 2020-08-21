module.exports = (connection, DataTypes) => {
  const schema = {
    name: DataTypes.STRING,
    aka: DataTypes.STRING,
    cool: DataTypes.INTEGER,
    alignment: DataTypes.STRING,
  };

  const CardModel = connection.define("Card", schema);
  return CardModel;
};
