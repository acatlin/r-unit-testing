local_edition(3)

test_that("rescale01() maps the smallest value to 0 and the largest to 1", {
  expect_equal(rescale01(c(0, 5, 10)), c(0, 0.5, 1))
  expect_equal(rescale01(c(-2, 0, 2)), c(0, 0.5, 1))
})

test_that("clean_names() returns lower-case snake_case", {
  expect_equal(clean_names("First Name"), "first_name")
  expect_equal(clean_names(c("Total ($)", " Zip-Code ")), c("total", "zip_code"))
})

test_that("parse_money() strips dollar signs and commas", {
  expect_equal(parse_money("$1,200.50"), 1200.5)
  expect_equal(parse_money("75"), 75)
})
