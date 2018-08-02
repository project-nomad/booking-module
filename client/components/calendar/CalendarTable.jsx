import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DateSquare from './DateSquare';

const Table = styled.table`
  margin: 0 auto;
  max-width: 100%;
  border-spacing: 0px;
`;

const Header = styled.th`
  width: 39px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: rgb(117, 117, 117);
`;

const Row = styled.tr`
  height: 38px;
`;

const CalendarTable = props => (
  <Table>
    <thead>
      <tr>
        <Header>Su</Header>
        <Header>Mo</Header>
        <Header>Tu</Header>
        <Header>We</Header>
        <Header>Th</Header>
        <Header>Fr</Header>
        <Header>Sa</Header>
      </tr>
    </thead>
    <tbody>
      {
        props.dates.map((week, index) => {
          return (
            <Row key={index}>
              {
                week.map((date, index) => {
                  return (
                    <DateSquare
                      key={index}
                      date={date}
                      handleDateClick={props.handleDateClick}
                      startDate={props.startDate}
                      endDate={props.endDate}
                    />
                  );
                })
              }
            </Row>
          );
        })
      }
    </tbody>
  </Table>
);

CalendarTable.propTypes = {
  dates: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default CalendarTable;
