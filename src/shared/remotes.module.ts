import Net, { Definitions } from "@rbxts/net";

const Remotes = Net.Definitions.Create({
  SaveClientHotbar: Definitions.ClientToServerEvent<[ui: GuiButton]>() // Tells the server to save a changed hotbar in a datastore
})

export = Remotes;