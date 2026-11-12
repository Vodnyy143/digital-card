import { Injectable } from '@nestjs/common';
import { Env } from './env';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvService {
  constructor(private readonly config: ConfigService<Env, true>) {}

  get<K extends keyof Env>(key: K): Env[K] {
    return this.config.get(key, { infer: true });
  }
}
