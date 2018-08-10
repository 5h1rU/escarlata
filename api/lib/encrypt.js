const bcrypt = require('bcrypt');
const { errorBuilder } = require('./errors');

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
      throw errorBuilder({
        name: 'ValidationError',
        message: 'String is not coinciding'
      });
    }
    return compare;
  }
};

module.exports = Encrypt;
