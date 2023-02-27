import { UIEvent, PhotoEditorSDKUI } from "photoeditorsdk";


export class PhotoEditorSDK extends React.Component {
  componentDidMount() {
    this.initEditor();
  }
  async initEditor() {
    const editor = await PhotoEditorSDKUI.init({
      container: "#editor",
      image: "../example.jpg", // Image url or Image path relative to assets folder
      // Please replace this with your license: https://img.ly/dashboard
      license: '',
    });
    console.log("PhotoEditorSDK for Mobile is ready!");
    editor.on(UIEvent.EXPORT, (imageSrc) => {
      console.log("Exported ", imageSrc);
    });
  }


  render() {
    return (
      <div
        id="editor"
        style={{width: "100vw", height: "100vh" }};
      />
    );
  }
}
