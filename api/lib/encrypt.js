const bcrypt = require('bcrypt');

const Encrypt = {
  hash: async (rawString, saltNumber = 10) => {
    try {
      return await bcrypt.hash(rawString, saltNumber);
    } catch (error) {
      throw error;
    }
  },
  compare: async function(sentString, storedString) {
    const compare = await bcrypt.compare(sentString, storedString);
    if (!compare) {
      const error = new Error('String is not coinciding');
      error.name = 'ValidationError';
      throw error;
    }
    return compare;
  }
};

module.exports = Encrypt;
