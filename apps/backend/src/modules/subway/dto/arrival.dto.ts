// src/subway/dto/arrival.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsEnum } from "class-validator";

export class ArrivalInfoDto {
  @ApiProperty({
    example: "1007",
    description: "지하철 호선 ID",
  })
  subwayId: string;
  /**지하철호선ID
(1001:1호선, 1002:2호선, 1003:3호선, 1004:4호선, 1005:5호선 1006:6호선, 1007:7호선, 1008:8호선, 1009:9호선, 1061:중앙선1063:경의중앙선, 1065:공항철도, 1067:경춘선, 1075:수인분당선 1077:신분당선, 1092:우이신설선, 1093:서해선, 1081:경강선, 1032:GTX-A) */

  @ApiProperty({
    example: "7호선",
    description: "호선명",
  })
  lineName: string;

  @ApiProperty({
    example: "상행",
    description: "상행/하행 구분 (상행/내선, 하행/외선)",
  })
  updnLine: string;

  @ApiProperty({
    example: "성수행(목적지역) - 구로디지털단지방면(다음역)",
    description: "도착지 방면",
  })
  trainLineNm: string;

  @ApiProperty({
    example: "장승배기",
    description: "지하철역명",
  })
  statnNm: string;

  @ApiProperty({
    example: "장암",
    description: "종착지하철역명",
  })
  bstatnNm: string;

  @ApiProperty({
    example: "일반",
    description: "열차 종류",
    enum: ["일반", "급행", "ITX", "특급"],
  })
  btrainSttus: string;

  @ApiProperty({
    example: "180",
    description: "열차 도착 예정 시간 (초 단위)",
  })
  barvlDt: string;

  @ApiProperty({
    example: "7144",
    description: "열차 번호 (현재운행하고 있는 호선별 열차번호)",
  })
  btrainNo: string;

  @ApiProperty({
    example: "3분 후 (숭실대입구(살피재))",
    description: "첫번째 도착 메시지 (도착/출발/진입 등)",
  })
  arvlMsg2: string;

  @ApiProperty({
    example: "숭실대입구(살피재)",
    description: "두번째 도착 메시지 (현재 위치)",
  })
  arvlMsg3: string;

  @ApiProperty({
    example: "99",
    description: "도착 코드",
    enum: {
      "0": "진입",
      "1": "도착",
      "2": "출발",
      "3": "전역출발",
      "4": "전역진입",
      "5": "전역도착",
      "99": "운행중",
    },
  })
  arvlCd: string;

  @ApiProperty({
    example: "0",
    description: "막차 여부 (0:아님, 1:막차)",
  })
  lstcarAt: string;

  @ApiProperty({
    example: "2025-11-05 11:31:04",
    description: "열차 도착 정보 생성 시각",
  })
  recptnDt: string;

  @ApiProperty({
    example: "1",
    description: "환승 노선 수",
  })
  trnsitCo: string;
}

export class ArrivalListResponseDto {
  @ApiProperty({
    example: "장승배기",
    description: "조회한 역명",
  })
  stationName: string;

  @ApiProperty({
    example: 4,
    description: "도착 예정 열차 수",
  })
  total: number;

  @ApiProperty({
    type: [ArrivalInfoDto],
    description: "실시간 도착 정보 목록",
  })
  arrivals: ArrivalInfoDto[];

  @ApiProperty({
    example: "2025-11-05T11:31:04.000Z",
    description: "조회 시각",
  })
  queryTime: string;
}

export class ArrivalRequestDto {
  @ApiProperty({
    description: "검색할 역명 (부분 검색 가능)",
    required: true,
  })
  @IsString()
  @IsOptional()
  stationName?: string;

  @ApiProperty({
    description: "검색할 노선명 (예: 1호선, 2호선 등)",
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

  @ApiProperty({
    description: "상행/하행/내선/외선 구분",
    required: false,
    enum: ["상행", "하행", "내선", "외선"],
  })
  @IsString()
  @IsOptional()
  updnLine?: string;
}
