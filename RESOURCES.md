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
- [Book: _R Packages_ (2e), ch. 13, section 13.5.3 "Snapshot tests"](https://r-pkgs.org/testing-basics.html#sec-snapshot-tests)
  Snapshot tests are in ch. 13, not ch. 15. Use for: `expect_snapshot()`, the `tests/testthat/_snaps/` folder, `snapshot_review()` and `snapshot_accept()`, and the fact that snapshots are only compared in non-interactive runs.
- [Book: _R Packages_ (2e), ch. 14, sections 14.1.1, 14.2.2 and 14.3.3 to 14.3.7](https://r-pkgs.org/testing-design.html)
  Use for (extension): test coverage and `devtools::test_coverage()` ([14.1.1](https://r-pkgs.org/testing-design.html#sec-testing-design-coverage)); withr `local_*()` functions in self-contained tests ([14.2.2](https://r-pkgs.org/testing-design.html#sec-testing-design-self-contained)); helper files ([14.3.3](https://r-pkgs.org/testing-design.html#testthat-helper-files)); setup files (14.3.4); test data and `test_path()` ([14.3.6](https://r-pkgs.org/testing-design.html#storing-test-data)); writing only to the session temp directory ([14.3.7](https://r-pkgs.org/testing-design.html#sec-tests-files-where-write)).
- [Book: _R Packages_ (2e), ch. 15 "Advanced testing techniques"](https://r-pkgs.org/testing-advanced.html)
  Use for: test fixtures with helper functions, `withr::defer()` and `local_*()` functions, and stored fixture files ([15.1](https://r-pkgs.org/testing-advanced.html#test-fixtures)); skipping with `skip()`, `skip_if()`, `skip_if_not_installed()`, `skip_on_cran()`, `skip_on_os()` and the dangers of skipping ([15.3.1](https://r-pkgs.org/testing-advanced.html#tests-skipping)); mocking, with the advice "avoid it if you can" ([15.3.2](https://r-pkgs.org/testing-advanced.html#mocking)); CRAN constraints on speed, flaky tests and file-system hygiene (15.4).
- [Book: _R Packages_ (2e), ch. 20, section 20.2 "Continuous integration"](https://r-pkgs.org/software-development-practices.html#sec-sw-dev-practices-ci)
  Use for: why to run `R CMD check` on GitHub Actions ("works on my machine"), and what `use_github_action()` adds to a package (`.github/workflows/R-CMD-check.yaml` and a README badge).
- [Docs: covr](https://covr.r-lib.org/) (site documents 4.0.0) with [`package_coverage()`](https://covr.r-lib.org/reference/package_coverage.html), [`file_coverage()`](https://covr.r-lib.org/reference/file_coverage.html) and [`report()`](https://covr.r-lib.org/reference/report.html)
  Use for: measuring coverage of a package, the HTML report, `zero_coverage()`, `# nocov` and `.covrignore` exclusions, and `file_coverage(source_files, test_files)` for plain R files outside a package (pass `runner = testthat::test_file` to use testthat). The site makes no statement about what coverage does not tell you; _R Packages_ 14.1.1 is the source for interpretation.
- [Docs: `usethis::use_github_action()`](https://usethis.r-lib.org/reference/use_github_action.html) (usethis 3.2.2) and [r-lib/actions](https://github.com/r-lib/actions) with its [example workflows](https://github.com/r-lib/actions/tree/v2-branch/examples)
  Use for: the `check-standard` workflow (R CMD check on Linux, macOS and Windows with release R, plus devel and oldrel on Linux) and the `test-coverage` workflow (covr, uploaded to Codecov); the `push` and `pull_request` triggers; the `setup-r`, `setup-r-dependencies` and `check-r-package` actions at the `v2` tag. All of these assume a package.
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
- No source describes running testthat tests on GitHub Actions for a plain project that is not a package. usethis, r-lib/actions and _R Packages_ all assume a package, so a CI lesson should build on the Lesson 5 package.
- The covr reference pages for exclusions and `zero_coverage()`, and testthat's own snapshot article, have not been read. Read them before writing those lessons.
- No source yet for the limits of coverage beyond "100% is rarely achieved in practice and that's often OK" (_R Packages_ 14.1.1).

## Findings from running the code (not in the docs above)

- Outside a package, testthat defaults to edition 2. `local_edition(3)` as the first line of a test file switches that file to edition 3. At the interactive console it prints a "Setting global deferred event(s)" message and does not affect `test_that()`, so the lessons do not use it at the console.
- `test_dir()` on a folder whose only test file is misnamed stops with "No test files found."; with other valid files present, the misnamed one is skipped silently.
- `expect_error(f())` with no pattern passes when `f` does not exist ("could not find function" is an error).
- When run by an AI agent, testthat 3.3 picks a different reporter. Capture output for lessons with `reporter = "progress"`.
- `testthat_tolerance()` returns 1.490116e-08.
