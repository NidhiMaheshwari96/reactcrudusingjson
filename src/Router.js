import Index from "./component";
import AdvanceTable from "./component/AdvanceTable";
import PaginationTable from "./component/Pagination ";

export const Router = [
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/pagination",
    element: <PaginationTable />,
  },
  {
    path: "/Advance",
    element: <AdvanceTable />,
  },
];
