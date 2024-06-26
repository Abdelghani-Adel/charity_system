"use client";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import { useState, useMemo } from "react";
import { HeadCell } from "./types";
import { getComparator, stableSort } from "./utils";
import Head from "./Head";
import Body from "./Body";

interface ReusableTableProps {
  headCells: HeadCell[];
  rows: any[];
  onRowClick?: (row: any) => void;
}

export default function ReusableTable(props: Readonly<ReusableTableProps>) {
  const { headCells, rows, onRowClick } = props;
  const columns = headCells.map((cell) => cell.id);

  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>(columns[0]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const sortHandler = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const pageChangeHandler = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const rowsPerPageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table className="min-w-max max-w-full mb-2" align="center">
            <Head
              headCells={headCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={sortHandler}
            />
            <Body columns={columns} rows={visibleRows} onRowClick={onRowClick} />
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          dir="ltr"
          onPageChange={pageChangeHandler}
          onRowsPerPageChange={rowsPerPageHandler}
        />
      </Paper>
    </Box>
  );
}
