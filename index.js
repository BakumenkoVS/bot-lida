const { Telegraf, Markup } = require("telegraf");
const { message } = require("telegraf/filters");
require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot(process.env.BOT_TOKEN, {
   polling: true,
   autoStart: true,
});


bot.on("text", async (msg) => {
   console.log(msg);
});

bot.on("text", async (msg) => {
   try {
      if (msg.text == "/start") {
         await bot.sendPhoto(msg.chat.id, "./img/1.jpg", {
            caption:
               "<b>Привет! Это Лида Бакуменко. \n \nЕсли ты попала сюда, значит, ты уже на шаг ближе к здоровой и красивой фигуре</b>",
            parse_mode: "HTML",
            reply_markup: {
               inline_keyboard: [
                  [{ text: "Узнать больше", callback_data: "opa" }],
               ],
            },
         });

         setTimeout(async () => {
            await bot.sendMessage(
               msg.chat.id,
               "Ты уже посмотрела мой бесплатный продукт? Там много чего интересного!"
            );
         }, 300000);
      } else {
         await bot.sendMessage(msg.chat.id, msg.text);
      }
   } catch (error) {
      console.log(error);
   }
});

bot.on("callback_query", async (ctx) => {
   try {
      switch (ctx.data) {
         case "buyFile":
            await bot.sendInvoice(
               ctx.message.chat.id,
               "Купить интенсив",
               "Покупка интенсива",
               "file",
               process.env.PROVIDER_TOKEN,
               "RUB",
               [
                  {
                     label: "Интенсив", //Название товара
                     amount: 10000, //Цена товара (в копейках!!!)
                  },
               ]
            );

            break;

         case "opa":
            await bot.sendPhoto(ctx.message.chat.id, "./img/2.jpg", {
               caption:
                  "<b>Таз - это центр женского тела, от его положения и подвижности напрямую зависит то, как выглядит живот, зона талии и ягодичные</b>",
               parse_mode: "HTML",
               reply_markup: {
                  inline_keyboard: [
                     [{ text: "Бесплатный продукт", callback_data: "sticker" }],
                     [
                        {
                           text: "Узнать про интенсив",
                           callback_data: "infoIntensive",
                        },
                     ],
                  ],
               },
            });
            break;

         case "infoIntensive":
            await bot.sendPhoto(ctx.message.chat.id, "./img/3.jpg", {
               caption:
                  "<b>Интенсив для девушек\nТаз, живот и ягодицы\n \nДлительность: 14 дней\nТренировки для девушек, направленные для выравнивания\nположения таза, улучшение тонуса мышц живота и ягодичных,\nкоррекция фигуры, мфр и работа с осанкой.\n \n Стоимость: 2900₽\nДоступ к тренировкам: 2 месяца</b>",
               parse_mode: "HTML",
               reply_markup: {
                  inline_keyboard: [
                     [
                        {
                           text: "Купить интенсив",
                           callback_data: "buyFile",
                        },
                     ],
                  ],
               },
            });
            break;
      }
   } catch (error) {
      console.log(error);
   }
});

bot.on("pre_checkout_query", async (ctx) => {
   try {
      await bot.answerPreCheckoutQuery(ctx.id, true);
   } catch (error) {
      console.log(error);
   }
});

bot.on("successful_payment", async (ctx) => {
   console.log("1");
   try {
      await bot.sendMessage(
         ctx.chat.id,
         `CСпасибо за оплату вот ссылка https://youtu.be/0Noywrz2mGA?si=NwDi2ZOeqvCEmyf7 \nи еще вот тебе ссылка на закрытый чат вступи там будет информация об обновлении контента ТУТ БУДЕТ ССЫЛКА НА ГРУПП`,
         {
            caption: `Спасибо за оплату ${ctx.successful_payment.invoice_payload}!`,
         }
      );
   } catch (error) {
      console.log(error);
   }
});

//bot.on("polling_error", (err) => console.log(err.data.error.message));
