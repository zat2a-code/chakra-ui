import { Dict, isObject } from "@chakra-ui/utils"

const transformPropSet = new Set([
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "translateX",
  "translateY",
  "skewX",
  "skewY",
])

export function checkTransformAttributes(styles: Dict, result = new Set()) {
  Object.keys(styles).forEach((key) => {
    if (transformPropSet.has(key)) {
      result.add(key)
    }
    if (isObject(styles[key])) {
      checkTransformAttributes(styles[key], result)
    }
  })
  return result
}

export function hasTransformProperty(styles: Dict) {
  return checkTransformAttributes(styles).size > 0
}

/**
 * The CSS transform order following the upcoming spec from CSSWG
 * translate => rotate => scale => skew
 * @see https://drafts.csswg.org/css-transforms-2/#ctm
 * @see https://www.stefanjudis.com/blog/order-in-css-transformation-transform-functions-vs-individual-transforms/
 */
const transformTemplate = [
  "rotate(var(--rotate, 0))",
  "scaleX(var(--scale-x, 1))",
  "scaleY(var(--scale-y, 1))",
  "skewX(var(--skew-x, 0))",
  "skewY(var(--skew-y, 0))",
]

export function getTransformTemplate(gpu: boolean) {
  const withGpu = "translate3d(var(--translate-x, 0), var(--translate-y, 0), 0)"
  const basic = [
    "translateX(var(--translate-x, 0))",
    "translateY(var(--translate-y, 0))",
  ].join(" ")
  const transform = gpu ? withGpu : basic
  return [transform, ...transformTemplate].join(" ")
}
