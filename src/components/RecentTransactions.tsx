import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";

import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import {
  hideModal,
  selectTransfers,
  selectTransfersVisible,
} from "../store/reducers/transfers";
import Backdrop from "./Backdrop";
import Modal from "./Modal";
import ModalContainer from "./ModalContainer";

export default function RecentTransactions() {
  const modalVisible = useAppSelector(selectTransfersVisible);
  const transfers = useAppSelector(selectTransfers);
  const dispatch = useAppDispatch();

  function handleClose() {
    dispatch(hideModal());
  }

  return (
    <Modal
      BackdropComponent={Backdrop}
      aria-describedby="unstyled-modal-description"
      aria-labelledby="unstyled-modal-title"
      closeAfterTransition
      onClose={handleClose}
      open={modalVisible}
    >
      <ModalContainer
        sx={{
          background: "rgba(255, 255, 255, 0.95)",
          maxWidth: 850,
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
                  <TableCell align="right">{row.token.symbol}</TableCell>
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
                  <TableCell align="right">{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ModalContainer>
    </Modal>
  );
}
