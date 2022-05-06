import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter { // 클래스의 타입설정(구현: 인터페이스 타입강제) => catch() 안쓰면 에러표시
  catch(exception: HttpException) {
    const status = exception.getStatus();
    const message = exception.message;

    console.log('===================');
    console.log('에러가 발생했어요!!');
    console.log('에러내용:', message);
    console.log('에러코드:', status);
    console.log('===================');
    // 실서비스에서는 로그만 찍는게 아니라 DB에 저장한다. (추가로 슬랙등에 알림까지 보내기)
  }
}
