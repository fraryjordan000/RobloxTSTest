/*
-- Maid
-- Author: Quenty
-- Source: https://github.com/Quenty/NevermoreEngine/blob/version2/Modules/Shared/Events/Maid.lua
-- License: MIT (https://github.com/Quenty/NevermoreEngine/blob/version2/LICENSE.md)

Translated to Typescript by Joyrobotking


===EXAMPLE USAGE===

let maid = new Maid();

maid.GiveTask(task);
 > Task is an event connection, function, or Instance. Returns a task id

maid.CancelTask(task_id)
 > Removes a task from Maid. task_id is the string value returned by the GiveTask function

maid.DoCleaning();
 > Alias for Destroy

maid.Destroy();
 > Goes through each task and disconnects events, destroys instances, and calls functions. Returns how many tasks were cleaned

*/

type MaidTask = RBXScriptConnection | (() => void) | Instance;

export class Maid {
    tasks: {[task_id: string]: MaidTask} = {};

    private task_id: number = 0;

    constructor() {}

    GiveTask(task: MaidTask): string {
        assert(task, "Task cannot be false or undefined");
        const new_id = tostring(this.task_id);
        this.task_id++;
        this.tasks[new_id] = task;
        return new_id;
    }

    CancelTask(task_id: string): void {
        if(this.tasks[task_id]) delete this.tasks[task_id];
    }
    
    DoCleaning(): number {
        let clean_count = 0;
        for(const k of pairs(this.tasks)) {
            if(type(k[1]) === "function") {
                (k[1] as (() => void))();
            } else if(typeIs(k[1], "RBXScriptConnection")) {
                (k[1] as RBXScriptConnection).Disconnect();
            } else if(typeIs(k[1], "Instance")) {
                (k[1] as Instance).Destroy();
            } else {
                continue;
            }
            clean_count++;
        }
        this.tasks = {};
        return clean_count;
    }
}