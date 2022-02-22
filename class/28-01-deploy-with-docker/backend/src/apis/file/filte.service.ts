import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { Storage } from '@google-cloud/storage';

interface IFile {
  files: FileUpload[];
}

@Injectable()
export class FileService {
  async upload({ files }: IFile) {
    // 스토리지에 이미지 업로드
    const storage = new Storage({
      keyFilename: process.env.GCP_STORAGE_FILENAME,
      projectId: process.env.GCP_STORAGE_PROJECTID,
    }).bucket('codecamp-1');

    // 일단 먼저 다 받기
    const waitedFiles = await Promise.all(files);

    // 구글 스토리지에 동시에 모두 올리기
    const results = await Promise.all(
      waitedFiles.map(
        (file) =>
          new Promise((resolve, reject) => {
            file
              .createReadStream()
              .pipe(storage.file(file.filename).createWriteStream())
              .on('finish', () => resolve(`codecamp-1/${file.filename}`))
              .on('error', (error) => reject(error));
          }),
      ),
    );

    return results;
  }
}
