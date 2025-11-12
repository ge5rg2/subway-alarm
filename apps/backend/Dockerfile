# Node.js 20 Alpine 이미지 사용
FROM node:20-alpine

# 작업 디렉토리 설정
WORKDIR /app

# package.json 복사
COPY package.json ./

# 의존성 설치 (빌드를 위해 dev dependencies 포함)
RUN npm install

# 소스 코드 복사
COPY . .

# TypeScript 빌드
RUN npm run build

# 애플리케이션 포트
EXPOSE 3000

# 프로덕션 모드로 실행
CMD ["npm", "run", "start:prod"]