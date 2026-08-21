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

export function getActiveDocPath() {
  try {
    if (app && app.activeDocument) {
      return app.activeDocument.path;
    } else {
      return "";
    }
  } catch (e) {
    return "Error: " + e;
  }
}

export function exportCurrentSession(exportFolderNameEncoded?: string): string {
  try {
    if (!app || !app.activeDocument) {
      return "Error: NoActive";
    }

    var doc = app.activeDocument as MultitrackDocument;

    if (!doc.path) {
      return "Error: NoSave";
    }

    var folderName = exportFolderNameEncoded 
      ? decodeURIComponent(exportFolderNameEncoded) 
      : "Export";

    var currentFile = new File(doc.path);
    var parentDir = currentFile.parent;
    var docName = doc.displayName;

    var targetFolder = new Folder(parentDir.fsName + "/" + folderName + "/" + docName);

    if (!targetFolder.exists) {
      targetFolder.create();
    }

    var exportSesxPath = targetFolder.fsName + "/" + docName + ".sesx";

    var WaveExportParamsClass = eval("WaveDocumentExportParameters");
    var RefCopyParamsClass = eval("MultitrackReferencedDocumentsCopyParameter");
    var ExportParamsClass = eval("MultitrackExportParameter");
    var AudioFileFormatClass = eval("AudioFileFormat");

    var waveExportParams = new WaveExportParamsClass();

    if (AudioFileFormatClass && AudioFileFormatClass.FORMAT_MP3_) {
      waveExportParams.fileFormat = new AudioFileFormatClass(AudioFileFormatClass.FORMAT_MP3_);
    }

    var refCopyParams = new RefCopyParamsClass();
    refCopyParams.exportParams = waveExportParams;
    refCopyParams.includeVideo = true;
    refCopyParams.overwriteFiles = true;

    var exportParams = new ExportParamsClass();
    exportParams.includeMetadata = true;
    exportParams.copyReferencedDocuments = true;
    exportParams.copyReferencedDocumentsParams = refCopyParams;

    var result = doc.exportDocument(exportSesxPath, exportParams);

    if (result && result.error) {
      return "Error: Export Failed";
    }

    return "Success: " + exportSesxPath;
  } catch (e) {
    return "Error: " + e;
  }
}