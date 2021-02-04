import { Dict, isObject } from "@chakra-ui/utils"

const transformProperties = new Set([
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
    if (transformProperties.has(key)) {
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

export const transformString = [
  "translateX(var(--translate-x, 0))",
  "translateY(var(--translate-y, 0))",
  "rotate(var(--rotate, 0))",
  "skewX(var(--skew-x, 0))",
  "skewY(var(--skew-y, 0))",
  "scaleX(var(--scale-x, 1))",
  "scaleY(var(--scale-y, 1))",
].join(" ")
