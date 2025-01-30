"use client";

import { DashboardBox } from "@/components/UI/Dashboard/DashboardBody";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI/table";

export default function Page() {
  return (
    <>
      <DashboardBox>
        <Table className="w-full text-black">
          <TableHeader>
            <TableRow>
              <TableHead>Item Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Parties Involved</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell bold>Example Document 1</TableCell>
              <TableCell>Document</TableCell>
              <TableCell>Company 1</TableCell>
              <TableCell>24 Jan 2024</TableCell>
              <TableCell bold>Accepted</TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell bold>Example Document 1</TableCell>
              <TableCell>Document</TableCell>
              <TableCell>Company 1</TableCell>
              <TableCell>24 Jan 2024</TableCell>
              <TableCell bold>Accepted</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DashboardBox>
    </>
  );
}
