# The Drama / Guest Test

〈더 드라마〉 모바일 하객 성향 테스트의 GitHub Pages용 독립형 버전입니다.

## 파일 구조

- `index.html` — 실제 테스트 페이지
- `site-config.js` — 문구·색상·폰트·캐릭터·문항을 수정하는 설정 파일
- `styles.css` — 전체 UI 스타일
- `script.js` — 테스트·결과 공유·네컷 저장 기능
- `editor.html` — 브라우저에서 색상·폰트·첫 화면 문구를 수정하는 간단 UI 에디터
- `image-manager.html` — 사진을 직접 선택해 설정 파일에 연결하는 이미지 업로더
- `assets/og.png` — SNS 공유 미리보기 카드

## GitHub Pages에 올리기

1. 이 폴더 안의 파일 전체를 새 GitHub repository에 업로드합니다.
2. GitHub repository의 `Settings → Pages`로 이동합니다.
3. `Deploy from a branch`를 선택하고 `main` 브랜치와 `/ (root)`를 저장합니다.
4. 잠시 후 생성된 GitHub Pages 주소에서 `index.html`이 열립니다.

## Figma·Canva처럼 수정하기

`editor.html`을 더블클릭해 열면 왼쪽 패널에서 색상, 폰트, 이름, 첫 화면 문구를 바꿀 수 있습니다. 사진은 `image-manager.html`을 열어 직접 선택하면 됩니다.

수정 후 `설정 파일 다운로드`를 누르고, 다운로드된 `site-config.js`를 기존 파일과 교체한 다음 GitHub에 다시 올리면 됩니다.

문항과 캐릭터 설명까지 바꾸려면 `site-config.js`의 `characters`와 `questions` 부분을 수정하면 됩니다. 별도 서버나 데이터베이스는 필요하지 않습니다.

## 이미지 넣기

1. 사진 파일을 `assets` 폴더에 넣습니다. 예를 들어 `assets/emma.jpg`처럼 저장합니다.
2. `site-config.js`의 `images` 부분에 경로를 적습니다.

```js
images: {
  landing: {
    src: "assets/wedding.jpg",
    alt: "결혼식 장면",
  },
  characters: {
    emma: "assets/emma.jpg",
    charlie: "assets/charlie.jpg",
    rachel: "",
    mike: "",
  },
}
```

`editor.html`의 이미지 입력칸에서 경로를 미리 확인할 수도 있습니다. 메인 문장은 첫 줄과 둘째 줄이 코드에서 고정되어 있어 화면 폭 때문에 중간에서 끊기지 않습니다.

## 폰트

- 초반 한국어 헤드라인: `Pretendard`
- UI와 일반 영문: `Han Sans Neo`
- `EMMA & CHARLIE` 이름 표시: 첨부 레퍼런스처럼 세리프 계열 유지

Pretendard는 페이지에서 웹폰트로 불러오도록 설정했습니다. Han Sans Neo를 모든 방문자에게 동일하게 보이게 하려면 사용 권한이 있는 `.woff2` 파일을 `fonts` 폴더에 넣고 `styles.css`의 `@font-face`를 추가하면 됩니다. 자세한 예시는 `fonts/README.md`를 확인하세요.
