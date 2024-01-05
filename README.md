# Readiary Web Front-end

- 프로젝트: [메인 페이지](https://github.com/relaxed-mind/book-diary)
- (FE) 블로그 글: [프로젝트 블로그 소개 글](https://hoqn.dev/works/readiary)

### 스택

`TypeScript` `React` `Next.js` `Sass` `CSS Modules` `Tanstack React Query`

### Folder Structure

```
src/
 ├─ @types/
 ├─ app/
 ├─ components/
 │  ├─ common/
 │  ├─ layouts/
 │  ├─ ui/
 │  ├─ pages/
 ├─ services/
 ├─ stores/
 ├─ styles/
 │  ├─ base/
 │  ├─ lib/
 │  ├─ theme/
 ├─ types/
 ├─ utils/
```

### Routing

- 인증
  - `/signin`
  - `/signout`
  - `/signup`
- 메인
  - `/home`
  - `/search`
  - `/library`
- 사용자 정보
  - `/profile`
- 책 검색 정보
  - `/book/{isbn}`
- 읽은 책 정보
  - `/library/book`
  - `/library/book/{isbn}`
- 스크랩 및 메모 정보
  - `/library/scrap`
  - `/library/scrap/{scrapId}`
- 생성된 질문 정보
  - `/library/question`
  - `/library/question/b/{isbn}`
- (생성) 그림 생성
  - `/generate/image`
- (생성) 질문 생성
  - `/generate/question`
