export function range(start, stop, step = 1){
    return Array(Math.ceil(((stop + 1) - start) / step)).fill(start).map((x, y) => x + y * step)
}
