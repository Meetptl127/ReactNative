import {
View,
Text,
Button,
FlatList,
StyleSheet,
Alert,
TouchableOpacity,
Modal,
} from "react-native";
import React, { useState } from "react";
import _ as DocumentPicker from "expo-document-picker";
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
import _ as ImagePicker from "expo-image-picker";

export default function DocumentPickers() {
const [files, setFiles] = useState([]);
const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
const [isForImages, setIsForImages] = useState(false);

const navigation = useNavigation();

const Docpix = async () => {
try {
const doc = await DocumentPicker.getDocumentAsync({
type: [
"application/pdf",
"text/plain",
"application/msword",
"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
"application/vnd.ms-excel",
"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
"application/vnd.ms-powerpoint",
"application/vnd.openxmlformats-officedocument.presentationml.presentation",
"image/*",
],
});

      console.log("Document selected: ", doc);

      if (!doc.canceled) {
        const selectedFile = doc.assets[0];
        setFiles((prevFiles) => [
          ...prevFiles,
          {
            name: selectedFile.name || "Unknown",
            uri: selectedFile.uri,
            size: selectedFile.size || "Unknown",
            mimeType: selectedFile.mimeType || "Unknown",
          },
        ]);
      } else {
        console.log("No document selected or operation was cancelled.");
      }
    } catch (error) {
      console.error("Error while picking document:", error);
      if (DocumentPicker.isCancel(error)) {
        console.log("User cancelled the upload.");
      } else {
        console.error("Unexpected error:", error);
      }
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
console.log("File deleted:", uri);
};

// Function to pick an image from the gallery
const pickImage = async () => {
let result = await ImagePicker.launchImageLibraryAsync({
mediaTypes: ImagePicker.MediaTypeOptions.Images,
allowsEditing: true,
aspect: [4, 3],
quality: 1,
});

    if (!result.canceled) {
      // Add the picked image to the files state
      setFiles((prevFiles) => [
        ...prevFiles,
        {
          name: result.assets[0].fileName || "Image", // Assign file name
          uri: result.assets[0].uri,
          size: (result.assets[0].fileSize / (1024 * 1024)).toFixed(2), // Convert size to MB
          mimeType: result.assets[0].mimeType || "image/*", // Assign mime type
        },
      ]);
    }

};

// Function to take a photo using the camera
const takePhoto = async () => {
// Request camera permissions if not already granted
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
      // Add the taken photo to the files state
      setFiles((prevFiles) => [
        ...prevFiles,
        {
          name: result.assets[0].fileName || "Photo", // Assign file name
          uri: result.assets[0].uri,
          size: (result.assets[0].fileSize / (1024 * 1024)).toFixed(2), // Convert size to MB
          mimeType: result.assets[0].mimeType || "image/*", // Assign mime type
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
onPress: pickImage, // Pick image from gallery
},
{
text: "Camera",
onPress: takePhoto, // Take a photo using camera
},
{
text: "Cancel",
style: "cancel",
},
]
);
};

const renderFileItem = ({ item }) => {
let IconComponent = null;
if (item.mimeType && item.mimeType.startsWith("image/")) {
// Use Img icon for image files
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
// Default icon for other file types
IconComponent = Defualt;
}

    const fileSizeMB = item.size ? item.size : "Unknown";

    return (
      <View style={styles.fileItem}>
        {/* Icon */}
        {IconComponent && (
          <IconComponent height={44} width={44} style={styles.icon} />
        )}

        {/* File Details */}
        <View style={styles.detailsContainer}>
          {/* File Name */}
          <Text style={styles.fileNameText} numberOfLines={1}>
            {item.name || "No Name"}
          </Text>

          {/* File Size */}
          <Text style={styles.fileSizeText}>{fileSizeMB} MB</Text>
        </View>

        {/* Actions: View and Delete */}
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
<Button
            title="Upload Images"
            onPress={toggleBottomSheet}
            color="#FFFFFF"
          />
</View>
<View style={styles.buttonWrapper}>
<Button
            title="Upload Doc Files"
            onPress={toggleBottomSheet}
            color="#FFFFFF"
          />
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

      {/* Bottom Sheet Modal */}
      <Modal
        transparent={true}
        visible={isBottomSheetVisible}
        animationType="slide"
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
                style={styles.optionButton}
                onPress={showImageOptions}
              >
                <DC height={180} width={180} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButton} onPress={Docpix}>
                <File height={180} width={180} />
              </TouchableOpacity>
            </View>
            {files.length === 0 ? (
              <Text style={styles.noFilesText}>No files uploaded yet.</Text>
            ) : (
              <FlatList
                data={files}
                renderItem={renderFileItem}
                keyExtractor={(item, index) => item.uri || index.toString()}
              />
            )}

            <Button title="Close" onPress={toggleBottomSheet} />
          </View>
        </View>
      </Modal>
    </View>

);
}
const styles = StyleSheet.create({
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
justifyContent: "space-between", // Space between the left and right icons
},
topBorder: {
width: "50%",
borderRadius: 10, // Set the width to 50% of the container
height: 5, // Thickness of the border
alignSelf: "center",
backgroundColor: "#014884", // Border color
marginTop: 5, // Add some space above the border
},
uploadText: {
fontSize: 18,
fontWeight: "bold",
textAlign: "center",
flex: 1, // Ensures the text is centered between the icons
},
bottomView: {
flexDirection: "row",
backgroundColor: "#fff",
},
buttonContainer: {
flexDirection: "row",
top: 1, // Align buttons in a row
justifyContent: "space-between", // Space buttons evenly
width: "100%", // Adjust width to fit both buttons with space
},
buttonWrapper: {
flex: 1, // Make each button take equal space
marginHorizontal: 10,
borderRadius: 10,
backgroundColor: "#014884", // Add space between buttons
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
padding: 10,
color: "#014884",
},
optionButton: {
padding: 15,
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
alignItems: "center",
marginBottom: 10,
padding: 10,
paddingLeft: 10,
backgroundColor: "#f8f8f8",
borderRadius: 5,
},
detailsContainer: {
flex: 1, // Allow the details container to take up remaining space
},
textStyle: {
fontSize: 14,
color: "#333",
},
row: {
flexDirection: "row",
alignItems: "center",
justifyContent: "space-between",
},
fileNameText: {
fontSize: 14,
fontWeight: "bold",
color: "#333",
paddingLeft: 10,
flex: 1, // Allow the name to take up space without pushing out the icons
//marginRight: 100, // Space between name and icons
},
rightContainer: {
flexDirection: "row",
alignItems: "center",
justifyContent: "flex-end",
},
fileSizeText: {
fontSize: 12,
color: "#666",
paddingLeft: 10,
marginRight: 10, // Space between size and icons
},
iconButton: {
marginLeft: 10, // Space between icons
},
});
