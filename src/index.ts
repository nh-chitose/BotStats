import { PermissionFlagsBits, GatewayIntentBits, Client, ActivityType } from "discord.js";
import "dotenv/config";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
  ],
  ws: { properties: { browser: "Discord iOS" } },
});

// "⏹" これ
const stopButton = String.fromCharCode(9209);

client.once("ready", () => {
  console.log("Bot is ready as " + client.user.username);
  console.log(client.guilds.cache.map(a => a.name));
});

client.on("ready", () => {
  client.user.setActivity("on " + client.guilds.cache.size + " servers", { type: ActivityType.Playing });
});

client.on("voiceStateUpdate", async (oldState, newState) => {
  console.log(newState.member.displayName);

  // flags
  let flag = 0;
  // have permission?
  if(newState.guild.members.me.permissions.has(PermissionFlagsBits.ManageNicknames) && newState.guild.members.me.permissions.has(PermissionFlagsBits.ManageChannels)){
    console.log("Permission: OK");
    flag++;
  }else{
    console.log("Permission: Error");
  }
  // have higher role?
  if(newState.guild.roles.comparePositions(newState.guild.members.me.roles.highest, newState.member.roles.highest) > 0){
    console.log("Role position: OK");
    flag++;
  }else{
    console.log("Role position: Error");
  }
  // is bot?
  if(newState.member.user.bot || oldState.member.user.bot){
    console.log("Is bot?: yes");
    flag++;
  }else{
    console.log("Is bot?: no");
  }

  if(flag === 3){
    // When bot enters voice channel
    if(oldState.channelId === null && newState.channelId !== null){
      console.log("Detected bot entry to voice channel.");
      const newDisplayName = newState.member.displayName.replace("🈳", "🈵").replace(stopButton, "▶");
      try{
        await newState.member.setNickname(newDisplayName);
        if(newState.channel.userLimit === 2){
          await newState.channel.setUserLimit(3);
        }
      } catch(e){
        console.log(e);
      }
    }

    // When bot leaves voice channel.
    else if(oldState.channelId !== null && newState.channelId === null){
      console.log("Detected bot leave from voice channel.");
      if(oldState.member.displayName.includes("🈵") || oldState.member.displayName.includes("▶")){
        try{
          const newDisplayName = oldState.member.displayName.replace("🈵", "🈳").replace("▶", stopButton);
          await newState.member.setNickname(newDisplayName);

          if(oldState.channel.userLimit === 3 && !oldState.channel.name.includes("3")){
            await oldState.channel.setUserLimit(2);
          }
        } catch(e){
          console.log(e);
        }
      }
    }

    // When bot moves voice channel
    else if(oldState.channelId !== newState.channelId){
      console.log("Detected bot moved.");
      try{
        if(newState.channel.userLimit === 2){
          await newState.channel.setUserLimit(3);
        }
        else if(oldState.channel.userLimit === 3 && !oldState.channel.name.includes("3") && !oldState.channel.name.includes("３")){
          await oldState.channel.setUserLimit(2);
        }
      } catch(e){
        console.log(e);
      }
    }
  }
});

// eslint-disable-next-line @typescript-eslint/no-floating-promises
client.login(process.env.TOKEN);
