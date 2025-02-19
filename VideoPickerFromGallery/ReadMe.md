Imports and Dependencies
react-native: Provides core components like View, Button, and Alert.
expo-image-picker: Module to select videos from the media library.
expo-video: Provides VideoView and useVideoPlayer for video playback.
axios: HTTP client to make a POST request for uploading the video to a server.
State and Refs
videoUri (state): Stores the URI of the selected video for playback and upload.
player (custom hook): Sets up the video player using useVideoPlayer.
Automatically loops and plays the video when loaded.
Functions
selectVideo:

Asynchronously requests permission to access the media library using ImagePicker.requestMediaLibraryPermissionsAsync().
Launches the media picker using ImagePicker.launchImageLibraryAsync() to select a video.
Configures the picker to show only videos, allow editing, and set the highest quality.
Handles user action:
If a video is selected:
Extracts and saves the URI in videoUri.
Calls uploadVideo to handle the upload.
Logs a message if the user cancels the picker.
Shows an alert if permissions are not granted.
uploadVideo:

Creates a FormData object to hold the video file.
Appends the video with:
uri: Path to the video file.
type: Sets file type as "video/mp4".
name: Names the video "video.mp4".
Uses axios.post to send the form data to the server.
Catches any errors and shows an alert on failure.
The success alert is commented out; it can be uncommented if needed.
UI
A Button labeled "Select Video from Gallery" triggers selectVideo when pressed.
If videoUri is set:
VideoView displays and plays the video.
allowsFullscreen enables full-screen mode.
allowsPictureInPicture supports picture-in-picture mode on supported platforms.
Styles
styles.container: Centers content both horizontally and vertically.
styles.video: Sets the width to 350 and height to 275 for the video player.
Comments and Code Clarity
Comments throughout the code explain the purpose of each line or block.
Unnecessary console.log and commented-out Alert are for debugging and customization.
Customization Points
Replace "https://your-server-url.com/upload" with your actual upload server URL.
Enable or customize the alert for successful uploads.
