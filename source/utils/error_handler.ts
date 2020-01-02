import json from './json'
// Error Handler For Koa2
export default async (ctx, next) => {
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
