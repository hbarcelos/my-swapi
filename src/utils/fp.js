export const Right = value => ({
  map: fn => Right.of(fn(value)),
  inspect: () => `Right(${value})`,
  unfold: () => value
})

Right.of = Right

export const Left = value => ({
  map: () => Left(value),
  inspect: () => `Left(${value})`,
  unfold: () => value
})

export const Maybe = value => value
  ? Right.of(value)
  : Left(null)

Maybe.of = Right.of
