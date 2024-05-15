import * as React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import getLPTheme from "../pages/getLPTheme";
import NavBar from "./PageComponents/NavBar";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Footer from "../components/PageComponents/Footer";

function getRoleFullForm(role) {
  switch (role) {
    case "AS":
      return "Assistant";
    case "DR":
      return "Doctor";
    default:
      return "-";
  }
}

function ListEmployees({ authorized }) {
  const role = sessionStorage.getItem("role");
  const [employees, setEmployees] = useState([]);
  const [mode, setMode] = React.useState("light");
  const [showCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const url = "http://localhost:8000/api/employees/";

    fetch(url)
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const employeesToShow = employees.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <NavBar
        mode={mode}
        toggleColorMode={toggleColorMode}
        authorized={authorized}
        role={role}
      />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
              fontSize: "clamp(3.5rem, 10vw, 4rem)",
            }}
          >
            The&nbsp;&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                fontSize: "clamp(3rem, 10vw, 4rem)",
                color: (theme) =>
                  theme.palette.mode === "light"
                    ? "primary.main"
                    : "primary.light",
              }}
            >
              Employees
            </Typography>
          </Typography>
          <br />
          <Divider />

          <React.Fragment>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <Typography variant="h6">Id</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">First Name</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">Last Name</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">Email</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">Username</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">ROLE</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employeesToShow.map((employee) => {
                  if (getRoleFullForm(employee.role) === "-") {
                    return null;
                  }
                  return (
                    <TableRow key={employee.id}>
                      <TableCell>{employee.id}</TableCell>
                      <TableCell>{employee.first_name}</TableCell>
                      <TableCell>{employee.last_name}</TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell>{employee.username}</TableCell>
                      <TableCell>{getRoleFullForm(employee.role)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <Pagination
              count={Math.ceil(employees.length / itemsPerPage)}
              page={page}
              onChange={handlePageChange}
            />
          </React.Fragment>
        </Box>
      </Container>
      <Divider />
      <Footer />
    </ThemeProvider>
  );
}

export default ListEmployees;