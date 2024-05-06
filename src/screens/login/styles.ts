import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  loginContainer: {
    marginTop: 32,
  },
  errorsText: {
    color: '#fc4444',
    fontSize: 10,
    marginLeft: 8,
  },
  title: {
    color: '#090909',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 48,
  },
  inputLabel: {
    color: '#323232',
    fontSize: 16,
    marginBottom: 8,
  },
  inputContainer: {
    gap: 32, // Spacing between input groups
  },
  input: {
    borderRadius: 8,
    borderColor: '#bcbcbc',
    // Borders as the task photo
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 3,
    borderLeftWidth: 3,
    // Padding vertical
    paddingVertical: 8,
    paddingHorizontal: 4,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#6d50f2',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 16,
    marginTop: 48,
  },
  submitButtoText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
});
