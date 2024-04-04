import { defineBackend } from "@aws-amplify/backend"
import { auth } from "./auth/resource"
import { data } from "./data/resource"
import { sayHello } from "./function/say-hello/resource"

defineBackend({
  auth,
  data,
  sayHello,
})
