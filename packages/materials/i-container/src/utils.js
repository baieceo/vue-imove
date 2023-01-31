export const getSchemaDefaultValues = (schema, json = {}) => {
	if (schema.type === 'object') {
		for (let key in schema.properties) {
			const prop = schema.properties[key];

			if (prop.type === 'string') {
				json[key] = prop.default;
			}

			if (prop.type === 'object') {
				json[key] = getSchemaDefaultValues(prop, {});
			}

			if (prop.type === 'array') {
				json[key] = [];
			}
		}
	}

	return json;
};