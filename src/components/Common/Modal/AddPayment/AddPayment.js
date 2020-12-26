import React, {useEffect, useState} from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  OutlinedInput,
  Select,
  TextField
} from "@material-ui/core";
import {
  CONFIRM_ADD_PAYMENT,
  filterCurrenciesCategories,
  filterPaymentOptionsCategories,
  filterPaymentStatusCategories,
  SUCCESS_ADD_PAYMENT,
} from "../../../../constants";
import DateTimePicker from "../../DateTimePicker";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  containerButton: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 10
  },
  dialog: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  dialogTitle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  datePicker: {
    marginRight: 10,
    marginBottom: 10,
  },
  formControl: {
    marginRight: 10,
    marginBottom: 10,
    width: 220
  },
  sum: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10
  },
  sumField: {
    width: 100
  },
  sumInput: {
    width: 100,
    marginLeft: 20
  },
  disabledInput: {
    color: theme.palette.text.primary,
  },
}));

const BaseSelect = ({
                      addClass,
                      value,
                      handleChange,
                      data,
                      name,
                      label,
                      required = false,
                      labelWidth = 120
                    }) => {
  return (
    <FormControl required={required} variant="outlined" className={addClass}>
      <InputLabel htmlFor="option-select">{label}</InputLabel>
      <Select
        displayEmpty
        value={value}
        onChange={handleChange}
        input={
          <OutlinedInput
            labelWidth={labelWidth}
            name={name}
            id={`${name}-select`}
          />
        }
      >
        {data && data.map(({value, name}) => (
          <MenuItem value={value} key={value}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default function AddPaymentComponent({
                                              token,
                                              modalConfirmAddPayment,
                                              modalSuccessAddPayment,
                                              openModal,
                                              closeModal,
                                              addPayment,
                                              persons,
                                              type,
                                              personOptionName
                                            }) {
  const [paymentOption, setPaymentOption] = useState(filterPaymentOptionsCategories[0].value);
  const [paymentStatus, setPaymentStatus] = useState(filterPaymentStatusCategories[1].value);
  const [currency, setCurrency] = useState(filterCurrenciesCategories[0].value);
  const [dateTime, setDateTime] = useState(new Date().toISOString().slice(0, 16));
  const [sum, setSum] = useState(0);
  const [amount, setAmount] = useState(1);
  const [price, setPrice] = useState(0);
  const [person, setPerson] = useState("");


  const handleChange = (setFunc, event) => {
    event.preventDefault();

    setFunc(event.target.value);
  }

  useEffect(() => {
    setSum(amount * price);
  }, [price, amount])

  const handleChangeSum = (func, event) => func(event.target.value);

  const handleAddPayment = () => {
    if (!person) {
      return;
    }

    addPayment(token, {
      type,
      person,
      currency,
      paymentOption,
      paymentStatus,
      dateTime,
      sum
    });
  }

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.containerButton}>
        <Button
          variant="outlined"
          onClick={() => openModal(CONFIRM_ADD_PAYMENT)}
        >
          Добавить платёж
        </Button>
      </div>

      <Dialog className={classes.dialog} open={modalConfirmAddPayment}>
        <DialogTitle className={classes.dialogTitle}>
          Добавить платёж
        </DialogTitle>

        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{paddingLeft: 10}}
        >
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="person-select">{personOptionName}</InputLabel>
            <Select
              value={person}
              onChange={(event) => handleChange(setPerson, event)}
              input={<OutlinedInput name={"person"} labelWidth={55}/>}
            >
              {persons.map(({_id, firstName, middleName, lastName}) => (
                <MenuItem value={_id} key={_id}>
                  {`${firstName} ${middleName} ${lastName}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <BaseSelect addClass={classes.formControl}
                      name={"paymentOption"}
                      value={paymentOption}
                      handleChange={(e) => handleChange(setPaymentOption, e)}
                      label={"Способ оплаты"}
                      data={filterPaymentOptionsCategories}/>

          <DateTimePicker value={dateTime}
                          handleChange={(e) => handleChange(setDateTime, e)}
                          name={"dateTime"}
                          addStyle={classes.datePicker}/>

          <BaseSelect addClass={classes.formControl}
                      name={"paymentStatus"}
                      value={paymentStatus}
                      handleChange={(e) => handleChange(setPaymentStatus, e)}
                      label={"Статус"}
                      data={filterPaymentStatusCategories}/>

          <div className={classes.sum}>
            <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
              <TextField
                variant="outlined"
                name={"price"}
                type="number"
                label={"Цена"}
                value={price}
                InputProps={{inputProps: {min: 0, max: 1000000}}}
                onChange={(event) => handleChangeSum(setPrice, event)}
                className={classes.sumField}
              />
              <div style={{marginLeft: 8, marginRight: 8}}>*</div>
              <TextField
                variant="outlined"
                name={"amount"}
                type="number"
                label={"Кол-во"}
                value={amount}
                InputProps={{inputProps: {min: 1, max: 1000}}}
                onChange={(event) => handleChangeSum(setAmount, event)}
                className={classes.sumField}
              />
            </div>
            <div style={{marginTop: 10}}>
              <TextField
                variant="outlined"
                name={"sum"}
                type="number"
                label={"Сумма"}
                value={sum}
                aria-readonly
                disabled
                InputProps={{classes: {disabled: classes.disabledInput}}}
                className={classes.sumField}
              />

              <BaseSelect addClass={classes.sumInput}
                          value={currency}
                          name={"currency"}
                          handleChange={(e) => handleChange(setCurrency, e)}
                          label={"Валюта"}
                          labelWidth={60}
                          data={filterCurrenciesCategories}/>
            </div>
          </div>
        </Grid>

        <DialogActions>
          <Button
            variant="outlined"
            onClick={handleAddPayment}
          >
            Добавить
          </Button>

          <Button
            variant="outlined"
            onClick={() => closeModal(CONFIRM_ADD_PAYMENT)}
          >
            Нет
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={modalSuccessAddPayment}>
        <DialogTitle>Платёж добавлен</DialogTitle>

        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => closeModal(SUCCESS_ADD_PAYMENT)}
          >
            ок
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}