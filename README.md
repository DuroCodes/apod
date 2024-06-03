# APOD Wallpaper

> [!WARNING]  
> This script only works on MacOS.
>
> You can probably make it work on Linux by changing the `osascript` command to `gsettings` or `feh` or whatever you use to set your wallpaper.
>
> I don't know how to make it work on Windows. 💀

A TypeScript script to download the Astronomy Picture of the Day from NASA and set it as your wallpaper.

If there is not an image available for the current day, it will set a random image from the `wallpapers` directory as the wallpaper. (This can happen if the APOD is a video, for example.)

It also includes a Discord webhook integration to send the APOD to a Discord channel automatically.

## Usage

1. Clone the repository.
2. Create a `.env` file with the following content:
   ```env
   DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/your/webhook/url # optional for Discord integration
   WALLPAPER_PATH=/path/to/your/wallpapers
   ```
3. Install the dependencies with `bun install`.
4. Run the script with `bun run src/index.ts`.
