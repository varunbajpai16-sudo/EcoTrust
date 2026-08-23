import mongoose from "mongoose";
import chalk from "chalk";

const connectDB = async () => {
  try {
    console.log(
      chalk.cyan("╔════════════════════════════════════════╗")
    );
    console.log(
      chalk.cyan("║") +
        chalk.bold.white("        CEM💨S DATABASE CONNECTION       ") +
        chalk.cyan("║")
    );
    console.log(
      chalk.cyan("╚════════════════════════════════════════╝")
    );

    console.log(chalk.yellow("🔄 Connecting to MongoDB..."));

    const connection = await mongoose.connect(process.env.DATA_BASE_URI);

    console.log(
      chalk.green("🟢 MongoDB Connected Successfully!")
    );

    console.log(
      chalk.gray(`📦 Database : ${connection.connection.name}`)
    );

    console.log(
      chalk.gray(`🖥️  Host     : ${connection.connection.host}`)
    );

    console.log(
      chalk.green("🚀 CEMS Database Ready\n")
    );

  } catch (error) {
    console.log(
      chalk.red("🔴 MongoDB Connection Failed!")
    );

    console.log(
      chalk.red(`❌ ${error.message}`)
    );

    process.exit(1);
  }
};

export default connectDB;