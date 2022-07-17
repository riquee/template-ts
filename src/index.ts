import LimpaGrid from './services/limpadgrid';
import { CronJob } from 'cron';
import { Cron } from './utils/crontab';

const cron = new CronJob(Cron.EVERY_30_MINUTE, async () => {
  const limpagrid = new LimpaGrid();
  limpagrid.init();
});

cron.start();
