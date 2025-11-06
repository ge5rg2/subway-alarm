// src/subway/subway.controller.ts
import {
  Controller,
  Get,
  Query,
  Param,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from "@nestjs/swagger";
import { SubwayService } from "./subway.service";
import {
  StationListResponseDto,
  ArrivalListResponseDto,
  ArrivalRequestDto,
  LineListResponseDto,
  SearchStationDto,
} from "./dto";
import { ErrorResponseDto, ApiResponseDto } from "../../common";

@ApiTags("subway")
@Controller("subway")
export class SubwayController {
  constructor(private readonly subwayService: SubwayService) {}

  @Get("stations")
  @ApiOperation({
    summary: "전체 역 목록 조회",
    description:
      "서울시 지하철 전체 역 목록을 반환합니다. 키워드나 노선으로 필터링 가능합니다.",
  })
  @ApiResponse({
    status: 200,
    description: "역 목록 조회 성공",
    type: StationListResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: "서버 에러",
    type: ErrorResponseDto,
  })
  async getStations(
    @Query() searchDto: SearchStationDto
  ): Promise<ApiResponseDto<StationListResponseDto>> {
    const data = await this.subwayService.getStations(searchDto);
    return ApiResponseDto.success(data, "역 목록을 성공적으로 조회했습니다");
  }

  @Get("arrival/:stationName")
  @ApiOperation({
    summary: "실시간 도착 정보 조회",
    description:
      "특정 역의 실시간 지하철 도착 정보를 조회합니다. 최대 10개까지 반환됩니다.",
  })
  @ApiParam({
    name: "stationName",
    description: "역명 (예: 강남, 역삼, 선릉)",
    example: "장승배기",
  })
  @ApiQuery({
    name: "lineName",
    description: "노선명 (예: 01호선, 02호선)",
    example: "02호선",
    required: false,
  })
  @ApiQuery({
    name: "updnLine",
    description: "상행/하행 구분 (상행, 하행, 외선, 내선)",
    example: "상행",
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: "도착 정보 조회 성공",
    type: ArrivalListResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: "잘못된 요청",
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "역을 찾을 수 없음",
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: "서버 에러",
    type: ErrorResponseDto,
  })
  async getArrivalInfo(
    @Param("stationName") stationName: string,
    @Query() query: Partial<ArrivalRequestDto>
  ): Promise<ApiResponseDto<ArrivalListResponseDto>> {
    const arrivalRequest: ArrivalRequestDto = {
      stationName,
      lineName: query.lineName,
      updnLine: query.updnLine,
    };
    
    const data = await this.subwayService.getArrivalInfo(arrivalRequest);
    return ApiResponseDto.success(data, "도착 정보를 성공적으로 조회했습니다");
  }

  @Get("lines")
  @ApiOperation({
    summary: "노선 목록 조회",
    description: "서울시 지하철 전체 노선 목록을 반환합니다.",
  })
  @ApiResponse({
    status: 200,
    description: "노선 목록 조회 성공",
    type: LineListResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: "서버 에러",
    type: ErrorResponseDto,
  })
  async getLines(): Promise<ApiResponseDto<LineListResponseDto>> {
    const data = await this.subwayService.getLines();
    return ApiResponseDto.success(data, "노선 목록을 성공적으로 조회했습니다");
  }
}
