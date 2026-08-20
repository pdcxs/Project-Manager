// import {
//   helloVoid,
//   helloError,
//   helloStr,
//   helloNum,
//   helloArrayStr,
//   helloObj,
// } from "../utils/samples";
// export { helloError, helloStr, helloNum, helloArrayStr, helloObj, helloVoid };
import { dispatchTS } from "../utils/utils";

// export const helloWorld = () => {
//   alert("Hello from Audtion");
// };

export function openSesxFile(filePath: string) {
  try {
    if (!filePath) return false;

    var openParams = new DocumentOpenParameter(filePath);

    app.openDocument(openParams);
    return true;
  } catch (e) {
    alert("ExtendScript 打开文件失败: " + e);
    return false;
  }
}

export function getActiveDocName() {
  try {
    if (app && app.activeDocument) {
      return app.activeDocument.displayName;
    } else {
      return "";
    }
  } catch (e) {
    return "Error: " + e;
  }
}