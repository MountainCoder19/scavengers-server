"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("./image-config");
const promisify = require("promisify-node");
const ffmpeg_1 = require("./ffmpeg.js");
const path = require("path");
const fs = promisify('fs');
class Resizer {
    constructor(imagePaths) {
        this.imagePaths = imagePaths;
        this.ffmpeg = new ffmpeg_1.Ffmpeg();
    }
    resize() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.imageData = [];
                const imageSizes = yield Promise.all(this.imagePaths.map((imagePath) => __awaiter(this, void 0, void 0, function* () { return yield this.getFileSizeInMegabytes(imagePath); })));
                this.imagePaths.forEach((imagePath, i) => this.imageData.push({ imagePath: imagePath, imageSize: imageSizes[i] }));
                if (this.imageData.length > 0) {
                    const newPaths = yield this.runResizeWorkflow();
                    return newPaths[0];
                }
                return this.imagePaths[0];
            }
            catch (error) {
                throw error;
            }
        });
    }
    runResizeWorkflow() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.createDirs();
            this.fileMaps = yield Promise.all(this.imageData.map((data) => __awaiter(this, void 0, void 0, function* () {
                if (data.imageSize < config.MAX_IMAGE_SIZE) {
                    return { filePath: data.imagePath, tempPath: null };
                }
                return yield this.ffmpeg.resizeImage(data.imagePath);
            })));
            const writtenFiles = yield this.overWriteFiles();
            yield this.deleteTemp();
            return writtenFiles;
        });
    }
    getFileSizeInMegabytes(imagePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const stats = yield fs.stat(imagePath);
            return stats.size / 1000000.0;
        });
    }
    createDirs() {
        return __awaiter(this, void 0, void 0, function* () {
            const dir = path.join(__dirname, config.IMAGE_TEMP_DIR);
            try {
                yield fs.mkdir(dir);
            }
            catch (error) {
                // let's not do anything
            }
        });
    }
    overWriteFiles() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Promise.all(this.fileMaps.map((fileMap) => __awaiter(this, void 0, void 0, function* () {
                if (!fileMap.tempPath)
                    return Promise.resolve(fileMap.filePath);
                yield fs.unlink(fileMap.filePath);
                const fileName = fileMap.filePath.split('.')[0];
                const newPath = `${fileName}.${config.OUTPUT_EXTENSION}`;
                console.log(newPath);
                const readableStream = fs.createReadStream(fileMap.tempPath);
                const writableStream = fs.createWriteStream(newPath);
                return yield this.copyFiles(readableStream, writableStream);
            })));
        });
    }
    copyFiles(readStream, writeStream) {
        return new Promise((resolve, reject) => {
            readStream.pipe(writeStream);
            readStream.on('error', (error) => {
                reject(error);
            });
            writeStream.on('error', (error) => {
                reject(error);
            }).on('finish', () => {
                resolve(writeStream.path.toString());
            });
        });
    }
    deleteTemp() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Promise.all(this.fileMaps.map((fileMap) => __awaiter(this, void 0, void 0, function* () {
                if (!fileMap.tempPath)
                    return;
                return yield fs.unlink(fileMap.tempPath);
            })));
        });
    }
}
exports.Resizer = Resizer;
//# sourceMappingURL=resizer.js.map
