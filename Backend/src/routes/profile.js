import {Router} from 'express'


const profileRoutes = (api, database) => {
    const router = Router();

    router.get('/by-name/:region/:name/:tag', async (req, res) => {
      try {
        const {region, name, tag} = req.params;
        const result = await api.getUserByName(region, name, tag)
        res.json(result)
      }catch(err) {
        if(err.response && err.response.status === 404) {
            res.status(404).json({message: "user not found"})
        } else {
            console.log(err)
            res.status(500).json({message: "internal error"})

        }
      }
    })
    router.get('/by-id/:region/:id', async (req, res) => {
      try {
        const {region, id} = req.params;
        const result = await api.getUserBySummonerId(region, id)
        res.json(result)
      }catch(err) {
        if(err.response && err.response.status === 404) {
            res.status(404).json({message: "user not found"})
        } else {
            console.log(err)
            res.status(500).json({message: "internal error"})

        }
      }
    })
    return router;
}
export default profileRoutes;