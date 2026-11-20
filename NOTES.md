# Working notes

## Who the lessons are for
The learner in this workspace is Andy's students, not Andy. Lessons speak to a first-semester graduate data science student. The "ask your teacher" reminder in each lesson therefore points to instructor, classmates, or an AI assistant.

## Decisions Andy made (2026-11-20)
- Setting: scripts and plain projects first (lessons 1 to 4), package workflow last (lesson 5).
- Examples: data-cleaning helpers (`rescale01()`, `clean_names()`, `parse_money()`, `summarise_by()`).
- Repo: public, `acatlin/r-unit-testing`, GitHub Pages from `main` (root). Always push everything to `main`.
- Students write tests by hand.
- Each page has a short multiple-choice quiz.
- The course will be extended once these five lessons are working.

## Conventions
- Every lesson links `assets/course.css` and `assets/course.js`; no page-specific CSS or JS.
- Lesson files: `lessons/000N-dash-case.html`. Each has: eyebrow, h1, lede, "By the end you can", warm-up quiz on the previous lesson (from lesson 2), teaching sections with margin citations, "Try it", "Check yourself" quiz, primary source box, ask box, pager.
- Quiz options: exactly four, one `data-correct`, equal word counts, similar character lengths. `python tools/check_site.py` enforces this and checks links.
- Glossary terms (`reference/glossary.html`) are used in one sense everywhere. Add new terms there first.
- All output shown is real. Capture with `reporter = "progress"` and strip spinner lines. Note the versions in the page colophon.
- Example code lives in `examples/` and is run by `tools/run_examples.R` (also in CI).
- New lessons: add to the nav in every page header, to `index.html`, and to the cheat sheet.

## Ideas for the extension
- Snapshot tests (`expect_snapshot()`) for printed output and error messages.
- Helper files, fixtures, and `withr` for clean-up.
- Skipping (`skip_if_not_installed()`, `skip_on_cran()`).
- Coverage with covr.
- Running tests on GitHub Actions.
- Testing data, not just functions (validation with pointblank or assertr) as a contrast.
