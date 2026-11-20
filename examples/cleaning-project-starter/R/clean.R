# Data-cleaning helpers: the starting point for Lesson 2.
# Each function is small on purpose: small functions are easy to test.

# Rescale a numeric vector so its smallest value is 0 and its largest is 1.
rescale01 <- function(x) {
  rng <- range(x, na.rm = TRUE)
  (x - rng[1]) / (rng[2] - rng[1])
}

# Turn messy column names into lower-case snake_case.
clean_names <- function(x) {
  x <- tolower(x)
  x <- gsub("[^a-z0-9]+", "_", x)
  gsub("^_|_$", "", x)
}

# Convert strings such as "$1,200.50" to the number 1200.5.
parse_money <- function(x) {
  as.numeric(gsub("[$,]", "", x))
}

# Count rows and average one column within each group.
summarise_by <- function(data, group, value) {
  data |>
    dplyr::group_by({{ group }}) |>
    dplyr::summarise(
      n = dplyr::n(),
      mean = mean({{ value }}, na.rm = TRUE),
      .groups = "drop"
    )
}
