import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));
app.use(express.static("data"));

const getAllData = () => {
  const c = fs.readFileSync("./data/list.json", {
    encoding: "utf-8",
    flag: "r",
  });
  if (c.length == 0) {
    writeDataToFile([]);
    return [];
  }
  return JSON.parse(c);
};

const writeDataToFile = async (data) => {
  const lock = await fs.promises.open("./data/list.json", "w");
  await lock.write(JSON.stringify(data));
  await lock.close();
};

app.post("/add", async (req, res) => {
  const { body } = req;
  try {
    const id = uuidv4();
    const allData = getAllData();
    allData.push({ id: id, ...body });
    writeDataToFile(allData);
    res.status(200).json({ succes: true, id: id });
  } catch (error) {
    console.log(error);
    res.status(404);
  }
});

app.get("/list", async (req, res) => {
  try {
    const allData = getAllData();
    res.status(200).json({ succes: true, data: allData });
  } catch (error) {
    console.log(error);
    res.status(404);
  }
});

app.delete("/delete", async (req, res) => {
  const { body } = req;
  try {
    const allData = getAllData();
    const filteredAllData = allData.filter(
      (item) => item.id !== body.deletedId
    );
    writeDataToFile(filteredAllData);
    res.status(200).json({ succes: true });
  } catch (error) {
    console.log(error);
    res.status(404);
  }
});

app.get("/", (req, res) => {});

app.listen(8080);
