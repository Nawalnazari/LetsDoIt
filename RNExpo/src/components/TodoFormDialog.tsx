import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Dialog, Text, TextInput } from 'react-native-paper';

interface Props {
  visible: boolean;
  title: string;
  submitLabel: string;
  formTitle: string;
  formDesc: string;
  formError: string;
  loading: boolean;
  onChangeTitle: (v: string) => void;
  onChangeDesc: (v: string) => void;
  onSubmit: () => void;
  onDismiss: () => void;
}

export default function TodoFormDialog({
  visible,
  title,
  submitLabel,
  formTitle,
  formDesc,
  formError,
  loading,
  onChangeTitle,
  onChangeDesc,
  onSubmit,
  onDismiss,
}: Props) {
  return (
    <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Content>
        <TextInput
          label="Title"
          value={formTitle}
          onChangeText={onChangeTitle}
          style={styles.input}
          autoFocus
        />
        <TextInput
          label="Description (optional)"
          value={formDesc}
          onChangeText={onChangeDesc}
          style={styles.input}
          multiline
          numberOfLines={3}
        />
        {!!formError && <Text style={styles.error}>{formError}</Text>}
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onDismiss}>Cancel</Button>
        <Button onPress={onSubmit} loading={loading} disabled={loading} mode="contained">
          {submitLabel}
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  dialog: { borderRadius: 16 },
  input: { marginBottom: 10, backgroundColor: 'transparent' },
  error: { color: 'red', fontSize: 13, marginTop: 4 },
});
