import {ComponentPropsWithoutRef, forwardRef} from "react";
import clsx from "clsx";
import s from './table.module.scss'

/**
 * <TableRoot>
 *   <TableHead>
 *     <TableTr>
 *       <TableTh>Header 1</TableTh>
 *       <TableTh>Header 2</TableTh>
 *     </TableTr>
 *   </TableHead>
 *   <TableBody>
 *     <TableTr>
 *       <TableTd>Content 1</TableTd>
 *       <TableTd>Content 2</TableTd>
 *     </TableTr>
 *   </TableBody>
 * </TableRoot>
 */
type TableRootProps = ComponentPropsWithoutRef<"table">;
export const TableRoot = forwardRef<HTMLTableElement, TableRootProps>(
  ({children, className, ...props}, ref) => {
    return (
      <table className={clsx(s.table, className)} {...props} ref={ref}>
        {children}
      </table>
    );
  },
);
TableRoot.displayName = "TableRoot";

type TableHeadProps = ComponentPropsWithoutRef<"thead">;
export const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(
  ({children, className, ...props}, ref) => {
    return (
      <thead className={className} {...props} ref={ref}>
      {children}
      </thead>
    );
  },
);
TableHead.displayName = "TableHead";

type TableTrProps = ComponentPropsWithoutRef<"tr">;
export const TableTr = forwardRef<HTMLTableRowElement, TableTrProps>(
  ({children, className, ...props}, ref) => {
    return (
      <tr className={clsx(s.tr, className)} {...props} ref={ref}>
        {children}
      </tr>
    );
  },
);
TableTr.displayName = "TableTr";

type TableThProps = ComponentPropsWithoutRef<"th">;
export const TableTh = forwardRef<HTMLTableCellElement, TableThProps>(
  ({children, className, ...props}, ref) => {
    return (
      <th className={clsx(s.th, className)} {...props} ref={ref}>
        {children}
      </th>
    );
  },
);
TableTh.displayName = "TableTh";

type TableTdProps = ComponentPropsWithoutRef<"td">;
export const TableTd = forwardRef<HTMLTableCellElement, TableTdProps>(
  ({children, className, ...props}, ref) => {
    return (
      <td className={clsx(s.td, className)} {...props} ref={ref}>
        {children}
      </td>
    );
  },
);
TableTd.displayName = "TableTd";

type TableBodyProps = ComponentPropsWithoutRef<"tbody">;
export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({children, className, ...props}, ref) => {
    return (
      <tbody className={className} {...props} ref={ref}>
      {children}
      </tbody>
    );
  },
);
TableBody.displayName = "TableBody";