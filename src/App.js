import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddCircle from "@mui/icons-material/AddCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import Input from "@mui/material/Input";
const ariaLabel = { "aria-label": "description" };

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showHide: false,
      Values:
        localStorage.getItem("Values") === null
          ? []
          : typeof localStorage.getItem("Values") === "string"
          ? JSON.parse(localStorage.getItem("Values"))
          : localStorage.getItem("Values"),
      id: this.Values ? this.Values.length : 0,
      textvalue: "",
      textsubvalue: "",
      divshowhide: false,
      currentPage: 0,
      PerPagecount: 4,
      tempval: 0,
    };
    this.Addvalue = this.Addvalue.bind(this);
  }

  Noticeclick = (e) => {
    console.log(e);
    this.setState({ divshowhide: true });
    this.setState({ id: e.children[0] });
    this.setState({ textvalue: e.children[1] });
    this.setState({ textsubvalue: e.children[2] });
  };
  Item = (props) => {
    const { sx, ...other } = props;
    if (
      props.children !== "No information" &&
      props.children !== "" &&
      props.children !== null
    ) {
      return (
        <Box
          sx={{
            mt: 2,
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#101010" : "#fff",
            color: (theme) =>
              theme.palette.mode === "dark" ? "grey.300" : "grey.800",
            border: "1px solid",
            borderColor: (theme) =>
              theme.palette.mode === "dark" ? "grey.800" : "grey.300",
            p: 1,
            m: 1,
            "&:hover": {
              backgroundColor: "primary.dark",
              opacity: [0.9, 0.8, 0.7],
            },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "31px",
            padding: "1px",
            borderRadius: 2,
            fontSize: "0.875rem",
            fontWeight: "700",
            ...sx,
          }}
          {...other}
        >
          <div
            style={{
              width: "90%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              paddingLeft: "9px",
            }}
            onClick={() => this.Noticeclick(props)}
          >
            <label>{props.children[1]}</label>
          </div>
          <Button
            variant="contained"
            sx={{
              width: "25px !important",
            }}
            startIcon={<DeleteIcon sx={{ marginLeft: "8px" }} />}
            onClick={() => this.handleDelete(props.children[0])}
          ></Button>
        </Box>
      );
    } else {
      return (
        <Box
          sx={{
            mt: 2,
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#101010" : "#fff",
            color: (theme) =>
              theme.palette.mode === "dark" ? "grey.300" : "grey.800",
            border: "1px solid",
            borderColor: (theme) =>
              theme.palette.mode === "dark" ? "grey.800" : "grey.300",
            p: 1,
            m: 1,
            "&:hover": {
              backgroundColor: "primary.dark",
              opacity: [0.9, 0.8, 0.7],
            },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 2,
            fontSize: "0.875rem",
            fontWeight: "700",
            ...sx,
          }}
          {...other}
        >
          <label>
            {props.children === "No information"
              ? props.children
              : "No information"}
          </label>
        </Box>
      );
    }
  };
  handleDelete(e) {
    const listval =
      typeof localStorage.getItem("Values") === "string"
        ? JSON.parse(localStorage.getItem("Values"))
        : localStorage.getItem("Values");
    const newList = listval.filter((item) => item[0] !== e);
    localStorage.setItem("Values", JSON.stringify(newList));
    this.setState({ Values: newList });
    this.resetfields();
  }
  Addvalue(evt) {
    //console.log(this.state.Values);
    //if (this.state.textsubvalue.length > 0) {
    evt.preventDefault();
    if (localStorage.getItem("Values") === null) {
      localStorage.setItem("Values", []);
    }
    let tasks = [];

    // tasks =
    //   Object.keys(this.state.Values).length === 0
    //     ? []
    //     : typeof this.state.Values === "string"
    //     ? JSON.parse(this.state.Values)
    //     : this.state.Values;
    tasks =
      Object.keys(localStorage.getItem("Values")).length === 0
        ? []
        : typeof localStorage.getItem("Values") === "string"
        ? JSON.parse(localStorage.getItem("Values"))
        : localStorage.getItem("Values");
    let totallength = tasks.length + 1;
    let textvalue = this.state.textvalue;
    let textsubvalue = this.state.textsubvalue;
    //tasks.push({ title: textvalue, Content: textsubvalue });
    tasks.push([totallength, textvalue, textsubvalue]);
    localStorage.setItem("Values", JSON.stringify(tasks));
    this.setState({ textvalue: "" });
    this.setState({ textsubvalue: "" });
    this.setState({ Values: tasks });
    this.setState({ showHide: false });
    //}
    //console.log(this.state.Values);
  }
  resetfields = () => {
    this.setState({ divshowhide: false });
    this.setState({ showHide: false });
    this.setState({ textsubvalue: "" });
    this.setState({ textvalue: "" });
    this.setState({ id: 0 });
  };

  backbutton = (e) => {
    this.resetfields();
  };
  savebutton = (e) => {
    console.log(e);
    let tasks =
      Object.keys(localStorage.getItem("Values")).length === 0
        ? []
        : typeof localStorage.getItem("Values") === "string"
        ? JSON.parse(localStorage.getItem("Values"))
        : localStorage.getItem("Values");
    console.log(tasks);
    let newMarkers = tasks.map((el) =>
      el[0] === e.id ? [e.id, e.textvalue, e.textsubvalue] : el
    );
    localStorage.setItem("Values", JSON.stringify(newMarkers));
    this.setState({ Values: newMarkers });
    this.resetfields();
  };
  updateInput = (evt) => {
    //this.setState({ textvalue: evt.target.value });
    if (!this.state.divshowhide) {
      var lnv =
        localStorage.getItem("Values") === null
          ? []
          : typeof localStorage.getItem("Values") === "string"
          ? JSON.parse(localStorage.getItem("Values"))
          : localStorage.getItem("Values");
      if (evt.target.value.length >= 1) {
        console.log(lnv.filter((val) => val[1].includes(evt.target.value)));
        this.setState({
          Values: lnv.filter((val) => val[1].includes(evt.target.value)),
          showHide: true,
          textvalue: evt.target.value,
        });
        // this.setState({  });
      } else {
        this.setState({ Values: lnv, showHide: false });
        //this.setState({  });
      }
    }
  };
  updatesubInput = (evt) => {
    this.setState({ textsubvalue: evt.target.value });
  };
  handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.charCode === 13 && this.state.textvalue.length > 0) {
      this.setState({ showHide: true });
    }
  };
  handlesubKeypress = (e) => {
    if (e.ctrlKey && e.charCode === 13 && this.state.textsubvalue.length > 0) {
      this.Addvalue(e);
      this.setState({ showHide: false });
    }
  };
  Notesman = (e) => {
    if (this.state.showHide) {
      return (
        <>
          <Stack direction="row" justifyContent="center">
            <Box
              component="div"
              sx={{
                "& > :not(style)": {
                  m: 1,
                  width: "39%",
                },
                display: "contents",
              }}
              noValidate
              autoComplete="off"
            >
              <Input
                placeholder="Enter Your Notice"
                value={this.state.textvalue}
                onChange={this.updateInput}
                onKeyPress={this.handleKeypress}
                inputProps={ariaLabel}
              />
            </Box>
          </Stack>
          <Stack direction="row" justifyContent="center">
            <Box
              component="div"
              sx={{
                "& > :not(style)": {
                  m: 1,
                  width: "50ch",
                },
                display: "contents",
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-multiline-static"
                label="Notice"
                multiline
                rows={4}
                value={this.state.textsubvalue}
                onChange={this.updatesubInput}
                onKeyPress={this.handlesubKeypress}
                defaultValue="Enter Your Notice"
              />
              {/* <Input
                placeholder="Enter Your Notice"
                value={this.state.textsubvalue}
                onChange={this.updatesubInput}
                inputProps={ariaLabel}
              /> */}

              <Button
                variant="contained"
                sx={{
                  width: "92px !important",
                }}
                startIcon={<AddCircle />}
                onClick={this.Addvalue}
              >
                Add
              </Button>
            </Box>
          </Stack>
        </>
      );
    } else {
      return (
        <Stack direction="row" justifyContent="center">
          <Box
            component="div"
            sx={{
              "& > :not(style)": {
                m: 1,
                width: "39%",
              },
              display: "contents",
            }}
            noValidate
            autoComplete="off"
          >
            <Input
              placeholder="Enter Your Notice"
              value={this.state.textvalue}
              onChange={this.updateInput}
              onKeyPress={this.handleKeypress}
              inputProps={ariaLabel}
            />
          </Box>
        </Stack>
      );
    }
  };
  paginate = (e) => {
    console.log(e);
  };
  render() {
    if (!this.state.divshowhide) {
      var vals =
        localStorage.getItem("Values") === null
          ? []
          : typeof localStorage.getItem("Values") === "string"
          ? JSON.parse(localStorage.getItem("Values"))
          : localStorage.getItem("Values");

      console.log(
        this.state.currentPage * this.state.PerPagecount,
        this.state.currentPage * this.state.PerPagecount +
          this.state.PerPagecount
      );
      var startvale = this.state.currentPage * this.state.PerPagecount,
        endvalu = startvale + this.state.PerPagecount;
      var ee = vals.slice(startvale, endvalu);

      return (
        <div style={{ margin: "50px" }}>
          <this.Notesman />
          <Stack direction="row" justifyContent="center">
            <Box
              component="div"
              sx={{
                "& > :not(style)": {
                  m: 1,
                  width: "39%",
                },
                mx: "2px",
                transform: "scale(0.8)",
                display: "contents",
              }}
              noValidate
              autoComplete="off"
            >
              <Box sx={{ display: "grid", gridTemplateRows: "repeat(3, 1fr)" }}>
                {vals.length !== 0 ? (
                  ee.map((Va) => <this.Item>{Va}</this.Item>)
                ) : (
                  <this.Item>No information</this.Item>
                )}
              </Box>
            </Box>
          </Stack>
          <Stack direction="row" justifyContent="center">
            <Pagination
              count={Math.ceil(vals.length / this.state.PerPagecount) - 1}
              onChange={(event, page) =>
                this.setState({
                  currentPage: page,
                  tempval: page,
                })
              }
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </div>
      );
    } else {
      return (
        <div style={{ margin: "50px" }}>
          <this.Notesman />
          <Stack direction="row" justifyContent="left">
            <Box
              component="div"
              sx={{
                "& > :not(style)": {
                  m: 1,
                  width: "39%",
                },
                mx: "2px",
                transform: "scale(0.8)",
                display: "contents",
              }}
              noValidate
              autoComplete="off"
            >
              <Button
                variant="contained"
                sx={{
                  width: "92px !important",
                  left: "30%",
                }}
                startIcon={<ArrowBackIcon />}
                onClick={this.backbutton}
              ></Button>
              <Button
                variant="contained"
                sx={{
                  width: "92px !important",
                  left: "55%",
                }}
                startIcon={<SaveRoundedIcon />}
                onClick={() => this.savebutton(this.state)}
              ></Button>
            </Box>
          </Stack>
          <Stack direction="row" justifyContent="center">
            <Box
              component="div"
              sx={{
                "& > :not(style)": {
                  m: 1,
                  width: "39%",
                },
                display: "contents",
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-multiline-static"
                label="Notice"
                multiline
                rows={4}
                value={this.state.textsubvalue}
                onChange={this.updatesubInput}
                onKeyPress={this.handlesubKeypress}
                defaultValue="Enter Your Notice"
              />
            </Box>
          </Stack>
        </div>
      );
    }
  }
}

export default App;
