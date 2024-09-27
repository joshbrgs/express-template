// MongoDB Seed File
print("Start mongo seed script ##########################");

db = db.getSiblingDB("special_day");
// Users db seed
db.createCollection("users");

db.createUser({
  user: "app_username",
  pwd: "app_password",
  roles: [{ role: "readWrite", db: "special_day" }],
});

print("End mongo seed script ##########################");
