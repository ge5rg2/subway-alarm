// src/subway/dto/line.dto.ts
import { ApiProperty } from "@nestjs/swagger";

export class LineDto {
  @ApiProperty({
    example: "1002",
    description: "호선 ID",
  })
  lineId: string;

  @ApiProperty({
    example: "2호선",
    description: "호선명",
  })
  lineName: string;

  @ApiProperty({
    example: "#00A84D",
    description: "노선 색상 (Hex)",
    required: false,
  })
  color?: string;
}

export class LineListResponseDto {
  @ApiProperty({
    example: 20,
    description: "전체 노선 수",
  })
  total: number;

  @ApiProperty({
    type: [LineDto],
    description: "노선 목록",
  })
  lines: LineDto[];
}
