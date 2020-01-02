import json from './json'
import Koa from 'koa';

// Error Handler For Koa2
export default async (ctx: Koa.BaseContext, next: () => Promise<any>) => {
    try {
        await next()
    } catch (e) {
        // Unknown Exception
        console.warn(e);
        json(ctx, {
            success: false,
            msg: e.msg || 'Unknown Internal Server Error'
        });
    }
}
