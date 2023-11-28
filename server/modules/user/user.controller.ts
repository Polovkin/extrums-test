import express, {Response,Request} from "express";
import UserRepository from "./user.repository";
const protectedRoute = require('../../middleware/protectedRoute.middleware');
const router = express.Router();

router.get('/', protectedRoute,async (req: Request, res: Response) => {
    try {

        res.json(await UserRepository.findAll());
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
