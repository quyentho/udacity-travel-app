const fetch = require("node-fetch");
module.exports = {
  async fetchAsync(url) {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  },
};
