import {
  createMethodDefinition,
  createModuleDefinition,
  createScalarPropertyDefinition,
  createObjectDefinition,
  createObjectPropertyDefinition,
  createTypeInfo,
  TypeInfo,
} from "@web3api/schema-parse";

export const typeInfo: TypeInfo = {
  ...createTypeInfo(),
  objectTypes: [
    {
      ...createObjectDefinition({
        type: "TypeA",
      }),
      properties: [
        createObjectPropertyDefinition({
          name: "prop",
          type: "TypeB",
        }),
      ],
    },
    {
      ...createObjectDefinition({
        type: "TypeC",
      }),
      properties: [
        createScalarPropertyDefinition({
          name: "prop",
          type: "String",
        }),
      ],
    },
    {
      ...createObjectDefinition({
        type: "TypeB",
      }),
      properties: [
        createObjectPropertyDefinition({
          name: "prop",
          type: "TypeC",
        }),
      ],
    },
  ],
  moduleTypes: [
    {
      ...createModuleDefinition({ type: "Mutation" }),
      imports: [],
      interfaces: [],
      methods: [
        {
          ...createMethodDefinition({
            type: "mutation",
            name: "method",
            return: createObjectPropertyDefinition({
              name: "method",
              type: "TypeA",
            }),
          }),
          arguments: [
          ],
        },
      ],
    },
  ],
};
