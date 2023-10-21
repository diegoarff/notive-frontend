import { useState } from "react";
import { Stack, useRouter } from "expo-router";

import Form from "../../components/forms/Form";
import { useSession } from "../../context/AuthContext";
import { AvoidKeyboard, LoadingModal } from "../../components";
import { View } from "react-native";
import Validator from "../validations";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errors, setErrors] = useState({}); 
  const router = useRouter();

  const { onRegister } = useSession();

  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({...prevState, [input]:errorMessage}));
  };
  const RegisterValidator = new Validator(handleError)

  const handler = async () => {
    setErrors({})
    let valPassword = RegisterValidator.validatePassword(password, 'Password')
    let valUsername = RegisterValidator.ValidateName(username, 'Username')   
    let valFirstName = RegisterValidator.ValidateName(firstName, 'First name')
    let valLastName = RegisterValidator.ValidateName(lastName, 'Last name')
    if (valFirstName && valLastName && valPassword && valUsername) {
        try {
          setIsModalVisible(true);
          const result = await onRegister({
            firstName,
            lastName,
            username,
            password,
          });
          if (result && result.error) {
            setIsModalVisible(false);
            alert(result.msg);
            return;
          }
    
          setIsModalVisible(false);
          router.replace("/login");
        } catch (error) {
          console.log(error);
        }
      }
   
  };

  const dataForm = {
    formTitle: "Sign Up",
    formText: "Create your account to enter the app",
    inputs: [
      {
        label: "First name",
        value: firstName,
        setter: setFirstName,
      },
      {
        label: "Last name",
        value: lastName,
        setter: setLastName,
      },
      {
        label: "Username",
        value: username,
        setter: setUsername,
      },
      {
        label: "Password",
        value: password,
        setter: setPassword,
        secured: true,
      },
    ],
    handlerSubmit: handler,
    submitText: "Create account",
    bottomText: {
      urlText: "Sign In",
      label: "Already have an account?",
      page: "/login",
    },
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />
      <LoadingModal visible={isModalVisible} />
      <AvoidKeyboard>
        <Form data={dataForm} errors={errors} />
      </AvoidKeyboard>
    </View>
  );
};
export default Register;
