/* THE DRAMA / GUEST TEST — no build step required */

(function () {
  "use strict";

  const config = window.DRAMA_CONFIG;
  const order = ["emma", "charlie", "rachel", "mike"];
  const app = document.getElementById("app");
  let screen = "landing";
  let questionIndex = 0;
  let scores = blankScores();
  let shareComplete = false;

  applyConfig();
  loadSharedResult();
  render();

  app.addEventListener("click", function (event) {
    const clicked = event.target instanceof Element ? event.target.closest("[data-action]") : null;
    if (!clicked) return;

    const action = clicked.dataset.action;
    if (action === "start") startTest();
    if (action === "back") {
      screen = "landing";
      render();
      scrollToTop();
    }
    if (action === "answer") chooseAnswer(clicked.dataset.target);
    if (action === "share") shareResult();
    if (action === "download-frame") downloadFrame(resultFor().primaryKey);
    if (action === "retry") startTest();
  });

  function blankScores() {
    return { emma: 0, charlie: 0, rachel: 0, mike: 0 };
  }

  function applyConfig() {
    const root = document.documentElement;
    const cssNames = {
      night: "--night",
      paper: "--paper",
      paperMuted: "--paper-muted",
      rose: "--rose",
      lineDark: "--line-dark",
    };

    Object.keys(cssNames).forEach(function (key) {
      if (config.theme[key]) root.style.setProperty(cssNames[key], config.theme[key]);
    });

    root.style.setProperty("--font-korean", config.fonts.korean);
    root.style.setProperty("--font-english", config.fonts.english);
    root.style.setProperty("--font-display", config.fonts.display);
  }

  function loadSharedResult() {
    const encoded = new URLSearchParams(window.location.search).get("scores");
    if (!encoded) return;

    try {
      const parsed = JSON.parse(decodeURIComponent(atob(encoded)));
      if (order.every(function (key) { return typeof parsed[key] === "number"; })) {
        scores = parsed;
        screen = "result";
      }
    } catch (error) {
      // Ignore malformed shared links and show the landing page.
    }
  }

  function encodeScores(value) {
    return btoa(encodeURIComponent(JSON.stringify(value)));
  }

  function resultFor() {
    const total = order.reduce(function (sum, key) { return sum + scores[key]; }, 0);
    const sorted = order.slice().sort(function (a, b) {
      return scores[b] - scores[a] || order.indexOf(a) - order.indexOf(b);
    });
    const percentages = {};

    order.forEach(function (key) {
      percentages[key] = total ? Math.round((scores[key] / total) * 100) : 25;
    });

    return { primaryKey: sorted[0], percentages: percentages };
  }

  function startTest() {
    scores = blankScores();
    questionIndex = 0;
    shareComplete = false;
    screen = "quiz";
    window.history.replaceState({}, "", window.location.pathname);
    render();
    scrollToTop();
  }

  function chooseAnswer(target) {
    if (!config.characters[target]) return;

    scores[target] += 3;
    if (questionIndex === config.questions.length - 1) {
      screen = "result";
    } else {
      questionIndex += 1;
    }

    render();
    scrollToTop();
  }

  function render() {
    if (screen === "landing") app.innerHTML = renderLanding();
    if (screen === "quiz") app.innerHTML = renderQuiz();
    if (screen === "result") app.innerHTML = renderResult();
  }

  function renderLanding() {
    const landing = config.landing;

    return `
      <section class="screen screen-landing">
        <header class="topbar">
          <div class="wordmark">THE DRAMA</div>
          <p class="corner-note">GUEST TEST / 01</p>
        </header>

        <div class="landing-content">
          <div class="landing-intro">
            <p class="eyebrow">${escapeHtml(landing.eyebrow)}</p>
            <p class="title-note">THE WEDDING OF</p>
            <p class="names">${escapeHtml(landing.namesLeft)} <span>${escapeHtml(landing.namesJoin)}</span> ${escapeHtml(landing.namesRight)}</p>
            ${imageSlot(config.images && config.images.landing, landing.namesLeft + " and " + landing.namesRight, "landing-image")}
          </div>

          <div class="landing-copy">
            <p class="eyebrow">${escapeHtml(landing.titleEyebrow)}</p>
            <h1 class="landing-title"><span class="title-line">${escapeHtml(landing.titleLine)}</span><br /><span class="title-line"><em>${escapeHtml(landing.titleAccent)}${escapeHtml(landing.titleEnd)}</em></span></h1>
            <p class="lede">${escapeHtml(landing.ledeLine1)}<br />${escapeHtml(landing.ledeLine2)}</p>
            <button class="primary-button" type="button" data-action="start">${escapeHtml(landing.button)} <span aria-hidden="true">↗</span></button>
            <p class="microcopy">${escapeHtml(landing.microcopy)}</p>
          </div>
        </div>

        <div class="landing-strip" aria-label="테스트 결과 캐릭터 미리보기">
          ${order.map(function (key, index) {
            const character = config.characters[key];
            return `<div class="mini-card" style="--card-accent:${character.accent}">
              <span>${String(index + 1).padStart(2, "0")}</span>
              <strong>${escapeHtml(character.english)}</strong>
              <small>${escapeHtml(character.role)}</small>
            </div>`;
          }).join("")}
        </div>

        ${footer()}
      </section>
    `;
  }

  function renderQuiz() {
    const question = config.questions[questionIndex];
    const progress = ((questionIndex + 1) / config.questions.length) * 100;

    return `
      <section class="screen screen-quiz">
        <header class="quiz-header">
          <button class="text-button" type="button" data-action="back">← 처음으로</button>
          <span class="quiz-count">${String(questionIndex + 1).padStart(2, "0")} / ${String(config.questions.length).padStart(2, "0")}</span>
        </header>
        <div class="progress-track" aria-label="${questionIndex + 1}번째 질문"><span style="width:${progress}%"></span></div>

        <div class="question-wrap">
          <p class="eyebrow">${escapeHtml(question.kicker)}</p>
          <h1>${escapeHtml(question.question)}</h1>
          <p class="question-hint">가장 먼저 떠오른 답을 골라주세요.</p>
          <div class="answer-list">
            ${question.options.map(function (option, index) {
              return `<button class="answer-button" type="button" data-action="answer" data-target="${option.target}">
                <span class="answer-number">${String.fromCharCode(65 + index)}</span>
                <span>${escapeHtml(option.text)}</span>
                <span class="answer-arrow" aria-hidden="true">↗</span>
              </button>`;
            }).join("")}
          </div>
        </div>
        <p class="quiz-footer">정답은 없습니다. 다만, 선택에는 당신의 마음이 남아요.</p>
      </section>
    `;
  }

  function renderResult() {
    const result = resultFor();
    const character = config.characters[result.primaryKey];
    const position = order.indexOf(result.primaryKey) + 1;
    const resultCopy = config.result;

    return `
      <section class="screen screen-result">
        <header class="topbar">
          <div class="wordmark">THE DRAMA</div>
          <p class="corner-note">YOUR GUEST PROFILE / 04</p>
        </header>

        <div class="result-heading">
          <p class="eyebrow">THE GUEST YOU BECAME</p>
          <h1>${escapeHtml(resultCopy.taglineIntro)} <em>${escapeHtml(character.name)}</em>${escapeHtml(resultCopy.taglineOutro)}</h1>
          <p class="result-tagline">${escapeHtml(character.tagline)}</p>
        </div>

        <article class="profile-card" style="--profile-accent:${character.accent}">
          <div class="profile-card-top"><span>${escapeHtml(character.english)}</span><span>NO. 0${position}</span></div>
          ${imageSlot(config.images && config.images.characters && config.images.characters[result.primaryKey], character.name, "profile-image")}
          <div class="profile-symbol${Array.from(character.name).length >= 3 ? " profile-symbol--long" : ""}" aria-hidden="true">${escapeHtml(character.name)}</div>
          <p class="profile-role">${escapeHtml(character.role)}</p>
          <p class="profile-description">${escapeHtml(character.description)}</p>
        </article>

        <section class="score-section">
          <div class="section-label"><span>YOUR MIX</span><span>01 — 04</span></div>
          <h2>${escapeHtml(resultCopy.mixTitleLine1)}<br />${escapeHtml(resultCopy.mixTitleLine2)}</h2>
          <div class="score-list">
            ${order.map(function (key) {
              const item = config.characters[key];
              return `<div class="score-row">
                <div class="score-label"><span><strong>${escapeHtml(item.name)}</strong> · ${escapeHtml(item.role)}</span><b>${result.percentages[key]}%</b></div>
                <div class="score-bar"><span style="width:${result.percentages[key]}%;background:${item.accent}"></span></div>
              </div>`;
            }).join("")}
          </div>
        </section>

        <section class="frame-section">
          <div class="section-label"><span>MAKE IT A MOMENT</span><span>04 CUTS</span></div>
          <h2>${escapeHtml(resultCopy.frameTitleLine1)}<br />${escapeHtml(resultCopy.frameTitleLine2)}</h2>
          <p class="frame-intro">${escapeHtml(resultCopy.frameIntro)}</p>
          ${framePreview(character)}
          <button class="secondary-button" type="button" data-action="download-frame">네컷 프레임 저장하기 <span aria-hidden="true">↓</span></button>
        </section>

        <section class="result-cta">
          <p class="eyebrow">BUT THERE IS MORE TO THE STORY.</p>
          <p>${escapeHtml(resultCopy.mysteryLine1)}<br /><em>${escapeHtml(resultCopy.mysteryLine2)}</em></p>
          <div class="cta-line"></div>
          <p class="cta-meta">THE DRAMA · IN CINEMAS SOON</p>
        </section>

        <div class="result-actions">
          <button class="primary-button" type="button" data-action="share">${shareComplete ? "링크가 준비됐어요" : "내 결과 공유하기"} <span aria-hidden="true">↗</span></button>
          <button class="text-button retry-button" type="button" data-action="retry">다시 해보기</button>
        </div>
        ${footer()}
      </section>
    `;
  }

  function framePreview(character) {
    return `<div class="frame-preview" style="--frame-accent:${character.accent}">
      <div class="frame-heading"><span>THE DRAMA</span><small>A WEDDING GUEST TEST</small></div>
      <div class="frame-cells">${[1, 2, 3, 4].map(function (number) {
        return `<div class="frame-cell"><span>${String(number).padStart(2, "0")}</span></div>`;
      }).join("")}</div>
      <div class="frame-caption"><strong>${escapeHtml(character.frameLabel)}</strong><span>${escapeHtml(character.frameCopy)}</span></div>
    </div>`;
  }

  function imageSlot(source, fallbackAlt, className) {
    const image = typeof source === "string" ? { src: source, alt: fallbackAlt } : (source || {});
    if (!image.src) return "";
    return `<figure class="${className}"><img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt || fallbackAlt)}" loading="lazy" /></figure>`;
  }

  function footer() {
    return `<footer class="site-footer"><span>THE DRAMA</span><span>COMING SOON</span><span>TEO</span></footer>`;
  }

  async function shareResult() {
    const result = resultFor();
    const character = config.characters[result.primaryKey];
    const url = new URL(window.location.href);
    url.search = "";
    url.searchParams.set("scores", encodeScores(scores));
    const text = `나는 ${character.name}형 하객! ${character.tagline}`;

    try {
      if (navigator.share) {
        await navigator.share({ title: "The Drama | 하객 테스트", text: text, url: url.toString() });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(`${text}\n${url.toString()}`);
      } else {
        window.prompt("아래 링크를 복사해 주세요.", url.toString());
      }
      shareComplete = true;
      render();
    } catch (error) {
      // The user can close a share sheet without completing the action.
    }
  }

  function downloadFrame(key) {
    const character = config.characters[key];
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1440;
    const context = canvas.getContext("2d");
    if (!context) return;

    context.fillStyle = config.theme.paper;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = character.accent;
    context.fillRect(0, 0, canvas.width, 28);
    context.fillStyle = config.theme.night;
    context.textAlign = "center";
    context.font = "600 31px Arial, sans-serif";
    context.fillText("THE DRAMA", canvas.width / 2, 78);
    context.font = "500 18px Arial, sans-serif";
    context.fillText("A WEDDING GUEST TEST", canvas.width / 2, 112);

    const cellWidth = 472;
    const cellHeight = 472;
    const gap = 26;
    const startX = (canvas.width - cellWidth * 2 - gap) / 2;
    const startY = 162;
    for (let index = 0; index < 4; index += 1) {
      const x = startX + (index % 2) * (cellWidth + gap);
      const y = startY + Math.floor(index / 2) * (cellHeight + gap);
      context.fillStyle = index % 2 ? "#e3d7c4" : "#e9dfd0";
      context.fillRect(x, y, cellWidth, cellHeight);
      context.strokeStyle = character.accent;
      context.lineWidth = 5;
      context.strokeRect(x + 12, y + 12, cellWidth - 24, cellHeight - 24);
      context.fillStyle = config.theme.night;
      context.font = "600 74px Arial, sans-serif";
      context.fillText(String(index + 1).padStart(2, "0"), x + cellWidth / 2, y + cellHeight / 2 + 24);
    }

    context.fillStyle = config.theme.night;
    context.font = "700 26px Arial, sans-serif";
    context.fillText(character.frameLabel, canvas.width / 2, 1220);
    context.font = "400 25px Arial, sans-serif";
    context.fillText(character.frameCopy, canvas.width / 2, 1266);
    context.font = "400 16px Arial, sans-serif";
    context.fillText("the drama / guest test", canvas.width / 2, 1340);

    const link = document.createElement("a");
    link.download = `the-drama-${key}-four-cut.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
})();
