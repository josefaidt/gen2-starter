import { defineFunction, secret } from "@aws-amplify/backend"

export const sayHello = defineFunction({
  name: "say-hello",
  environment: {
    PUBLIC_NAME: "WORLD",
    SECRET_NAME: secret("NAME"),
  },
})
