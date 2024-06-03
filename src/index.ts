import { downloadImage, FEED_URL, getRandomImage, setWallpaper } from "./util";

const imgSlug = (await (await fetch(FEED_URL)).text()).match(
  'a href="(image/.*?)"',
)?.[1];

await setWallpaper(
  imgSlug ? await downloadImage(imgSlug) : await getRandomImage(),
  !imgSlug,
);
