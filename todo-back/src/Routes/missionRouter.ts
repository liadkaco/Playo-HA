import express, { Router } from 'express';
import type { Request, Response } from 'express';
import Mission from "../DB/missionSchema";
import { MissionStatus } from '../utils/enum';

const router: Router = express.Router();


router.get("/missions", async (req: Request, res: Response) => {
    try {
        const missions = await Mission.find().exec();
        console.log(missions);
        res.status(200).send(missions);
    } catch (e) {
        res.status(500).send(`error: ${e}`);
    }
});

router.post("/mission", async (req: Request, res: Response) => {
    try {
        const { text } = req.body;
        const newMission = new Mission({
            text: text,
            date: Date.now(),
        });
        newMission.save().then(() => 
            res.status(200)
        );
    } catch (e) {
        res.status(500).send(`error: ${e}`);
    }
});

router.put("/mission/:id", async (req: Request, res: Response) => {
    try {
        const missionId = req.params.id;
        const { text, status } = req.body;

        const updatedMission = await Mission.findByIdAndUpdate(
            missionId,
            { text, ...(status && { status }) }
        );
        if (!updatedMission) {
            res.status(404).send({ error: "Mission not found" });
        }

        res.status(200).send({
            mission: updatedMission,
        });
    } catch (e) {
        res.status(500).send(`error: ${e}`);
    }
});

router.delete("/mission/:id", async (req: Request, res: Response) => {
    try {
        const missionId = req.params.id;
        await Mission.findByIdAndDelete(missionId).then(() => 
            res.status(200)
        );
    } catch (e) {
        res.status(500).send(`error: ${e}`);
    }
});

export default router;
