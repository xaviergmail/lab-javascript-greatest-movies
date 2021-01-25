// Iteration 1: All directors? - Get the array of all directors.
getAllDirectors = (movies) => {
  return Object.keys(
    movies
      .map((x) => x.director)
      .reduce((acc, x) => {
        acc[x] = true
        return acc
      }, {})
  )
}
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors. How could you "clean" a bit this array and make it unified (without duplicates)?

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
howManyMovies = (movies) => {
  return movies.filter(
    (x) => x.genre.includes("Drama") && x.director == "Steven Spielberg"
  ).length
}

// Iteration 3: All rates average - Get the average of all rates with 2 decimals
ratesAverage = (movies) => {
  return (
    parseFloat(
      (
        movies.reduce((acc, x) => (acc += parseFloat(x.rate) || 0), 0) /
        movies.length
      ).toFixed(2)
    ) || 0
  )
}

// Iteration 4: Drama movies - Get the average of Drama Movies
dramaMoviesRate = (movies) => {
  return ratesAverage(movies.filter((x) => x.genre.includes("Drama")))
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)

orderByYear = (movies) => {
  return [...movies].sort((a, b) => {
    if (a.year === b.year) {
      return a.title.localeCompare(b.title)
    }
    return a.year - b.year
  })
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
orderAlphabetically = (movies) => {
  return movies
    .map((x) => x.title)
    .sort((a, b) => a.localeCompare(b))
    .filter((_, i) => i < 20)
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes

_turnHoursToMinutes = (x) => {
  if (typeof x === "number") return x
  const exp = /((\d+)h)?\s*((\d+)min)?/g
  const matches = exp.exec(x)

  return parseInt(matches[2] || 0) * 60 + parseInt(matches[4] || 0)
}

turnHoursToMinutes = (movies) => {
  let _movies = [...movies].map((x) => {
    return { ...x, duration: _turnHoursToMinutes(x.duration || 0) }
  })

  console.log(_movies[0])

  return _movies
}

getAllYears = (movies) => {
  return Object.keys(
    movies
      .map((x) => x.year)
      .reduce((acc, x) => {
        acc[x] = true
        return acc
      }, {})
  )
}

// BONUS - Iteration 8: Best yearly rate average - Best yearly rate average
bestYearAvg = (movies) => {
  if (!movies || !movies.length) return null

  let greatest = Object.keys(
    movies
      .map((x) => x.year)
      .reduce((acc, x) => {
        acc[x] = true
        return acc
      }, {})
  )
    .map(Number)
    .map((year) => {
      const yearMovies = movies.filter((x) => x.year == year)
      return {
        year: year,
        avg:
          yearMovies.reduce((acc, x) => (acc += x.rate || 0), 0) /
            yearMovies.length || 0,
      }
    })
    .reduce(
      (best, cur) => {
        if (cur.avg > best.avg) {
          return cur
        }
        return best
      },
      { avg: 0, year: 0 }
    )

  return `The best year was ${greatest.year} with an average rate of ${greatest.avg}`
}
