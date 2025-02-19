import React, { useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import i18n from "../components/i18";

export default function Home() {
  const { t, i18n } = useTranslation(); // Destructure i18n from useTranslation hook to directly access language

  // Using the language directly from i18n context (no need for local state)
  const currentLanguage = i18n.language;

  const changeLanguage = (value) => {
    i18n
      .changeLanguage(value)
      .then(() => {
        // Language will be updated in the i18n context, no need for setState
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // Optional: You can log the language when the component mounts
    console.log("Current language:", i18n.language);
  }, []);

  return (
    <View>
      <Text>{t("car")}</Text>
      <Text>{t("fruit")}</Text>
      <Text>{t("food")}</Text>

      <Pressable
        onPress={() => changeLanguage("en")}
        style={{
          backgroundColor: currentLanguage === "en" ? "#33A850" : "#d3d3d3",
          padding: 20,
        }}
      >
        <Text>Select English</Text>
      </Pressable>

      <Pressable
        onPress={() => changeLanguage("hi")}
        style={{
          backgroundColor: currentLanguage === "hi" ? "#33A850" : "#d3d3d3",
          padding: 20,
        }}
      >
        <Text>हिंदी का चयन करें</Text>
      </Pressable>

      <Pressable
        onPress={() => changeLanguage("gu")}
        style={{
          backgroundColor: currentLanguage === "gu" ? "#33A850" : "#d3d3d3",
          padding: 20,
        }}
      >
        <Text>ગુજરાતી પસંદ કરો</Text>
      </Pressable>
    </View>
  );
}
