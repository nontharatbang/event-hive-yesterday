import ModelSelector from './modelSelector'

export default async function validateInput(fieldValues: any, modelName: string) {
    if (!fieldValues) {
        return {}
    }

    const modelSelector = new ModelSelector()
    const model = modelSelector.create(modelName)

    const existingModel = model.findMany(fieldValues)

    if (!existingModel) {
        throw new Error(`${modelName}  does not exist`)
    }

    if (!Array.isArray(fieldValues)) {
        fieldValues = [fieldValues];
    }

    if (fieldValues.length == 1) {
        return {
            connect: {
                id: fieldValues[0],
            },
        }
    } else {
        const mappedIds = fieldValues.map((id: any) => ({ id }));
        return {
            connect: mappedIds,
        }
    }
}
