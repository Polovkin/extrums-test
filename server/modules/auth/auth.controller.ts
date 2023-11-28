import express from "express";
import AuthService from "./auth.service";
const router = express.Router();

router.post('/login', async function (req, res, next) {
    try {
        const {username, password} = req.body;
        const token = await AuthService.login({username, password})
        res.json({token});
    } catch (e) {
        next(e);
    }
});

module.exports = router;
