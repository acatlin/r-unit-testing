# Audience starts with R and basic tidyverse, and no testing experience

The students are first-semester graduate data science students with some familiarity with R and basic tidyverse (dplyr, ggplot2, tidyr), and possibly no experience of unit testing or of any R testing package (stated by Andy, 2026-11-20). Lessons can assume a student can write a function and a `group_by() |> summarise()` pipeline, and must not assume knowledge of packages, `DESCRIPTION`, regular expressions beyond a literal phrase, or tidy evaluation (`{{ }}` is used in one helper and is not explained or tested on).

## Implications
- Package development is new material, so it comes last and is introduced as "your project is already most of a package".
- Lessons 1 to 5 establish: expectations, `test_that()`, test files, `test_dir()`, the working set of expectations, edge cases, `expect_error()`/`expect_warning()`, test-first bug fixing, and `devtools::test()`. Extension lessons can build on all of these.
- No evidence yet of what students actually retain; revise after the course runs once.
