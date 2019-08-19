import React, { Component } from "react";
import { Button, DataTable, Pagination } from "carbon-components-react";
import Download20 from "@carbon/icons-react/lib/download/20";

const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
  TableExpandHeader,
  TableExpandRow,
  TableExpandedRow,
  TableToolbar,
  TableToolbarAction,
  TableToolbarContent,
  TableToolbarSearch
} = DataTable;

const initialData = [
  {
    id: "a",
    name: "Load Balancer 1",
    protocol: "HTTP",
    port: 1
  },
  {
    id: "b",
    name: "Load Balancer 2",
    protocol: "HTTP",
    port: 10
  },
  {
    id: "c",
    name: "Load Balancer 3",
    protocol: "HTTP",
    port: 20
  },
  {
    id: "d",
    name: "Load Balancer 4",
    protocol: "HTTP",
    port: 200
  },
  {
    id: "e",
    name: "Load Balancer 5",
    protocol: "HTTP",
    port: 9
  },
  {
    id: "f",
    name: "Load Balancer 6",
    protocol: "HTTP",
    port: 4
  },
  {
    id: "g",
    name: "Load Balancer 7",
    protocol: "HTTP",
    port: 10230
  },
  {
    id: "h",
    name: "Load Balancer 8",
    protocol: "HTTP",
    port: 10231
  },
  {
    id: "i",
    name: "Load Balancer 9",
    protocol: "HTTP",
    port: 10232
  },
  {
    id: "j",
    name: "Load Balancer 10",
    protocol: "HTTP",
    port: 10230
  },
  {
    id: "k",
    name: "Load Balancer 11",
    protocol: "HTTP",
    port: 10231
  },
  {
    id: "l",
    name: "Load Balancer 12",
    protocol: "HTTP",
    port: 10232
  },
  {
    id: "m",
    name: "Load Balancer 13",
    protocol: "HTTP",
    port: 10230
  },
  {
    id: "n",
    name: "Load Balancer 14",
    protocol: "HTTP",
    port: 10231
  },
  {
    id: "o",
    name: "Load Balancer 15",
    protocol: "HTTP",
    port: 10232
  },
  {
    id: "p",
    name: "Load Balancer 16",
    protocol: "HTTP",
    port: 10230
  },
  {
    id: "q",
    name: "Load Balancer 17",
    protocol: "HTTP",
    port: 10231
  },
  {
    id: "r",
    name: "Load Balancer 18",
    protocol: "HTTP",
    port: 10232
  },
  {
    id: "s",
    name: "Load Balancer 19",
    protocol: "HTTP",
    port: 10230
  },
  {
    id: "t",
    name: "Load Balancer 20",
    protocol: "HTTP",
    port: 10231
  },
  {
    id: "u",
    name: "Load Balancer 21",
    protocol: "HTTP",
    port: 10232
  }
];

const headers = [
  { key: "name", header: "Name" },
  { key: "protocol", header: "Protocol" },
  { key: "port", header: "Port" }
];

class App extends Component {
  state = {
    rowData: initialData,
    sortedArray: initialData,
    firstRowIndex: 0,
    currentPageSize: 10,
    currentPage: 1,
    currentSortDirection: "DESC",
    currentSortHeaderKey: null,
    currentFilterString: null
  };

  desc = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  sortTable = (sortDirection, sortHeaderKey) =>
    initialData.concat().sort((a, b) => {
      if (sortDirection === "DESC") {
        return 0;
      }
      return sortDirection === "ASC"
        ? this.desc(a, b, sortHeaderKey)
        : -this.desc(a, b, sortHeaderKey);
    });

  sortTableHandler = (event, sortParams) => {
    event.preventDefault();

    // Sort Table
    console.log("Sort Column", sortParams);
    let sortedArray = this.sortTable(
      sortParams.sortDirection,
      sortParams.sortHeaderKey
    );

    // Filter Table
    if (
      this.state.currentFilterString &&
      typeof event.target.value === "string" &&
      this.state.currentFilterString !== ""
    ) {
      sortedArray = this.filterTable(
        sortedArray,
        this.state.currentFilterString
      );
      this.setState({
        rowData: sortedArray,
        firstRowIndex: this.state.currentPageSize * (1 - 1),
        currentPage: 1,
        currentSortDirection: sortParams.sortDirection,
        currentSortHeaderKey: sortParams.sortHeaderKey
      });
    } else {
      this.setState({
        rowData: sortedArray,
        firstRowIndex:
          this.state.currentPageSize * (this.state.currentPage - 1),
        currentSortDirection: sortParams.sortDirection,
        currentSortHeaderKey: sortParams.sortHeaderKey
      });
    }
  };

  filterTable = (dataArray, keyTerm) => {
    return dataArray.filter(data =>
      headers.some(({ key }) => {
        if (typeof data[key] === "boolean") return false;
        return ("" + data[key]).toLowerCase().includes(keyTerm.toLowerCase());
      })
    );
  };

  filterTableHandler = event => {
    console.log("called filter");
    // Sort Fist
    let sortedArray = this.sortTable(
      this.state.currentSortDirection,
      this.state.currentSortHeaderKey
    );
    console.log("current sorted array", sortedArray);

    // Filter Array
    if (typeof event.target.value === "string" && event.target.value !== "") {
      sortedArray = this.filterTable(sortedArray, event.target.value);
      console.log("Intitial", sortedArray);
      this.setState({
        rowData: sortedArray,
        firstRowIndex: this.state.currentPageSize * (1 - 1),
        currentPage: 1,
        currentFilterString: event.target.value
      });
    } else {
      this.setState({
        rowData: sortedArray,
        firstRowIndex:
          this.state.currentPageSize * (this.state.currentPage - 1),
        currentFilterString: null
      });
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Button>Hello React!</Button>
          <DataTable
            sortRow={(a, b, obj) => 0}
            rows={this.state.rowData.slice(
              this.state.firstRowIndex,
              this.state.firstRowIndex + this.state.currentPageSize
            )}
            headers={headers}
            isSortable
            useZebraStyles={false}
            size={null}
            render={({
              rows,
              headers,
              getHeaderProps,
              getRowProps,
              getTableProps
            }) => {
              return (
                <TableContainer title="DataTable with expansion">
                  <TableToolbar>
                    <TableToolbarContent>
                      <TableToolbarSearch onChange={this.filterTableHandler} />
                    </TableToolbarContent>
                  </TableToolbar>
                  <Table {...getTableProps()}>
                    <TableHead>
                      <TableRow>
                        {/* add the expand header before all other headers */}
                        <TableExpandHeader />
                        {headers.map(header => (
                          <TableHeader
                            {...getHeaderProps({
                              header,
                              onClick: this.sortTableHandler
                            })}
                          >
                            {header.header}
                          </TableHeader>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map(row => (
                        <React.Fragment key={row.id}>
                          <TableExpandRow {...getRowProps({ row })}>
                            {row.cells.map(cell => (
                              <TableCell key={cell.id}>{cell.value}</TableCell>
                            ))}
                          </TableExpandRow>
                          {/* toggle based off of if the row is expanded. If it is, render TableExpandedRow */}
                          {row.isExpanded && (
                            <TableExpandedRow colSpan={headers.length + 1}>
                              <h1>Expandable row content</h1>
                              <p>Description here</p>
                            </TableExpandedRow>
                          )}
                        </React.Fragment>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              );
            }}
          />
          <Pagination
            totalItems={this.state.rowData.length}
            pageSize={this.state.currentPageSize}
            page={this.state.currentPage}
            pageSizes={[10, 20, 30]}
            onChange={({ page, pageSize }) => {
              if (pageSize !== this.state.currentPageSize) {
                this.setState({ currentPageSize: pageSize });
              }
              this.setState({
                firstRowIndex: pageSize * (page - 1),
                currentPage: page
              });
              console.log("update page", page);
            }}
          />
        </header>
      </div>
    );
  }
}

export default App;
