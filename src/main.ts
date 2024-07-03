import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';
import { Logger } from 'winston';
import { File } from 'buffer';
import { WINSTON_MODULE_NEST_PROVIDER, WinstonModule } from 'nest-winston';
import * as winston from 'winston';

const validationPipeOptions = {
  transform: true,
  validationError: { target: false, value: false },
};

export const appDataSource = new DataSource({
  type: 'mysql',
  host: process.env.PG_HOST,
  port: +process.env.PG_PORT,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASS,
  database: process.env.PG_DB,
  entities: [User],
  synchronize: true
})

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: WinstonModule.createLogger({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          // dirname: path.join(__dirname, '.', '..', 'log', 'debug'), //path to where save loggin result 
          filename: 'debug.log', //name of file where will be saved logging result
          level: 'debug',
        }),
        new winston.transports.File({
          // dirname: path.join(__dirname, '.', '..', 'log', 'info'),
          filename: 'info.log',
          level: 'info',
        }),
      ],
    })
  });
  // app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidUnknownValues: true,
    transform: true,
    validateCustomDecorators: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }))
  const port = process.env.APP_PORT || 3000;

  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));
  await app.listen(port);
  await appDataSource.initialize();
  console.log('app_port:::', port);
}
bootstrap();
