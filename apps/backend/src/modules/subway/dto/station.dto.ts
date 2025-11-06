// src/subway/dto/station.dto.ts
import { ApiProperty } from "@nestjs/swagger";

export class StationDto {
  @ApiProperty({
    example: "1007000740",
    description: "지하철역 ID",
  })
  stationId: string;

  @ApiProperty({
    example: "장승배기",
    description: "역명",
  })
  stationName: string;

  @ApiProperty({
    example: "7호선",
    description: "노선명",
  })
  lineName: string;
}

export class StationListResponseDto {
  @ApiProperty({
    example: 10,
    description: "검색된 역 총 개수",
  })
  total: number;

  @ApiProperty({
    type: [StationDto],
    description: "역 목록",
  })
  stations: StationDto[];
}
