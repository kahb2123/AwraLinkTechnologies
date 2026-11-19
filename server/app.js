import { createApp } from './contact-app.js';

const port = Number(process.env.PORT || 3000);
const app = createApp();

app.listen(port, () => {
  console.info(`AwraLink contact API listening on port ${port}`);
});
