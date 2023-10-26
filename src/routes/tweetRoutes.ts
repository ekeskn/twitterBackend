import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

//tweet CRUD

//create tweet
router.post("/", async (req, res) => {
  const { content, userId } = req.body;
  try {
    const result = await prisma.tweet.create({
      data: {
        content,
        userId
      },
    });

    res.json(result);
  } catch (e) {
    res.status(400).json({ e });
  }
});

//list tweet
router.get("/", async (req, res) => {
  const allTweet = await prisma.tweet.findMany({include:{user:{
    select:{
      id:true,
      name:true,
      username:true,
      image:true
    }

  }}});

  res.json({ allTweet });
});

//get one tweet
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const tweet = await prisma.tweet.findUnique({ where: { id: Number(id) },include:{user:true} });
  if(!tweet){  
   return res.status(404).json({error:"tweet not found"}) 
  }
  res.json({ tweet });
});

//update tweet
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { content, image,impressions } = req.body;
  try {
    const result = await prisma.tweet.update({
      where: { id: Number(id) },
      data: {
        content,
        image,
        impressions
      },
    });

    res.json(result)
  } catch (e) {
    res.status(400).json({ error: "failed to update user" });
  }
});

//delete tweet
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.tweet.delete({where:{id:Number(id)}});
  res.sendStatus(200);
});

export default router;
