/*
  THE DRAMA / GUEST TEST — EDIT THIS FILE
  ----------------------------------------
  This is the easiest place to change the copy, colors, fonts, characters,
  and questions. Save the file, refresh index.html, and the site updates.
*/

window.DRAMA_CONFIG = {
  fonts: {
    korean: '"Pretendard", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif',
    english: '"Han Sans Neo", "Helvetica Neue", Arial, sans-serif',
    display: '"Bodoni Moda", "Times New Roman", Georgia, serif',
  },

  theme: {
    night: "#11131a",
    paper: "#f3eadc",
    paperMuted: "#d9cfbf",
    rose: "#d88678",
    lineDark: "rgba(243, 234, 220, 0.22)",
  },

  landing: {
    eyebrow: "A24 PRESENTS",
    namesLeft: "EMMA",
    namesJoin: "&",
    namesRight: "CHARLIE",
    titleEyebrow: "THE QUESTION IS NOT WHO IS RIGHT.",
    titleLine: "당신은 이 결혼식에서",
    titleAccent: "누구의 편",
    titleEnd: "입니까?",
    ledeLine1: "사랑, 비밀, 용서에 관한 8개의 질문.",
    ledeLine2: "당신이 끝까지 지키고 싶은 마음을 알아보세요.",
    button: "하객 테스트 시작하기",
    microcopy: "약 2분 · 정답 없음 · 결과 공유 가능",
  },

  /*
    이미지 넣는 곳
    1) 사진 파일을 assets 폴더에 넣고
    2) 아래 src에 파일 경로를 적습니다. 예: "assets/emma.jpg"
    비워두면 해당 이미지 영역은 화면에 나타나지 않습니다.
  */
  images: {
    landing: {
      src: "",
      alt: "더 드라마 메인 이미지",
    },
    characters: {
      emma: "",
      charlie: "",
      rachel: "",
      mike: "",
    },
  },

  result: {
    taglineIntro: "당신은",
    taglineOutro: "에 가까운 하객이에요.",
    mixTitleLine1: "당신 안에는",
    mixTitleLine2: "이런 마음들이 있어요.",
    frameTitleLine1: "이제, 당신의 포즈를",
    frameTitleLine2: "남겨보세요.",
    frameIntro: "친구와 함께 포즈를 따라하고 결과를 공유해보세요.",
    mysteryLine1: "이 사람들에게는 아직,",
    mysteryLine2: "서로에게 말하지 않은 이야기가 있습니다.",
  },

  characters: {
    emma: {
      name: "엠마",
      english: "EMMA",
      role: "현재를 믿는 사람",
      tagline: "사랑은 변한 뒤의 모습으로 증명된다고 믿어요.",
      description: "지난 일보다 지금 이 순간의 마음을 더 오래 바라보는 사람. 다정함을 선택하는 데 망설임이 없지만, 믿고 싶은 마음이 때로는 가장 큰 질문이 되기도 해요.",
      frameLabel: "THE ONE WHO STAYS",
      frameCopy: "오늘의 우리를 믿는 하객",
      accent: "#d88678",
    },
    charlie: {
      name: "찰리",
      english: "CHARLIE",
      role: "진실을 마주하는 사람",
      tagline: "진심이라면, 결국 모든 이야기를 건너야 한다고 믿어요.",
      description: "사랑하는 사람일수록 솔직해야 한다고 생각하는 사람. 불편한 진실을 피하지 않는 용기가 관계를 앞으로 데려간다고 믿어요.",
      frameLabel: "THE ONE WHO TELLS",
      frameCopy: "끝까지 진실을 묻는 하객",
      accent: "#b9a5dc",
    },
    rachel: {
      name: "레이첼",
      english: "RACHEL",
      role: "책임을 묻는 사람",
      tagline: "용서보다 먼저 필요한 건, 무엇을 했는지 아는 일.",
      description: "누군가를 쉽게 단정하지 않지만, 책임까지 대신 덮어주지는 않는 사람. 상처 입은 마음의 편에 서서 관계의 경계를 선명하게 그어요.",
      frameLabel: "THE ONE WHO KNOWS",
      frameCopy: "상처의 이름을 아는 하객",
      accent: "#dfbb70",
    },
    mike: {
      name: "마이크",
      english: "MIKE",
      role: "시간을 믿는 사람",
      tagline: "정답을 서두르지 않아도, 마음은 언젠가 말할 수 있어요.",
      description: "한 발짝 물러나 모두의 마음을 살피는 사람. 당장 결론을 내리기보다, 각자가 자기 언어를 찾을 때까지 곁을 지켜줘요.",
      frameLabel: "THE ONE WHO WAITS",
      frameCopy: "말할 때를 기다리는 하객",
      accent: "#8eb8b1",
    },
  },

  questions: [
    {
      kicker: "01 / 마음의 기준",
      question: "누군가의 과거를 알게 됐다면, 가장 먼저 보게 되는 건?",
      options: [
        { text: "지금 그 사람이 어떤 사람이 되었는지", target: "emma" },
        { text: "그 일이 처음부터 어떻게 시작됐는지", target: "charlie" },
        { text: "그 일로 누가 어떤 상처를 입었는지", target: "rachel" },
        { text: "이 이야기를 언제, 어떻게 꺼낼 수 있을지", target: "mike" },
      ],
    },
    {
      kicker: "02 / 갑작스러운 고백",
      question: "친구가 ‘너에게 말하지 못한 게 있어’라고 한다면?",
      options: [
        { text: "일단 말할 수 있을 때까지 조용히 듣는다", target: "emma" },
        { text: "무슨 일인지 처음부터 자세히 묻는다", target: "charlie" },
        { text: "그 일로 영향을 받은 사람이 있는지 확인한다", target: "rachel" },
        { text: "오늘 말하기 괜찮은 상태인지 먼저 살핀다", target: "mike" },
      ],
    },
    {
      kicker: "03 / 용서의 조건",
      question: "당신에게 용서가 시작되는 순간은 언제인가요?",
      options: [
        { text: "그 사람이 지금은 달라졌다는 게 보일 때", target: "emma" },
        { text: "숨기지 않고 진실을 전부 말했을 때", target: "charlie" },
        { text: "무엇을 잘못했는지 스스로 책임질 때", target: "rachel" },
        { text: "서로의 감정을 말할 시간을 충분히 가졌을 때", target: "mike" },
      ],
    },
    {
      kicker: "04 / 친구의 편",
      question: "친구가 다른 사람의 비밀을 숨기고 있다면?",
      options: [
        { text: "친구가 혼자 감당하지 않도록 곁에 있어준다", target: "emma" },
        { text: "내가 아는 사실이 맞는지 먼저 확인한다", target: "charlie" },
        { text: "비밀 때문에 누군가 다치고 있다면 선을 긋는다", target: "rachel" },
        { text: "당사자들이 직접 대화할 수 있는 자리를 만든다", target: "mike" },
      ],
    },
    {
      kicker: "05 / 말할 타이밍",
      question: "결혼을 앞둔 사람에게 큰 비밀이 있다면, 언제 말해야 할까요?",
      options: [
        { text: "상대가 지금의 나를 판단할 수 있도록", target: "emma" },
        { text: "처음부터 끝까지 내 입으로 설명할 수 있을 때", target: "charlie" },
        { text: "더 늦기 전에 상처를 줄이는 방향으로", target: "rachel" },
        { text: "두 사람이 모두 들을 준비가 되었을 때", target: "mike" },
      ],
    },
    {
      kicker: "06 / 흔들리는 관계",
      question: "사랑하는 사람과의 관계가 흔들릴 때, 당신의 첫 반응은?",
      options: [
        { text: "상대가 어떤 마음이었을지 생각해본다", target: "emma" },
        { text: "정확히 무슨 일이 있었는지 질문한다", target: "charlie" },
        { text: "내가 받아들일 수 있는 선을 정한다", target: "rachel" },
        { text: "감정이 가라앉을 시간을 갖는다", target: "mike" },
      ],
    },
    {
      kicker: "07 / 변한다는 것",
      question: "사람은 정말 변할 수 있다고 생각하나요?",
      options: [
        { text: "지금의 행동이 달라졌다면, 변할 수 있다", target: "emma" },
        { text: "믿기 전에 왜 변했는지 들어봐야 한다", target: "charlie" },
        { text: "변화와 별개로, 과거의 책임은 남는다", target: "rachel" },
        { text: "변화에는 시간이 필요하니 지켜봐야 한다", target: "mike" },
      ],
    },
    {
      kicker: "08 / 결혼식 전날",
      question: "결혼을 앞둔 사람에게 가장 듣고 싶은 말은?",
      options: [
        { text: "나는 지금의 너를 알고도 여기 있어", target: "emma" },
        { text: "이제는 내가 모든 이야기를 들을게", target: "charlie" },
        { text: "네가 한 일의 무게를 함께 마주하자", target: "rachel" },
        { text: "서두르지 말고 우리답게 이야기하자", target: "mike" },
      ],
    },
  ],
};
