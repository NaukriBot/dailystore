export interface IFileUpload {
    id: string;
    type: any;
    postUrl?: string;
    extensions: string;
    imageUrl?: string;
    maxSize?: number; // take input in Bytes,
    height?: string;
    minHeight?: string;
    width?: string;
    maxWidth?: string;
    maxNumber?: number;
    fileInfo?: any;
    channelName?: string;
    fileProps?: any;
    fileUploadIcon?: boolean;
    dataUrl?: boolean;
    fileName?: string;
    uploadIconHeight?: string;
    uploadText?: string;
    uploadIconUrl?: string;
    hideBackground?: boolean;
    groupId?: string;
    hideUnderIcontext?:boolean;
  }