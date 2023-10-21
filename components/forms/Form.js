import { SafeAreaView, Text, StyleSheet, View } from "react-native";
import InputForm from "./InputForm";
import Button from "../common/Button";
import BottomText from "./BottomText";
import Logo from "../common/Logo";

const Form = ({ data, errors }) => {
  return (
    <View style={styles.container}>
      <Logo />

      <View style={styles.textContainer}>
        <Text style={styles.title}>{data.formTitle}</Text>
        <Text style={styles.text}> {data.formText} </Text>
      </View>

      <View style={styles.inputs}>
        {data.inputs.map((input, idx) => {
          return (
            <InputForm
              key={idx}
              label={input.label}
              value={input.value}
              setter={input.setter}
              secured={input.secured}
              errors={errors}
            />
          );
        })}
      </View>

      <View style={styles.bottom}>
        <Button handler={data.handlerSubmit} label={data.submitText} />
        <BottomText
          UrlText={data.bottomText.urlText}
          label={data.bottomText.label}
          Page={data.bottomText.page}
        />
      </View>
    </View>
  );
};
export default Form;

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 24,
    backgroundColor: "#fff",
    flex: 1,
  },
  textContainer: {
    alignItems: "center",
    gap: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "black",
  },
  text: { color: "#6D6D6D" },
  inputs: {
    width: "100%",
    gap: 10,
  },
  bottom: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
    gap: 16,
  },
});
