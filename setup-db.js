const models = require("./src/database/models");
const bcrypt = require("bcrypt");

async function setupDatabase() {
  try {
    console.log("Setting up database tables...");

    // Sync all models to create tables
    await models.sequelize.sync({ force: true });

    console.log("Database tables created successfully!");

    // Seed with default users
    console.log("Seeding database with default users...");

    const users = [
      {
        firstName: "Hendrick",
        lastName: "Fayer",
        userName: "hfayer0",
        password: await bcrypt.hash("dN5&Ez|%t(`!", 10),
        bio: "Welcome to my profile!",
        email: "hfayer0@example.com",
        imagePath: null,
      },
      {
        firstName: "Brennen",
        lastName: "Munt",
        userName: "bmunt1",
        password: await bcrypt.hash("sY2<@jTV", 10),
        bio: "Tech enthusiast and developer",
        email: "bmunt1@example.com",
        imagePath: null,
      },
      {
        firstName: "Darline",
        lastName: "Proudlock",
        userName: "dproudlock2",
        password: await bcrypt.hash("gC6$#`Py(\\Z7", 10),
        bio: "Creative thinker and problem solver",
        email: "dproudlock2@example.com",
        imagePath: null,
      },
    ];

    for (const userData of users) {
      await models.User.create(userData);
      console.log(`Created user: ${userData.userName}`);
    }

    console.log("Database setup completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error setting up database:", error);
    process.exit(1);
  }
}

setupDatabase();
