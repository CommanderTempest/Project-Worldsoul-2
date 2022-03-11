import Net, { Definitions } from "@rbxts/net";

const Remotes = Net.Definitions.Create({
  // tells the server to save a changed hotbar in a datastore
  SaveClientHotbar: Definitions.ClientToServerEvent<[ui: GuiButton]>(), 
  targetEntity: Definitions.ServerToClientEvent<[part: Part]>()
})

export = Remotes;