import { Router } from "express";

const matchListRoutes = (api, database) => {
  const router = Router();

  router.get("/matchlist/:region/:accountId", async (req, res) => {
    try {
      const { region, accountId } = req.params;
      const result = await api.getMatchHistory(region, accountId, region);
      res.json(result);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        res.status(404).json({ message: "user not found" });
      } else {
        console.log(err);
        res.status(500).json({ message: "internal error" });
      }
    }
  });
  router.get("/match/:region/:gameId", async (req, res) => {
    try {
        const { region, gameId } = req.params;
        const result = await api.getMatch(region, gameId);
        res.json(result);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          res.status(404).json({ message: "user not found" });
        } else {
          console.log(err);
          res.status(500).json({ message: "internal error" });
        }
      }
  });
  return router;
};
export default matchListRoutes;
