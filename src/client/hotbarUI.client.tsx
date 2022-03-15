/******************************************************
Programmer: krukovv (Discord: Commander Tempest#1406)

This file creates a hotbar with 8 buttons in preset
locations, and allows these buttons to be dragged, and
swapped with each other.
******************************************************/

import Roact, { createElement, Event } from "@rbxts/roact";
import {Players, UserInputService} from "@rbxts/services";
import { ActionButton } from "./ActionButton.module";

const playerGui = Players.LocalPlayer.FindFirstChild("PlayerGui") as PlayerGui;

class HotbarUI extends Roact.Component
{
  render()
  {
    return (
      <screengui ResetOnSpawn={false}>
        <frame 
          Size={new UDim2(0, 856, 0, 50)} 
          Position={new UDim2(0, 200, 0, 474)}         // Center bottom
          BackgroundColor3={new Color3(138, 138, 138)} // A lightish gray
          >
          <ActionButton
            Text = {"Button0"}
            Position = {new UDim2(0,0,0,0)}
            Size = {new UDim2(0, 112, 0, 50)}
          />
          <ActionButton 
            Text = {"Button1"}
            Position = {new UDim2(0,112,0,0)}
            Size = {new UDim2(0, 112, 0, 50)}
          />
          <ActionButton 
            Text = {"Button2"}
            Position = {new UDim2(0,224,0,0)}
            Size = {new UDim2(0, 112, 0, 50)}
          />
          <ActionButton  
            Text = {"Button3"}
            Position = {new UDim2(0,336,0,0)}
            Size = {new UDim2(0, 112, 0, 50)}
          />
          <ActionButton 
            Text = {"Button4"}
            Position = {new UDim2(0,448,0,0)}
            Size = {new UDim2(0, 112, 0, 50)}
          />
          <ActionButton 
            Text = {"Button5"}
            Position = {new UDim2(0,560,0,0)}
            Size = {new UDim2(0, 112, 0, 50)}
          />
          <ActionButton 
            Text = {"Button6"}
            Position = {new UDim2(0,672,0,0)}
            Size = {new UDim2(0, 112, 0, 50)}
          />
          <ActionButton 
            Text = {"Button7"}
            Position = {new UDim2(0,784,0,0)}
            Size = {new UDim2(0, 112, 0, 50)}
          />
        </frame>
      </screengui>
    )
  } // end render
}

let myHandle = Roact.mount(<HotbarUI/>, playerGui, "HotbarUI");
let myFrame = playerGui.FindFirstChild("HotbarUI")?.FindFirstChild("1") as Frame;
let myButtonArray = myFrame.GetChildren() as Array<TextButton>;

// to more easily identify the buttons
let i = 0
myButtonArray.forEach((element) => {
  element.Name = tostring(i);
  i++;
})


