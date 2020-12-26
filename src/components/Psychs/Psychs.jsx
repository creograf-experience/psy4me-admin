import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { MobileCards, PersonTable, Filter } from "../Common";
import { filterPsychCategories } from "../../constants";

class Psychs extends Component {
  state = {
    filterName: "",
    filterCategory: filterPsychCategories[0]
  };

  componentDidMount() {
    this.props.getPsychs(this.props.token);
  }

  onChangeFilterName = e => {
    this.setState({ filterName: e.target.value });
  };

  onChangeFilterCategory = e => {
    this.setState({ filterCategory: e.target.value });
  };

  filterPsychs = () => {
    const { filterName, filterCategory } = this.state;
    const { psychs } = this.props;

    if (filterName.length) {
      return psychs.filter(
        psych =>
          psych.firstName.toLowerCase().indexOf(filterName.toLowerCase()) ===
            0 ||
          psych.lastName.toLowerCase().indexOf(filterName.toLowerCase()) ===
            0 ||
          psych.middleName.toLowerCase().indexOf(filterName.toLowerCase()) === 0
      );
    }
    if (filterCategory !== filterPsychCategories[0]) {
      return psychs.filter(psych => psych.banned);
    }
    return psychs;
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.psychs}>
        <Typography variant="h5" className={classes.title}>
          Психологи
        </Typography>

        <Filter
          placeholder={"ФИО, email, телефон"}
          filterNameValue={this.state.filterName}
          onChangeFilterName={this.onChangeFilterName}
          filterCategoryValue={this.state.filterCategory}
          onChangeFilterCategory={this.onChangeFilterCategory}
          filterData={filterPsychCategories}
        />

        <MobileCards
          data={this.filterPsychs()}
          headerField={"avatar"}
          fields={["email", "phoneMask", "city", "country", "button"]}
          linkTo={"/psych"}
        />

        <PersonTable
          data={this.filterPsychs()}
          fields={[
            "photo",
            "fullName",
            "email",
            "phoneMask",
            "city",
            "country",
            "button"
          ]}
          linkTo={"/psych"}
          tableStyle={classes.tableStyle}
        />
      </div>
    );
  }
}

const styles = theme => ({
  psychs: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 10
  },
  title: {
    margin: 10
  },
  tableStyle: {
    display: "none",
    margin: 10,
    "@media (min-width: 1485px)": {
      display: "block"
    }
  }
});

const PsychsComponent = withStyles(styles)(Psychs);

export default PsychsComponent;
