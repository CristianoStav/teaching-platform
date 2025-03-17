// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('../../package.json');
import { DocumentBuilder } from '@nestjs/swagger';

const { name, version } = packageJson;

const config = new DocumentBuilder()
  .setTitle(name)
  .setVersion(version)
  .setDescription('Teching Platform API')
  .addServer(`http://localhost:${process.env.PORT || 3000}`)
  .build();

export default config;
