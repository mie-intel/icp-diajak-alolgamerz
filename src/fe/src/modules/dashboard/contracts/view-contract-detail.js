import {
  DashboardBox,
  DashboardData,
  DashboardSectionTitle,
} from "@/components/UI/Dashboard/DashboardBody";
import { Table, TableHeader, TableRow, TableHead } from "@/components/UI/table";

import { DashboardTitle } from "../../../components/UI/Dashboard/DashboardBody";

export function ViewContractDetail({
  contract = {
    name: "Contract Name",
    date: "03-02-2005",
    parties: ["Parties1", "Parties2", "Parties3"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dapibus vulputate justo commodo ultrices. Proin fringilla enim est. Suspendisse tincidunt ut lacus vel convallis.",
  },
  contractItem = [
    {
      name: "example docs 1",
      type: "Document",
      parties: "Company 1, Company 2",
      date: "24 Jan 2024",
      status: "accepted",
    },
    {
      name: "example docs 1",
      type: "Document",
      parties: "Company 1, Company 2",
      date: "24 Jan 2024",
      status: "invalid",
    },
    {
      name: "example docs 1",
      type: "Document",
      parties: "Company 1, Company 2",
      date: "24 Jan 2024",
      status: "declined",
    },
  ],
}) {
  const partiesList = contract.parties.length ? contract.parties.join(", ") : "";
  return (
    <DashboardBox>
      <DashboardTitle title={contract.name} />
      <DashboardData title="Date Created" isi={contract.date} date />
      <DashboardData title="Parties" isi={partiesList} bold />
      <DashboardData title="Description" isi={contract.description} />
      <DashboardSectionTitle
        title={"Contract Items"}
        className="text-[13px] font-[700] md:text-[18px] xl:text-[24px]"
      />
      <Table className={"mt-[15px]"}>
        <TableHeader>
          <TableRow>
            <TableHead>Item Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Parties Involved</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    </DashboardBox>
  );
}
