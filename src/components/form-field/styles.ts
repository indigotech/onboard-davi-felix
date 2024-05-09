import {StyleSheet} from 'react-native';

export const formFieldStyles = StyleSheet.create({
  errorsText: {
    color: '#fc4444',
    fontSize: 10,
    marginLeft: 8,
  },
  inputLabel: {
    color: '#323232',
    fontSize: 16,
    marginBottom: 8,
  },
  inputContainer: {
    gap: 32, // Spacing between input groups
    marginTop: 40,
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
});
