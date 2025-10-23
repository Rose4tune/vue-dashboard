# 🎯 Vue Dashboard

Vue.js/Nuxt 3를 활용한 개인 대시보드 애플리케이션입니다.<br/>
날씨 정보, 오늘의 명언, 할 일 관리 기능을 제공하며,<br/>
React 개발자가 Vue 생태계를 학습하고 실무 역량을 보여주기 위한 포트폴리오 프로젝트입니다.

![Vue](https://img.shields.io/badge/Vue.js-3.5-4FC08D?style=flat-square&logo=vue.js&logoColor=white)
![Nuxt](https://img.shields.io/badge/Nuxt-4.1-00DC82?style=flat-square&logo=nuxt.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white)

## ✨ 주요 기능

### 🌤️ 날씨 위젯

- OpenWeatherMap API를 활용한 실시간 날씨 정보
- 온도, 체감온도, 습도, 풍속 등 상세 정보 제공
- 서울 지역 기준 (위도/경도 커스터마이징 가능)

### 💭 명언 위젯

- 한국어 명언 API 연동
- 작가 및 작가 프로필 정보 표시
- 버튼 클릭으로 새로운 명언 불러오기

### ✅ 할 일 관리 (Todo)

- Supabase를 활용한 실시간 CRUD 작업
- 할 일 추가, 완료 토글, 삭제 기능
- 완료된 항목 시각적 구분 (취소선 처리)
- 데이터 영구 저장 (PostgreSQL)

### 🎨 UI/UX

- 반응형 디자인 (모바일/태블릿/데스크톱)

## 🛠️ 기술 스택

### Frontend

- **Framework**: [Nuxt 3](https://nuxt.com/) (v4.1.3)
- **UI Library**: [Vue 3](https://vuejs.org/) (v3.5.22)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (v5.6.3)
- **State Management**: [Pinia](https://pinia.vuejs.org/) (v3.0.3)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4.0.0)

### Backend & APIs

- **Database/Auth**: [Supabase](https://supabase.com/) (@supabase/supabase-js v2.76.1)
- **Weather API**: [OpenWeatherMap API](https://openweathermap.org/api)
- **Quote API**: [Korean Advice Open API](https://korean-advice-open-api.vercel.app/)

### Development Tools

- **Package Manager**: pnpm
- **CSS Framework**: Tailwind CSS v4 with PostCSS

## 📁 프로젝트 구조

```
vue-dashboard/
├── app/
│   └── app.vue                 # 루트 애플리케이션 컴포넌트
├── src/
│   ├── assets/
│   │   └── styles.css          # 전역 스타일 & Tailwind 설정
│   ├── components/
│   │   ├── WeatherWidget.vue   # 날씨 위젯 (useAsyncData 사용)
│   │   ├── QuoteWidget.vue     # 명언 위젯 (useAsyncData 사용)
│   │   └── TodoWidget.vue      # Todo 위젯 (Store + Composable 사용)
│   ├── composables/
│   │   └── useTodos.ts         # Todo Composable (Store wrapper)
│   ├── stores/
│   │   └── todoStore.ts        # Todo 상태 관리 (Pinia)
│   ├── plugins/
│   │   └── supabase.ts         # Supabase 플러그인
│   ├── pages/
│   │   └── index.vue           # 메인 대시보드 페이지
│   └── types/
│       └── index.ts            # TypeScript 타입 정의
├── nuxt.config.ts              # Nuxt 설정 파일
├── tailwind.config.js          # Tailwind CSS 설정
├── tsconfig.json               # TypeScript 설정
└── package.json                # 프로젝트 의존성
```

## 🚀 시작하기

### 1. 사전 요구사항

- Node.js 18.x 이상
- pnpm (권장) 또는 npm/yarn

### 2. 저장소 클론

```bash
git clone https://github.com/YOUR_USERNAME/vue-dashboard.git
cd vue-dashboard
```

### 3. 의존성 설치

```bash
pnpm install
```

### 4. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
# OpenWeatherMap API Key
NUXT_PUBLIC_WEATHER_API_KEY=your_openweather_api_key

# Supabase Configuration
NUXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NUXT_PUBLIC_SUPABASE_KEY=your_supabase_anon_key
```

#### 환경 변수 발급 방법

**OpenWeatherMap API Key:**

1. [OpenWeatherMap](https://openweathermap.org/api)에 가입
2. API Keys 메뉴에서 키 생성
3. Free tier로도 충분히 사용 가능

**Supabase 설정:**

1. [Supabase](https://supabase.com/)에서 프로젝트 생성
2. Settings > API에서 URL과 anon key 확인
3. SQL Editor에서 다음 테이블 생성:

```sql
-- Todo 테이블 생성
CREATE TABLE todos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  text TEXT NOT NULL,
  done BOOLEAN DEFAULT FALSE,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 인덱스 생성 (성능 최적화)
CREATE INDEX idx_todos_order ON todos("order");
```

### 5. 개발 서버 실행

```bash
pnpm dev
```

브라우저에서 `http://localhost:3000`으로 접속하세요.

### 6. 프로덕션 빌드

```bash
# 빌드
pnpm build

# 프리뷰
pnpm preview
```

### 7. 정적 사이트 생성 (SSG)

```bash
pnpm generate
```

## 🏗️ 주요 구현 사항

### 1. SSR/SSG 지원

Nuxt 3의 `useAsyncData`를 활용하여 서버 사이드 렌더링과 클라이언트 사이드 하이드레이션을 구현했습니다.

```typescript
const { data: weather, error, pending: loading } = await useAsyncData(
  'weather',
  async () => {
    const response = await fetch(weatherApiUrl);
    return transformWeatherData(await response.json());
  }
);
```

### 2. Composition API & Script Setup

Vue 3의 Composition API와 `<script setup>` 문법을 활용하여 간결하고 타입 안전한 코드를 작성했습니다.

```vue
<script setup lang="ts">
const newTodoText = ref("");
const { data: todos } = await useAsyncData('todos', fetchTodos);
</script>
```

### 3. TypeScript 통합

전역 타입 정의를 통해 타입 안정성을 확보하고 개발 경험을 향상시켰습니다.

```typescript
export interface Todo {
  id: string;
  text: string;
  done: boolean;
  order: number;
  created_at?: string;
}
```

### 4. Plugin 시스템

Nuxt의 Plugin 시스템을 활용하여 Supabase 클라이언트를 전역으로 주입했습니다.

```typescript
export default defineNuxtPlugin(() => {
  const supabase = createClient(supabaseUrl, supabaseKey);
  return {
    provide: {
      supabase,
    },
  };
});
```

### 5. 하이브리드 아키텍처 접근

프로젝트의 특성에 맞게 **상황별로 최적의 패턴**을 선택했습니다.

#### Weather & Quote 위젯: `useAsyncData` 패턴

```typescript
// SSR 최적화가 중요한 단순 API 호출
const { data: weather, error, pending } = await useAsyncData('weather',
  async () => await fetchWeatherData()
);
```

**선택 이유:**

- SSR/SSG 지원으로 초기 로딩 성능 향상
- 단순한 API 호출 (복잡한 상태 관리 불필요)
- SEO 최적화

#### Todo 위젯: Store + Composable 패턴

```typescript
// Component
const { todos, loading, createTodo, toggleTodo, deleteTodo } = useTodos();

// Composable (useTodos.ts)
const store = useTodoStore();
return { ...storeToRefs(store), ...store };

// Store (todoStore.ts)
const createTodo = async (input) => {
  // 비즈니스 로직 처리
  await $supabase.from('todos').insert([input]);
  await fetchTodos();
};
```

**선택 이유:**

- 복잡한 CRUD 로직의 분리 및 재사용
- 클라이언트 중심의 상태 관리

이러한 **하이브리드 접근**을 통해 "모든 곳에 같은 패턴을 강제"하는 것보다 **각 상황에 맞는 최적의 도구를 선택**하는 실용적 판단을 보여줍니다.

### 6. 반응형 디자인

Tailwind CSS의 유틸리티 클래스를 활용한 반응형 그리드 레이아웃:

```vue
<main class="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <WeatherWidget />
  <QuoteWidget />
  <div class="lg:col-span-2">
    <TodoWidget />
  </div>
</main>
```

## 🎓 프로젝트를 통해 학습한 내용

### Vue 사용 경험

- **템플릿 문법**: Vue 템플릿 디렉티브 이해 (`v-if`, `v-for`, `v-model`)
- **반응성 시스템**: `ref/reactive`, `.value` 접근 방식 이해 (리액트의 `useState` 개념)
- **라이프사이클**: `watch/watchEffect`, 의존성 자동 추적 (리액트의 `useEffect` 개념)
- **상태 관리**: Pinia, 더 간결한 API (Redux/Zustand 개념)

### Nuxt 3의 강점 발견

- **자동 Import**: 컴포넌트와 composables 자동 인식으로 import 문 불필요
- **파일 기반 라우팅**: `pages/` 폴더 기반의 직관적인 라우팅
- **SSR/SSG**: SEO 최적화와 초기 로딩 성능 향상
- **useAsyncData**: 서버/클라이언트 데이터 페칭 통합 관리

### 아키텍처 설계 경험

- **하이브리드 패턴**: 상황에 맞는 최적의 도구 선택의 중요성 학습
- **트레이드오프 이해**: SSR vs 클라이언트 상태 관리의 장단점 비교
- **실용주의**: 일관성보다 각 기능의 요구사항에 맞는 패턴 적용
- **확장성 고려**: 미래의 기능 추가를 염두에 둔 구조 설계

<!--
### TypeScript 활용

- Vue 3의 향상된 TypeScript 지원 체험
- Generic을 활용한 타입 안전한 API 호출
- Props와 Emits의 타입 정의

## 🔮 향후 개선 계획

- [ ] **Drag & Drop**: vuedraggable을 활용한 위젯 재배치 기능
- [ ] **사용자 인증**: Supabase Auth를 활용한 로그인/회원가입
- [ ] **다국어 지원**: vue-i18n을 활용한 i18n 구현
- [ ] **테스팅**: Vitest + Vue Test Utils로 단위/통합 테스트 추가
- [ ] **PWA**: 오프라인 지원 및 모바일 앱처럼 설치 가능
- [ ] **실시간 동기화**: Supabase Realtime으로 다중 기기 동기화
- [ ] **위젯 추가**: 캘린더, 뉴스, 주식 정보 등
- [ ] **커스터마이징**: 위젯 show/hide, 테마 변경 기능
- [ ] **성능 최적화**: 이미지 최적화, 코드 스플리팅
- [ ] **접근성 개선**: ARIA 속성, 키보드 네비게이션 강화
-->

## 📊 아키텍처 설계

이 프로젝트는 **하이브리드 아키텍처**를 채택하여 각 기능의 특성에 맞는 최적의 패턴을 적용했습니다.

### 현재 아키텍처

```
Weather/Quote Widget (SSR 중심)
    ↓
useAsyncData (Nuxt)
    ↓
External APIs

─────────────────────────

Todo Widget (클라이언트 상태 관리)
    ↓
useTodos Composable
    ↓
todoStore (Pinia)
    ↓
Supabase API
```

### 장점

✅ **유연성**: 각 기능의 요구사항에 맞는 최적의 패턴 사용  
✅ **성능**: SSR이 필요한 곳은 useAsyncData, 복잡한 상태는 Store 활용  
✅ **유지보수성**: 관심사의 분리로 코드 관리 용이  
✅ **확장성**: 새로운 기능 추가 시 적절한 패턴 선택 가능  
✅ **학습**: Vue/Nuxt 생태계의 다양한 패턴 경험

### 설계 원칙

> "모든 문제를 하나의 패턴으로 해결하려 하지 말고,  
> 각 문제의 특성에 맞는 최적의 도구를 선택하라"

이 원칙을 통해 실용적이고 확장 가능한 아키텍처를 구축했습니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 감사의 말

- [Nuxt 3](https://nuxt.com/) - 훌륭한 Vue 메타 프레임워크
- [Tailwind CSS](https://tailwindcss.com/) - 유틸리티 퍼스트 CSS 프레임워크
- [Supabase](https://supabase.com/) - 오픈소스 Firebase 대안
- [OpenWeatherMap](https://openweathermap.org/) - 날씨 데이터 제공
- [Korean Advice Open API](https://github.com/hshine1226/korean-advice-open-api) - 한국어 명언 API

---

⭐️ 이 프로젝트가 도움이 되셨다면 Star를 눌러주세요!
