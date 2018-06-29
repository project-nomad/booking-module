import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styled from 'styled-components';
import CalendarHeader from './CalendarHeader';
import CalendarTable from './CalendarTable';

const OuterDiv = styled.div`
  display: inline;
  position: absolute;
  z-index:1000;
  font-family: Helvetica Neue,sans-serif;
  background-color: #ffffff;
`;

const MainDiv = styled.div`
  position: relative;
  width: 326px;
  height: 330px;
  border: 1px solid #DBDBDB;
  border-radius: 3px;
  text-align: left;
`;

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];

    this.state = ({
      currentDate: new Date(),
      month: 0,
      year: 0,
      reservedDates: [],
      dates: [],
      selectedStartDate: '',
      selectedEndDate: '',
    });

    this.handleDateClick = this.handleDateClick.bind(this);
    this.handleRightArrowClick = this.handleRightArrowClick.bind(this);
    this.handleLeftArrowClick = this.handleLeftArrowClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      startOfMonth: new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth(), 1),
      month: this.state.currentDate.getMonth(),
      year: this.state.currentDate.getUTCFullYear(),
    }, () => this.getReservedDates());
  }

  getReservedDates() {
    const url = `/listings/${this.props.listingId}/booking/availability/?begin_date=${this.state.year}-${this.state.month + 1}-01&end_date=${this.state.year}-${this.state.month + 2}-01`;
    axios.get(url)
      .then((response) => {
        this.setState({
          reservedDates: response.data.rows,
        }, () => this.calculateCalendarMatrix());
      })
      .catch(error => console.log(error)); // TO DO: what is correct error handling?
  }

  calculateCalendarMatrix() {
    const dateMatrix = [[]];
    const { startOfMonth } = this.state;

    const currentDate = new Date();
    const firstDay = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth(), 1);
    const lastDay = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0);

    const dayOfWeekOfFirstDay = firstDay.getDay();
    const lastDate = lastDay.getDate();

    // fill beginning of first week array with empty dates
    for (let i = 0; i < dayOfWeekOfFirstDay; i += 1) {
      dateMatrix[0].push({ value: 0 });
    }

    let isAvailable = true;
    for (let i = 1; i <= lastDate; i += 1) {
      // get availability
      this.state.reservedDates.forEach((reservation) => {
        const start = new Date(reservation.begin_date);
        const end = new Date(reservation.end_date);

        if (currentDate.getMonth() === this.state.month && currentDate.getDate() >= i) {
          isAvailable = false;
        }

        if (end.getMonth() === this.state.month && end.getDate() === i) {
          isAvailable = !isAvailable;
        }

        if (start.getMonth() === this.state.month && start.getDate() === i) {
          isAvailable = !isAvailable;
        }
      });

      const dateObj = { value: i, available: isAvailable };

      if (dateMatrix[dateMatrix.length - 1].length < 7) {
        dateMatrix[dateMatrix.length - 1].push(dateObj);
      } else {
        dateMatrix.push([dateObj]);
      }
    }

    // fill end of last week array with empty dates
    while (dateMatrix[dateMatrix.length - 1].length < 7) {
      dateMatrix[dateMatrix.length - 1].push({ value: 0 });
    }

    this.setState({
      dates: dateMatrix,
    });
  }

  handleRightArrowClick() {
    this.setState({
      startOfMonth: new Date(this.state.startOfMonth.getFullYear(), this.state.startOfMonth.getMonth() + 1, 1),
    }, () => {
      this.setState({
        month: this.state.startOfMonth.getMonth(),
        year: this.state.startOfMonth.getUTCFullYear(),
      }, () => this.getReservedDates());
    });
  }

  handleLeftArrowClick() {
    if ((this.state.year === this.state.currentDate.getFullYear() && this.state.month > this.state.currentDate.getMonth()) || this.state.year > this.state.currentDate.getFullYear()) {
      this.setState({
        startOfMonth: new Date(this.state.startOfMonth.getFullYear(), this.state.startOfMonth.getMonth() - 1, 1),
      }, () => {
        this.setState({
          month: this.state.startOfMonth.getMonth(),
          year: this.state.startOfMonth.getUTCFullYear(),
        }, () => this.getReservedDates());
      });
    }
  }

  handleDateClick(select, date) {
    if (select) {
      if (this.state.selectedStartDate === '') {
        this.setState({
          selectedStartDate: date,
        });
      } else {
        this.setState({
          selectedEndDate: date,
        }, () => {
          const fullStartDate = `${this.state.year}-${this.state.month}-${this.state.selectedStartDate}`;
          const fullEndDate = `${this.state.year}-${this.state.month}-${this.state.selectedEndDate}`;
          this.props.handleDateSelection(fullStartDate, fullEndDate);
        });
      }
    } else if (!select) {
      if (!this.state.selectedEndDate) {
        this.setState({
          selectedStartDate: '',
        });
      } else {
        this.setState({
          selectedEndDate: '',
        }, () => {
          const fullStartDate = `${this.state.year}-${this.state.month}-${this.state.selectedStartDate}`;
          this.props.handleDateSelection(fullStartDate, '');
        });
      }
    }
  }


  render() {
    return (
      <OuterDiv>
        <MainDiv>
          <CalendarHeader
            month={this.monthNames[this.state.month]}
            year={this.state.year}
            handleRightArrowClick={this.handleRightArrowClick}
            handleLeftArrowClick={this.handleLeftArrowClick}
          />
          <CalendarTable
            dates={this.state.dates}
            handleDateClick={this.handleDateClick}
            startDate={this.state.selectedStartDate}
            endDate={this.state.selectedEndDate}
          />
        </MainDiv>
      </OuterDiv>
    );
  }
}

Calendar.propTypes = {
  listingId: PropTypes.string.isRequired,
  handleDateSelection: PropTypes.func.isRequired,
};

export default Calendar;
