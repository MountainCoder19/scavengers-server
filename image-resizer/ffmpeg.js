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
const ffmpeg = require("fluent-ffmpeg");
const config = require("./image-config");
const path = require("path");
class Ffmpeg {
    constructor() {
        this.ffmpeg = ffmpeg();
    }
    resizeImage(imagePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const filename = path.basename(imagePath).split('.')[0];
            const params = {
                ffmpeg: this.ffmpeg,
                inputPath: imagePath,
                outputPath: `${path.join(__dirname, config.IMAGE_TEMP_DIR)}/${filename}.${config.OUTPUT_EXTENSION}`,
                inputParams: [],
                outputParams: [`-vf scale=${config.MAXIMUM_WIDTH}:-1`]
            };
            yield this.executeFfmpeg(params);
            return { tempPath: params.outputPath, filePath: params.inputPath };
        });
    }
    executeFfmpeg({ ffmpeg, inputPath, outputPath, inputParams, outputParams }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const startTime = Date.now();
                const command = ffmpeg.addInput(inputPath);
                command
                    .on('start', (ffmpegCmd) => {
                    console.log(`### Starting image resize process`);
                })
                    .on('progress', (progress) => {
                    // pino.info( '### progress: frames encoded: ' + progress.frames )
                })
                    .on('end', () => {
                    const endTime = Date.now();
                    console.log(`### image resize completed after ${(endTime - startTime) / 1000} seconds`);
                    resolve({ success: true, message: 'Success!!' });
                })
                    .on('error', (err) => {
                    reject(err);
                })
                    .output(outputPath)
                    .outputOptions(outputParams)
                    .run();
            });
        });
    }
}
exports.Ffmpeg = Ffmpeg;
//# sourceMappingURL=ffmpeg.js.map