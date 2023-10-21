import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { Stack } from "expo-router";
import { useSession } from "../../context/AuthContext";
import {
  Button,
  InputForm,
  AvoidKeyboard,
  LoadingModal,
} from "../../components";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProfile,
  changePassword,
  updateProfile,
  deleteAccount,
} from "../../api/profile";
import Validator from "../validations";

const Profile = () => {
  const { onLogout, userId } = useSession();

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errors, setErrors] = useState({});
  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };
  const queryClient = useQueryClient();
  const ProfileValidator = new Validator(handleError);
  const { data, error, status } = useQuery(["profile", userId], () =>
    getProfile(userId)
  );

  useEffect(() => {
    if (status === "success") {
      setUsername(data.username);
      setFirstName(data.firstName);
      setLastName(data.lastName);
    }
  }, [status, data]);

  // Mutations and handlers (update profile, change password, delete account)
  const updateProfileMutation = useMutation({
    mutationFn: () => updateProfile(userId, { username, firstName, lastName }),
    onSuccess: () => {
      queryClient.invalidateQueries("profile");
      alert("Profile updated successfully");
      onLogout();
    },
    onError: (error) => {
      alert("Error updating profile: ", error);
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: () =>
      changePassword(userId, {
        oldPassword,
        newPassword,
        confirmNewPassword,
      }),
    onSuccess: () => {
      alert("Password changed successfully");
      onLogout();
    },
    onError: (error) => {
      alert("Error changing password: ", error);
    },
  });

  const deleteAccountMutation = useMutation({
    mutationFn: () => deleteAccount(userId),
    onSuccess: () => {
      alert("Account deleted successfully");
      onLogout();
    },
    onError: (error) => {
      alert("Error deleting account: ", error);
    },
  });

  if (status === "error") {
    return alert("Error loading profile: ", error);
  }

  const handleUpdateProfile = () => {
    setErrors({});
    let valUsername = ProfileValidator.ValidateName(username, "Username");
    let valFirstName = ProfileValidator.ValidateName(firstName, "First name");
    let valLastName = ProfileValidator.ValidateName(lastName, "Last name");
    if (valFirstName && valLastName && valUsername) {
      try {
        updateProfileMutation.mutate();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChangePassword = () => {
    setErrors({});
    let valNewPassword = ProfileValidator.validatePassword(
      newPassword,
      "New password"
    );
    let valOldPassword = ProfileValidator.validatePassword(
      oldPassword,
      "Old password"
    );
    let valConfirmPass = ProfileValidator.validatePassword(
      confirmNewPassword,
      "Confirm new password"
    );
    if (
      valConfirmPass &&
      valNewPassword &&
      valOldPassword &&
      confirmNewPassword == newPassword
    ) {
      try {
        changePasswordMutation.mutate();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <LoadingModal
        visible={
          updateProfileMutation.isLoading || changePasswordMutation.isLoading
        }
      />

      <SafeAreaView style={styles.container}>
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerShadowVisible: false,
            headerTitle: "Profile",
          }}
        />

        {status === "loading" ? (
          <ActivityIndicator size="large" color="#000000" />
        ) : (
          <AvoidKeyboard>
            <View style={styles.contentContainer}>
              <View>
                <Text style={styles.title}>Update your profile</Text>
                <Text style={styles.text}>
                  You will be sent to the login page after updating your profile
                </Text>
                <View style={styles.inputContainer}>
                  <InputForm
                    label="Username"
                    value={username}
                    setter={setUsername}
                    errors={errors}
                  />
                  <InputForm
                    label="First name"
                    value={firstName}
                    setter={setFirstName}
                    errors={errors}
                  />
                  <InputForm
                    label="Last name"
                    value={lastName}
                    setter={setLastName}
                    errors={errors}
                  />
                </View>

                <Button
                  handler={handleUpdateProfile}
                  disabled={updateProfileMutation.isLoading}
                  label="Update profile"
                />
              </View>
              <View>
                <Text style={styles.title}>Change your password</Text>
                <Text style={styles.text}>
                  You will be sent to the login page after changing your
                  password
                </Text>
                <View style={styles.inputContainer}>
                  <InputForm
                    label="Old password"
                    value={oldPassword}
                    setter={setOldPassword}
                    secured={true}
                    errors={errors}
                  />

                  <InputForm
                    label="New password"
                    value={newPassword}
                    setter={setNewPassword}
                    secured={true}
                    errors={errors}
                  />

                  <InputForm
                    label="Confirm new password"
                    value={confirmNewPassword}
                    setter={setConfirmNewPassword}
                    secured={true}
                    errors={errors}
                  />
                </View>
                <Button
                  handler={handleChangePassword}
                  disabled={changePasswordMutation.isLoading}
                  label="Change password"
                />
              </View>
              <View style={styles.buttonContainer}>
                <Text style={styles.title}>Account</Text>
                <View style={styles.button}>
                  <Button handler={onLogout} label="Log out" />
                </View>

                <View style={styles.button}>
                  <Button
                    handler={deleteAccountMutation.mutate}
                    disabled={deleteAccountMutation.isLoading}
                    label="Delete account"
                    warning
                  />
                  <Text style={styles.text}>
                    WARNING! Deleting your account will erase all your notes and
                    folders. Are you sure you want to do it?
                  </Text>
                </View>
              </View>
            </View>
          </AvoidKeyboard>
        )}
      </SafeAreaView>
    </>
  );
};
export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  contentContainer: {
    gap: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  inputContainer: {
    marginTop: 16,
    marginBottom: 30,
    gap: 10,
  },
  buttonContainer: {
    gap: 20,
    marginBottom: 30,
  },
  text: {
    marginTop: 10,
    color: "#6D6D6D",
  },
});
