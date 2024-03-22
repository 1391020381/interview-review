import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError(err => {
          // 这里可以放置你的错误处理逻辑
          if(err instanceof SomeException){
            // 处理SomeException类型的错误
          } else {
            // 处理其他类型错误
          }
          // 应该将错误重新抛出，以便外部能捕获并处理
          throw err;
        })
      );
  }
}