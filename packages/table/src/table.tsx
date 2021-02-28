import * as React from "react"
import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  omitThemingProps,
  ThemingProps,
  useMultiStyleConfig,
} from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"

export interface TableProps
  extends HTMLChakraProps<"table">,
    ThemingProps<"Table"> {}

export const Table = forwardRef<TableProps, "table">((props, ref) => {
  const styles = useMultiStyleConfig("Table", props)
  const { className, ...tableProps } = omitThemingProps(props)

  return (
    <chakra.table
      role="table"
      ref={ref}
      __css={{ ...styles.root, ...styles.table }}
      className={cx("chakra-table", className)}
      {...tableProps}
    />
  )
})

if (__DEV__) {
  Table.displayName = "Table"
}

export interface TableCaptionProps extends HTMLChakraProps<"caption"> {
  /**
   * The placement of the table caption. This sets the `caption-side` CSS attribute.
   * @default "bottom"
   */
  placement?: "top" | "bottom"
}

export const TableCaption = forwardRef<TableCaptionProps, "caption">(
  (props, ref) => {
    const { placement = "bottom", ...rest } = props

    return (
      <chakra.caption
        {...rest}
        data-part="table.caption"
        ref={ref}
        __css={{
          captionSide: placement,
        }}
      />
    )
  },
)

if (__DEV__) {
  TableCaption.displayName = "TableCaption"
}

export interface TableHeadProps extends HTMLChakraProps<"thead"> {}

export const Thead = forwardRef<TableHeadProps, "thead">(({ ...rest }, ref) => (
  <chakra.thead {...rest} ref={ref} data-part="table.thead" />
))

export interface TableBodyProps extends HTMLChakraProps<"tbody"> {}

export const Tbody = forwardRef<TableBodyProps, "tbody">((props, ref) => (
  <chakra.tbody {...props} data-part="table.tbody" ref={ref} />
))

export interface TableFooterProps extends HTMLChakraProps<"tfoot"> {}

export const Tfoot = forwardRef<TableFooterProps, "tfoot">((props, ref) => (
  <chakra.tfoot {...props} data-part="table.tfoot" ref={ref} />
))

export interface TableColumnHeaderProps extends HTMLChakraProps<"th"> {
  /**
   * Aligns the cell content to the right
   */
  isNumeric?: boolean
}
export const Th = forwardRef<TableColumnHeaderProps, "th">(
  ({ isNumeric, ...rest }, ref) => (
    <chakra.th
      {...rest}
      data-part="table.th"
      ref={ref}
      data-is-numeric={isNumeric}
    />
  ),
)

export interface TableRowProps extends HTMLChakraProps<"tr"> {}
export const Tr = forwardRef<TableRowProps, "tr">((props, ref) => (
  <chakra.tr role="row" data-part="table.tr" {...props} ref={ref} />
))

export interface TableCellProps extends HTMLChakraProps<"td"> {
  /**
   * Aligns the cell content to the right
   */
  isNumeric?: boolean
}
export const Td = forwardRef<TableCellProps, "td">(
  ({ isNumeric, ...rest }, ref) => (
    <chakra.td
      role="gridcell"
      {...rest}
      data-part="table.td"
      ref={ref}
      data-is-numeric={isNumeric}
    />
  ),
)
