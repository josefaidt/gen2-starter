import {
  type ClientSchema,
  a,
  defineData,
  defineFunction,
} from "@aws-amplify/backend"

const tryThis = defineFunction({
  name: "say-hello",
  entry: "../function/say-hello/handler.ts",
})

const schema = a
  .schema({
    Todo: a
      .model({
        content: a.string(),
      })
      .authorization((allow) => [
        allow.owner(),
        // allow.custom("function").to(["read"]),
      ]),
  })
  .authorization((allow) => [allow.resource(tryThis).to(["query"])])

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    // API Key is used for a.allow.public() rules
    // apiKeyAuthorizationMode: {
    //   expiresInDays: 30,
    // },
  },
})
