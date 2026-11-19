import { app } from './app.js';
import { config } from './config/index.js';

app.listen(config.port, () => {
  console.log(`SQA study API running on http://localhost:${config.port}/api (${config.env})`);
});
