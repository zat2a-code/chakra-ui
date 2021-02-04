import * as CSS from "csstype"
import { Config, createParser, system } from "../core"
import { ResponsiveValue, Token } from "../utils"

const config: Config = {
  transform: true,
  transformOrigin: true,
  scale: {
    properties: ["--scale-x", "--scale-y"],
  },
  scaleX: { property: "--scale-x" },
  scaleY: { property: "--scale-y" },
  rotate: { property: "--rotate" },
  translateX: { property: "--translate-x" },
  translateY: { property: "--translate-y" },
  skewX: { property: "--skew-x" },
  skewY: { property: "--skew-y" },
}

export interface TransformProps {
  /**
   * The scale value used in the css transform `transform: scale(...)`
   */
  scale?: ResponsiveValue<string | number>
  /**
   * The scale value in the x-axis used in the css transform `transform: scaleX(...)`
   */
  scaleX?: ResponsiveValue<string | number>
  /**
   * The scale value in the y-axis used in the css transform `transform: scaleX(...)`
   */
  scaleY?: ResponsiveValue<string | number>
  /**
   * The rotate value in the x-axis used in the css transform `transform: rotate(...)`
   */
  rotate?: ResponsiveValue<string>
  /**
   * The translate value in the x-axis used in the css transform `transform: translateX(...)`
   */
  translateX?: Token<CSS.Property.Transform | number, "spacing">
  /**
   * The translateY value in the y-axis used in the css transform `transform: translateY(...)`
   */
  translateY?: Token<CSS.Property.Transform | number, "spacing">
  /**
   * The skew value in the x-axis used in the css transform `transform: skewX(...)`
   */
  skewX?: ResponsiveValue<string>
  /**
   * The skew value in the x-axis used in the css transform `transform: skewY(...)`
   */
  skewY?: ResponsiveValue<string>
  /**
   * The CSS `transform` property
   */
  transform?: Token<CSS.Property.Transform>
  /**
   * The CSS `transform-origin` property
   */
  transformOrigin?: Token<CSS.Property.TransformOrigin | number, "sizes">
}

export const transform = system(config)
export const transformParser = createParser(config)
