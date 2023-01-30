import { OperatorNoId } from 'dtos';
import React, { useState } from 'react';
import { Button, CircularProgress, Paper, TextField, Typography, Box, Avatar } from '@mui/material';
import { FetchStatus } from '../../models';
import { useRouter } from 'next/router';
import { urls } from '../../urls';
import { ImageDropzone } from '../image-dropzone';
import { DeleteConfirmModal } from '../modals/delete-confirm';

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
  const [description, setDescription] = useState(operator.description);
  const [photo, setPhoto] = useState(operator.photo);

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

      <TextField
        placeholder='Description'
        value={description}
        onChange={e => setDescription(e.target.value)}
        disabled={isFetching}
        multiline
        rows={4}
      />

      <ImageDropzone
        multiple={false}
        onReceiveUrls={urls => {
          setPhoto(urls[0])
        }}
      >
        <Avatar src={photo} sx={{ width: 128, height: 128 }} />
      </ImageDropzone>

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
            description,
            photo,
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

      <DeleteConfirmModal
        title="Delete operator?"
        content="Are you sure you want to delete this operator?"
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleDeleteOperator}
        deleteStatus={deleteStatus}
      />
    </Paper>
  )
}
