import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { ApiResponse as SwaggerApiResponse } from '@nestjs/swagger';
import { ApiResponseDto } from '../dto/api-response.dto';

export const ApiSuccessResponse = (options: {
  description: string;
  type?: any;
  example?: any;
}) => {
  return applyDecorators(
    SwaggerApiResponse({
      status: 200,
      description: options.description,
      schema: {
        allOf: [
          {
            properties: {
              success: { type: 'boolean', example: true },
              statusCode: { type: 'number', example: 200 },
              message: { type: 'string', example: '요청이 성공적으로 처리되었습니다' },
              timestamp: { type: 'string', example: '2025-11-05T12:00:00.000Z' },
              data: options.type ? { $ref: `#/components/schemas/${options.type.name}` } : { type: 'object' }
            }
          }
        ]
      }
    })
  );
};