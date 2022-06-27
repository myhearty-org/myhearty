import { axiosWithoutInterceptors } from '@myhearty/utils/myhearty-axios';

export async function getS3UploadParams(file: any) {
  const { data } = await axiosWithoutInterceptors.get('/s3/params', {
    params: {
      filename: file.name,
      type: file.type,
    },
  });

  return {
    method: data.method,
    url: data.url,
    fields: data.fields,
    headers: data.headers,
  };
}
