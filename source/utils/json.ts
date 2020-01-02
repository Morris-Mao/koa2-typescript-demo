export default (ctx, returnData: Object = {}) => {
    ctx.type = 'application/json';
    const newReturn = Object.assign({
        success: true,
        msg: 'ok',
        data: {}
    }, returnData);
    ctx.body = JSON.stringify(newReturn)
}
