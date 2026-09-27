import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Dialog, Text, useTheme } from 'react-native-paper';

interface Props {
  visible: boolean;
  itemName?: string;
  onConfirm: () => void;
  onDismiss: () => void;
}

export default function DeleteConfirmDialog({ visible, itemName, onConfirm, onDismiss }: Props) {
  const theme = useTheme();

  return (
    <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
      <Dialog.Title>Delete Task</Dialog.Title>
      <Dialog.Content>
        <Text>Are you sure you want to delete "{itemName}"?</Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onDismiss}>Cancel</Button>
        <Button onPress={onConfirm} textColor={theme.colors.error}>
          Delete
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  dialog: { borderRadius: 16 },
});
