import Validators from "@lib/validator/items.validator";
import Response, { getBody, getSession, isAllowed } from "@lib/http";
import ItemRepository from "@repository/item.repo";

export default class ItemsController {
    repo = new ItemRepository();

    async items(req) {
        const allowed = isAllowed(req);

        if (allowed.stats !== 200) return allowed;

        const items = await this.repo.getAll();

        return Response.ok('Items retrieved successfully', items);
    }

    async create(req) {
        const allowed = isAllowed(req);

        if (allowed.stats !== 200) return allowed;

        const body = await getBody(req);

        if (!body) return Response.badRequest('Invalid request body');

        const requestData = Validators.create.safeParse(body);

        if (!requestData.success) return Response.badRequest(requestData.error.errors);

        const session = await getSession(req);
        const item = await this.repo.create(requestData.data, session.id);

        return Response.created('Item created successfully', item);
    }

    async item(req, params) {
        const allowed = isAllowed(req);

        if (allowed.stats !== 200) return allowed;

        const item = await this.repo.getById(params.id);

        if (!item) return Response.notFound('Item not found');

        return Response.ok('Item retrieved successfully', item);
    }

    async update(req, params) {
        const allowed = isAllowed(req);

        if (allowed.stats !== 200) return allowed;

        const exists = await this.repo.getById(params.id);

        if (!exists) return Response.notFound('Item not found');

        const body = await getBody(req);

        if (!body) return Response.badRequest('Invalid request body');

        const requestData = Validators.update.safeParse(body);

        if (!requestData.success) return Response.badRequest(requestData.error.errors);

        const session = await getSession(req);
        const item = await this.repo.update(params.id, requestData.data, session.id);

        if (!item) return Response.notFound('Item not found');

        return Response.ok('Item updated successfully', item);
    }

    async delete(req, params) {
        const allowed = isAllowed(req);

        if (allowed.stats !== 200) return allowed;

        const exists = await this.repo.getById(params.id);

        if (!exists) return Response.notFound('Item not found');

        const session = await getSession(req);
        const item = await this.repo.delete(params.id, session.id);

        if (!item) return Response.notFound('Item not found');

        return Response.ok('Item deleted successfully', item);
    }

    async history(req, params) {
        const allowed = isAllowed(req);

        if (allowed.stats !== 200) return allowed;

        const exists = await this.repo.getById(params.id);

        if (!exists) return Response.notFound('Item not found');

        const history = await this.repo.getRecords(params.id);

        return Response.ok('Item history retrieved successfully', history);
    }

    async restock(req, params) {
        const allowed = isAllowed(req);

        if (allowed.stats !== 200) return allowed;

        const exists = await this.repo.getById(params.id);

        if (!exists) return Response.notFound('Item not found');

        const body = await getBody(req);

        if (!body) return Response.badRequest('Invalid request body');

        const requestData = Validators.restock.safeParse(body);

        if (!requestData.success) return Response.badRequest(requestData.error.errors);

        const session = await getSession(req);
        const item = await this.repo.restock(params.id, requestData.data.quantity, session.id);

        if (!item) return Response.notFound('Item not found');

        return Response.ok('Item restocked successfully', item);
    }
}
