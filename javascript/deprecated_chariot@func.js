// !!! BU KÜTÜPHANE KULLANIMDAN KALDIRILMIŞTIR.
let directives = require("../../config/chariotDirectives.json");
let achievements = require("../../config/achievements.json");
let member = require("../../mongo/uye.js");
const Discord = require("discord.js");
let it = require("../../mongo/disabled_item.js");
const {
  randomNumberSpecifiedLength,
  eligibleForHundredPercent,
} = require("./chariot@util.js");
class itemBuilder {
  constructor() {
    this.item = {};
  }

  setItemName(name) {
    this.item.itemName = name;
    return this;
  }

  setItemTrade(trade) {
    if (typeof trade !== "boolean")
      return 'Takas veya ticaret uygunluğunu belirlemek için sadece "true" veya "false" değerlerini kullanınız.';
    this.item.itemTrade = trade;
    return this;
  }

  setItemMinPrice(minPrice) {
    if (typeof minPrice !== "number")
      return "Minimum fiyat aralığı sadece sayı türüyle belirtilebilir.";
    this.item.itemMinPrice = minPrice;
    return this;
  }

  setItemMaxPrice(maxPrice) {
    if (typeof maxPrice !== "number")
      return "Maksimum fiyat aralığı sadece sayı türüyle belirtilebilir.";
    this.item.itemMaxPrice = maxPrice;
    return this;
  }

  setItemSuggestedCurrency(currency) {
    let currencies = ["jc", "bakiye"];
    if (!currencies.includes(currency))
      return "Sadece 'jc' veya 'bakiye' elemanlarını kullanınız.";
    this.item.itemCurrency = currency;
    return this;
  }

  async buildItem() {
    let item = await it.findOne({ itemName: this.item.itemName });

    if (item) return "Bu isimde bir eşya zaten var amk!";
    if (!item) {
      console.log("Yeni eşya oluşturuldu", this.item);

      let newI = new it({
        itemID: randomNumberSpecifiedLength(13),
        itemName: this.item.itemName,
        itemAddedBy: "Chariot",
        priceData: {
          MaximumPriceToSell: this.item.itemMaxPrice,
          MinimumPriceToSell: this.item.itemMinPrice,
          currencyToSell: this.item.itemCurrency,
          isTradeable: this.item.itemTrade,
        },
      });

      await newI.save();
    }
  }
}
module.exports = {
  addAchievement: async function (achToFind, id) {
    if (!id) return console.log("Üye ID'si giriniz.");
    if (directives.jrp2.allowAchievementHunting) {
      let uye = await member.findOne({ "memberInfo.id": id });
      if (!uye.roleplayInfo.achievementInfo.eligibleForAchievements) return;

      if (uye.roleplayInfo.achievementInfo.eligibleForAchievements) {
        // ayni basarim kontrolu
        if (
          uye.roleplayInfo.achievementInfo.userHas.find(
            (x) =>
              x.achievementsName === achievements.basarimlar[achToFind].title
          )
        )
          return;

        await member.findOneAndUpdate(
          { "memberInfo.id": id },
          {
            $push: {
              "roleplayInfo.achievementInfo.userHas": {
                achievementsName: achievements.basarimlar[achToFind].title,
                achievementDescription:
                  achievements.basarimlar[achToFind].description,
              },
            },
          }
        );

        // eligibleForHundredPercent(id);

        try {
          global.client.users.cache.get(id).send({
            embeds: [
              new Discord.EmbedBuilder()
                .setFooter({
                  text: achievements.basarimlar[achToFind].description,
                })
                .setTitle("Başarım kazanıldı!")
                .setDescription(achievements.basarimlar[achToFind].title)
                .setColor("Green"),
            ],
          });
        } catch (error) {
          console.log(` bir problem yaşadım, devam ediyorum: ${error.message}`);
        }
      } else return;
    } else {
      return;
    }
  },

  aos_toBalance: async function (id, amount) {
    await member.findOneAndUpdate(
      { "memberInfo.id": id },
      { $inc: { "memberEco.balance": amount } }
    );
  },
  aos_toJoJoCoin: async function (id, amount) {
    await member.findOneAndUpdate(
      { "memberInfo.id": id },
      { $inc: { "memberEco.jojocoin": amount } }
    );
  },
};
