//@ts-ignore
declare var JSON: {
  stringify(object: object): string;
  parse(string: string): object;
};

declare class WaveDocumentExportParameters {
  fileFormat: any;
  includeMetadata: boolean;
  sampleTypeConversion: any;
}

declare class MultitrackReferencedDocumentsCopyParameter {
  constructor(param1?: any, param2?: any, param3?: any, param4?: any);
  exportParams: any;
  includeVideo: boolean;
  overwriteFiles: boolean;
  trim: any;
}

declare class MultitrackExportParameter {
  constructor(param1?: any, param2?: any, param3?: any);
  copyReferencedDocuments: boolean;
  copyReferencedDocumentsParams: any;
  includeMetadata: boolean;
}

interface MultitrackDocument {
  sampleRate: number;
  displayName: string;
  path: string;
  exportDocument(
    path: string,
    exportParameter?: MultitrackExportParameter
  ): {
    error: boolean;
    fileReadOnly?: boolean;
    folderReadOnly?: boolean;
    invalidFilename?: boolean;
    invalidFilenameExt?: boolean;
    openDocument?: boolean;
    internal?: boolean;
  };
}