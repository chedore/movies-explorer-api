const {
  PORT = 3000,
  DB = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  JWT_SECRET,
  NODE_ENV,
} = process.env;

module.exports = {
  PORT,
  DB,
  JWT_SECRET,
  NODE_ENV,
};
