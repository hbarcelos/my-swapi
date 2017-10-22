import { Maybe } from '../../utils/fp'
export default (
  controller,
  {
    transform = x => x
  } = {
    transform: x => x
  }
) => async ctx => {
  const data = await controller(ctx)
  ctx.response.body = Maybe(data).map(transform).unfold()
}
