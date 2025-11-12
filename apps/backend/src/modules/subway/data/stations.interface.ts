// apps/backend/src/subway/data/stations.interface.ts

export interface StationData {
  id: string; // 역 ID
  name: string; // 한글 역명
  line: string; // "1호선"
  lineCode: string; // 노선 코드
}

export interface StationsJson {
  stations: StationData[];
}
