1. Home Component: Displaying Media Files List
   Imports:

React: For building the UI using React.
View, Text, FlatList, TouchableOpacity, StyleSheet: React Native components for layout and styling.
mediaFiles: This array contains a list of media items, each item consisting of a name, type, and uri (a source link or path to the file).
The mediaFiles Array:

The mediaFiles array holds different types of media:
Images: Local images referenced with require.
Videos: Local videos referenced with require.
Audio: Local audio files referenced with require.
PDF: External PDF file URL.
PPT: External PowerPoint file URL.
Excel: External Excel file URL.
Key Parts of the Home Component:
State and Functions:

navigation: A prop used to navigate to other screens in the app. It comes from React Navigation.
renderItem: A function that is responsible for rendering each item in the FlatList.
It wraps the media item in a TouchableOpacity to make it clickable.
On clicking an item, the MediaViewer screen is navigated to, and it passes the mediaFiles array and the index of the clicked item (initialIndex) as params.
FlatList:

The FlatList component is a performant way to render a list of items (media in this case).
keyExtractor: A function that takes an item and index to return a unique key for each list item (in this case, it returns the index as a string).
renderItem: This function receives each media item and renders a clickable TouchableOpacity with the name of the media file.
Styling:

container: Defines the layout of the screen and applies a light gray background (#f5f5f5).
itemContainer: Styles each item in the list, giving them a white background, rounded corners, padding, and a shadow effect for elevation (on Android) or a subtle shadow on iOS.
itemText: Defines the text style, including font size, color, and weight. 2. MediaViewer Component: Displaying and Navigating Media
Purpose:

This screen displays the selected media (e.g., image, video, audio, PDF, PPT, Excel) based on the mediaFiles array passed from the Home screen.
It also provides functionality to navigate between the media files (Previous/Next).
Key Parts of the MediaViewer Component:
State:

currentIndex: Tracks the index of the currently displayed media item in the mediaFiles array.
videoPlayerRef: A reference for controlling video/audio playback. It is used to stop media playback when switching between media items.
Effect Hook (useEffect):

The useEffect hook is used to stop media playback whenever the currentIndex changes.
When currentIndex changes (meaning the user navigates to a new media item), it triggers the stopMedia() function to stop any media that’s currently playing.
Media Playback Control (stopMedia):

The stopMedia function checks if the videoPlayerRef exists and calls the stopAsync() method to stop the currently playing video or audio.
Navigation Functions:

handleNext: This function moves the currentIndex to the next media item, ensuring that it stops the current media playback before switching.
handlePrev: This function moves the currentIndex to the previous media item and also ensures media is stopped before changing. 5. Rendering Media Based on Type
renderMedia Function:

The renderMedia function is the core function responsible for rendering the right media type based on the media.type. It checks the type of the media and returns the corresponding component.

Media Types:

Image: Displays an image using the Image component. The uri is passed as the source of the image.
jsx
Copy code
return <Image source={media.uri} style={{ width: "100%", height: 300 }} />
Video: Uses the Video component from expo-av to display a video. The resizeMode is set to CONTAIN to maintain aspect ratio.
jsx
Copy code
return <Video ref={videoPlayerRef} style={styles.video} source={media.uri} useNativeControls resizeMode={ResizeMode.CONTAIN} />
Audio: The same Video component from expo-av is used to play audio, as it handles both video and audio.
PDF/PPT/Excel: For these file types, the WebView component is used to display the document. The rendering differs between iOS and Android:
iOS: Directly loads the file URL.
Android: Uses Google Docs Viewer to display the file (https://docs.google.com/viewer?url=<file-uri>).
Platform-Specific Media Handling (iOS vs. Android):
iOS:

The WebView component is used to directly display the media for file types such as PDF, PPT, and Excel.
It loads the file's uri directly into the WebView for a seamless viewing experience.
javaScriptEnabled and domStorageEnabled props are enabled to support dynamic content and storage if required.
Android:

For PDF and PPT files, the WebView uses Google Docs Viewer to ensure the file is viewable without downloading. This is because direct file viewing (like in iOS) is not always supported on Android.
The URL is passed through Google Docs Viewer (https://docs.google.com/viewer?url=${encodeURIComponent(media.uri)}), enabling online viewing of documents. 6. Navigation Between Media Files:
Previous and Next Buttons:

The "Previous" and "Next" buttons allow the user to navigate between media files.
These buttons are disabled when the user is on the first or last media item in the list.
Buttons Functionality:

Next: Moves to the next media item in the list and ensures the current media is stopped.
Previous: Moves to the previous media item and stops the current media.
Navigation Behavior:

The handleNext and handlePrev functions update the currentIndex state, which triggers a re-render and updates the displayed media. 7. Styling:
Video Style:

video: Specifies the size of the video component to take up the full width (100%) and height (275px).
Container:

container: The general container of the MediaViewer screen with padding for spacing.
Header:

header: The title of the media (e.g., the media file name) displayed at the top. It's styled with a larger font size and bold text.
Navigation Buttons:

navButtons: Styles the "Previous" and "Next" buttons. These buttons are aligned horizontally using flexDirection: "row", with space between them using justifyContent: "space-between".
Important Points:
Video and Audio Handling: Both video and audio use the same Video component from expo-av. This is because the expo-av package can handle both media types seamlessly.

Platform-Specific Logic:

The Platform.OS property is used to check whether the app is running on iOS or Android. Based on this, different rendering methods are applied for PDFs, PPTs, and Excel files.
WebView: The WebView component is used to display PDF, PPT, and Excel files. On Android, the content is routed through Google Docs Viewer to ensure compatibility without automatic downloads.

Error Handling: If a media file is not recognized or is of an unsupported type, the renderMedia function defaults to displaying a message: Unsupported media type.

Dynamic Media Navigation: The app allows smooth transitions between media files while ensuring the media playback is stopped each time a new item is selected.

Conclusion:
This code implements a media viewer that can display various types of media, including images, videos, audios, PDFs, PowerPoint presentations, and Excel sheets. It uses React Navigation for navigation between screens, FlatList for displaying media items efficiently, and WebView for rendering documents. The platform-specific logic ensures that the media content is displayed correctly across both iOS and Android devices, preventing automatic downloads and providing seamless viewing experiences.
