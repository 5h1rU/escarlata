const CronJob = require('cron').CronJob;
const CartService = require('../services/cart');

const job = new CronJob('* */10 * * * *', function() {
  const cutOffDate = new Date();
  cutOffDate.setMinutes(cutOffDate.getMinutes() - 1);
  CartService.watcherExpiration(cutOffDate);
});

job.start();

module.exports = job;
