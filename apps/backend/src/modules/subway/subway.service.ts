// src/subway/subway.service.ts
import { Injectable, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";
import {
  SearchStationDto,
  StationListResponseDto,
  ArrivalListResponseDto,
  ArrivalRequestDto,
  ArrivalInfoDto,
  LineListResponseDto,
} from "./dto";
import * as stationsJson from "./data/stations.json";
import { StationsJson, StationData } from "./data/stations.interface";

@Injectable()
export class SubwayService {
  private readonly logger = new Logger(SubwayService.name);
  private readonly apiKey: string;
  private readonly apiUrl: string;
  private readonly stationsData: StationData[];

  // 호선 정보 (ID, 이름, 색상)
  private readonly subwayLines = [
    { lineId: "1001", lineName: "01호선", color: "#0052A4" },
    { lineId: "1002", lineName: "02호선", color: "#00A84D" },
    { lineId: "1003", lineName: "03호선", color: "#EF7C1C" },
    { lineId: "1004", lineName: "04호선", color: "#00A5DE" },
    { lineId: "1005", lineName: "05호선", color: "#996CAC" },
    { lineId: "1006", lineName: "06호선", color: "#CD7C2F" },
    { lineId: "1007", lineName: "07호선", color: "#747F00" },
    { lineId: "1008", lineName: "08호선", color: "#E6186C" },
    { lineId: "1009", lineName: "09호선", color: "#BDB092" },
    { lineId: "1061", lineName: "중앙선", color: "#0C8E72" },
    { lineId: "1063", lineName: "경의중앙선", color: "#77C4A3" },
    { lineId: "1065", lineName: "공항철도", color: "#0090D2" },
    { lineId: "1067", lineName: "경춘선", color: "#0C8E72" },
    { lineId: "1075", lineName: "수인분당선", color: "#FABE00" },
    { lineId: "1077", lineName: "신분당선", color: "#D31145" },
    { lineId: "1092", lineName: "우이신설선", color: "#B0CE18" },
    { lineId: "1093", lineName: "서해선", color: "#8FC31F" },
    { lineId: "1081", lineName: "경강선", color: "#003DA5" },
    { lineId: "1032", lineName: "GTX-A", color: "#9B1D20" },
  ];

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>("SEOUL_API_KEY") || "";
    this.apiUrl = this.configService.get<string>("SEOUL_API_URL") || "";

    // JSON 데이터 로드
    const data = stationsJson as StationsJson;
    this.stationsData = data.DATA;

    // 데이터 로드 확인
    this.logger.log(`Loaded ${this.stationsData.length} subway stations`);
  }

  /**
   * 실시간 지하철 도착 정보 조회
   * TODO: 호선 구분 + 상행/하행/외선/내선 구분 파라미터 추가
   */
  async getArrivalInfo(
    arriveDto: ArrivalRequestDto
  ): Promise<ArrivalListResponseDto> {
    try {
      if (!arriveDto.stationName) {
        throw new HttpException("역명을 입력해주세요", HttpStatus.BAD_REQUEST);
      }
      const stationName = arriveDto.stationName;
      const url = `${this.apiUrl}/${this.apiKey}/json/realtimeStationArrival/0/10/${encodeURIComponent(stationName)}`;

      this.logger.log(`Fetching arrival info for station: ${stationName}`);

      const response = await axios.get(url, { timeout: 5000 });

      const data = response.data;

      if (data.errorMessage?.code !== "INFO-000") {
        throw new HttpException(
          data.errorMessage?.message || "지하철 정보를 찾을 수 없습니다",
          HttpStatus.NOT_FOUND
        );
      }

      if (!data.realtimeArrivalList || data.realtimeArrivalList.length === 0) {
        throw new HttpException(
          `'${stationName}' 역의 도착 정보가 없습니다`,
          HttpStatus.NOT_FOUND
        );
      }

      if (arriveDto.lineName) {
        data.realtimeArrivalList = data.realtimeArrivalList.filter(
          (item: any) => {
            const lineName = this.getLineName(item.subwayId);
            return lineName === arriveDto.lineName;
          }
        );
      }

      if (arriveDto.updnLine) {
        data.realtimeArrivalList = data.realtimeArrivalList.filter(
          (item: any) => {
            return item.updnLine === arriveDto.updnLine;
          }
        );
      }

      const arrivals: ArrivalInfoDto[] = data.realtimeArrivalList.map(
        (item: any) => ({
          subwayId: item.subwayId,
          lineName: this.getLineName(item.subwayId),
          updnLine: item.updnLine,
          trainLineNm: item.trainLineNm,
          statnNm: item.statnNm,
          bstatnNm: item.bstatnNm,
          btrainSttus: item.btrainSttus,
          barvlDt: item.barvlDt,
          btrainNo: item.btrainNo,
          arvlMsg2: item.arvlMsg2,
          arvlMsg3: item.arvlMsg3,
          arvlCd: item.arvlCd,
          lstcarAt: item.lstcarAt,
          recptnDt: item.recptnDt,
          trnsitCo: item.trnsitCo,
        })
      );

      if (arrivals.length === 0) {
        throw new HttpException(
          `'${stationName}' 역의 도착 정보가 없습니다. 필터 조건을 확인해주세요.`,
          HttpStatus.NOT_FOUND
        );
      }

      return {
        stationName,
        total: arrivals.length,
        arrivals,
        queryTime: new Date().toISOString(),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error(`Failed to fetch arrival info: ${error.message}`);
      throw new HttpException(
        "지하철 정보 조회에 실패했습니다",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * 전체 역 목록 조회
   */
  async getStations(
    searchDto: SearchStationDto
  ): Promise<StationListResponseDto> {
    let stations = this.stationsData.map((station: StationData) => ({
      stationId: station.station_cd,
      stationCode: station.fr_code,
      stationName: station.station_nm,
      lineName: station.line_num,
    }));

    // 키워드 필터
    if (searchDto.stationName) {
      const stationName = searchDto.stationName.toLowerCase();
      stations = stations.filter((s: any) =>
        s.stationName.includes(stationName)
      );
    }

    // 노선 필터
    if (searchDto.lineName) {
      const lineName = searchDto.lineName;
      stations = stations.filter((s: any) => s.lineName === lineName);
    }

    return {
      total: stations.length,
      stations,
    };
  }

  /**
   * 노선 목록 조회
   */
  async getLines(): Promise<LineListResponseDto> {
    return {
      total: this.subwayLines.length,
      lines: this.subwayLines,
    };
  }

  /**
   * 호선 ID를 호선명으로 변환
   */
  private getLineName(subwayId: string): string {
    const line = this.subwayLines.find((l) => l.lineId === subwayId);
    return line?.lineName || `${subwayId}호선`;
  }
}
