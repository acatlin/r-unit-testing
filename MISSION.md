# Mission: Unit Testing in R (a course for graduate data science students)

## Why
Andy is building a short web course that teaches first-semester graduate data science students to write unit tests for their own R code by hand, using testthat. The students arrive able to write functions and tidyverse pipelines and leave able to state, as runnable code, what those functions should do. The course is delivered as GitHub Pages and will be extended after the first five lessons are working.

## Success looks like
- A student can write `expect_*()` calls and `test_that()` blocks for a function of their own, without a template.
- A student can lay out `R/` and `tests/testthat/`, run every test with one command, and read a failure report to decide whether the code or the test is wrong.
- A student picks a specific expectation over `expect_true()` and can test a function that returns a data frame.
- A student who finds a bug writes a failing test before fixing it, and tests edge cases (NA, constant, empty, wrong type) and errors.
- A student can move the same functions and tests into a package and run `devtools::test()`.
- Every page has a short multiple-choice quiz, and the site is live at https://acatlin.github.io/r-unit-testing/.

## Constraints
- Audience: some R and basic tidyverse (dplyr, ggplot2, tidyr); possibly no experience of unit testing or of any R testing package.
- Students write tests by hand. No AI-generated tests in this part of the course.
- Delivery: static HTML on GitHub Pages, repo `acatlin/r-unit-testing`, everything pushed to `main`.
- Every code block and output shown must come from a real run, and claims must cite official documentation.
- Lessons are short (20 to 30 minutes) and each has a quiz.

## Out of scope
- For the first five lessons: snapshot tests, fixtures and helper files, mocking, skipping, code coverage, continuous integration, and test-driven development as a full method. These are candidates for the extension.
- Other testing packages (tinytest, RUnit) and testing Shiny apps.
