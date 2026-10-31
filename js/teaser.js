/* Mirrorwalker — playable teaser
   5 choices, each scored against MBTI axes (E/I, S/N, T/F, J/P).
   Same scoring logic as the full game's choice engine. */

(function () {
  const storyEl = document.getElementById("story");
  const choicesEl = document.getElementById("choices");
  if (!storyEl || !choicesEl) return;

  // score[pole] counters — each axis: first pole is index 0
  const axes = [
    ["E", "I"],
    ["S", "N"],
    ["T", "F"],
    ["J", "P"],
  ];
  let score = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  let step = 0;

  const script = [
    {
      scene: "SCENE 1 · after Higashino — the apartment door closes behind you. The evidence is cleaned, the alibi rehearsed. A detective's knock is only a matter of time.",
      text: "Your neighbour stands in the hallway, trembling. The plan you built for her is airtight — as long as nobody improvises. She whispers: “Maybe we should just tell them the truth.”",
      choices: [
        { label: "Stick to the plan. Every word, every timestamp, exactly as designed.", pts: { J: 1, T: 1 } },
        { label: "Abandon the plan and improvise — feel your way through the interrogation.", pts: { P: 1, S: 1 } },
        { label: "Step forward and take all of it on yourself, before anyone asks.", pts: { F: 1, E: 1 } },
      ],
    },
    {
      scene: "SCENE 2 · after Night City — a ripperdoc offers you a deal: new chrome, new face, and a memory edit that would make the last 48 hours disappear.",
      text: "The procedure is safe, they say. Thousands do it every week. But the memory they would delete is the only proof that tonight ever happened.",
      choices: [
        { label: "Take the deal. Survival first — identity is a luxury.", pts: { T: 1, S: 1 } },
        { label: "Refuse. A painful truth is still yours; a comfortable lie is not.", pts: { F: 1, N: 1 } },
        { label: "Negotiate a third option nobody offered — there is always another angle.", pts: { N: 1, P: 1 } },
      ],
    },
    {
      scene: "SCENE 3 · the crowd on the plaza turns toward you. Cameras you never noticed before pivot in perfect unison. Someone, somewhere, is watching.",
      text: "A stranger slips you a note: “None of this is real. The marina, third sailboat, midnight. Come alone — or bring everyone. Decide what kind of person you are.”",
      choices: [
        { label: "Go alone at midnight. Some doors you have to open by yourself.", pts: { I: 1, J: 1 } },
        { label: "Tell everyone. If the world is a lie, nobody should face the truth alone.", pts: { E: 1, F: 1 } },
        { label: "Spend the day testing the edges of the world first — gather proof before moving.", pts: { S: 1, T: 1 } },
      ],
    },
    {
      scene: "SCENE 4 · the sailboat's bow strikes something solid. A painted sky, torn like paper. Beyond it: a staircase, a door, a voice from a speaker calling your name.",
      text: "The voice is kind. It offers you the life you know — safe, warm, predictable — if you just turn around. The door stands open. It was never locked.",
      choices: [
        { label: "Walk through the door without answering. The unknown is the point.", pts: { P: 1, N: 1 } },
        { label: "Turn and face the camera: thank them for the show, then leave on your own terms.", pts: { E: 1, J: 1 } },
        { label: "Hesitate at the threshold — ask the voice one last question before choosing.", pts: { I: 1, T: 1 } },
      ],
    },
    {
      scene: "FINAL SCENE · the mirror room. Every version of you that the story imagined stands in a circle. The narrator speaks for the first time — in your own voice.",
      text: "“I have been watching how you choose. Not what you say you value — what you actually did. One last choice, and it weighs the most:”",
      choices: [
        { label: "“Break the mirror. I refuse to be profiled, even by you.”", pts: { P: 1, T: 1 } },
        { label: "“Look closely. I want to know what you saw in me.”", pts: { N: 1, I: 1 } },
        { label: "“Turn the mirror outward. Ask it what it learned about itself.”", pts: { E: 1, N: 1 } },
      ],
    },
  ];

  const readings = {
    E: "you reach for others when the world tilts — truth, for you, is something shared or it is nothing",
    I: "you walk inward first — the hardest doors you open alone, in silence",
    S: "you trust what you can touch — evidence before intuition, proof before pattern",
    N: "you look for the pattern behind the evidence — the story behind the story",
    T: "you decide with the knife, not the heart — even when it costs you",
    F: "you decide with the heart, even when the knife would be cleaner",
    J: "you build plans like shelters — and hold them even as they burn",
    P: "you improvise at the edge — a locked door is a question, not an answer",
  };

  function renderStep() {
    const s = script[step];
    const sceneP = document.createElement("p");
    sceneP.className = "scene";
    sceneP.textContent = s.scene;
    storyEl.appendChild(sceneP);
    const textP = document.createElement("p");
    textP.textContent = s.text;
    storyEl.appendChild(textP);

    choicesEl.innerHTML = "";
    s.choices.forEach((c, i) => {
      const btn = document.createElement("button");
      btn.className = "choice-btn";
      btn.innerHTML = '<span class="key">[' + (i + 1) + "]</span>" + c.label;
      btn.addEventListener("click", () => choose(c));
      choicesEl.appendChild(btn);
    });
    scrollBottom();
  }

  function choose(c) {
    interacted = true;
    Object.entries(c.pts).forEach(([k, v]) => (score[k] += v));
    const echo = document.createElement("p");
    echo.className = "echo";
    echo.textContent = "» " + c.label;
    storyEl.appendChild(echo);
    choicesEl.innerHTML = "";
    step++;
    if (step < script.length) {
      setTimeout(renderStep, 350);
    } else {
      setTimeout(renderResult, 500);
    }
    scrollBottom();
  }

  function renderResult() {
    const type = axes
      .map(([a, b]) => (score[a] >= score[b] ? a : b))
      .join("");
    const strong = axes.map(([a, b]) => (score[a] >= score[b] ? a : b));

    const sceneP = document.createElement("p");
    sceneP.className = "scene";
    sceneP.textContent = "— THE MIRROR ANSWERS —";
    storyEl.appendChild(sceneP);

    const box = document.createElement("div");
    box.className = "result-box";
    box.innerHTML =
      "<h4>PROFILE READ · " + type + "</h4>" +
      "<p>Five choices. The mirror saw this:</p>" +
      strong
        .map((p) => "<p>· <strong>" + p + "</strong> — " + readings[p] + ".</p>")
        .join("") +
      '<p style="margin-top:12px;color:#8b93b8">In the full game, this profile would now rewrite the narrator itself — dialogue, allies, and which of the endings you are offered. Two players rarely walk the same story.</p>';
    storyEl.appendChild(box);

    const again = document.createElement("button");
    again.className = "choice-btn";
    again.innerHTML = '<span class="key">[↻]</span>Walk the mirror again';
    again.addEventListener("click", reset);
    choicesEl.appendChild(again);
    scrollBottom();
  }

  function reset() {
    score = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    step = 0;
    storyEl.innerHTML = "";
    renderStep();
  }

  let interacted = false;

  function scrollBottom() {
    if (!interacted) return;
    const t = document.getElementById("terminal");
    if (t) t.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  renderStep();
})();
