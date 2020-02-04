import express from "express";
import Jokes from "../models/jokes";

const router = express.Router();

const getJoke = async (req: any, res: any, next: any) => {
    let joke;
    try {
        joke = await Jokes.findById(req.params.id);
        if (!joke)
            return res.status(404).json({ message: "Cannot find joke" });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
    res.joke = joke;
    next();
}


router.get("/limit", async (req, res) => {
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page);
    const length = await Jokes.countDocuments();
    const jokes = await Jokes.find().skip(page * limit).limit(limit);
    res.send({
        length,
        jokes
    });
});

router.get("/", async (req, res) => {
    const jokes = await Jokes.find();
    res.send(jokes);
});

router.get("/:id", getJoke, async (req, res: any) => {
    res.send(res.joke);
});

router.post("/", async (req, res) => {
    const joke = new Jokes({
        overskrift: req.body.overskrift,
        jokeTekst: req.body.jokeTekst
    });
    try {
        const newJoke = await joke.save();
        res.status(201).json(newJoke);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error });
    }
});

router.patch("/:id", getJoke, async (req: any, res: any) => {
    if (req.body.overskrift) {
        res.joke.overskrift = req.body.overskrift;
    }
    if (req.body.jokeTekst) {
        res.joke.jokeTekst = req.body.jokeTekst;
    }
    try {
        const updatedJoke = await res.joke.save();
        res.json(updatedJoke);
    } catch (error) {
        console.error(error)
        res.status(400).json({ message: error });
    }
});

router.delete("/:id", getJoke, async (req: any, res: any) => {
    try {
        await res.joke.remove();
        res.json({ message: "Deleted joke" })
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

router.get("/sog/:text", async (req: any, res: any) => {
    const searchText = req.params.text;
    const jokes = await Jokes.find({
        $or: [
            {
                overskrift: {
                    $regex: searchText,
                    $options: "i"
                }
            },
            {
                jokeTekst: {
                    $regex: searchText,
                    $options: "i"
                }
            }
        ]
    });
    res.status(200).json({ message: jokes });
});


export default router;