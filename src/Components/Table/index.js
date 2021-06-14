import React, { useEffect, useState } from "react";
import {
  useTable
  ,useSortBy
  ,usePagination
  ,useFilters
  ,useAsyncDebounce
} from "react-table";
import { backAPI } from "../../services/api";
import moment from 'moment'
import { useHistory } from "react-router-dom";
import jwt_decode from 'jwt-decode';


// Function for default filters
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter }
}) {
  const count = preFilteredRows.length;

  return (
    <input style={{border: 0 }}
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Buscar...`}
    />
  );
}
// Default filters function Ended


// Table function. It creates UI.
function Table({columns, data}) {
  
  const filterTypes = React.useMemo(
    () => ({
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      }
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter
    }),
    []
  );
  
  

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
    visibleColumns,
    
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes
    },
    useFilters,
    useSortBy,
    usePagination,
  );

  // Render the UI for your table
  return (
    <>
      
      <table
        {...getTableProps()}
        border={1}
        style={{
          borderCollapse: "collapse",
          borderColor: "rgba(212,0,84,0.4)",
          textAlign: "center",
          width: "100%",
          margin: "auto",
          fontWeight: 500
        }}
      >
        
        <thead>
          {headerGroups.map((group) => (
            <tr {...group.getHeaderGroupProps()}>
              {group.headers.map((column) => (
                <th {...column.getHeaderProps()} style={{textAlign: "center"}}>
                  
                    <div {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " ▼"
                            : " ▲" 
                          : column.canSort
                          ? " •"
                          : ""}
                      </span>
                    </div>
                  
                  
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  
                </th>
              ))}
            </tr>
          ))}
        </thead>
        

        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        
        <tfoot>
          {footerGroups.map((group) => (
            <tr {...group.getFooterGroupProps()}>
              {group.headers.map((column) => (
                <td {...column.getFooterProps()}>
                  {column.render("Footer")}
                </td>
              ))}
            </tr>
          ))}
        </tfoot>
        
      </table>
      
      <div className="pagination" >
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </button>{" "}
        <span>
          Página{" "}
          <strong>
            {pageIndex + 1} de {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Ir para página:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Mostrar {pageSize}
            </option>
          ))}
        </select>
      </div>
      
    </>
  );
}
// Table function component end

// App component start
function AppointTable() {

    const config = {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('Token')}`
        }
    }

    const [data, setData] = useState([]);

    let history = useHistory()

    useEffect(() => {
        const tokenType = jwt_decode(sessionStorage.getItem('Token')).type
        backAPI.get('/consultas', config)
            .then(res => {
                res.data.appointments.map((apt) => {

                    if (apt.doctorsId == tokenType || tokenType == -1){
    
                        setData((oldData) => [...oldData, apt]);
                    }
                })
                
            });
    }, [])

    const updateAppointment = async (index) => {
        
        const appointInfo = data[index];
        
        const res = await backAPI.get(`/consulta/${appointInfo.uuid}`, config);
            
        history.push({
            pathname: '/agendamento/alterar',
            state: { detail: res.data.appointments },
        });

    }

    const doAppointment = async (index) => {
        const appointInfo = data[index];
    
        const res = await backAPI.get(`/consulta/${appointInfo.uuid}`, config);
        
        history.push({
            pathname: '/agendamento/realizar',
            state: { detail: res.data.appointments}
        });
        
    }

  // Columns array. This array contains your table headings and accessors which maps keys from data array
  const columns = React.useMemo(() => (
  [
    {
        "id": "columnId_00.3288935191448523",
        "Header": "Agendamentos",
        "Footer": "",
        "columns": [
            
            {
                "id": "columnId_0_00.3344048336497123",
                "Header": "Nome ",
                "Footer": "",
                "accessor": "Client.name"
            },
            {
                "id": "columnId_0_00.8604683717393637",
                "Header": "Data do Agendamento ",
                "Footer": "",
                "accessor": (row) => {
                    return moment.utc(row.scheduling_date).format('DD/MM/YYYY\xa0\xa0\xa0HH:mm')
                }
            },
            {
                "id": "columnId_0_00.5502595924803961",
                "Header": "Data do Atendimento ",
                "Footer": "",
                "accessor": (row) => {
                    return row.appointment_date ? moment.utc(row.appointment_date).format('DD/MM/YYYY\xa0\xa0\xa0HH:mm') : 'Não realizado'
                }
            },
            {
                "id": "columnId_0_00.5005891103005842",
                "Header": "Status ",
                "Footer": "",
                "accessor": "AppointmentStatus.status"
            },
            {
                "id": "columnId_0_00.5502595924803",
                "Header": "Ações ",
                "Footer": "",
                "accessor": "acao",
                "disableSortBy": true,
                "Cell": ({row}) => {
                    return (
                        <>
                        <button onClick={async () => {updateAppointment(row.index); console.log(data)}} style={{margin: "5px 10px 5px 0"}}>Alterar consulta</button>
                        <button onClick={() => doAppointment(row.index)}>Realizar consulta</button>
                        </>
                    )
                },
                "disableFilters": true
               
            },
        ]
    }
]
  ), []);

  

    return (
        

        <Table columns={columns} data={data} />
  
    )
}


export default AppointTable;
    