import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { useNavigation } from "@react-navigation/native";
import PdfIcon from "../assets/pdf";
import ExcelIcon from "../assets/excelfile";
import DC from "../assets/DC";
import File from "../assets/File";
import Back from "../assets/Back";
import Close from "../assets/Close";
import Img from "../assets/img";
import Defualt from "../assets/Default";
import Delete from "../assets/Delete";
import Views from "../assets/View";
import Toast from "react-native-toast-message"; // Import the Toast library
import * as ImagePicker from "expo-image-picker";

export default function DocumentPickers() {
  const [files, setFiles] = useState([]); // Global list of files
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [isImageSelected, setIsImageSelected] = useState(true);
  const [isFileSelected, setIsFileSelected] = useState(true);
  const { width, height } = Dimensions.get("window");
  const [bottomSheetFiles, setBottomSheetFiles] = useState([]); // Files in the bottom sheet
  const [newFiles, setNewFiles] = useState([]); // Newly added files before submission

  const svgSize = {
    height: height > 800 ? 180 : 160, // Adjust based on screen height
    width: width > 400 ? 180 : 160, // Adjust based on screen width
  };

  const navigation = useNavigation();

  const Docpix = async () => {
    try {
      console.log("isFileSelected", isFileSelected);
      console.log("isImageSelected", isImageSelected);
      // Determine allowed types based on setIsFileSelected flag

      const allowedTypes = isImageSelected
        ? [
            // Allow all file types
            "application/pdf",
            "text/plain",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/vnd.ms-powerpoint",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
          ]
        : ["image/*"]; // Only allow images when flag is false

      const doc = await DocumentPicker.getDocumentAsync({
        type: allowedTypes,
      });

      if (!doc.canceled) {
        const selectedFile = doc.assets[0];
        setNewFiles((prevFiles) => [
          ...prevFiles,
          {
            name: selectedFile.name || "Unknown",
            uri: selectedFile.uri,
            size: selectedFile.size || "Unknown",
            mimeType: selectedFile.mimeType || "Unknown",
          },
        ]); // Add to newly added files list

        setBottomSheetFiles((prevFiles) => [
          ...prevFiles,
          {
            name: selectedFile.name || "Unknown",
            uri: selectedFile.uri,
            size: selectedFile.size || "Unknown",
            mimeType: selectedFile.mimeType || "Unknown",
          },
        ]); // Add to bottom sheet files list
      }
    } catch (error) {
      console.error("Error while picking document:", error);
    }
  };

  const toggleBottomSheet = () => {
    setBottomSheetVisible((prev) => !prev);
  };

  const handleViewFile = (uri, name) => {
    console.log("Viewing file:", uri);
    navigation.navigate("ViewFile", { uri, name });
  };

  const handleDeleteFile = (uri) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.uri !== uri));
    setBottomSheetFiles((prevFiles) =>
      prevFiles.filter((file) => file.uri !== uri)
    );
    setNewFiles((prevFiles) => prevFiles.filter((file) => file.uri !== uri));
    console.log("File deleted:", uri);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setNewFiles((prevFiles) => [
        ...prevFiles,
        {
          name: result.assets[0].fileName || "Image",
          uri: result.assets[0].uri,
          size: (result.assets[0].fileSize / (1024 * 1024)).toFixed(2),
          mimeType: result.assets[0].mimeType || "image/*",
        },
      ]);
      setBottomSheetFiles((prevFiles) => [
        ...prevFiles,
        {
          name: result.assets[0].fileName || "Image",
          uri: result.assets[0].uri,
          size: (result.assets[0].fileSize / (1024 * 1024)).toFixed(2),
          mimeType: result.assets[0].mimeType || "image/*",
        },
      ]);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access camera is required!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setNewFiles((prevFiles) => [
        ...prevFiles,
        {
          name: result.assets[0].fileName || "Photo",
          uri: result.assets[0].uri,
          size: (result.assets[0].fileSize / (1024 * 1024)).toFixed(2),
          mimeType: result.assets[0].mimeType || "image/*",
        },
      ]);
      setBottomSheetFiles((prevFiles) => [
        ...prevFiles,
        {
          name: result.assets[0].fileName || "Photo",
          uri: result.assets[0].uri,
          size: (result.assets[0].fileSize / (1024 * 1024)).toFixed(2),
          mimeType: result.assets[0].mimeType || "image/*",
        },
      ]);
    }
  };

  const showImageOptions = () => {
    Alert.alert(
      "Select an Image",
      "Choose to upload from the gallery or take a photo using the camera.",
      [
        {
          text: "Gallery",
          onPress: pickImage,
        },
        {
          text: "Camera",
          onPress: takePhoto,
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  const handleUploadImageClick = () => {
    setIsImageSelected(false);
    setIsFileSelected(false);
  };

  const handleUploadFileClick = () => {
    setIsFileSelected(false);
    setIsImageSelected(true);
  };

  const handleSubmitFiles = () => {
    // Submit the files and move them to global files list
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    setNewFiles([]); // Clear newly added files
    setBottomSheetFiles([]); // Optionally clear bottom sheet files

    Toast.show({
      type: "success",
      position: "bottom",
      text1: "Files submitted successfully!",
      text2: "You can now view or delete the files.",
      visibilityTime: 3000,
      autoHide: true,
    });

    setBottomSheetVisible(false);
  };

  const renderFileItem = ({ item }) => {
    let IconComponent = null;
    if (item.mimeType && item.mimeType.startsWith("image/")) {
      IconComponent = Img;
    } else if (item.mimeType === "application/pdf") {
      IconComponent = PdfIcon;
    } else if (
      item.mimeType === "application/vnd.ms-excel" ||
      item.mimeType ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      IconComponent = ExcelIcon;
    } else {
      IconComponent = Defualt;
    }

    const fileSizeMB = item.size ? item.size : "Unknown";

    return (
      <View style={styles.fileItem}>
        {IconComponent && (
          <IconComponent height={44} width={44} style={styles.icon} />
        )}

        <View style={styles.detailsContainer}>
          <Text style={styles.fileNameText} numberOfLines={1}>
            {item.name || "No Name"}
          </Text>
          <Text style={styles.fileSizeText}>{fileSizeMB} MB</Text>
        </View>

        <View style={styles.rightContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => handleViewFile(item.uri, item.name)}
          >
            <Views height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => handleDeleteFile(item.uri)}
          >
            <Delete height={24} width={24} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderBottomSheetFileItem = ({ item }) => {
    let IconComponent = null;
    if (item.mimeType && item.mimeType.startsWith("image/")) {
      IconComponent = Img;
    } else if (item.mimeType === "application/pdf") {
      IconComponent = PdfIcon;
    } else if (
      item.mimeType === "application/vnd.ms-excel" ||
      item.mimeType ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      IconComponent = ExcelIcon;
    } else {
      IconComponent = Defualt;
    }

    const fileSizeMB = item.size ? item.size : "Unknown";

    return (
      <View style={styles.fileItem}>
        {IconComponent && (
          <IconComponent height={44} width={44} style={styles.icon} />
        )}

        <View style={styles.detailsContainer}>
          <Text style={styles.fileNameText} numberOfLines={1}>
            {item.name || "No Name"}
          </Text>
          <Text style={styles.fileSizeText}>{fileSizeMB} MB</Text>
        </View>
        <View style={styles.rightContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => handleViewFile(item.uri, item.name)}
          >
            <Views height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => handleDeleteFile(item.uri)}
          >
            <Delete height={24} width={24} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.customButton}
            onPress={() => {
              handleUploadImageClick();
              toggleBottomSheet();
            }}
          >
            <Text style={styles.buttonText}>Upload Images</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.customButton}
            onPress={() => {
              handleUploadFileClick();
              toggleBottomSheet();
            }}
          >
            <Text style={styles.buttonText}>Upload Doc Files</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.filesContainer}>
        <Text style={styles.filesTitle}>Uploaded Files:</Text>
        {files.length === 0 ? (
          <Text style={styles.noFilesText}>No files uploaded yet.</Text>
        ) : (
          <FlatList
            data={files}
            renderItem={renderFileItem}
            keyExtractor={(item, index) => item.uri || index.toString()}
          />
        )}
      </View>

      <Modal
        transparent={true}
        visible={isBottomSheetVisible}
        animationType="fade"
        onRequestClose={toggleBottomSheet}
      >
        <View style={styles.bottomSheet}>
          <View style={styles.bottomSheetContent}>
            <View style={styles.topBorder} />
            <View style={styles.topContainer}>
              <Back width={30} height={30} onPress={toggleBottomSheet} />
              <Text style={styles.uploadText}>Upload Now</Text>
              <Close width={30} height={30} onPress={toggleBottomSheet} />
            </View>
            <Text style={styles.bottomSheetTitle}>Upload Files</Text>
            <View style={styles.bottomView}>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  { opacity: isImageSelected ? 0.5 : 1 },
                ]}
                onPress={showImageOptions}
                disabled={isImageSelected}
              >
                <DC {...svgSize} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  { opacity: isFileSelected ? 0.5 : 1 },
                ]}
                onPress={Docpix}
                disabled={isFileSelected}
              >
                <File {...svgSize} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={newFiles}
              renderItem={renderBottomSheetFileItem}
              keyExtractor={(item, index) => item.uri || index.toString()}
            />

            <View style={styles.B1}>
              <View style={styles.B2}>
                <TouchableOpacity style={styles.B4} onPress={toggleBottomSheet}>
                  <Text style={styles.buttonTextCancel}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.B3} onPress={handleSubmitFiles}>
                  <Text style={styles.buttonText}>Submit Files</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  B1: {
    padding: 10,
  },
  B2: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  B3: {
    flex: 1,
    backgroundColor: "#014884",
    marginLeft: 10,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  B4: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#014884",
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
  buttonTextCancel: {
    color: "#014884",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 30,
    top: 10,
    padding: 16,
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  topBorder: {
    width: "50%",
    borderRadius: 10,
    height: 5,
    alignSelf: "center",
    backgroundColor: "#014884",
    marginTop: 5,
  },
  uploadText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  bottomView: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  filesContainer: {
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 16,
  },
  filesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  bottomSheet: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  bottomSheetContent: {
    backgroundColor: "#fff",
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#fff",
    marginLeft: 18,

    color: "#014884",
  },

  optionText: {
    textAlign: "center",
    fontSize: 16,
  },
  noFilesText: {
    fontSize: 16,
    color: "#888",
    marginTop: 20,
    textAlign: "center",
  },
  fileItem: {
    flexDirection: "row",
    paddingVertical: 1,
    // borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  fileNameText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  fileSizeText: {
    fontSize: 14,
    color: "#888",
  },
  iconButton: {
    marginLeft: 10,
    padding: 5,
  },
  rightContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10, // Add marginLeft directly in the style
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 10,
    borderRadius: 10,
    color: "white",
    backgroundColor: "#014884", // Button background color
  },
  customButton: {
    backgroundColor: "#014884", // Background color for buttons
    paddingVertical: 12, // Padding for the button
    paddingHorizontal: 20, // Horizontal padding
    borderRadius: 5, // Border radius to make it rounded
    justifyContent: "center", // Center the content vertically
    alignItems: "center", // Center the content horizontally
  },
  buttonText: {
    color: "#FFFFFF", // Text color for buttons
    fontSize: 16, // Font size
    //fontWeight: "bold", // Make the text bold
    textAlign: "center", // Center the text
  },
});
