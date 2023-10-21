import { SafeAreaView, StyleSheet, Text, TextInput } from "react-native";

const InputForm = ({ label, value, setter, secured = false, errors}) => {
  const styles = StyleSheet.create({
    container: {
      width: "100%",
    },
    text: {
      fontWeight: "bold",
    },
    input: {
      borderBottomWidth: 1,
      paddingVertical: 4,
      borderColor:(errors[label]) ? 'red' : 'black'
    },
    error: {
      fontSize: 12,
      color: 'red',
    }
  });
  
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>{value != "" && label}</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={secured}
        onChangeText={setter}
        value={value}
        placeholder={label}
        keyboardType="default"
      />
      <Text style={styles.error}>{(errors[label])&& errors[label]}</Text>
    </SafeAreaView>
  );
};

export default InputForm;

