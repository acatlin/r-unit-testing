# Unit Testing in R

A short course that teaches first-semester graduate data science students to write unit tests by hand with [testthat](https://testthat.r-lib.org/).

**Read it here: https://acatlin.github.io/r-unit-testing/**

## Lessons

1. [Your first expectation](https://acatlin.github.io/r-unit-testing/lessons/0001-first-expectation.html)
2. [`test_that()` and test files](https://acatlin.github.io/r-unit-testing/lessons/0002-test-that-and-test-files.html)
3. [Choosing the right expectation](https://acatlin.github.io/r-unit-testing/lessons/0003-choosing-expectations.html)
4. [Edge cases, errors and bugs](https://acatlin.github.io/r-unit-testing/lessons/0004-edge-cases-errors-and-bugs.html)
5. [From project to package](https://acatlin.github.io/r-unit-testing/lessons/0005-from-project-to-package.html)

Reference: [cheat sheet](https://acatlin.github.io/r-unit-testing/reference/cheat-sheet.html) · [glossary](https://acatlin.github.io/r-unit-testing/reference/glossary.html) · [mastery objectives](https://acatlin.github.io/r-unit-testing/reference/mastery-objectives.html)

## What is in this repository

| Path | What it is |
|---|---|
| `index.html` | Course home page |
| `lessons/` | One HTML page per lesson, each with a quiz |
| `reference/` | Printable cheat sheet, glossary, and the student checklist of mastery objectives |
| `OBJECTIVES.md` | Instructor view of the mastery objectives: the evidence for each one, the gaps, and the objectives for lessons not yet written |
| `assets/` | Shared stylesheet and script (code colouring, quizzes) used by every page |
| `examples/cleaning-project-starter/` | The project students begin with in Lesson 2 |
| `examples/cleaning-project/` | The same project after Lesson 4 |
| `examples/cleaner/` | The package built in Lesson 5 |
| `tools/` | Checks run locally and in CI |
| `MISSION.md`, `RESOURCES.md`, `NOTES.md`, `learning-records/` | Course design notes and sources |

The site is plain static HTML served by GitHub Pages from the root of `main`. There is no build step.

## Checking changes

```sh
python tools/check_site.py      # quiz rules and internal links
Rscript tools/run_examples.R    # runs every example's tests (needs testthat, dplyr, tibble, pkgload)
```

Both run on every push in GitHub Actions (`.github/workflows/check.yml`).

Quiz rules enforced by the checker: four options per question, exactly one correct, and all options the same number of words and of similar length, so the answer cannot be guessed from its shape.

## Sources

The lessons follow Hadley Wickham and Jennifer Bryan, [_R Packages_ (2e)](https://r-pkgs.org/testing-basics.html), and the [testthat documentation](https://testthat.r-lib.org/). All code and output shown was run with R 4.5.3 and testthat 3.3.2. See `RESOURCES.md`.
