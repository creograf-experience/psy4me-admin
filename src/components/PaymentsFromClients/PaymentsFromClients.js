import React, {Component} from "react";
import {today, yesterday} from "../../utils";
import {withStyles} from "@material-ui/styles";
import Title from "../Common/Title";
import {MobileCards, PersonTable} from "../Common";
import {filterPaymentStatusCategories} from "../../constants";
import Pagination from "../Common/Pagination/Pagination";
import {AddPayment} from "../Common/Modal/AddPayment";
import FilterPayments from "../Common/FilterPayments";

const styles = theme => ({
  payments: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    padding: 10
  },
  tableStyle: {
    display: "none",
    margin: 10,
    "@media (min-width: 1485px)": {
      display: "block"
    }
  }
});


class PaymentsFromClients extends Component {
  state = {
    str: "",
    paymentStatus: filterPaymentStatusCategories[0].value,
    from: yesterday(),
    to: today(),
    page: 0,
    size: 10,
    paymentOptions: [
      {
        name: "sber",
        checked: false,
        color: "primary",
        label: "На сбер"
      }, {
        name: "acquiring",
        checked: false,
        color: "primary",
        label: "Эквайринг"
      }, {
        name: "cashless",
        checked: false,
        color: "primary",
        label: "Безнал"
      }, {
        name: "gift",
        checked: false,
        color: "primary",
        label: "Подарок"
      }
    ],
  };

  componentDidMount() {
    this.props.getClients(this.props.token);
    this.filterPayments();
  }

  handleChange = event => {
    event.preventDefault();

    this.setState({
      page: 0,
      [event.target.name]: event.target.value
    }, () => this.filterPayments());
  };

  handleCheckboxChange = (event) => {
    event.preventDefault();

    this.setState({
      page: 0,
      paymentOptions: [...this.state.paymentOptions].map(payment =>
        payment.name === event.target.name
          ? {...payment, checked: event.target.checked}
          : payment
      )
    }, () => this.filterPayments());
  };

  handlePageChange = (event, newPage) => {
    event.preventDefault();

    this.setState({
      page: newPage
    }, () => this.filterPayments())
  }

  filterPayments = () => {
    const {str, paymentOptions, paymentStatus, from, to, page, size} = this.state;
    const {getPayments, token} = this.props;

    let data = {str, paymentOptions, from, to, page, size};
    data.type = 'client';

    if (paymentStatus !== 'all') {
      data.paymentStatus = paymentStatus;
    }

    getPayments(token, data);
  };

  render() {
    const {classes, payments, totalCount, clients} = this.props;
    const {str, paymentStatus, paymentOptions, from, to, page, size} = this.state;

    return (
      <div className={classes.payments}>
        <Title title={"Платежи от клиентов"} style={{marginBottom: 10}}/>

        <FilterPayments
          placeholder={"ФИО, email, телефон"}
          filterNameValue={str}
          textFieldName={"str"}
          handleChange={this.handleChange}
          filterCategoryValue={paymentStatus}
          filterData={filterPaymentStatusCategories}
          from={from}
          to={to}
          paymentOptions={paymentOptions}
          handleCheckboxChange={this.handleCheckboxChange}
          persons={clients}
        />

        <AddPayment
          type={"client"}
          persons={clients}
          personOptionName={"Клиент"}/>

        <Pagination page={page}
                    count={totalCount}
                    rowsPerPage={size}
                    handleChange={this.handlePageChange}/>

        <MobileCards
          data={payments}
          headerField={"avatar"}
          fields={[
            "date",
            "contact",
            "sum",
            "amountInHours",
            "status",
            "button"
          ]}
          linkTo={"/payments-from-clients"}
        />

        <PersonTable
          data={payments}
          fields={[
            "date",
            "fullName",
            "contact",
            "sum",
            "amountInHours",
            "paymentStatus",
            "button"
          ]}
          linkTo={"/payments-from-clients"}
          tableStyle={classes.tableStyle}
        />
      </div>
    );
  }
}

const PaymentsFromClientsComponent = withStyles(styles)(PaymentsFromClients);

export default PaymentsFromClientsComponent;