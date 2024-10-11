* ![NestJS基本概念](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/24060e0f32204907887ede38c1aa018c~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

* 自定义装饰器
    - SetMetadata
    - this.reflector.get
* 统一返回格式
    - 拦截器
    - 异常捕获  需要处理业务异常
* 动态模块
    - register方法其实叫啥都行，nest约定了3种方法名
    - register 用一次模块传一次配置
    - forRoot 配置一次模块用多次 forRoot一次 一般在AppModule里 import
    - forFeature 用了forRoot固定了整体模块,用于局部的时候,可内需要再传入一些配置,比如用 forRoot指定了数据库链接信息，再用 forFeature 指定某个模块访问哪个数据库和

* 在 AppModule 里 import 通过 forRoot 动态产生的模块，在具体的业务 Module 里，通过 forFeature 传入具体实体类的配置。
* provider
    - useClass
    - useVlaue
    - useFactory
    - useExisting

```
// 返回统一数据格式

/* transform.interceptor.ts */

import { Injectable, NestInterceptor, CallHandler, ExecutionContext } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          code: 200,
          message: '请求成功',
        };
      }),
    );
  }
}

// 异常

/* all-exception.filter.ts */

// 引入所需内置对象
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import * as moment from 'moment';

// 们需要访问底层平台 `Request`和 `Response`
import { Request, Response } from 'express';

// 它负责捕获作为`HttpException`类实例
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    // 用于接收主动发错的错误信息 
    const { message, code } = exception.getResponse() as any;
    response.status(status).json({
      code: code || status,
      timestamp: moment().format('yyyy-MM-DD HH:mm:ss'),
      path: request.url,
      error: 'Bad Request',
      message,
    });
  }
}




  /* main.ts */
 ...
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { HttpExceptionFilter } from './filters/http-exception.filter';
async function bootstrap() {
 ...
 // 全局注册拦截器
 app.useGlobalInterceptors(new TransformInterceptor());
 // 全局注册错误的过滤器
 app.useGlobalFilters(new HttpExceptionFilter());
}
bootstrap();



```


```
// 动态模块

import { DynamicModule, Module } from '@nestjs/common';
import { BbbService } from './bbb.service';
import { BbbController } from './bbb.controller';

@Module({
  // controllers: [BbbController],
  // providers: [BbbService],
})
export class BbbModule {
  static register(options: Record<string, any>): DynamicModule {
    return {
      module: BbbModule,
      controllers: [BbbController],
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        BbbService,
      ],
      exports: [],
    };
  }
}



```








```

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'app_service',
      useClass: AppService,
    },
    {
      provide: 'person',
      useValue: {
        name: 'aaa',
        age: 20,
      },
    },
    {
      provide: 'person2',
      useFactory() {
        return {
          name: 'bbb',
          desc: 'cccc',
        };
      },
    },
    {
      provide: 'person3',
      useFactory(person: { name: string }, appService: AppService) {
        return {
          name: person.name,
          desc: appService.getHello(),
        };
      },
      inject: ['person', AppService],
    },
    {
      provide: 'person4',
      useExisting: 'person2',
    },
    {
      provide: 'person5',
      async useFactory() {
        await new Promise((resolve) => {
          setTimeout(resolve, 3000);
        });
        return {
          name: 'bbb',
          desc: 'cccc',
        };
      },
    },
  ],
})
export class AppModule {}



```