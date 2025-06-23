/**
 * Chariot Development Utilities
 *
 * Version: 1.0
 * GitHub: soleroks
 * Purpose: deliver basic functions to increase code readability.
 * */

class ChariotNativeError extends Error {
  constructor(message) {
    super(message);
  }
}
let directives = require("../../config/chariotDirectives.json");
let achievements = require("../../config/achievements.json");
const Discord = require("discord.js");
const fs = require("fs");
const path = require("path");
const item = require("../../mongo/disabled_item");
const defaultItems = require("../../config/jojoroleplay/defaultitems.json");
const uye = require("../../mongo/uye");
const core = require("../core/core@main");
module.exports = {
  ChariotNativeError,
  randomizeAnArray: function (array) {
    if (!Array.isArray(array)) return 1;

    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  },
  selectBetween: function (Min, Max) {
    if (typeof Max !== "number") return 1;
    if (typeof Min !== "number") return 1;

    return Math.floor(Math.random() * (Max - Min) + 1) + Min;
  },
  type_validate: function (parameter, expectedType) {
    if (typeof parameter !== expectedType) return false;
    if (typeof parameter === expectedType) return true;
  },
  randomNumberSpecifiedLength: function (length) {
    let rand = "";
    for (let i = 0; i < length; i++) {
      rndN = Math.floor(Math.random() * 9);
      rand += rndN;
    }

    return rand;
  },
  updateJSON_field_specified: function (filePath, field, value) {
    let p = path.resolve(process.cwd(), filePath);
    let cnt = fs.readFileSync(p, "utf-8");
    let jsonData = JSON.parse(cnt);
    jsonData[field] = value;
    let updatedData = JSON.stringify(jsonData, null, 4); // Pretty print
    fs.writeFileSync(p, updatedData, "utf-8");
  },
  patates_sec: function (gereksiz) {
    let sans = Math.random() * 100;
    if (sans <= 0.0005) {
      return "https://cdn.discordapp.com/attachments/1242122679574728714/1288514117610770432/IMG_0616.png?ex=66f575c9&is=66f42449&hm=3a4c05bdd43d2d02bc06f45a77ed79ecba4b0c890844e0df44d339f534cf85ea&";
    }
    if (sans <= 2) {
      return "https://cdn.discordapp.com/attachments/1097439473572261949/1288513267890655293/chrepplant.png?ex=66f574fe&is=66f4237e&hm=55732ad0df30f692289732b9c49a6fec832bc2215297da624cf374e98c2c6e91&";
    }
    if (sans <= 3) {
      return "https://cdn.discordapp.com/attachments/1097439473572261949/1288513268289241118/sigara.png?ex=66f574fe&is=66f4237e&hm=a327eadb249aecf7e0613d2a0259ce3b10939aa241547ed9109b4f2036a04dac&";
    }
    if (sans <= 5) {
      return "https://cdn.discordapp.com/attachments/1097439473572261949/1288513267576078417/gerizekal.png?ex=66f574fe&is=66f4237e&hm=878d61de0d5ed5c0ca72d0ac1a4752f9160bd911ae949c680e09b5a873904350&";
    }
    if (sans <= 10) {
      return "https://cdn.discordapp.com/attachments/1097439473572261949/1288513268843020379/jooj.png?ex=66f574fe&is=66f4237e&hm=1a25faabbcfd0a96f01b49bb8147e762c139f5eae5a73ddb1a16d5aa3988a9ac&";
    }
    if (sans <= 80 || sans >= 80) {
      return "https://cdn.discordapp.com/attachments/1097439473572261949/1288513268566069400/jooj_roleplay.png?ex=66f574fe&is=66f4237e&hm=d56f4a6d8daa58773fac53a5ca67bace50caf130056335e2a9d756ea4544ed5b&";
    }
  },

  checkUserInventory: async function (id, name) {
    let Item = defaultItems.items.find((x) => x.name === name);

    let mb = await uye.findOne({ "memberInfo.id": id });

    let find = mb.memberInventory.memberItems.find((x) => x.itemID === Item.id);

    if (find) return true;
    else return false;
  },
  checkDefaultItems: async function (name) {
    let Item = defaultItems.items.find((x) => x.name === name);

    if (Item) return Item;
    else return false;
  },

  eligibleForHundredPercent: async function (id) {
    /** 
    let veri = await uye.findOne({ "memberInfo.id": id });

    if (veri) {
      let basarimD = veri.roleplayInfo.achievementInfo;

      if (!basarimD.eligibleForAchievements) return;
      if (basarimD.eligibleForAchievements) {
        let check = await core.achievement_has(id, "Farklı İnşa Edilmiş");
        if (!check) {
          await uye.findOneAndUpdate(
            { "memberInfo.id": id },
            {
              $set: {
                "roleplayInfo.achievementInfo.eligibleForAchievements": false,
              },
            }
          );

          await uye.findOneAndUpdate(
            { "memberInfo.id": id },
            {
              $push: {
                "roleplayInfo.achievementInfo.userHas": {
                  achievementsName: achievements[101].title,
                  achievementDescription: achievements[101].description,
                },
              },
            }
          );

          global.client.users.cache.get(id).send({
            embeds: [
              new Discord.EmbedBuilder()
                .setColor("Green")
                .setTitle(`${achievements[101].title}!`)
                .setDescription(`${achievements[101].description}`),
            ],
          });
        } else return;
      }
    }
      */
  },
  fixCHRnames: async function () {
    const directoryPath = path.join(__dirname, "../../komutlar", "CHR");

    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        return console.log("Unable to scan directory: " + err);
      }

      files.forEach((file) => {
        if (file.startsWith("CHR") && file.endsWith(".js")) {
          const filePath = path.join(directoryPath, file);
          const fileContent = fs.readFileSync(filePath, "utf8");
          const nameMatch = fileContent.match(/name:\s*["'](.+?)["']/);

          if (nameMatch) {
            const newName = nameMatch[1] + ".js";
            const newFilePath = path.join(directoryPath, newName);

            fs.rename(filePath, newFilePath, (err) => {
              if (err) {
                console.log("Error renaming file:", err);
              } else {
                console.log(`Renamed ${file} to ${newName}`);
              }
            });
          }
        }
      });
    });
  },
};
