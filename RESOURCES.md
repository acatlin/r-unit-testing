# Unit Testing in R Resources

All entries below were fetched and read on 2026-11-20 unless marked otherwise.

## Knowledge

- [Book: _R Packages_ (2e) by Hadley Wickham and Jennifer Bryan, ch. 13 "Testing basics"](https://r-pkgs.org/testing-basics.html)
  The primary source for the course, by the authors of testthat. Use for: why test (four benefits), the expectation → test → file hierarchy, file naming, `expect_equal()` vs `expect_identical()`, `expect_error()`, running tests, keyboard shortcuts.
- [Book: _R Packages_ (2e), ch. 14 "Designing your test suite"](https://r-pkgs.org/testing-design.html)
  Use for: what to test, self-contained tests, "always write a test when you discover a bug", one behaviour per test, coverage, helper and setup files.
- [Book: _R Packages_ (2e), ch. 1 "The Whole Game"](https://r-pkgs.org/whole-game.html)
  Builds a package with tests end to end. Use for: `create_package()`, `use_r()`, `use_testthat()`, `use_test()`, `load_all()`, `test()`, `check()`, `use_package()`.
- [Book: _R Packages_ (2e), ch. 11 "Dependencies: In Practice"](https://r-pkgs.org/dependencies-in-practice.html)
  Use for: `package::function()` in package code, Imports vs Suggests, not attaching dependencies in tests.
- [Docs: testthat home](https://testthat.r-lib.org/) and [function reference](https://testthat.r-lib.org/reference/index.html)
  Use for: exact signatures and the full list of expectations. Website documents 3.3.2 (the version used to run all course code).
- [Docs: testthat "Special files"](https://testthat.r-lib.org/articles/special-files.html)
  Use for: the exact test-file naming rule (`test-` or `test_`, `.r` or `.R`), helper files, setup files, `_snaps/`.
- [Docs: "testthat 3e"](https://testthat.r-lib.org/articles/third-edition.html) and [`local_edition()`](https://testthat.r-lib.org/reference/local_edition.html)
  Use for: what the third edition changes and how to switch it on in and out of a package.
- Reference pages used for individual expectations:
  [equality](https://testthat.r-lib.org/reference/equality-expectations.html),
  [logical](https://testthat.r-lib.org/reference/logical-expectations.html),
  [`expect_error()` and friends](https://testthat.r-lib.org/reference/expect_error.html),
  [`expect_no_error()` and friends](https://testthat.r-lib.org/reference/expect_no_error.html),
  [`test_that()`](https://testthat.r-lib.org/reference/test_that.html),
  [`test_dir()`](https://testthat.r-lib.org/reference/test_dir.html),
  [`test_file()`](https://testthat.r-lib.org/reference/test_file.html),
  [`skip()`](https://testthat.r-lib.org/reference/skip.html).

## Wisdom (Communities)

- [Posit Community forum](https://forum.posit.co/)
  Has a package-development category that names "devtools, roxygen2, testthat, and friends". Use for: judgement questions (how much to test, how to structure tests for an analysis project).
- [testthat issue tracker](https://github.com/r-lib/testthat/issues)
  Use for: checking whether surprising behaviour is a known bug. Read before posting.
- The class itself: instructor and classmates. Use for: comparing edge-case decisions, reviewing each other's tests.

## Gaps

- Stack Overflow's `testthat` tag could not be fetched for verification, so it is not linked from the lessons.
- No source yet for testing analysis scripts and Quarto/R Markdown documents (as opposed to functions). Needed if the extension goes there.
- _R Packages_ ch. 15 ("Advanced testing techniques": fixtures, snapshots, mocking) has not been read yet. Read it before writing extension lessons on those topics.
- No checked source yet for code coverage (covr) or for running tests in GitHub Actions.

## Findings from running the code (not in the docs above)

- Outside a package, testthat defaults to edition 2. `local_edition(3)` as the first line of a test file switches that file to edition 3. At the interactive console it prints a "Setting global deferred event(s)" message and does not affect `test_that()`, so the lessons do not use it at the console.
- `test_dir()` on a folder whose only test file is misnamed stops with "No test files found."; with other valid files present, the misnamed one is skipped silently.
- `expect_error(f())` with no pattern passes when `f` does not exist ("could not find function" is an error).
- When run by an AI agent, testthat 3.3 picks a different reporter. Capture output for lessons with `reporter = "progress"`.
- `testthat_tolerance()` returns 1.490116e-08.
