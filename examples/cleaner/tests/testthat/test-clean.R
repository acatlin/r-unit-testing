# rescale01() ---------------------------------------------------------------

test_that("rescale01() maps the smallest value to 0 and the largest to 1", {
  expect_equal(rescale01(c(0, 5, 10)), c(0, 0.5, 1))
  expect_equal(rescale01(c(-2, 0, 2)), c(0, 0.5, 1))
})

test_that("rescale01() returns one double per input value", {
  x <- rescale01(1:3)
  expect_type(x, "double")
  expect_length(x, 3)
})

test_that("rescale01() keeps missing values missing", {
  expect_equal(rescale01(c(1, NA, 3)), c(0, NA, 1))
})

test_that("rescale01() returns zeros when every value is the same", {
  expect_equal(rescale01(c(5, 5, 5)), c(0, 0, 0))
})

test_that("rescale01() rejects input that is not numeric", {
  expect_error(rescale01("a"), "must be numeric")
})

# clean_names() -------------------------------------------------------------

test_that("clean_names() returns lower-case snake_case", {
  expect_equal(clean_names("First Name"), "first_name")
  expect_equal(clean_names(c("Total ($)", " Zip-Code ")), c("total", "zip_code"))
})

test_that("clean_names() output contains only letters, digits and underscores", {
  expect_match(clean_names(c("First Name", "Total ($)")), "^[a-z0-9_]+$")
})

# parse_money() -------------------------------------------------------------

test_that("parse_money() strips dollar signs and commas", {
  expect_equal(parse_money("$1,200.50"), 1200.5)
  expect_equal(parse_money("75"), 75)
})

test_that("parse_money() warns when a value cannot be parsed", {
  expect_warning(parse_money("n/a"), "NAs introduced")
  expect_no_warning(parse_money("$5"))
})

# summarise_by() ------------------------------------------------------------

test_that("summarise_by() counts rows and averages within each group", {
  staff <- tibble::tibble(
    dept = c("a", "a", "b"),
    pay  = c(10, 20, 60)
  )
  expected <- tibble::tibble(
    dept = c("a", "b"),
    n    = c(2L, 1L),
    mean = c(15, 60)
  )
  expect_equal(summarise_by(staff, dept, pay), expected)
})

test_that("summarise_by() returns a tibble with the documented columns", {
  staff <- tibble::tibble(dept = c("a", "a", "b"), pay = c(10, 20, 60))
  out <- summarise_by(staff, dept, pay)
  expect_s3_class(out, "tbl_df")
  expect_named(out, c("dept", "n", "mean"))
})
