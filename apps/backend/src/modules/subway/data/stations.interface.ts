// apps/backend/src/subway/data/stations.interface.ts

export interface StationData {
  line_num: string; // "01호선"
  station_nm_chn: string; // 중국어 역명
  station_cd: string; // 역 코드
  station_nm_jpn: string; // 일본어 역명
  station_nm_eng: string; // 영어 역명
  station_nm: string; // 한글 역명
  fr_code: string; // 외부 코드
}

export interface StationsJson {
  DESCRIPTION: {
    STATION_NM: string;
    STATION_CD: string;
    STATION_NM_CHN: string;
    LINE_NUM: string;
    FR_CODE: string;
    STATION_NM_JPN: string;
    STATION_NM_ENG: string;
  };
  DATA: StationData[];
}
