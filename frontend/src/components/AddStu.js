import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';


const input = (
    <Box
    component="form"
    sx={{
      '& .MuiTextField-root': { m: 2.5, width: '40ch' },
    }}
    noValidate
    autoComplete="off"
  >
    <div>
      <TextField
        required
        id="outlined-required"
        label="Name"
      />
    <TextField
        required
        id="outlined-required"
        label="age"
      />
       <TextField
        required
        id="outlined-required"
        label=""
      />

    </div>
  </Box>
)


const card = (
    <React.Fragment>
      <CardContent>
  {input}
      </CardContent>
    
    </React.Fragment>
  );




export default function OutlinedCard() {
  return (
    <Box sx={{ minWidth: 275 ,  maxWidth: 575  }}>
      <Card >{card}</Card>
    </Box>
  );
}
