// src/common/dto/error-response.dto.ts
import { ApiProperty } from "@nestjs/swagger";

export class ErrorResponseDto {
  @ApiProperty({
    description: "성공 여부",
    example: false,
  })
  success: boolean;

  @ApiProperty({
    description: "HTTP 상태 코드",
    example: 404,
  })
  statusCode: number;

  @ApiProperty({
    description: "에러 메시지",
    example: "역을 찾을 수 없습니다",
  })
  message: string;

  @ApiProperty({
    description: "에러 상세 (개발 환경에만 표시)",
    required: false,
  })
  error?: string;

  @ApiProperty({
    description: "요청 경로",
    example: "/subway/arrival/없는역",
  })
  path?: string;

  @ApiProperty({
    description: "에러 발생 시각",
    example: "2025-11-05T12:00:00.000Z",
  })
  timestamp: string;

  constructor(
    statusCode: number,
    message: string,
    path?: string,
    error?: string
  ) {
    this.success = false;
    this.statusCode = statusCode;
    this.message = message;
    this.path = path;
    this.error = error;
    this.timestamp = new Date().toISOString();
  }
}
