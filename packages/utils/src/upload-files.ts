export type UploadedFileData = ReturnType<typeof fileData>;

export function uploadedFileData(file: any) {
  const id = file.meta['key'].match(/^cache\/(.+)/)[1];

  return JSON.stringify(fileData(file, id));
}

function fileData(file: any, id: any) {
  return {
    id: id as string,
    storage: 'cache',
    metadata: {
      size: file.size as number,
      filename: file.name as string,
      mime_type: file.type as string,
    },
  };
}
