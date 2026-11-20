# Mastery objectives: evidence map and gaps

Instructor-facing. The student-facing checklist is [`reference/mastery-objectives.html`](reference/mastery-objectives.html) ([live page](https://acatlin.github.io/r-unit-testing/reference/mastery-objectives.html)). Keep the objective wording in the two files identical.

## How to read this

- Each objective is one observable "can do" statement with a single mastery criterion. There are no levels.
- Evidence is labelled by kind:
  - **Doing**: a "Try it" step, where the student writes or runs code. "Guided" means the step has the student copy or follow code from the page instead of writing their own.
  - **Recognition**: a multiple-choice quiz question.
- Evidence ids refer to items by position:
  - `L4-T2` is Lesson 4, "Try it" step 2.
  - `L3-Q2` is Lesson 3, "Check yourself" question 2.
  - `L2-W1` is Lesson 2, warm-up question 1.
- The ids exist only in this file and on the student page. The lesson HTML has no matching `id` attributes, so inserting or reordering a step or question changes the ids below.
- Objective numbers are `lesson.sequence`. An objective sits under the lesson that introduces it, even when a later lesson supplies evidence.

Inventory: 19 taught objectives, 17 "Try it" steps, 32 quiz questions (24 "Check yourself", 8 warm-ups). Every step and question is mapped to at least one objective.

## Lesson 1: Your first expectation

| # | Objective (you can…) | Lesson section | Doing | Recognition | Gaps |
|---|---|---|---|---|---|
| 1.1 | Write an `expect_equal()` call that passes, with the function call first and an expected value you worked out yourself second. | Say what you expect | L1-T2, L1-T3 | L1-Q2 | Every task uses `rescale01()`. Nothing asks for a function of the student's own, which the lesson's "By the end you can" promises. |
| 1.2 | Tell a pass from a failure at the console and, from a failure message, say which element disagrees and whether the function or the expected value is wrong. | Say what you expect; Watch one fail | L1-T3, L1-T4 | L1-Q1, L2-W1 | No question asks the student to read a failure message. |
| 1.3 | Choose between `expect_equal()` and `expect_identical()` and predict which one passes, for floating-point noise and for integer versus double. | Equal is not the same as identical (L1); The working set (L3) | L3-T2 | L1-Q3, L2-W2, L3-Q2 | No doing evidence for the floating-point case; L3-T2 covers only integer versus double. |
| 1.4 | Explain what a written test gives you that a look at console output does not, and what it does not guarantee. | The check that disappears | none | L1-Q4 | Recognition only. |

## Lesson 2: `test_that()` and test files

| # | Objective (you can…) | Lesson section | Doing | Recognition | Gaps |
|---|---|---|---|---|---|
| 2.1 | Write a `test_that()` block about one behaviour, with a description that says what the function should do. | Group expectations into a test (L2); One behaviour per test (L4) | L3-T3, L4-T2, L4-T3 | L2-Q1 | No Lesson 2 step has the student write a new test; L2-T3 only adds an expectation. No question covers one behaviour per test or the quality of a description. |
| 2.2 | Lay out a plain project with `R/` and `tests/testthat/`, and create a test file that testthat will find and that starts with `local_edition(3)`. | Give tests a home; The test file | L2-T1 (guided), L2-T4 | L2-Q2, L2-Q5, L3-W1, L3-W2 | L2-T1 allows a download, so building the layout by hand is optional. |
| 2.3 | Run every test in a plain project with one command, and fix a run in which every test reports "could not find function". | Run everything; Common trap | L2-T2 | L2-Q3, L4-W2 | No step triggers the trap. |
| 2.4 | Read a `test_dir()` report: say what the summary line counts and, for a failure, where it is, which test it belongs to, why it failed, and whether the code or the test is wrong. | Run everything; Reading a failure | L2-T3 (counts only), L4-T1, L5-T2 | L2-Q4 | No Lesson 2 step produces a failure inside a test file. No question covers `file:line:column` or deciding which side is wrong. |

## Lesson 3: Choosing the right expectation

| # | Objective (you can…) | Lesson section | Doing | Recognition | Gaps |
|---|---|---|---|---|---|
| 3.1 | Pick the most specific expectation for a check instead of `expect_true()`, and say what the failure message gains. | Why not `expect_true()` for everything?; The working set | L3-T3 | L3-Q1, L3-Q3, L3-Q4, L4-W1 | `expect_setequal()`, `expect_match()`, the `expect_lt()` family and `expect_false()` appear only in the table and are never assessed. L3-T3 needs `expect_lte()` or similar but does not name it, so the student has to choose. |
| 3.2 | Test the values of a function that returns a data frame: build a tiny input by hand, call the function, and compare the result with an expected tibble you typed by hand. | Testing a function that returns a data frame; Common trap | L3-T1 (guided) | L3-Q5 | Students never write a data-frame test of their own. Arrange, act, assert is not assessed. |
| 3.3 | Test the structure of a result (its class and its column names) in a separate test that builds everything it needs. | Structure checks | L3-T1 (guided) | L3-Q3, L4-W1 | Self-contained tests are not assessed. The only doing evidence is copying. |

## Lesson 4: Edge cases, errors and bugs

| # | Objective (you can…) | Lesson section | Doing | Recognition | Gaps |
|---|---|---|---|---|---|
| 4.1 | For a function that takes a column, list the edge cases (missing values, all values the same, a single value, empty input, the wrong type), decide what should happen for each, and record each decision as a test. | Ask what could go wrong | L4-T1 (guided), L4-T2, L4-T3 | L4-Q4 | Empty input (`numeric(0)`) is in the table but never tested or assessed. A single value appears only in L4-T2. L4-Q4 names three of the five cases. |
| 4.2 | On finding a bug, write a test that fails, fix the function, and run every test again. | A bug, caught test-first | L4-T1 (guided), L5-T3 | L4-Q3, L5-W2 | The only bug is the one the page walks through. Running all the tests again, not just the new one, is not assessed. |
| 4.3 | Test that a function stops with a specific error by giving `expect_error()` a message pattern, and explain why a bare `expect_error()` can pass while testing nothing. | Expecting an error; Common trap | L4-T1 (guided) | L4-Q1, L4-Q2, L5-W1 | No task has the student write an error test of their own. |
| 4.4 | State with `expect_warning()` and `expect_no_warning()` when a function should and should not warn, and treat a `WARN` count above zero as something to investigate. | Warnings | L4-T1 (guided) | L4-Q5 | L4-Q5 covers only the `WARN` column. Neither expectation is assessed, and there is no independent task. |

## Lesson 5: From project to package

| # | Objective (you can…) | Lesson section | Doing | Recognition | Gaps |
|---|---|---|---|---|---|
| 5.1 | Turn a plain project into a package with `create_package()`, `use_r()`, `use_testthat(3)` and `use_test()`, and run every test with `devtools::test()`. | Build it | L5-T1 | L5-Q2, L5-Q4 | None found. |
| 5.2 | Say what the package does in place of `source()`, `local_edition(3)` and `run-tests.R`, and find the edition setting in `DESCRIPTION`. | What changes, and what does not; What you now have | L5-T1 | L5-Q1, L5-Q3 | "Do not edit `tests/testthat.R`" is not assessed. |
| 5.3 | Declare dependencies: call other packages as `package::function()` in `R/`, and put a package in Imports or in Suggests according to whether your functions need it or only your tests do. | Build it, step 5; Common trap | L5-T1 | L5-Q5 | Suggests for packages that only the tests need is not assessed. |
| 5.4 | Work in the package loop (edit, `load_all()`, `test()`, now and then `check()`) and add a new function test-first with `use_r()` and `use_test()`. | The working loop | L5-T2, L5-T3 | none | No quiz question covers `load_all()` or `check()`, and no step requires running `check()`. |

## Gaps that recur

These are the patterns behind the Gaps column, in the order I would fix them.

1. **Guided doing.** L3-T1 and L4-T1 carry most of the doing evidence for objectives 3.2, 3.3, 4.3 and 4.4, and both have the student follow the page. Each of those objectives needs one step where the student writes the test unprompted.
2. **No function of the student's own.** Every task uses the four course helpers. `MISSION.md` says "for a function of their own, without a template".
3. **Reading failures is under-assessed.** No question shows a failure report and asks where, what or why (objectives 1.2 and 2.4).
4. **Taught but never assessed.** One behaviour per test, self-contained tests, arrange/act/assert, empty input, `expect_warning()` and `expect_no_warning()`, `load_all()` and `check()`, Suggests, and four rows of the Lesson 3 expectation table.
5. **Lesson 2 has no step that writes a test.** The first new `test_that()` a student writes is L3-T3.

## Extension objectives (not yet taught)

Lesson 5 promises snapshot tests, fixtures and helper files, skipping, and coverage. Running tests on GitHub Actions is added here. None has a lesson, a "Try it" step or a quiz question yet, so all evidence columns are empty. Each objective points at the reading a lesson should be built from; full "use for" notes are in `RESOURCES.md`.

| # | Objective (you can…) | Recommended reading |
|---|---|---|
| S1 | Write an `expect_snapshot()` test for printed output or an error message that is awkward to type out, and find what it recorded under `tests/testthat/_snaps/`. | [_R Packages_ 13.5.3 "Snapshot tests"](https://r-pkgs.org/testing-basics.html#sec-snapshot-tests) |
| S2 | When a snapshot test reports a change, review it and either fix the code or accept the new snapshot with `snapshot_review()` or `snapshot_accept()`. | [_R Packages_ 13.5.3](https://r-pkgs.org/testing-basics.html#sec-snapshot-tests) |
| F1 | Make a test clean up after itself with withr `local_*()` functions or `withr::defer()`, and write files only to a temporary location. | _R Packages_ [14.2.2](https://r-pkgs.org/testing-design.html#sec-testing-design-self-contained), [14.3.7](https://r-pkgs.org/testing-design.html#sec-tests-files-where-write), [15.1.2](https://r-pkgs.org/testing-advanced.html#create-and-destroy-a-local-useful_thing) |
| F2 | Move set-up code that several tests repeat into a function in a `helper*.R` file, and say when testthat loads that file. | _R Packages_ [14.3.3](https://r-pkgs.org/testing-design.html#testthat-helper-files), [15.1.1](https://r-pkgs.org/testing-advanced.html#sec-testing-advanced-fixture-helper) |
| F3 | Store a small test data file under `tests/testthat/` and read it in a test with `test_path()`. | _R Packages_ [14.3.6](https://r-pkgs.org/testing-design.html#storing-test-data), [15.1.3](https://r-pkgs.org/testing-advanced.html#sec-testing-advanced-concrete-fixture) |
| K1 | Skip a test under a stated condition with `skip_if_not_installed()`, `skip_on_cran()`, `skip_on_os()` or `skip_if()`, and find the skip and its reason in the report. | [_R Packages_ 15.3.1 "Skipping a test"](https://r-pkgs.org/testing-advanced.html#tests-skipping); [`skip()` reference](https://testthat.r-lib.org/reference/skip.html) |
| K2 | Explain why a skipped test is a risk, and check the `SKIP` count for skips you did not intend. | [_R Packages_ 15.3.1.3 "Dangers of skipping"](https://r-pkgs.org/testing-advanced.html#tests-skipping) |
| C1 | Measure a package's test coverage with `devtools::test_coverage()` or `covr::package_coverage()`, and use the report to find lines that no test runs. | [_R Packages_ 14.1.1 "Test coverage"](https://r-pkgs.org/testing-design.html#sec-testing-design-coverage); [covr](https://covr.r-lib.org/), [`report()`](https://covr.r-lib.org/reference/report.html) |
| C2 | Use uncovered lines to choose the next test to write, and explain why 100% coverage is not required. | [_R Packages_ 14.1.1](https://r-pkgs.org/testing-design.html#sec-testing-design-coverage) |
| G1 | Add the `check-standard` workflow with `usethis::use_github_action()`, push, and say what the workflow runs, on which systems, and when. | [_R Packages_ 20.2 "Continuous integration"](https://r-pkgs.org/software-development-practices.html#sec-sw-dev-practices-ci); [`use_github_action()` reference](https://usethis.r-lib.org/reference/use_github_action.html) |
| G2 | When a GitHub Actions run fails, find the failing test in the log, reproduce it on your own computer, fix it, and push until the run passes. | [_R Packages_ 20.2.2](https://r-pkgs.org/software-development-practices.html#r-cmd-check-via-gha); [r-lib/actions](https://github.com/r-lib/actions), [example workflows](https://github.com/r-lib/actions/tree/v2-branch/examples) |

### Notes for whoever writes these lessons

- **Chapter numbers.** Snapshot tests are in _R Packages_ ch. 13 and coverage is in ch. 14. Ch. 15 covers fixtures, skipping, mocking and CRAN constraints.
- **Packages only for CI.** usethis, r-lib/actions and _R Packages_ 20.2 all assume a package. No source read so far describes running testthat on GitHub Actions for a plain project, so G1 and G2 build on the Lesson 5 package.
- **Coverage outside a package.** `covr::file_coverage(source_files, test_files, runner = testthat::test_file)` measures plain R files, so C1 could be taught on the Lesson 4 project if coverage should come before packages.
- **C2 is worded narrowly.** The only sourced claim about interpretation is that 100% coverage "is rarely achieved in practice and that's often OK" (_R Packages_ 14.1.1). The covr site says nothing on what coverage does not tell you. Find a source before a lesson claims that a covered line is not necessarily a tested behaviour.
- **Snapshots at the console.** _R Packages_ 13.5.3 says snapshot tests "only function when executed non-interactively". A lesson has to run them through `devtools::test()`, not line by line.
- **Self-contained tests versus helpers.** Lesson 3 teaches that each test builds what it needs. F2 has to explain when a helper is worth the loss.
- **Not yet read.** testthat's own snapshot article, and the covr reference pages for exclusions and `zero_coverage()`.

## Later candidates (no objectives yet)

- **Mocking.** _R Packages_ [15.3.2](https://r-pkgs.org/testing-advanced.html#mocking): "Our main advice about mocking is to avoid it if you can."
- **Test-first development as a full method.** Lessons 4 and 5 teach the fail-first step for bugs and new functions only.
- **Validating data, not functions**, with pointblank or assertr. No source has been read.
