"""Checks every HTML page of the course. Run from the repo root:

    python tools/check_site.py

It fails (exit code 1) when:
  * a quiz question does not have exactly one correct option,
  * the options of a quiz question differ in word count
    (so the right answer cannot be guessed from its length),
  * a relative link points at a file or #anchor that does not exist,
  * a page does not link the shared stylesheet and script.
"""
from __future__ import annotations

import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urldefrag

ROOT = Path(__file__).resolve().parent.parent
VOID = {"meta", "link", "br", "hr", "img", "input"}


class Page(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.ids: set[str] = set()
        self.links: list[str] = []
        self.assets: list[str] = []
        self.questions: list[dict] = []
        self._stack: list[tuple[str, dict]] = []
        self._q: dict | None = None
        self._opt: dict | None = None
        self._stem: list[str] | None = None

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if "id" in a:
            self.ids.add(a["id"])
        if tag == "a" and a.get("href"):
            self.links.append(a["href"])
        if tag == "link" and a.get("href"):
            self.assets.append(a["href"])
        if tag == "script" and a.get("src"):
            self.assets.append(a["src"])
        classes = (a.get("class") or "").split()
        if tag == "li" and "q" in classes:
            self._q = {"stem": "", "opts": []}
            self.questions.append(self._q)
        elif tag == "p" and "stem" in classes and self._q is not None:
            self._stem = []
        elif tag == "li" and self._q is not None and self._in("ul", "opts"):
            self._opt = {"text": "", "correct": "data-correct" in a}
            self._q["opts"].append(self._opt)
        if tag not in VOID:
            self._stack.append((tag, a))

    def handle_endtag(self, tag):
        if tag == "li" and self._opt is not None:
            self._opt = None
        elif tag == "li" and self._q is not None and not self._in("ul", "opts"):
            self._q = None
        if tag == "p" and self._stem is not None:
            self._q["stem"] = " ".join("".join(self._stem).split())
            self._stem = None
        for i in range(len(self._stack) - 1, -1, -1):
            if self._stack[i][0] == tag:
                del self._stack[i:]
                break

    def handle_data(self, data):
        if self._opt is not None:
            self._opt["text"] += data
        if self._stem is not None:
            self._stem.append(data)

    def _in(self, tag, cls):
        return any(t == tag and cls in (a.get("class") or "").split() for t, a in self._stack)


def main() -> int:
    pages = {}
    for path in sorted(ROOT.rglob("*.html")):
        if ".git" in path.parts:
            continue
        p = Page()
        p.feed(path.read_text(encoding="utf-8"))
        pages[path.resolve()] = p

    errors: list[str] = []
    n_questions = 0
    for path, p in pages.items():
        rel = path.relative_to(ROOT).as_posix()
        if not any(a.endswith("assets/course.css") for a in p.assets):
            errors.append(f"{rel}: does not link assets/course.css")
        if not any(a.endswith("assets/course.js") for a in p.assets):
            errors.append(f"{rel}: does not load assets/course.js")
        for a in p.assets:
            if not (path.parent / a).resolve().exists():
                errors.append(f"{rel}: missing asset {a}")

        for href in p.links:
            if href.startswith(("http://", "https://", "mailto:")):
                continue
            target, frag = urldefrag(href)
            dest = (path.parent / unquote(target)).resolve() if target else path
            if not dest.exists():
                errors.append(f"{rel}: broken link {href}")
            elif frag and dest in pages and frag not in pages[dest].ids:
                errors.append(f"{rel}: missing anchor {href}")

        for i, q in enumerate(p.questions, 1):
            n_questions += 1
            where = f"{rel}: question {i} ({q['stem'][:50]}...)"
            texts = [" ".join(o["text"].split()) for o in q["opts"]]
            if len(texts) != 4:
                errors.append(f"{where}: has {len(texts)} options, expected 4")
            if sum(o["correct"] for o in q["opts"]) != 1:
                errors.append(f"{where}: needs exactly one data-correct option")
            counts = [len(t.split()) for t in texts]
            if len(set(counts)) > 1:
                errors.append(f"{where}: option word counts differ {counts}")
            if len(set(texts)) != len(texts):
                errors.append(f"{where}: duplicate options")
            lengths = [len(t) for t in texts]
            if lengths and max(lengths) - min(lengths) > 12:
                errors.append(f"{where}: option lengths differ too much {lengths}")

    for e in errors:
        print("ERROR", e)
    print(f"Checked {len(pages)} pages, {n_questions} quiz questions: "
          f"{'OK' if not errors else str(len(errors)) + ' problem(s)'}")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
