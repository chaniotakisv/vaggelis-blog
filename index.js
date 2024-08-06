import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "Data Analytics on Modern Businesses",
    content:
      "Data Analytics has moved from being a niche skill to a cornerstone of modern business operations, driving innovation and strategic decision-making. By analyzing vast amounts of data, businesses can uncover actionable insights, optimize processes, and predict trends. The advancements in big data technologies and analytical tools enable companies to tackle complex challenges, enhance customer experiences, and unlock new growth opportunities that were previously out of reach.",
    author: "Vaggelis Chaniotakis",
    date: "2024-08-05T09:15:00Z",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) has transitioned from a futuristic concept to an integral part of our current reality, transforming various sectors and augmenting the functionality of existing systems. By automating mundane tasks and providing sophisticated insights, AI is revolutionizing the business landscape. The progress in machine learning and deep learning allows businesses to solve complex challenges and explore new prospects that were once unattainable.",
    author: "David Fernando",
    date: "2024-08-07T14:30:00Z",
  },
  {
    id: 3,
    title: "The Evolution of Sustainable Tourism",
    content:
      "Sustainable tourism is an emerging and rapidly evolving trend in the travel industry. It refers to the shift from traditional, mass-market tourism to more eco-friendly and community-centered travel experiences. With the promise of reduced environmental impact and greater cultural preservation, sustainable tourism initiatives offer a wide range of benefits, from eco-conscious accommodations and responsible wildlife interactions to community-based tourism and heritage conservation.",
    author: "Mary Queen",
    date: "2024-08-10T10:00:00Z",
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET all posts
app.get("/posts", (req, res) => {
  console.log(posts);
  res.json(posts);
});

// GET a specific post by id
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

// POST a new post
app.post("/posts", (req, res) => {
  const newId = lastId += 1;
  const post = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
  };
  lastId = newId;
  posts.push(post);
  res.status(201).json(post);
});

// PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;

  res.json(post);
});

// DELETE a specific post by providing the post id
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
