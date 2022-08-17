import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import { axiosPublic } from "../api/axiosPublic";
import { Button } from "@mui/material";

export default function Delete() {
  const [id, setId] = React.useState("");

  const handleSubmit = () => {
    axiosPublic
      .post("/deleteStudent", {
        id,
      })
      .then((res) => {
        console.log(res);
        setId("");
      });
  };
  return (
    <Box sx={{ minWidth: 275, maxWidth: 575 }}>
      <Card>
        <React.Fragment>
          <CardContent>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 2.5, width: "40ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                {console.log(id)}
                <TextField
                  required
                  id="outlined-required"
                  label="id"
                  onChange={(e) => setId(e.target.value)}
                  value={id}
                />
              </div>
            </Box>
            <Button onClick={() => handleSubmit()} variant="contained">
              Delete student
            </Button>
          </CardContent>
        </React.Fragment>
      </Card>
    </Box>
  );
}
