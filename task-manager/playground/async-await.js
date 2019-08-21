const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return a < 0 || b < 0
        ? reject("Numbers must be non-negative...")
        : resolve(a + b)
    }, 200)
  })
}

const doWork = async () => {
  const sum = await add(7, 8)
  const sum2 = await add(sum, sum)
  const sum3 = await add(sum2, sum2)
  return sum3
}

doWork()
  .then(result => {
    console.log("result", result)
  })
  .catch(error => {
    console.log(error)
  })
