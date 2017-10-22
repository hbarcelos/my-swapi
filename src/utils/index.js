// pluck :: (String -> a[]) -> b[]
export const pluck = field => array => array.map(({ [field]: item }) => item)

// pick :: (String[] -> Object) -> Object
export const pick = fields => obj => fields.reduce(
  (acc, current) => Object.assign(acc, { [current]: obj[current] }),
  {}
)

// map :: (a -> b) -> a[] -> b[]
export const map = iteratee => array => array.map(iteratee)

// mapValues :: (a -> b) -> x -> y
export const mapValues = iteratee => obj =>
  Object.entries(obj)
    .reduce(
      (acc, [ key, value ]) =>
        Object.assign(acc, { [key]: iteratee(value) }),
      {}
    )

// compose2 :: (a -> b) -> (b -> c) -> (a -> c)
export const compose2 = (f, g) => (...args) => f(g(...args))

// compose :: (a -> b) -> ... -> (y -> z) -> (a -> z)
export const compose = (...fns) => fns.reduce(compose2)

// pipe :: (a -> b) -> ... -> (y -> z) -> (z -> a)
export const pipe = (...fns) => fns.reduceRight(compose2)

// augment :: (Object -> Object) -> Object -> Object
export const augment = fn => obj => Object.assign({}, obj, fn(obj))

// prop :: String -> Object -> a
export const prop = property => ({ [property]: value }) => value
