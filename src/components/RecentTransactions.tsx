import {ModalUnstyled} from "@mui/base";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {Box, styled} from "@mui/system";
import React from "react";

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  padding: 50px 10px;
`;

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  backdrop-filter: blur(30px);
  background: linear-gradient(
    92.91deg,
    hsla(0, 0%, 100%, 0.06),
    hsla(0, 0%, 100%, 0) 109.76%
  );
`;

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return {
    calories,
    carbs,
    fat,
    name,
    protein,
  };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function ModalUnstyledDemo() {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button onClick={handleOpen} type="button">
        Open modal
      </button>
      <StyledModal
        BackdropComponent={Backdrop}
        aria-describedby="unstyled-modal-description"
        aria-labelledby="unstyled-modal-title"
        closeAfterTransition
        onClose={handleClose}
        open={open}
      >
        <Box
          sx={{
            backgroundColor: "hsla(0,0%,100%,.95)",
            border: "1px solid #eee",
            borderRadius: "50px",
            maxWidth: 650,
            overflowY: "auto",
            padding: "50px",
            width: "100%",
          }}
        >
          <Typography color="textSecondary" sx={{mb: 2}} variant="h1">
            Recent transactions
          </Typography>
          <TableContainer>
            <Table aria-label="simple table" sx={{minWidth: 530}}>
              <TableHead>
                <TableRow>
                  <TableCell>Dessert (100g serving)</TableCell>
                  <TableCell align="right">Calories</TableCell>
                  <TableCell align="right">Fat&nbsp;(g)</TableCell>
                  <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                  <TableCell align="right">Protein&nbsp;(g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{"&:last-child td, &:last-child th": {border: 0}}}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </StyledModal>
    </div>
  );
}
