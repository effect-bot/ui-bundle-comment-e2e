import { UiSchema } from "@effect/ui"
import { BrowserHost, Html } from "@effect/ui/html"
import { Effect, Layer, Schema } from "effect"

const Message = UiSchema.TaggedEnum({ Increment: {}, Decrement: {} })

const Counter = Html.component({
  name: "Counter",
  model: Schema.Number,
  message: Message
}).make({
  init: () => 0,
  update: ($, message) =>
    message._tag === "Increment" ? $.model + 1 : $.model - 1,
  view: (h, model) =>
    h.div.children(
      h.button.on("click", Message.Decrement()).children("-"),
      h.span.children(String(model)),
      h.button.on("click", Message.Increment()).children("+")
    )
})

Layer.launch(BrowserHost.mount(Counter, {}, document.getElementById("app")!))
  .pipe(Effect.runFork)
console.log("bundle size e2e 2")
