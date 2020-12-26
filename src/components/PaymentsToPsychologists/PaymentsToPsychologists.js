import React, {Component} from "react";
import {withStyles} from "@material-ui/styles";
import {filterPaymentStatusCategories} from "../../constants";
import {today, yesterday} from "../../utils";
import Title from "../Common/Title";
import FilterPayments from "../Common/FilterPayments";
import {AddPayment} from "../Common/Modal/AddPayment";
import Pagination from "../Common/Pagination/Pagination";
import {MobileCards, PersonTable} from "../Common";

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

class PaymentsToPsychologists extends Component {
  state = {
    str: "",
    paymentStatus: filterPaymentStatusCategories[0].value,
    from: yesterday(),
    to: today(),
    page: 0,
    size: 10
  };

  componentDidMount() {
    this.props.getPsychs(this.props.token);
    this.filterPayments();
  }

  handleChange = event => {
    event.preventDefault();

    this.setState({
      page: 0,
      [event.target.name]: event.target.value
    }, () => this.filterPayments());
  };

  handlePageChange = (event, newPage) => {
    event.preventDefault();

    this.setState({
      page: newPage
    }, () => this.filterPayments())
  }

  filterPayments = () => {
    const {str, paymentStatus, from, to, page, size} = this.state;
    const {getPayments, token} = this.props;

    let data = {str, from, to, page, size};

    data.type = 'psych';

    if (paymentStatus !== 'all') {
      data.paymentStatus = paymentStatus;
    }

    getPayments(token, data);
  };

  render() {
    const {classes, payments, totalCount, psychs} = this.props;
    const {str, paymentStatus, from, to, page, size} = this.state;

    return (
      <div className={classes.payments}>
        <Title title={"Выплаты психологам"} style={{marginBottom: 10}}/>

        <FilterPayments
          placeholder={"ФИО, email, телефон"}
          filterNameValue={str}
          textFieldName={"str"}
          handleChange={this.handleChange}
          filterCategoryValue={paymentStatus}
          filterData={filterPaymentStatusCategories}
          from={from}
          to={to}
          persons={psychs}
        />

        <AddPayment
          type={"psych"}
          persons={psychs}
          personOptionName={"Психолог"}/>

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
          linkTo={"/payments-to-psychologists"}
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
          linkTo={"/payments-to-psychologists"}
          tableStyle={classes.tableStyle}
        />

      </div>
    )
  }
}

const PaymentsToPsychologistsComponent = withStyles(styles)(PaymentsToPsychologists);

export default PaymentsToPsychologistsComponent;