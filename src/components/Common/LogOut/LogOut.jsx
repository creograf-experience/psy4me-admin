import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

export const LogOut = withStyles({
  root: {
    width: 270,
    height: 60,
    backgroundColor: "red",
    "&:$hover": {
      backgroundColor: "white"
    }
  },
  label: {
    fontWeight: 400,
    textTransform: "capitalize",
    color: "white",
    fontSize: 18,
    "&:$hover": {
      color: "red"
    }
  }
})(Button);
