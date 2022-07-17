import LimpaGrid from './services/limpadgrid';
import { CronJob } from 'cron';
import { Cron } from './utils/crontab';

console.log('X-POST LIMPAGRID START');

const cron = new CronJob(Cron.EVERY_30_MINUTE, async () => {
  const limpagrid = new LimpaGrid();
  limpagrid.init();
});

cron.start();
