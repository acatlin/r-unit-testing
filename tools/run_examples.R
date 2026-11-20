# Runs every example project so the code shown in the lessons stays correct.
# From the repo root:  Rscript tools/run_examples.R

library(testthat)

run_project <- function(dir) {
  message("\n== ", dir)
  env <- new.env(parent = globalenv())
  sys.source(file.path(dir, "R", "clean.R"), envir = env)
  test_dir(
    file.path(dir, "tests", "testthat"),
    env = env,
    reporter = "summary",
    stop_on_failure = TRUE,
    stop_on_warning = TRUE
  )
}

run_project("examples/cleaning-project-starter")
run_project("examples/cleaning-project")

message("\n== examples/cleaner (package)")
test_local(
  "examples/cleaner",
  reporter = "summary",
  stop_on_failure = TRUE,
  stop_on_warning = TRUE
)

message("\nAll example tests passed.")
