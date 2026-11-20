/* Unit Testing in R: shared course behaviour.
   1. R syntax colouring + copy buttons for <figure class="code r">.
   2. Multiple-choice quizzes for <section class="quiz" data-quiz="id">.
   3. Progress ticks on the course home page.

   Quiz markup (works without JavaScript too):
     <section class="quiz" data-quiz="lesson-1">
       <ol class="questions">
         <li class="q">
           <p class="stem">Question text</p>
           <ul class="opts">
             <li data-correct>Right answer</li>
             <li>Wrong answer</li>
           </ul>
           <p class="why">Shown after answering.</p>
         </li>
       </ol>
     </section>
*/
(function () {
  "use strict";
  document.documentElement.classList.add("js");

  /* ---------- storage (optional; pages work without it) ---------- */
  var KEY = "r-unit-testing:scores";
  function readScores() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  function saveScore(id, right, total) {
    try {
      var s = readScores();
      s[id] = { right: right, total: total };
      localStorage.setItem(KEY, JSON.stringify(s));
    } catch (e) { /* private mode: ignore */ }
  }

  /* ---------- R highlighting ---------- */
  var KEYWORDS = /^(function|if|else|for|while|return|TRUE|FALSE|NULL|NA|NaN|Inf|library|in)$/;
  function esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function highlightR(src) {
    var re = /(#[^\n]*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\b\d+\.?\d*(?:e[+-]?\d+)?L?\b)|([A-Za-z_.][A-Za-z0-9_.]*)(\s*\()?/g;
    var out = "", last = 0, m;
    while ((m = re.exec(src)) !== null) {
      out += esc(src.slice(last, m.index));
      if (m[1]) out += '<span class="tok-c">' + esc(m[1]) + "</span>";
      else if (m[2]) out += '<span class="tok-s">' + esc(m[2]) + "</span>";
      else if (m[3]) out += '<span class="tok-n">' + esc(m[3]) + "</span>";
      else if (KEYWORDS.test(m[4])) out += '<span class="tok-k">' + esc(m[4]) + "</span>" + esc(m[5] || "");
      else if (m[5]) out += '<span class="tok-f">' + esc(m[4]) + "</span>" + esc(m[5]);
      else out += esc(m[4]);
      last = re.lastIndex;
    }
    return out + esc(src.slice(last));
  }

  function enhanceCode() {
    document.querySelectorAll("figure.code.r").forEach(function (fig) {
      var code = fig.querySelector("pre code");
      if (!code) return;
      var src = code.textContent;
      code.innerHTML = highlightR(src);
      var cap = fig.querySelector("figcaption");
      if (cap && navigator.clipboard) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "copy-btn";
        btn.textContent = "Copy";
        btn.addEventListener("click", function () {
          navigator.clipboard.writeText(src).then(function () {
            btn.textContent = "Copied";
            setTimeout(function () { btn.textContent = "Copy"; }, 1500);
          }, function () { btn.textContent = "Select and copy by hand"; });
        });
        cap.appendChild(btn);
      }
    });
    document.querySelectorAll(".quiz pre.r code").forEach(function (code) {
      code.innerHTML = highlightR(code.textContent);
    });
  }

  /* ---------- quizzes ---------- */
  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function buildQuiz(quiz) {
    var id = quiz.getAttribute("data-quiz");
    var questions = Array.prototype.slice.call(quiz.querySelectorAll(".q"));
    var data = questions.map(function (q) {
      return Array.prototype.map.call(q.querySelectorAll(".opts > li"), function (li) {
        return { html: li.innerHTML, correct: li.hasAttribute("data-correct") };
      });
    });
    var tally = document.createElement("div");
    tally.className = "tally";
    tally.setAttribute("aria-live", "polite");
    var status = document.createElement("span");
    var again = document.createElement("button");
    again.type = "button";
    again.textContent = "Try again, reshuffled";
    tally.appendChild(status);
    tally.appendChild(again);
    quiz.appendChild(tally);

    var right, answered;

    function update() {
      if (answered < questions.length) {
        status.textContent = answered + " of " + questions.length + " answered";
        again.hidden = true;
      } else {
        status.textContent = "Score: " + right + " of " + questions.length +
          (right === questions.length ? ". All correct." : ". Reread the explanations, then try again tomorrow.");
        again.hidden = false;
        if (id) saveScore(id, right, questions.length);
      }
    }

    function render() {
      right = 0; answered = 0;
      questions.forEach(function (q, qi) {
        q.classList.remove("answered");
        var why = q.querySelector(".why");
        var old = why && why.querySelector(".verdict");
        if (old) old.remove();
        var ul = q.querySelector(".opts");
        ul.innerHTML = "";
        shuffle(data[qi].slice()).forEach(function (opt, oi) {
          var li = document.createElement("li");
          var b = document.createElement("button");
          b.type = "button";
          b.className = "opt";
          b.innerHTML = '<span class="mark">' + "ABCDEF".charAt(oi) + "</span><span>" + opt.html + "</span>";
          b.addEventListener("click", function () {
            if (q.classList.contains("answered")) return;
            q.classList.add("answered");
            answered++;
            if (opt.correct) right++;
            ul.querySelectorAll("button").forEach(function (other) {
              other.disabled = true;
              if (other._correct) other.classList.add("is-correct");
            });
            if (!opt.correct) b.classList.add("is-wrong");
            if (why) {
              var v = document.createElement("span");
              v.className = "verdict " + (opt.correct ? "good" : "bad");
              v.textContent = opt.correct ? "Correct." : "Not quite.";
              why.insertBefore(v, why.firstChild);
            }
            update();
          });
          b._correct = opt.correct;
          li.appendChild(b);
          ul.appendChild(li);
        });
      });
      update();
    }

    again.addEventListener("click", function () {
      render();
      quiz.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    render();
  }

  /* ---------- home page progress ---------- */
  function showProgress() {
    var scores = readScores();
    document.querySelectorAll("[data-progress]").forEach(function (el) {
      var s = scores[el.getAttribute("data-progress")];
      if (!s) return;
      var tag = document.createElement("span");
      tag.className = "done";
      tag.textContent = "quiz " + s.right + "/" + s.total;
      el.appendChild(tag);
    });
  }

  function init() {
    enhanceCode();
    document.querySelectorAll(".quiz").forEach(buildQuiz);
    showProgress();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
