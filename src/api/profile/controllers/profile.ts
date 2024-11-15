
'use strict';

/**
 *  profile controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::profile.profile',({strapi: Strapi}) => ({
    async createMe(ctx) {
        try {
            const user = ctx.state.user;
            if(!user){
                return ctx.badRequest([{ messages: "No athorized user found!401"}]);
            }
            const result = await strapi.entityService.create('api::profile.profile', {
                data: {
                    fullName: ctx.request.body.fullName,
                    email: user.email,
                    user: user.id
                }
            });
            return result;
        } catch (err){
            return ctx.badRequest([{ messages: [{ id: err.message},500]}]);
        }
    },
    async getMe(ctx) {
        try {
            const user = ctx.state.user;
            if(!user){
                return ctx.badRequest([{ messages: "No athorized user found!401"}]);
            }
            const result = await strapi.db.query('api::profile.profile').findOne({
                where: {
                    user: {
                        id: {
                            $eq: user.id
                        }
                    }
                },
                populate: {
                    image: true,
                }
            });
            return result;
        } catch (err){
            return ctx.badRequest([{ messages: [{ id: 'Error'},500]}]);
        }
    }
}));
