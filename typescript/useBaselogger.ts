import { EmbedBuilder, WebhookClient } from "discord.js";
import { convertToHumanDate, currentTime } from "../etc/time.ts";
import { directives } from "./useDirectives.ts";

class ChariotBaselogger {
  protected context: string;
  protected webhook: WebhookClient;

  constructor(context: string = "Chariot3") {
    this.webhook = new WebhookClient({
      id: directives.overall.baselogger.baseLoggerWebhookID,
      token: directives.overall.baselogger.baseLoggerWebhookToken,
    });
    this.context = context;
  }

  async log(message: string): Promise<void> {
    const now = await currentTime();
    const timestamp = (await convertToHumanDate(now.current)).convertion;

    const embed = new EmbedBuilder()
      .setTitle(`Chariot Baselogger | ${this.context}`)
      .setDescription(message)
      .setFooter({
        text: `soleroks/Chariot3 | Yapı Numarası ${directives.overall.applicationBuildNumber} | ${timestamp}`,
      });

    await this.webhook.send({ embeds: [embed] });

    console.log(`[${timestamp}] [${this.context}] ${message}`);
  }
}

export default ChariotBaselogger;
