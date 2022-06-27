import { getS3UploadParams } from '@myhearty/lib/organizations';
import { Label } from '@myhearty/ui/form';
import { UploadedFileData, uploadedFileData } from '@myhearty/utils/upload-files';
import AwsS3 from '@uppy/aws-s3';
import Uppy, { UppyOptions } from '@uppy/core';
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import ImageEditor from '@uppy/image-editor';
import '@uppy/image-editor/dist/style.min.css';
import { Dashboard, useUppy as useUppyFactory } from '@uppy/react';
import { useEffect, useState } from 'react';

type ImageUploaderProps = {
  id: string;
  defaultImageData: UploadedFileData;
  defaultImageUrl: string;
  onChange: (image: string) => void;
};

export function ImageUploader({ id, defaultImageData, defaultImageUrl, onChange }: ImageUploaderProps) {
  const uppy = useUppy({ id });
  const [defaultImageId, setDefaultImageId] = useState('');

  useEffect(() => {
    async function initDefaultImage() {
      if (defaultImageData !== null) {
        uppy.getFiles().forEach((file) => uppy.removeFile(file.id));

        const image = await fetch(defaultImageUrl);
        const blob = await image.blob();

        const defaultImageId = uppy.addFile({
          name: defaultImageData.metadata.filename,
          type: blob.type,
          data: blob,
        });
        setDefaultImageId(defaultImageId);

        uppy.setFileState(defaultImageId, {
          progress: {
            uploadComplete: true,
            uploadStarted: true,
          },
        });
      }
    }
    initDefaultImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uppy]);

  uppy.on('file-removed', (_file, _reason) => {
    onChange(null!);
  });

  uppy.on('upload-success', (file, _response) => {
    if (file.id !== defaultImageId) {
      onChange(uploadedFileData(file));
    }
  });

  uppy.on('upload-error', (file, _error, _response) => {
    uppy.removeFile(file.id);
  });

  return (
    <div className="md:grid md:grid-cols-12 md:gap-x-4">
      <div className="md:col-span-4">
        <Label>Image</Label>
      </div>
      <div className="mt-2 md:col-span-8 md:mt-0">
        <Dashboard
          uppy={uppy}
          plugins={['ImageEditor']}
          width="100%"
          height={350}
          doneButtonHandler={() => {}}
          showProgressDetails
          showRemoveButtonAfterComplete
          proudlyDisplayPoweredByUppy={false}
        />
      </div>
    </div>
  );
}

function useUppy({ id, ...options }: UppyOptions) {
  const uppy = useUppyFactory(() => {
    return new Uppy({
      id: id,
      allowMultipleUploadBatches: false,
      restrictions: {
        allowedFileTypes: ['image/jpeg', 'image/png', 'image/webp'],
        minNumberOfFiles: 1,
        maxNumberOfFiles: 1,
        maxFileSize: 10 * 1024 * 1024,
        maxTotalFileSize: 10 * 1024 * 1024,
      },
      ...options,
    })
      .use(AwsS3, {
        async getUploadParameters(file) {
          const s3UploadParams = await getS3UploadParams(file);
          return s3UploadParams;
        },
        limit: 1,
      })
      .use(ImageEditor, {
        quality: 0.8,
        cropperOptions: {
          viewMode: 1,
          background: false,
          autoCropArea: 1,
          responsive: true,
          croppedCanvasOptions: {},
        },
        actions: {
          revert: true,
          rotate: true,
          granularRotate: true,
          flip: true,
          zoomIn: true,
          zoomOut: true,
          cropSquare: true,
          cropWidescreen: true,
          cropWidescreenVertical: true,
        },
      });
  });

  return uppy;
}
