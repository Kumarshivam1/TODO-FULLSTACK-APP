/**@for post route
 * body{
 * title:string,
 * description:string
 * }
 */

/**@For put route
 * id:string
 */

const zod = require("zod");

//@for Post
const schemaPost = zod.object({
    title:zod.string(),
    description:zod.string()
})

//@for put
const schemaPut = zod.object({
    id:zod.string()
});

module.exports = {schemaPost,schemaPut};
