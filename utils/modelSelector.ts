const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export default class ModelSelector {
    findMany(fieldValues: string) {
        return undefined
    }
    create(modelName: string): ModelSelector {
        console.log('Hi there chaos im in lmao')
        switch (modelName) {
            case 'visitor':
                return new ModelVisitor()
            case 'shopOwner':
                return new ModelShopOwner()
            case 'eventOrganizer':
                return new ModelEventOrganizer()
            case 'shop':
                return new ModelShop()
            case 'event':
                return new ModelEvent()
            case 'product':
                return new ModelProduct()
            case 'tag':
                return new ModelTag()
            default:
                throw new Error(`${modelName} does not exist`)
        }
    }
}

export class ModelVisitor extends ModelSelector {
    findMany(fieldValues: string) {
        const existingModel = prisma.visitor.findMany({
            where: {
                id: {
                    in: fieldValues,
                },
            },
        })

        return existingModel
    }
}

export class ModelShopOwner extends ModelSelector {
    findMany(fieldValues: string) {
        const existingModel = prisma.shopOwner.findMany({
            where: {
                id: {
                    in: fieldValues,
                },
            },
        })

        return existingModel
    }
}

export class ModelEventOrganizer extends ModelSelector {
    findMany(fieldValues: string) {
        const existingModel = prisma.eventOrganizer.findMany({
            where: {
                id: {
                    in: fieldValues,
                },
            },
        })

        return existingModel
    }
}

export class ModelShop extends ModelSelector {
    findMany(fieldValues: string) {
        const existingModel = prisma.shop.findMany({
            where: {
                id: {
                    in: fieldValues,
                },
            },
        })

        return existingModel
    }
}

export class ModelEvent extends ModelSelector {
    findMany(fieldValues: string) {
        const existingModel = prisma.event.findMany({
            where: {
                id: {
                    in: fieldValues,
                },
            },
        })

        return existingModel
    }
}

export class ModelProduct extends ModelSelector {
    findMany(fieldValues: string) {
        const existingModel = prisma.product.findMany({
            where: {
                id: {
                    in: fieldValues,
                },
            },
        })

        return existingModel
    }
}

export class ModelTag extends ModelSelector {
    findMany(fieldValues: string) {
        const existingModel = prisma.tag.findMany({
            where: {
                id: {
                    in: fieldValues,
                },
            },
        })

        return existingModel
    }
}
