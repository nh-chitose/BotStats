import { GatewayIntentBits, Client, ActivityType } from "discord.js";
import "dotenv/config";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates
    ],
    ws: { properties: { browser: "Discord iOS" }}
});

// "⏹" これ
const stopButton = String.fromCharCode(9209);

client.once("ready", () => {
    console.log("Bot準備完了～");
    console.log(client.guilds.cache.map(a => a.name));
});

client.on("ready", () => {
    if (client.user){
        client.user.setActivity("on " + client.guilds.cache.size + " servers", { type: ActivityType.Playing });
    }
});

client.on("voiceStateUpdate", async (oldState, newState) => {
    if (!newState.member) return;
    if (!oldState.member) return;
    console.log(newState.member.displayName);
    let flag = 0;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (newState.guild.members.me!.permissions.has("ManageNicknames") && newState.guild.members.me!.permissions.has("ManageChannels")) {
        console.log("Permission: OK");
        flag++;
    } else {
        console.log("Permission: Error");
    }

    if (flag == 1) {
        if ( oldState.channelId == null && newState.channelId != null ) {
            console.log("入室検知");
            if (newState.member.user.bot) {
                let newDisplayName = newState.member.displayName.replace("🈳", "🈵");
                newDisplayName =newDisplayName.replace(stopButton,"▶");
                try {
                    await newState.member.setNickname(newDisplayName);
                    if (newState.channel?.userLimit == 2) {
                        newState.channel.setUserLimit(3);
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        }

        else if ( oldState.channelId !== null && newState.channelId == null ) {
            console.log("退室検知");
            if (oldState.member.user.bot && ( oldState.member.displayName.includes("🈵") || oldState.member.displayName.includes("▶"))) {
                try {
                    let newDisplayName = oldState.member.displayName.replace("🈵", "🈳");
                    newDisplayName = newDisplayName.replace("▶",stopButton);
                    await newState.member.setNickname(newDisplayName);

                    if (oldState.channel?.userLimit == 3 && oldState.channel.name.indexOf("3") == -1) {
                        oldState.channel.setUserLimit(2);
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        }

        else if (oldState.channelId !== null && newState.channelId != null) {
            console.log("Voice State Updated.");
            if (newState.member.user.bot) {
                try {
                    if (newState.channel?.userLimit == 2) {
                        newState.channel.setUserLimit(3);
                    }
                    else if (oldState.channel?.userLimit == 3 && oldState.channel.name.indexOf("3") == -1 && oldState.channel.name.indexOf("３") == -1) {
                        oldState.channel.setUserLimit(2);
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }
});

client.login(process.env.TOKEN);
