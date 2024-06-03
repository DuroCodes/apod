import {
  WebhookClient,
  AttachmentBuilder,
  EmbedBuilder,
  Colors,
} from "discord.js";
import { writeFile, readdir } from "fs/promises";
import { exec } from "child_process";
import { env } from "bun";

export const FEED_URL = "http://apod.nasa.gov/apod";
export const WALLPAPER_DIR = env.WALLPAPER_PATH;

export async function downloadImage(imgSlug: string) {
  const imgPath = `${WALLPAPER_DIR}/${imgSlug.split("/").pop()}`;

  await writeFile(
    imgPath,
    Buffer.from(await (await fetch(`${FEED_URL}/${imgSlug}`)).arrayBuffer()),
    { flag: "w+" },
  );

  return imgPath;
}

export async function getRandomImage() {
  if (!WALLPAPER_DIR) {
    console.error("Please set the WALLPAPER_PATH environment variable.");
    process.exit(1);
  }

  const files = await readdir(WALLPAPER_DIR);
  const randomImg = files[Math.floor(Math.random() * files.length)];

  console.error(
    `No image found for today. Setting wallpaper to ${
      randomImg.split("_")[0]
    } instead.`,
  );

  return `${WALLPAPER_DIR}/${randomImg}`;
}

export async function setWallpaper(path: string, isRandom = false) {
  exec(
    `/usr/bin/osascript -s o -e 'tell application "Finder" to set desktop picture to POSIX file "${path}"'`,
  );

  if (env.WEBHOOK_URL) {
    const webhookClient = new WebhookClient({
      url: env.WEBHOOK_URL,
    });

    const file = new AttachmentBuilder(path, { name: "apod.jpg" });

    const embed = new EmbedBuilder()
      .setTitle(`Astronomy Picture for ${new Date().toLocaleDateString()}`)
      .setColor(Colors.DarkButNotBlack)
      .setImage("attachment://apod.jpg");

    isRandom &&
      embed.setDescription(
        "No image found for today. Here's a random one instead.",
      );

    await webhookClient.send({
      embeds: [embed],
      files: [file],
    });
  }
}
