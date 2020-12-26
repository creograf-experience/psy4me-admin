import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


export default function CheckboxGroup({
                                        checkboxes,
                                        handleChange,
                                      }) {
  return (
    <FormGroup row>
      {checkboxes && checkboxes.map(({checked, name, color, label}) =>
        <FormControlLabel
          key={name}
          control={
            <Checkbox
              checked={checked}
              onChange={handleChange}
              name={name}
              color={color}
            />
          }
          label={label}
        />
      )}
    </FormGroup>
  );
}