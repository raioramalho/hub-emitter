import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CustomError } from './custom.error';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        // Verifica se o erro é uma instância de HttpException
        if (error instanceof CustomError) {
          // Se for, lança o erro original
          // return throwError(error);
          throw new HttpException(`${error?.message}`, error.code);
        } else if (error instanceof BadRequestException) {
          const validationErrors = error.getResponse(); //capturando erros do class-validate e jogando no globalpipe
          throw new HttpException(validationErrors, HttpStatus.BAD_REQUEST);
        } else {
          // Caso contrário, cria uma nova HttpException com status 500 (Internal Server Error)
          // e a mensagem de erro do erro original
          throw new HttpException(
            'Erro interno do gateway',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }),
    );
  }
}
