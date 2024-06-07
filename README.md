# APOD Wallpaper

> [!WARNING]  
> This script only works on macOS.
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

## Automation (macOS)

If you're using a UNIX machine, you can probably use a cron job. However, it doesn't work when your machine is asleep.

This is where LaunchAgents are useful. They have similar functionality, but they also work when your macOS machine is asleep.

1. Create a `.plist` file in `~/Library/LaunchAgents` with the following content:

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <!DOCTYPE plist PUBLIC "-//Apple Computer//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
   <plist version="1.0">
   <dict>
      <key>Label</key>
      <!-- This should be the same as your file's name -->
      <string>com.example.wallpaper</string>
      <key>ProgramArguments</key>
      <array>
         <string>/bin/bash</string>
         <!-- You can change this to be in another folder if you want -->
         <string>change_wallpaper.sh</string>
      </array>
      <!-- StartCalendarInterval sets the script to run like a cron, but it also works when your macOS machine is asleep -->
      <key>StartCalendarInterval</key>
      <dict>
         <key>Hour</key>
         <integer>1</integer>
         <key>Minute</key>
         <integer>0</integer>
      </dict>
      <!-- RunAtLoad makes sure the task will start whenever you login to your macOS -->
      <key>RunAtLoad</key>
      <true />
   </dict>
   </plist>
   ```

2. Create a `change_wallpaper.sh` file in your home directory with the following content:

   ```sh
   #!/bin/bash

   # Change the path to the script to wherever you cloned the repository
   cd "/path/to/your/repo"

   # Run the script using your local installation of bun
   # You can find the path by running `which bun` in your terminal
   # It most likely will be at /Users/YOUR_USER/.bun/bin/bun
   /path/to/your/bun run "src/index.ts"
   ```

3. Load the LaunchAgent with `launchctl load ~/Library/LaunchAgents/com.example.wallpaper.plist`.

4. Profit 🔥
