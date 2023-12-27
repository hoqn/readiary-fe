# Readiary Web Front-end

- 프로젝트: [소개](https://github.com/relaxed-mind/book-diary)

- (FE) 블로그 글: [프로젝트 블로그 소개 글](https://hoqn.dev/works/readiary)

### Folder Structure

```
src/
 ├─ @types/
 ├─ app/
 ├─ components/
    ├─ ui/
    ├─ common/
    ├─ pages/
      ├─ /
      ├─ book/
      ├─ search/
 ├─ styles/
 │  ├─ base/
 │  ├─ lib/
 │  ├─ theme/
 ├─ stores/
 ├─ services/
 ├─ utils/
```

### Routing

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
