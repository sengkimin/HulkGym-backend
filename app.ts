import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import auth from "./src/routes/auth";
import { AppDataSource } from "./src/config/data-source";
import { DataSource } from "typeorm";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./swagger";
import cors from "cors";
import bodyParser from "body-parser";
import activity from "./src/routes/activity";
import promotion from "./src/routes/promotion";
import news from "./src/routes/news";

import company from "./src/routes/company"
import workoutPlan from "./src/routes/workoutPlan"
import { WorkoutPlan } from './src/entity/workoutPlan.entity';
import workouType from "./src/routes/workoutType"
import workoutExercise from "./src/routes/workoutExercise"
import { FindOptionsWhere } from "typeorm";


import branch from "./src/routes/branch"
import contact from "./src/routes/contact"


import telegramBot from "node-telegram-bot-api";
import { handleMessage } from "./src/service/telegram.service";
import branch from "./src/routes/branch";
import membershipPlan  from "./src/routes/membershipPlan";

import {News} from "./src/entity/news.entity"
import { Branch } from "./src/entity/branch.entity";
import { WorkoutPlan } from "./src/entity/workoutPlan.entity";
import { Promotion } from "./src/entity/promotion.entity";



// const token = process.env.TELEGRAM_TOKEN;
// if (!token) {
//   throw new Error("Telegram Bot Token not provided!");
// }

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for form data
app.use(bodyParser.json());

// Swagger setup
const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes setuphttps://fboxmschac.sharedwithexpose.com
app.use("/api/auth", auth);
app.use("/api/activity", activity);

app.use("/api/contact", contact);
app.use("/api/membershipPlan", membershipPlan);

app.use("/api/promotion", promotion);
app.use("/api/news", news);

app.use("/api/branch", branch);

app.use("/api/company", company);
app.use("/api/workoutPlan", workoutPlan);
app.use("/api/typeOfWorkout", workouType);
app.use("/api/workoutExercise", workoutExercise);

// Create a bot that uses 'polling' to fetch new updates
const bot = new telegramBot(token, { polling: true });

// Define the command list
const commands = [
  { command: "/start", description: "Start the bot and get command list" },
  
  { command: "/help", description: "Get help and usage instructions" },
  { command: "/contact", description: "Get contact information" },
  { command: "/promotion", description: "See current promotions" },
  { command: "/feedback", description: "Submit feedback" },
  { command: "/image", description: "Send an image" },
  { command: "/text", description: "Send a text message" },
  { command: "/link", description: "Send a link" },
  { command: "/list", description: "Send a list" },
  { command: "/table", description: "Send a table" },
  { command: "/options", description: "Send options" },
  { command: "/workoutplan", description: " Send workout plan"}

  { command: "/promotions", description: "Check out the latest deals & discounts" },
  { command: "/freecoupons", description: "Grab limited-time free coupons" },
  { command: "/pricing", description: "View membership and service pricing" },
  { command: "/news", description: "Get the latest updates and announcements" },
  { command: "/workouts", description: "Explore workout plans & fitness tips" },
  { command: "/survey", description: "Help us improve our services" },
  { command: "/branches", description: "View all branches of Hulk Gym" },
  { command: "/joinus", description: "Become a member and start your journey" },
  { command: "/mymembership", description: "View your membership details" },
  { command: "/subscribe", description: "Stay updated with notifications" },

];

  { command: "/callback-gury", description: "Stay updated with notifications" },

];

// Set bot commands
bot.setMyCommands(commands)
  .then(() => console.log("Commands set successfully"))
  .catch((err) => console.error("Error setting commands:", err));


bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const welcomeMessage = `
💪 *Welcome to Hulk Gym Bot!*  

Stay fit, stay updated, and enjoy exclusive perks! Here’s what you can do:  

📌 *Commands:*  


✅ /promotions – Check out the latest deals & discounts!  

🎟 /freecoupons – Grab limited-time free coupons!  

💰 /pricing – View membership and service pricing.  

📰 /news – Get the latest updates and announcements.  

🏋️ /workouts – Explore workout plans & fitness tips.  

📋 /survey – Share your feedback & help us improve.  

📋 /branches – View all branches of Hulk Gym.  

🚀 /joinus – Become a member and start your journey!  

❤️ /survey – Help us to improve our customer experience by giving a survey.  

📜 /mymembership – View your membership details.  

🔔 /subscribe – Stay updated with notifications.  
  `;

  bot.sendMessage(chatId, welcomeMessage, { parse_mode: "Markdown" });
});


bot.onText(/\/promotion/, async (msg) => {
  const chatId = msg.chat.id;

  try {
    // Fetch promotions from your database
    const promotionRepository = AppDataSource.getRepository(Promotion);
    const promotions = await promotionRepository.find({
      order: { created_at: "DESC" }, // Fetch latest promotion
      take: 1,
    });

    if (promotions.length === 0) {
      return bot.sendMessage(chatId, "No promotions available at the moment.");
    }

    const { title, description, discount_percentage, end_date, image } = promotions[0];

    const caption = `🔥 *${title}* 🔥\n\n` +
                    `*Offer:* ${discount_percentage}% OFF\n\n` +
                    `📅 *Valid Until:* ${end_date}\n\n${description}`;

    if (image) {
      bot.sendPhoto(chatId, image, { caption, parse_mode: "Markdown" });
    } else {
      bot.sendMessage(chatId, caption, { parse_mode: "Markdown" });
    }
  } catch (error) {
    console.error("Error fetching promotions:", error);
    bot.sendMessage(chatId, "An error occurred while fetching promotions. Please try again later.");
  }
});


bot.onText(/\/freecoupons/, (msg) => {
  bot.sendMessage(msg.chat.id, "🎟 Get your free coupons here: [Claim Now](https://example.com)", { parse_mode: "Markdown" });
});

bot.onText(/\/news/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    const newsRepository = AppDataSource.getRepository(News);
    const newsList = await newsRepository.find({ take: 1 , order: { created_at: "DESC" } });

    if (newsList.length > 0) {
      for (const newsItem of newsList) {
        const caption = `${newsItem.image}*${newsItem.title}*\n\n📅 *Date:* ${newsItem.end_date}\n📍 *Location:* ${newsItem.location}\n📝 *Description:* ${newsItem.description}`;
        
        if (newsItem.image) {
          // Send the image first
          await bot.sendPhoto(chatId, newsItem.image, {
            caption: caption,
            parse_mode: "Markdown"
          });
        } else {
          // If no image, send only the message with caption
          await bot.sendMessage(chatId, caption, { parse_mode: "Markdown" });
        }
      }
    } else {
      bot.sendMessage(chatId, "No news available at the moment.");
    }
  } catch (error) {
    console.error("Error fetching news:", error);
    bot.sendMessage(chatId, "An error occurred while fetching news.");
  }
})
// bot.onText(/\/pricing/, (msg) => {
//   const chatId = msg.chat.id;

//   const pricingMessage = `
// 📌 *Hulk Gym Membership Plans*  

// 💪 *Basic Plan*  
// 💰 Price: $29.99/month  
// ✅ Access to gym equipment  
// ✅ Locker facility  

// 🔥 *Standard Plan*  
// 💰 Price: $49.99/month  
// ✅ Access to gym equipment  
// ✅ Locker facility  
// ✅ Group fitness classes  

// 🏆 *Premium Plan*  
// 💰 Price: $79.99/month  
// ✅ Access to gym equipment  
// ✅ Locker facility  
// ✅ Group fitness classes  
// ✅ Personal trainer sessions  
// ✅ Sauna & spa access  

// Type /joinus to become a member now! 🚀
// `;

//   bot.sendMessage(chatId, pricingMessage, { parse_mode: "Markdown" });
// });


bot.onText(/\/branches/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    // Fetch the branches from the database
    const branchRepository = AppDataSource.getRepository(Branch);
    const branches = await branchRepository.find({ take: 1 }); // Limit to 5 branches

    if (branches.length > 0) {
      // Send branch info to user
      for (const branch of branches) {
        let branchInfo = `🏢 *Branch Name:* ${branch.name}\n`;
        branchInfo += `📍 *Address:* ${branch.address}\n`;

        // If the branch has an image, send the image
        if (branch.image) {
          await bot.sendPhoto(chatId, branch.image, {
            caption: branchInfo,
            parse_mode: 'Markdown',
          });
        } else {
          await bot.sendMessage(chatId, branchInfo, { parse_mode: 'Markdown' });
        }
      }
    } else {
      await bot.sendMessage(chatId, "No branches available at the moment.");
    }
  } catch (error) {
    console.error('Error fetching branches:', error);
    await bot.sendMessage(chatId, 'An error occurred while fetching branch information.');
  }
});

bot.onText(/\/workouts/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    const workoutRepository = AppDataSource.getRepository(WorkoutPlan);
    const workoutPlans = await workoutRepository.find();

    if (workoutPlans.length > 0) {
      const workoutButtons = workoutPlans.map((plan) => [
        {
          text: `🏋️ ${plan.exercise_name}`,
          callback_data: `workout_${plan.id}`, // Unique callback for each plan
        },
      ]);

      await bot.sendMessage(chatId, "Choose a workout plan:", {
        reply_markup: {
          inline_keyboard: workoutButtons,
        },
      });
    } else {
      await bot.sendMessage(chatId, "No workout plans available at the moment.");
    }
  } catch (error) {
    console.error("Error fetching workout plans:", error);
    await bot.sendMessage(chatId, "An error occurred while fetching workout plans.");
  }
});

bot.on("callback_query", async (callbackQuery) => {
  if (!callbackQuery.message || !callbackQuery.message.chat || !callbackQuery.message.chat.id) {
    console.error("Callback query does not contain valid message or chat id.");
    return;
  }

  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;
  await bot.answerCallbackQuery(callbackQuery.id);

  if (data && data.startsWith("workout_")) {
    const workoutId = data.split("_")[1];

    if (!workoutId) {
      await bot.sendMessage(chatId, "Invalid workout ID.");
      return;
    }
    try {
      const workoutRepository = AppDataSource.getRepository(WorkoutPlan);
      const workoutPlan = await workoutRepository.findOne({
        where: { id: workoutId }
      });

      if (workoutPlan) {
        const createdAt = workoutPlan.createAt ? workoutPlan.createAt.toLocaleString() : 'N/A';
        const updatedAt = workoutPlan.updateAt ? workoutPlan.updateAt.toLocaleString() : 'N/A';

        const workoutInfo = `🏋️ *Exercise Name:* ${workoutPlan.exercise_name}\n📝 *Description:* ${workoutPlan.description}\n📅 *Created At:* ${createdAt}\n🕒 *Last Updated:* ${updatedAt}`;
        
        await bot.sendMessage(chatId, workoutInfo, { parse_mode: "Markdown" });
      } else {
        await bot.sendMessage(chatId, "Workout plan not found.");
      }
    } catch (error) {
      console.error("Error fetching workout plan details:", error);
      await bot.sendMessage(chatId, "An error occurred while retrieving the workout details.");
    }
  } else {
    await bot.sendMessage(chatId, "Invalid workout callback data.");
  }
});


bot.onText(/\/survey/, (msg) => {
  bot.sendMessage(msg.chat.id, "📋 Help us improve! Take our survey: [Start Survey](https://example.com)", { parse_mode: "Markdown" });
});

bot.onText(/\/joinus/, (msg) => {
  bot.sendMessage(msg.chat.id, "🚀 Become a member today: [Join Now](https://example.com)", { parse_mode: "Markdown" });
});

bot.onText(/\/my-membership/, (msg) => {
  bot.sendMessage(msg.chat.id, "📜 View your membership details: [Check Now](https://example.com)", { parse_mode: "Markdown" });
});

bot.onText(/\/subscribe/, (msg) => {
  bot.sendMessage(msg.chat.id, "🔔 Subscribe for updates: [Subscribe Now](https://example.com)", { parse_mode: "Markdown" });
});



bot.on("message", (msg) => {
  try {
    const chatId = msg.chat.id;

    // send a message to the chat acknowledging receipt of their message
    const message = handleMessage(msg) || "";
    console.log("------ ", msg);
    if (message.length > 0) bot.sendMessage(chatId, message);
  } catch (err) {
    console.log(err);
  }
});

// Handle /options command with inline buttons
bot.onText(/\/options/, (msg) => {
  const chatId = msg.chat.id;
  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "Option 1", callback_data: "option_1" },
          { text: "Option 2", callback_data: "option_2" },
        ],
        [{ text: "Option 3", callback_data: "option_3" }],
      ],
    },
  };
  bot.sendMessage(chatId, "Please select an option:", options);
});


// Handle callback queries from inline buttons
bot.on("callback_query", (callbackQuery) => {
  const msg = callbackQuery.message;
  if (msg) {
    bot.sendMessage(msg.chat.id, `You selected: ${callbackQuery.data}`);
    bot.answerCallbackQuery(callbackQuery.id);
  }
});

// Handle /workoutPlan command dynamically fetching workout plans
bot.onText(/\/workoutplan/, async (msg) => {
  const chatId = msg.chat.id;

  try {
    // Fetch workout plans from the database
    const workoutPlans = await AppDataSource.getRepository(WorkoutPlan).find();

    // Check if workout plans exist
    if (workoutPlans.length === 0) {
      bot.sendMessage(chatId, "No workout plans available at the moment.");
      return;
    }

    // Prepare dynamic inline keyboard with workout plans
    const options = {
      reply_markup: {
        inline_keyboard: workoutPlans.map((plan) => [
          { text: plan.workout_plan_name, callback_data: `workout_plan@${plan.id}` },
        ]),
      },
    };

    bot.sendMessage(chatId, "Please select a workout plan:", options);
  } catch (error) {
    console.error("Error fetching workout plans:", error);
    bot.sendMessage(chatId, "There was an error fetching the workout plans.");
  }
});

bot.on("callback_query", async (callbackQuery) => {
  const msg = callbackQuery.message;
  if (msg && callbackQuery.data) {
    const workoutPlanId = callbackQuery.data.split('@')[1];
    console.log("workoutPlanId:", workoutPlanId);

    try {
      

      const wp = await AppDataSource.query("SELECT id, workout_plan_name FROM public.workout_plan WHERE id=$1 ORDER BY workout_plan_name ASC", [workoutPlanId]);
      console.log(wp);

      let wpTitle = "";
      if(wp.length > 0){
        wpTitle = wp[0].workout_plan_name;
      }

      const wpTypes = await AppDataSource.query("SELECT id, workout_type FROM public.types_of_workout WHERE workout_plan_id=$1", [workoutPlanId]);
      console.log("wpTypes before map:", wpTypes);

      const wpTypes1 = wpTypes.map((item: any) => {


        // 1. query to get exercises by item type id
        // 2. use map to get only string that we want e.g Exercise Name, Rep, Calaries,...
        // 3. use join to convert array to string and add new line \n to each string
        // 4. add that string to return string 


        return `🔥 *${item.workout_type}*`;
      });
      console.log("wpTypes after map:", wpTypes1);

      const wpTypesContent = wpTypes1.join("\n")
      
      const message = `💪 *${wpTitle}*\n${wpTypesContent}`

      bot.sendPhoto(msg.chat.id, "https://content.artofmanliness.com/uploads/2024/07/lee2-1.jpg", {parse_mode: "Markdown", caption: message})

      
    } catch (error) {
      console.error("Error fetching workout plan details:", error);
      bot.sendMessage(msg.chat.id, "There was an error fetching the workout plan details.");
    }

    bot.answerCallbackQuery(callbackQuery.id); // Acknowledge callback query
  } else {
    console.warn("Received callback query without data:", callbackQuery);
  }
});




// Start server
const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(async () => {
    console.log("Connection initialized with database...");
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
  })
  .catch((error) => console.log(error));

export const getDataSource = (delay = 3000): Promise<DataSource> => {
  if (AppDataSource.isInitialized) return Promise.resolve(AppDataSource);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (AppDataSource.isInitialized) resolve(AppDataSource);
      else reject("Failed to create connection with database");
    }, delay);
  });
};

export default app;
