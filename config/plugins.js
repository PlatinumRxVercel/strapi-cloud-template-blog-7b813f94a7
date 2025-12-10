module.exports = () => ({
  localazy: {
    config: {
      /**
       * both options may help guard against DoS attacks
       * if `populateMaxDepth` < 5; the Localazy Strapi Plugin may not work as expected
       */
      populateDefaultDepth: 5, // default is 5
      populateMaxDepth: 10, // default is 10
      skipCreatorFields: false, // default is false
      enableSocketIO: true, // default is true
    },
  },
});
