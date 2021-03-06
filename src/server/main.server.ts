/******************************************************
Programmer: krukovv (Discord: Commander Tempest#1406)

This file currently handles the creation of new 
'attackable targets' and attaches a clickdetector
to them to handle targeting
******************************************************/

import { Workspace } from "@rbxts/services";
import Remotes from "shared/remotes.module";

class AttackableTarget
{
  readonly HP: number;

  constructor(hp: number = 100)
  {
    this.HP = hp;
  } // end constructor

  // create a dummy entity with preset properties
  createEntity(numberOf: number = 1): Part // this is for the future, this is number of entities to make
  {
    let newF = new Instance("Folder");
    let entity: Part; // pseudo-enemy for now, it's just a brick
    let clickDetector;
    let i = 0;  

    //while (i < numberOf)
    //{
      entity = new Instance("Part");
      entity.SetAttribute("HP", this.HP);
      entity.Parent = newF;
      newF.Parent = Workspace;
      entity.Size = new Vector3(5,5,5);
      entity.Position = new Vector3(0,0,0);
      entity.Name = "Terminator-000";
      clickDetector = new Instance("ClickDetector");
      clickDetector.Parent = entity;
      // note: high-latency studio-settings - network - incoming replication lag (seconds?)
      clickDetector.MouseClick.Connect((player: Player) => this.onClick(player, entity))
      return entity;
    //} // end while
    //return new Instance("Part");
  } // end createEntity

  private onClick(player: Player, entity: Part)
  {
    Remotes.Server.Create("targetEntity").SendToPlayer(player, entity);
  } // end onClick
} // end AttackableTarget

function start()
{
  let myEntity = new AttackableTarget();

  myEntity.createEntity();
} // end start

start()
