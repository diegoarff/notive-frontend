import { useState } from "react";
import { Stack, useRouter } from "expo-router";
import Form from "../../components/forms/Form";
import { useSession } from "../../context/AuthContext";
import { SafeAreaView, View } from "react-native";
import { AvoidKeyboard, LoadingModal } from "../../components";
import Validator from "../validations";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errors, setErrors] = useState({}); 
  const { onLogin } = useSession();

  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({...prevState, [input]:errorMessage}));
  }

const LoginValidator = new Validator(handleError) 

  const handler = async () => {
    setErrors({})
   let valUsername =  LoginValidator.ValidateName(username, 'Username')   
   let valPassword = LoginValidator.validatePassword(password, 'Password')

    if (valPassword && valUsername) {
    try {
      setIsModalVisible(true);
      const result = await onLogin({ username, password });

      if (result.error) {
        setIsModalVisible(false);
        alert(result.msg);
        return;
      }

      setIsModalVisible(false);
      router.replace("/");
    } catch (error) {
      console.log(error);
    }  
    }
    
  };

  const dataForm = {
    formTitle: "Sign In",
    formText: "Sign in to enter the app",
    inputs: [
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
    submitText: "Login",
    bottomText: {
      urlText: "Sign Up",
      label: "Don’t have an account?",
      page: "/register",
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
export default Login;
