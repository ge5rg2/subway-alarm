// src/common/dto/api-response.dto.ts
import { ApiProperty } from "@nestjs/swagger";

export class ApiResponseDto<T> {
  @ApiProperty({
    description: "성공 여부",
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: "HTTP 상태 코드",
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    description: "응답 메시지",
    example: "성공적으로 조회되었습니다",
  })
  message: string;

  @ApiProperty({
    description: "응답 데이터",
  })
  data: T;

  @ApiProperty({
    description: "응답 시각",
    example: "2025-11-05T12:00:00.000Z",
  })
  timestamp: string;

  constructor(success: boolean, statusCode: number, message: string, data: T) {
    this.success = success;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.timestamp = new Date().toISOString();
  }

  static success<T>(data: T, message: string = "성공"): ApiResponseDto<T> {
    return new ApiResponseDto(true, 200, message, data);
  }

  static error(statusCode: number, message: string): ApiResponseDto<null> {
    return new ApiResponseDto(false, statusCode, message, null);
  }
}
