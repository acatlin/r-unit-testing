# Run every test in this project.
# From the project folder:  source("run-tests.R")

library(testthat)

source("R/clean.R")           # load the functions being tested
test_dir("tests/testthat")    # run every test-*.R file in that folder
