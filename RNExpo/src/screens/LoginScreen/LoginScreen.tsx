import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { Button, SegmentedButtons, Surface, Text, TextInput, useTheme } from 'react-native-paper';
import AuthHeader from '../../components/AuthHeader';
import { useLoginViewModel } from './useLoginViewModel';

export default function LoginScreen() {
  const theme = useTheme();
  const vm = useLoginViewModel();

  return (
    <KeyboardAvoidingView
      style={[styles.root, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <AuthHeader />

        <Surface style={styles.card} elevation={2}>
          <SegmentedButtons
            value={vm.mode}
            onValueChange={(v) => vm.handleModeChange(v as 'login' | 'signup')}
            buttons={[
              { value: 'login', label: 'Log In' },
              { value: 'signup', label: 'Sign Up' },
            ]}
            style={styles.segment}
          />

          {vm.mode === 'signup' && (
            <TextInput
              label="Full name"
              value={vm.name}
              onChangeText={vm.setName}
              autoCapitalize="words"
              style={styles.input}
              left={<TextInput.Icon icon="account" />}
            />
          )}

          <TextInput
            label="Email"
            value={vm.email}
            onChangeText={vm.setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            left={<TextInput.Icon icon="email" />}
          />

          <TextInput
            label="Password"
            value={vm.password}
            onChangeText={vm.setPassword}
            secureTextEntry={!vm.showPassword}
            style={styles.input}
            left={<TextInput.Icon icon="lock" />}
            right={
              <TextInput.Icon
                icon={vm.showPassword ? 'eye-off' : 'eye'}
                onPress={vm.toggleShowPassword}
              />
            }
          />

          {!!vm.error && (
            <Text style={[styles.errorText, { color: theme.colors.error }]}>{vm.error}</Text>
          )}

          <Button
            mode="contained"
            onPress={vm.handleSubmit}
            loading={vm.loading}
            disabled={vm.loading}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            {vm.mode === 'login' ? 'Log In' : 'Create Account'}
          </Button>
        </Surface>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  card: { borderRadius: 16, padding: 24 },
  segment: { marginBottom: 20 },
  input: { marginBottom: 12, backgroundColor: 'transparent' },
  errorText: { marginBottom: 8, fontSize: 13 },
  button: { marginTop: 8, borderRadius: 8 },
  buttonContent: { paddingVertical: 6 },
});
