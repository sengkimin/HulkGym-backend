import dotenv from 'dotenv';
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
import axios from "axios";


// const token = process.env.TELEGRAM_TOKEN;
// if (!token) {
//   throw new Error("Telegram Bot Token not provided!");
// }

const token = process.env.TELEGRAM_TOKEN || '7420058740:AAGc3btKgNkFzDwVZ7-OlMtTl3fm5YERjGc';
console.log(process.env.TELEGRAM_TOKEN);



var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

// Middleware setup

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

app.use("/api/promotion", promotion);

app.use("/api/branch",branch)

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
];

// Set bot commands in Telegram
bot
  .setMyCommands(commands)
  .then(() => console.log("Commands set successfully"));

// Handle /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  let response = "Welcome! Here are the available commands:\n\n";
  commands.forEach((cmd) => {
    response += `${cmd.command} - ${cmd.description}\n`;
  });
  bot.sendMessage(chatId, response);
});

// Handle other commands
bot.onText(/\/help/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "This bot allows you to access various features. Use /start to see available commands."
  );
});

bot.onText(/\/contact/, (msg) => {
  bot.sendMessage(msg.chat.id, "You can contact us at support@example.com.");
});

bot.onText(/\/promotion/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Check out our latest promotions at https://example.com/promotions"
  );
});

bot.onText(/\/feedback/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Please send your feedback here, and we will review it."
  );
});

// Handle /image command
bot.onText(/\/image/, (msg) => {
  bot.sendPhoto(msg.chat.id, "https://picsum.photos/seed/picsum/200/300", {
    caption: "Here is an image for you!",
  });
});

// Handle /text command
bot.onText(/\/text/, (msg) => {
  bot.sendMessage(msg.chat.id, "This is a sample text message.");
});

// Handle /link command
bot.onText(/\/link/, (msg) => {
  bot.sendMessage(msg.chat.id, "Check out this link: https://example.com");
});

// Handle /list command
bot.onText(/\/list/, (msg) => {
  const list = "- Item 1\n- Item 2\n- Item 3\n- Item 4";
  bot.sendMessage(msg.chat.id, `Here is your list:\n${list}`);
});

// Handle /table command
bot.onText(/\/table/, (msg) => {
  const table = `
  <pre>
  | Tables   |      Are      |  Cool |
  |----------|:-------------:|------:|
  | col 1 is |  left-aligned | $1600 |
  | col 2 is |    centered   |   $12 |
  | col 3 is | right-aligned |    $1 |
  </pre>
  `;
  bot.sendMessage(msg.chat.id, `Here is a table:\n${table}`, {
    parse_mode: "HTML",
  });
});

// Listen for any kind of message. There are different kinds of
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
