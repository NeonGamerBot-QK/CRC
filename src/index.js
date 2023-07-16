require("dotenv").config();
// imports
const express = require("express");
const jsonDb = require("simple-json-db");
// file imports
const config = require("./config");
const path = require("path");
const fs = require("fs");
const morgan = require("morgan");
const ejs = require("ejs");
const db = new jsonDb(config.dbPath);
const app = express();
const uuid = require("uuid");

const renderContent = (filePath, ops) => {
  let text = fs
    .readFileSync(path.join(__dirname, "views", filePath))
    .toString();

  return ejs.render(text, ops);
};
// console.log(renderContent("layout.html", { renderContent, title: "test" }))
app.set("views", path.join(__dirname, "views"));
// console.log("#e", process.env.NODE_ENV)
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("combined"));
} else if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(require("cors")());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
function Authenticated(req, res, next) {
  let password = req.body.password;
  console.debug(req.body, config.password);
  if (!password) {
    return res.redirect("/contacts");
  }
  if (password !== config.password) {
    return res.redirect("/contacts");
  }
  next();
}
app.engine("html", (filePath, ops = { title: null }, cb) => {
  // let content = fs.readFileSync(filePath).toString();
  const requests = db.get("requests") || 0;
  // const layout = fs.readFileSync(path.join(__dirname, "views", "layout.html"));
  const acContent = Buffer.from(
    ejs.render(fs.readFileSync(filePath).toString(), ops),
  ).toString("base64");
  let content = renderContent("layout.html", {
    renderContent,
    ...ops,
    content: acContent,
    requests,
  });
  //   console.debug("render ", filePath);
  cb(null, content);
});
app.set("view engine", "html");
app.get("/", (req, res) => {
  res.render("index.html", { title: "Main", renderContent });
});
app.get("/theme", (req, res) => {
  res.render("theme.html", { title: "Theme" });
});
app.get("/contact", (req, res) => {
  res.render("contact.html", { title: "Contact" });
});

app.get("/contacts", (req, res) => {
  res.render("login.html", { title: "Login" });
});
app.post("/contacts", Authenticated, (req, res) => {
  res.render("contacts.html", {
    title: "Contacts",
    contacts: db.get("responses") || [],
  });
});
app.post("/token", (req, res) => {
  const token = uuid.v4();
  db.set(token, true);
  res.json({ token });
});
app.post("/submit", (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ status: 401, message: "Unauthorized" });
  }
  if (!db.get(token)) {
    return res.status(401).json({ status: 401, message: "Unauthorized" });
  }
  db.delete(token);
  const { name, email, body } = req.body;
  if (!name || !email || !body) {
    return res.status(400).json({ status: 400, message: "Bad request" });
  }
  if (!config.emailConfig.username)
    return res
      .status(500)
      .json({ status: 500, message: "Email not configured" });
  if (!config.emailConfig.password)
    return res
      .status(500)
      .json({ status: 500, message: "Email not configured" });
  if (!config.emailConfig.host)
    return res
      .status(500)
      .json({ status: 500, message: "Email not configured" });
  if (!config.emailConfig.port)
    return res
      .status(500)
      .json({ status: 500, message: "Email not configured" });
  // if(!config.emailConfig.secure) return res.status(500).json({ status: 500, message: "Email not configured" })

  // send email

  console.log("SENDING EMAIL", name, email, body);

  const nodemailer = require("nodemailer");
  //  create transport  node mailer

  const transporter = nodemailer.createTransport({
    host: config.emailConfig.host,
    port: config.emailConfig.port,
    secure: config.emailConfig.secure,
    auth: {
      user: config.emailConfig.username,
      pass: config.emailConfig.password,
    },
    tls: { rejectUnauthorized: false },
  });
  // send mail with defined transport object

  const list_of_responses = db.get("responses") || [];
  list_of_responses.push({ name, email, body, sentAt: Date.now() });
  db.set("responses", list_of_responses);
  transporter
    .sendMail({
      from: `"Contact Form" <${config.emailConfig.username}>`,
      to: config.myEmail,
      subject: `New message from ${name} <${email}>`,
      text: body,
      html: body,
    })
    .then((info) => {
      console.log("Message sent: %s", info.messageId);
      res.status(201).json({ status: 201, message: "Email sent successfully" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ status: 500, message: "Internal server error" });
    });
});
app.post("/request", (req, res) => {
  let requests = db.get("requests") || 0;
  db.set("requests", requests + 1);
  res.status(201).end();
});
const listener = app.listen(config.port, () => {
  console.log("Listening on ::" + config.port);
});

// export app, listener
module.exports = { app, listener };
