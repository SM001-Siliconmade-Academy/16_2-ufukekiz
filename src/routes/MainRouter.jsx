import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./Router";
import AuthRoutes from "./AuthRoutes";
import { useAuth } from "../contexts/AuthProvider";
import WelcomeScreen from "../screens/WelcomeScreen";
import { createStackNavigator } from "@react-navigation/stack";



const MainRouter = () => {
  const { currentUser } = useAuth();
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
      {currentUser && currentUser.emailVerified ? (
        <>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
        name="Router"
        component={Router}
        options={{ headerShown: false }}
      />
        </>
      ) : (
        <Stack.Screen
            name="AuthRoutes"
            component={AuthRoutes}
            options={{ headerShown: false }}
          />
      )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainRouter;

const styles = StyleSheet.create({});
