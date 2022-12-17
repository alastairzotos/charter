import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FetchStatus } from '../../models';
import { CircularProgress } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

interface Props {
  open: boolean;
  onClose: () => void;
  onDelete?: () => void;
  deleteStatus?: FetchStatus;
}

export const DeleteOperatorModal: React.FC<Props> = ({ open, onClose, onDelete, deleteStatus }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Delete operator?
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Are you sure you want to delete this operator?
        </Typography>

        <Box
          sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}
        >
          <Button onClick={onClose}>Cancel</Button>

          <Button
            color="warning"
            onClick={onDelete}
          >
            {deleteStatus === 'fetching' ? <CircularProgress size={20} /> : 'Delete'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
