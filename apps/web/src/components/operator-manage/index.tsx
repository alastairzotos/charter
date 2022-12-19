import { OperatorNoId } from 'dtos';
import React, { useState } from 'react';
import { Button, CircularProgress, Paper, TextField, Typography, Box } from '@mui/material';
import { FetchStatus } from '../../models';
import { DeleteOperatorModal } from './delete-modal';
import { useRouter } from 'next/router';
import { urls } from '../../urls';

interface Props {
  title: string;

  id?: string;
  operator: OperatorNoId;
  onSave: (operator: OperatorNoId) => void;
  saveStatus?: FetchStatus;

  onDelete?: () => Promise<void>;
  deleteStatus?: FetchStatus;
}

export const ManageOperatorForm: React.FC<Props> = ({ title, id, operator, onSave, saveStatus, onDelete, deleteStatus }) => {
  const router = useRouter();

  const [name, setName] = useState(operator.name);
  const [email, setEmail] = useState(operator.email);
  const [phoneNumber, setPhoneNumber] = useState(operator.phoneNumber);
  const [address, setAddress] = useState(operator.address);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const isValid = name.trim().length > 0 && email.trim().length > 0 && phoneNumber.trim().length > 0 && address.trim().length > 0;

  const isFetching = saveStatus === 'fetching' || deleteStatus === 'fetching';

  const handleDeleteOperator = async () => {
    if (!!onDelete) {
      await onDelete();
      router.push(urls.admin.operators());
    }
  }

  return (
    <Paper
      sx={{
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}
    >
      <Typography variant="h4">{title}</Typography>

      <TextField
        placeholder='Operator name'
        value={name}
        onChange={e => setName(e.target.value)}
        disabled={isFetching}
      />

      <TextField
        placeholder='Email'
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        disabled={isFetching}
      />

      <TextField
        placeholder='Phone'
        value={phoneNumber}
        onChange={e => setPhoneNumber(e.target.value)}
        disabled={isFetching}
      />

      <TextField
        placeholder='Address'
        value={address}
        onChange={e => setAddress(e.target.value)}
        disabled={isFetching}
        multiline
        rows={4}
      />

      <Box
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Button
          variant="contained"
          disabled={!isValid || isFetching}
          sx={{ maxWidth: '20%' }}
          onClick={() => onSave({
            name,
            email,
            phoneNumber,
            address,
            photo: '',
          })}
        >
          {saveStatus === 'fetching' ? <CircularProgress size={20} /> : 'Save'}
        </Button>

        {!!onDelete && (
          <Button
            disabled={isFetching}
            color="warning"
            onClick={() => setDeleteModalOpen(true)}
          >
            Delete
          </Button>
        )}
      </Box>

      {saveStatus === 'error' && <Typography>There was an error saving the operator data</Typography>}

      <DeleteOperatorModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleDeleteOperator}
        deleteStatus={deleteStatus}
      />
    </Paper>
  )
}
