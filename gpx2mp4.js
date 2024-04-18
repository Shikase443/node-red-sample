const fs = require('fs');
const xml2js = require('xml2js');
const { execSync } = require('child_process');

if (process.argv.length < 3) {
    console.log("Usage: node png2mp4.js <path-to-gpx-file>");
    process.exit(1);
}
const gpxFilePath = process.argv[2];

fs.readFile(gpxFilePath, (err, data) => {
    if (err) throw err;

    xml2js.parseString(data, (err, result) => {
        if (err) throw err;

        const trackpoints = result.gpx.trk[0].trkseg[0].trkpt;
        let lastTime = new Date(trackpoints[0].time[0]);
        let frameIndex = 0; // インデックス管理用の変数

        trackpoints.forEach((pt, index) => {
            const utcTime = new Date(pt.time[0]);
            // 時間のスキップを確認し、透過黒背景の画像を生成
            const timeDiff = Math.round((utcTime - lastTime) / 1000 - 1);
            for (let i = 0; i < timeDiff; i++) {
                const blackFrameCmd = `ffmpeg -f lavfi -i color=c=black@0.5:s=1200x40 -frames:v 1 output_${frameIndex}.png`;
                execSync(blackFrameCmd, { stdio: 'inherit' });
                frameIndex++;
            }

            // 通常の画像生成
            const heartrate = pt.extensions[0].heartrate[0];
            const distance = pt.extensions[0].distance[0];
            const lat = pt.$.lat;
            const lon = pt.$.lon;
            const jstTime = new Date(utcTime.getTime() + (9 * 60 * 60 * 1000));
            const formattedTime = jstTime.toISOString().replace('T', ' ').replace('.000Z', '');
            const outputText = `時刻: ${formattedTime}, 心拍数: ${heartrate}, 緯度/経度: ${lat}/${lon}, 距離: ${distance}m`;
            const escapedText = outputText.replace(/'/g, "\\\\'").replace(/:/g, "\\:");

            const ffmpegCmd = `ffmpeg -f lavfi -i color=c=black@0.5:s=1200x40 -vf "drawtext=fontfile=./msgothic.ttc:fontsize=24:fontcolor=white:x=10:y=10:text='${escapedText}'" -frames:v 1 output_${frameIndex}.png`;
            execSync(ffmpegCmd, { stdio: 'inherit' });
            frameIndex++;

            lastTime = utcTime;
        });

        console.log('Heart rate, location, and distance data have been written to individual PNG files.');
        createVideo(frameIndex);
    });
});

function createVideo(totalFrames) {
    const framerate = 1; // 1 second per frame for the video
    const outputVideo = 'output_video.mp4';

    const ffmpegVideoCmd = `ffmpeg -framerate ${framerate} -i output_%d.png -c:v libx264 -r 30 -pix_fmt yuv420p ${outputVideo}`;
    try {
        execSync(ffmpegVideoCmd, { stdio: 'inherit' });
        console.log(`Video has been created successfully: ${outputVideo}`);
    } catch (error) {
        console.error(`Failed to create video: ${error}`);
    }
}

