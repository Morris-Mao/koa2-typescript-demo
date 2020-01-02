import {Fruit} from '../schemas/index';
import json from '../utils/json';
const Router = require('koa-router');
const router = new Router();


/**
 * @api {get} /user/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.get('/create', async (ctx) => {
    const client = new Fruit({
        name: ctx.query.name
    });
    await client.save();
    json(ctx, {
        name: ctx.query.name
    });
});

router.get('/list', async (ctx) => {
    const result = await Fruit.find({});
    if (!result || result.length === 0) return json(ctx, {success: false, msg: "Can't find fruits"});
    json(ctx, {
        data: result
    });
});

export default router;
