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
import dayjs from "dayjs";
import React from "react";

import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import {
  hideModal,
  selectTransfers,
  selectTransfersVisible,
} from "../store/reducers/transfers";

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  padding: 64px 10px;
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

export default function RecentTransactions() {
  const modalVisible = useAppSelector(selectTransfersVisible);
  const transfers = useAppSelector(selectTransfers);
  const dispatch = useAppDispatch();

  function handleClose() {
    dispatch(hideModal());
  }

  return (
    <StyledModal
      BackdropComponent={Backdrop}
      aria-describedby="unstyled-modal-description"
      aria-labelledby="unstyled-modal-title"
      closeAfterTransition
      onClose={handleClose}
      open={modalVisible}
    >
      <Box
        sx={{
          backgroundColor: "hsla(0,0%,100%,.95)",
          border: "1px solid #eee",
          borderRadius: "50px",
          maxWidth: 850,
          overflowY: "auto",
          padding: "50px",
          width: "100%",
        }}
      >
        <Typography
          color="textSecondary"
          sx={{mb: 2, textAlign: "center"}}
          variant="h1"
        >
          Recent transactions
        </Typography>
        <TableContainer>
          <Table aria-label="simple table" sx={{minWidth: 730}}>
            <TableHead>
              <TableRow>
                <TableCell>Direction</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Token</TableCell>
                <TableCell align="right">Sender</TableCell>
                <TableCell align="right">Recipient</TableCell>
                <TableCell align="right">Timestamp</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transfers.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{"&:last-child td, &:last-child th": {border: 0}}}
                >
                  <TableCell component="th" scope="row">
                    {row.direction}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{maxWidth: 100, overflowWrap: "break-word"}}
                  >
                    {row.amount}
                  </TableCell>
                  <TableCell align="right">UNKNOWN</TableCell>
                  <TableCell
                    align="right"
                    sx={{maxWidth: 100, overflowWrap: "break-word"}}
                  >
                    {row.sender}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{maxWidth: 100, overflowWrap: "break-word"}}
                  >
                    {row.receiver}
                  </TableCell>
                  <TableCell align="right">
                    {dayjs(row.createdAt).format("HH:MM DD-MM-YY")}
                  </TableCell>
                  <TableCell align="right">UNKNOWN</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </StyledModal>
  );
}
