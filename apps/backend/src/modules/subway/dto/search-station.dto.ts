// src/subway/dto/search-station.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsEnum } from "class-validator";

export class SearchStationDto {
  @ApiProperty({
    description: "검색할 역명 (부분 검색 가능)",
    required: false,
  })
  @IsString()
  @IsOptional()
  stationName?: string;

  @ApiProperty({
    description: "노선명으로 필터",
    required: false,
    enum: [
      "01호선",
      "02호선",
      "03호선",
      "04호선",
      "05호선",
      "06호선",
      "07호선",
      "08호선",
      "09호선",
      "중앙선",
      "경의중앙선",
      "공항철도",
      "경춘선",
      "수인분당선",
      "신분당선",
      "우이신설선",
      "서해선",
      "경강선",
      "GTX-A",
    ],
  })
  @IsString()
  @IsOptional()
  lineName?: string;
}
