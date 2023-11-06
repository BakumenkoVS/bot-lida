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
         await bot.sendPhoto(msg.chat.id, "./img/2.jpg", {
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
               "ты не забыла открыть тренировку?\n\nесли нет, то самое время позаниматься со мной сейчас)\n\nесли уже позанималась, то напиши мне в директ, как тебе тренировка 😌"
            );
         }, 21600000);
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
                     amount: 299000, //Цена товара (в копейках!!!)
                  },
               ]
            );

            break;

         case "opa":
            await bot.sendPhoto(ctx.message.chat.id, "./img/6.jpg", {
               caption:
                  "<b>Таз - это центр женского тела, от его положения и подвижности напрямую зависит то, как выглядит живот, зона талии и ягодичные</b>",
               parse_mode: "HTML",
               reply_markup: {
                  inline_keyboard: [
                     [
                        {
                           text: "Бесплатная тренировка",
                           callback_data: "freeProduct",
                        },
                     ],
                     [
                        {
                           text: "Хочу на интенсив",
                           callback_data: "infoIntensive",
                        },
                     ],
                  ],
               },
            });
            break;

         case "freeProduct":
            await bot.sendPhoto(ctx.message.chat.id, "./img/7.jpg", {
               caption:
                  "<b>Кому нужно работать с мобильностью и положением таза:\n • если есть боли в тазу, копчике, крестце или поясничном отделе\n • не получается убрать живот, как бы вы не худели и не качали пресс\n • не чувствуете ягодицы в упражнениях\n • хочется улучшить тонус и качество ягодичных мышц\n • у вас нет лишнего веса, но есть отечность в зоне талии или валик внизу живота\n • есть подтекания при кашле или чихании, боли при половом акте\n\nОт положения твоего таза зависит и форма, и тонус мышц пресса и ягодичных</b>",
               parse_mode: "HTML",
               reply_markup: {
                  inline_keyboard: [
                     [{ text: "Передний наклон", callback_data: "forward" }],
                     [
                        {
                           text: "Задний наклон",
                           callback_data: "back",
                        },
                     ],
                  ],
               },
            });
            break;

         case "forward":
            await bot.sendPhoto(ctx.message.chat.id, "./img/8.jpg", {
               caption:
                  "<b>Передний наклон\nКак выглядит этот дисбаланс?\n\nТаз уходит в передний наклон, усилен изгиб в поясничном отделе, живот вываливается вперед и увеличен в объеме.\n\nНиже тебя ждет бесплатная тренировка, где я расскажу и покажу, как скорректировать такое положение таза.</b>",
               parse_mode: "HTML",
               reply_markup: {
                  inline_keyboard: [
                     [
                        {
                           text: "Начать тренировку",
                           callback_data: "forwardStart",
                        },
                     ],
                  ],
               },
            });
            break;

         case "forwardStart":
            await bot.sendMessage(
               ctx.message.chat.id,
               "https://youtu.be/0Noywrz2mGA?si=K3Z6PB-qP_6o9GSm"
            );
            break;

         case "back":
            await bot.sendPhoto(ctx.message.chat.id, "./img/9.jpg", {
               caption:
                  "<b>Задний наклон\nКак выглядит этот дисбаланс?\n\nТаз уходит в наклон назад, ягодицы напряжены и стремятся к крестцу, есть отечность или валик внизу живота.\n\nНиже тебя ждет бесплатная тренировка, где я расскажу и покажу, как скорректировать такое положение таза.</b>",
               parse_mode: "HTML",
               reply_markup: {
                  inline_keyboard: [
                     [
                        {
                           text: "Начать тренировку",
                           callback_data: "backStart",
                        },
                     ],
                  ],
               },
            });
            break;

         case "backStart":
            await bot.sendMessage(
               ctx.message.chat.id,
               "https://youtu.be/GGD9cuaq4-8?si=TjsU2KxZTMuKK8-E"
            );
            break;

         case "infoIntensive":
            await bot.sendPhoto(ctx.message.chat.id, "./img/1.jpg", {
               caption:
                  "<b>Интенсив для девушек\nТаз, живот и ягодицы\n\nСтарт - 13 ноября\nДлительность - 14 дней\nТренировки для девушек, направленные для выравнивания положения таза, улучшение тонуса мышц живота и ягодичных, мфр и работа с осанкой.\n\nИнтенсив будет длится 2 недели, у нас будет закрытый чат участниц, где ты сможешь задать вопрос лично мне. Тренировки будут в записи, заниматься можно будет в любое удобное для тебя время, просто открыв видео на ютубе с компьютера или телефона. Доступ к тренировкам после интенсива - 2 месяца.\n\nСтоимость интенсива: 2990₽\nПрисоединяйся скорее, будем тренироваться вместе, я жду тебя ❤️</b>",
               parse_mode: "HTML",
               reply_markup: {
                  inline_keyboard: [
                     [
                        {
                           text: "Противопоказания",
                           callback_data: "contraindications",
                        },
                     ],
                     [
                        {
                           text: "Оборудование",
                           callback_data: "equipment",
                        },
                     ],
                     [
                        {
                           text: "Формат занятий",
                           callback_data: "workout",
                        },
                     ],
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

         case "contraindications":
            await bot.sendPhoto(ctx.message.chat.id, "./img/3.jpg", {
               caption:
                  "<b>Противопоказания\n• Выраженная гипертония\n• ЛОР-заболевания\n• ОРВИ\n• Беременность\n• Артриты (стадии обострения)\n• Артрозы 3-4 степени\n• Спондилолистез\n• Остеопороз\n• Острые состояния, связанные с заболеванием внутренних органов\n\n❗️Можно девушкам на грудном вскармливании и при диастазе 1 степени (расстояние между внутренними краями прямых мышц живота от 4 до 7 см)</b>",
               parse_mode: "HTML",
               reply_markup: {
                  inline_keyboard: [
                     [
                        {
                           text: "Оборудование",
                           callback_data: "equipment",
                        },
                     ],
                     [
                        {
                           text: "Формат занятий",
                           callback_data: "workout",
                        },
                     ],
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

         case "equipment":
            await bot.sendPhoto(ctx.message.chat.id, "./img/4.jpg", {
               caption:
                  "<b>Какое оборудование нужно будет для тренировок?\n\nДля тренировок нужен будет массажный ролл и мфр мяч, я подскажу и помогу с выбором оборудования до начала интенсива.\n\nЗдорово, если у тебя будут гантели, но это не обязательно, в качестве отягощений можно использовать книги или бутылки.</b>",
               parse_mode: "HTML",
               reply_markup: {
                  inline_keyboard: [
                     [
                        {
                           text: "Противопоказания",
                           callback_data: "contraindications",
                        },
                     ],
                     [
                        {
                           text: "Формат занятий",
                           callback_data: "workout",
                        },
                     ],
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

         case "workout":
            await bot.sendPhoto(ctx.message.chat.id, "./img/5.jpg", {
               caption:
                  "<b>Как будут проходить занятия?\n\nПосле оплаты интенсива вам придет автоматическое сообщение в этот бот с ссылкой на первую тренировку и закрытый чат участниц.\n\nИнтенсив стартует в понедельник 13 ноября. Все тренировки будут выходить в записи на ютубе, заниматься можно в любое удобное для вас время, включив тренировку на телефоне или компьютере.\n\nДлительность интенсива - 14 дней, доступ к тренировкам после интенсива - 2 месяца.\n\nВ течение интенсива вы сможете задавать мне вопросы в телеграм чате.</b>",
               parse_mode: "HTML",
               reply_markup: {
                  inline_keyboard: [
                     [
                        {
                           text: "Противопоказания",
                           callback_data: "contraindications",
                        },
                     ],
                     [
                        {
                           text: "Оборудование",
                           callback_data: "equipment",
                        },
                     ],
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
      await bot.sendPhoto(ctx.chat.id, `./img/10.jpg`, {
         caption: `Благодарю тебя за доверие)\n\nПоздравляю, ты присоединилась к моему интенсиву 🥳\n\nИнтенсив начнется 13 ноября, не забудь подписаться на закрытый канал, там будет вся информация по интенсиву и анонсу тренировок. Там же я расскажу про необходимое оборудование, которое нужно заказать до начала интенсива.\n\nhttps://t.me/+G3Q_caMub_04ZDIy \n\nТебе уже доступна первая тренировка на положение таза, ниже прикрепляю ссылку на нее. Если ты не знаешь, какой у тебя наклон таза, напиши мне в директ, я помогу тебе и сделаю мини-диагностику.\n\nhttps://youtube.com/playlist?list=PLIg2IFzDwpNJ3oSYwy4FgMyZ4f1ngTqCz&si=959NMO_UnhLcZUM8\n\nДо встречи ❤️`,
      });
   } catch (error) {
      console.log(error);
   }
});

bot.on("polling_error", (err) => console.log(err.data.error.message));
