import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import * as serverResponse from "./daysOff.json";
import { CircularProgress } from "@material-ui/core";
import { getDay, getDaysInMonth } from "date-fns";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function HolidayTable() {
  const classes = useStyles();
  const [holidayData, setHolidayData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [numberOfDaysInMonth, setNumberOfDaysInMonth] = useState(null);
  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  //temporary - based on props value later
  const year = 2021;
  const month = 5;

  const daysInMonthArr = [...Array(numberOfDaysInMonth)];

  useEffect(() => {
    const amountOfDays = getDaysInMonth(new Date(year, month));
    setNumberOfDaysInMonth(amountOfDays);
  }, []);

  useEffect(() => {
    const apiCall = setTimeout(() => setHolidayData(serverResponse.root), 500);
    return () => {
      clearTimeout(apiCall);
      setIsLoading(false);
    };
  }, [holidayData]);

  return isLoading ? (
    <CircularProgress />
  ) : (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell> </TableCell>
            {daysInMonthArr.map((_, index) => {
              const weekDay = weekDays[getDay(new Date(year, month, index))];
              return <TableCell key={index}>{weekDay.charAt(0)}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {holidayData.colleagues.map((row) => {
            return (
              <TableRow key={row._id}>
                <TableCell>{row._name}</TableCell>
                {daysInMonthArr.map((_, index) => {
                  return <TableCell key={index}>{index + 1}</TableCell>;
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
