import { css } from "../src"
import { createTheme } from "./theme"

test("should transform properties", () => {
  const input = css({
    translateX: 3,
    translateY: 5,
    rotate: 4,
  })({})

  expect(input).toMatchInlineSnapshot(`
    Object {
      "--rotate": "4deg",
      "--translate-x": 3,
      "--translate-y": 5,
      "transform": "translateX(var(--translate-x, 0)) translateY(var(--translate-y, 0)) rotate(var(--rotate, 0)) scaleX(var(--scale-x, 1)) scaleY(var(--scale-y, 1)) skewX(var(--skew-x, 0)) skewY(var(--skew-y, 0))",
    }
  `)
})

test("should transform css transform properties nested deep", () => {
  const input = css({
    translateX: 3,
    translateY: 5,
    rotate: 4,
    "&:hover": {
      translateX: 6,
      translateY: 10,
      "&:after": {
        translateX: 10,
      },
    },
  })({})

  expect(input).toMatchInlineSnapshot(`
    Object {
      "&:hover": Object {
        "&:after": Object {
          "--translate-x": 10,
        },
        "--translate-x": 6,
        "--translate-y": 10,
      },
      "--rotate": "4deg",
      "--translate-x": 3,
      "--translate-y": 5,
      "transform": "translateX(var(--translate-x, 0)) translateY(var(--translate-y, 0)) rotate(var(--rotate, 0)) scaleX(var(--scale-x, 1)) scaleY(var(--scale-y, 1)) skewX(var(--skew-x, 0)) skewY(var(--skew-y, 0))",
    }
  `)
})

test("should preserve other css properties", () => {
  const input = css({
    translateX: 3,
    translateY: 5,
    rotate: 4,
    "&:hover": {
      bg: "red.400",
      translateX: 6,
      translateY: 10,
      "&:after": {
        color: "pink.400",
        translateX: 10,
      },
    },
  })({})

  expect(input).toMatchInlineSnapshot(`
    Object {
      "&:hover": Object {
        "&:after": Object {
          "--translate-x": 10,
          "color": "pink.400",
        },
        "--translate-x": 6,
        "--translate-y": 10,
        "background": "red.400",
      },
      "--rotate": "4deg",
      "--translate-x": 3,
      "--translate-y": 5,
      "transform": "translateX(var(--translate-x, 0)) translateY(var(--translate-y, 0)) rotate(var(--rotate, 0)) scaleX(var(--scale-x, 1)) scaleY(var(--scale-y, 1)) skewX(var(--skew-x, 0)) skewY(var(--skew-y, 0))",
    }
  `)
})

test("can be overriden by custom transform", () => {
  const input = css({
    transform: "scale(1.5)",
    translateX: 3,
    translateY: 5,
    rotate: 4,
    _hover: {
      transform: "rotate(4deg)",
    },
  })({})

  expect(input).toMatchInlineSnapshot(`
    Object {
      "&:hover, &[data-hover]": Object {
        "transform": "rotate(4deg)",
      },
      "--rotate": "4deg",
      "--translate-x": 3,
      "--translate-y": 5,
      "transform": "scale(1.5)",
    }
  `)
})

test("should work with responsive syntax", () => {
  const input = css({
    _hover: {
      scale: { base: 3, lg: 4 },
    },
  })(createTheme("ltr"))

  expect(input).toMatchInlineSnapshot(`
    Object {
      "&:hover, &[data-hover]": Object {
        "--scale-x": 3,
        "--scale-y": 3,
        "@media screen and (min-width: 40em)": Object {},
        "@media screen and (min-width: 52em)": Object {},
        "@media screen and (min-width: 64em)": Object {
          "--scale-x": 4,
          "--scale-y": 4,
        },
      },
      "transform": "translateX(var(--translate-x, 0)) translateY(var(--translate-y, 0)) rotate(var(--rotate, 0)) scaleX(var(--scale-x, 1)) scaleY(var(--scale-y, 1)) skewX(var(--skew-x, 0)) skewY(var(--skew-y, 0))",
    }
  `)
})
