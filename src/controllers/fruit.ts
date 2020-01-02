import {Fruit} from '../schemas/index';
import json from '../utils/json';
import Koa from 'koa';
import Router from 'koa-router';
const router = new Router();


/**
 * @api {get} /create Create A Fruit
 * @apiName Create
 * @apiGroup Fruit
 *
 * @apiParam {String} name Name of Fruit.
 *
 * @apiSuccess {String} name Name of Fruit.
 */
router.get('/create', async (ctx: Koa.BaseContext) => {
    const client = new Fruit({
        name: ctx.query.name
    });
    await client.save();
    json(ctx, {
        data: {
            name: ctx.query.name
        }
    });
});

router.get('/list', async (ctx: Koa.BaseContext) => {
    const result = await Fruit.find({});
    if (!result || result.length === 0) return json(ctx, {success: false, msg: "Can't find fruits"});
    json(ctx, {
        data: result
    });
});

export default router;
