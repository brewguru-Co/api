const TABLE_NAME = 'tanks';

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    TABLE_NAME,
    [
      {
        name: '탱크1',
        teaId: 1,
        tempHigh: 26.6,
        tempLow: 26.4,
        phHigh: 2.95,
        phLow: 2.85,
        doxHigh: 26.6,
        doxLow: 26.4,
        brixHigh: 6.5,
        brixLow: 6.3,
      },
    ],
    {},
  ),
  down: (queryInterface) => queryInterface.bulkDelete(TABLE_NAME, null, {}),
};
