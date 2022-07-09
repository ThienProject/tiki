import * as request from '~/utils/request';

export const getTypeFeatured = async (limit) => {
    try {
        const result = await request.get(`type/featured`, {
            params: {
                limit,
            },
        });
        return result.data
    } catch (error) {
        console.log(error);
    }
};
