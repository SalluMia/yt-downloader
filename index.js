import express from "express";
import ytdl from "ytdl-core";
import fs from "fs";
import cors from "cors";
import ytlist from "youtube-playlist";
const app = express();
import https from "https";
// import { google } f"googleapis");
import { google } from "googleapis";
import mqtt from "mqtt";
const client = mqtt.connect("mqtt://91.121.93.94");
app.use(express.json());
app.use(cors());
// ytdl("http://www.youtube.com/watch?v=aqz-KE-bpKQ").pipe(fs.createWriteStream("video.mp4"));

app.use("/getInfo/", async (req, res) => {
	try {
		let info = await ytdl.getInfo(req.query.url);
		if (!!info) {
			const hasVideoAndAudio = info.formats.filter((ele) => ele.hasVideo && ele?.hasAudio);
			console.log("called1");
			const onlyVideo = info.formats.filter((ele) => ele.hasVideo && !ele?.hasAudio);
			console.log("calle2");
			const thumbnails = info?.videoDetails?.thumbnails;
			console.log("calle3");
			res.json({
				hasVideoAndAudio,
				onlyVideo,
				thumbnails,
				title: info?.videoDetails?.title,
				duration: info?.formats[0]?.approxDurationMs,
			});
		}
	} catch (e) {
		res.status(400).json({ message: "Invalid URL" });
		console.log(e);
	}
});

// app.use("/getShorts/", async (req, res) => {
// 	let info = await ytdl.getInfo(req.query.url);
// 	if (!!info) {
// 		const hasVideoAndAudio = info.formats.filter((ele) => ele.hasVideo && ele?.hasAudio);
// 		const onlyVideo = info.formats.filter((ele) => ele.hasVideo && !ele?.hasAudio);
// 		const thumbnails = info?.videoDetails?.thumbnails;
// 		console.log("called");
// 		res.json({
// 			hasVideoAndAudio,
// 			onlyVideo,
// 			thumbnails,
// 			title: info?.videoDetails?.title,
// 			duration: info?.formats[0]?.approxDurationMs,
// 		});
// 	}
// });

// client.on("connect", function () {
// 	client.subscribe("device/hasnat", function (err) {
// 		if (!err) {
// 			client.publish("device/led", "Hello mqtt hasnat");
// 		}
// 	});
// });

// client.on("message", function (topic, message) {
// 	// message is Buffer
// 	console.log(message.toString());
// 	client.publish("device/led", "Hello mqtt hasnat checking");
// });

app.listen(8090 || process.env.PORT, () => {
	console.log("server started on port " + 8090);
});
