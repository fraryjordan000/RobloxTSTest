import * as UITools from "UITools";
import { Maid } from "Maid";
import { InstanceInfo } from "AdvancedInstanceTools";

/*
    Instance Finder Plugin
    Author: Joyrobotking

    Plugin Pages:
        Properties (empty when nothing is selected, contains property filter options of first selected instance otherwise)
            - Listen For Selection Text Button (when inactive, selecting stuff in workspace will do nothing. Otherwise, listen for first select event before becoming inactive)
            - Search Button (greyed out while no properties are selected to filter)
            - Properties List Container
                - Property Item Template (inactive)
                    - Property Name Label
                    - Property Value Label
                    - Property Toggle Active Arrow
                =These next instances will appear just underneath activated properties, and provide controls for modifying the filter values.
                - Active Boolean Item Template
                    - Boolean Checkbox Button (Text Button with no text, and square shape of a checkbox)
                - Active Number Item Template
                    - Mode Exact Option (Searches for exact number matches of instances for this property)
                    - Mode Within Option (Searches for number matches that are within a certain range of the target)
                    - Number Target Textbox (The target number)
                - Active String Item Template
                    - Match Contents Checkbox (If true, searches for the target string inside of instance properties. Otherwise, searches for exact string matches)
                    - Match Case Sensitive Checkbox (If true, searches will care about capitalization. Otherwise, it will not)
                    - Match Target String Textbox (The target string)
                - Active Vector3 Item Template
                    - Mode Exact Option
                    - Mode Within Option
                    - Vector Target X Textbox
                    - Vector Target Y Textbox
                    - Vector Target Z Textbox
                - Active CFrame Item Template
                    - Mode Exact Option
                    - Mode Within Option
                    - Vector Target X Textbox
                    - Vector Target Y Textbox
                    - Vector Target Z Textbox
            - Awaiting Selection Popup Frame (shows up while the Listen For Selection button is active)
        Explorer (A basic version of the built-in Explorer, restricted to workspace. When the search button is clicked in the properties page, the items here are filtered)
            - Navbar
                - "Workspace" Label
                - Clear Filters Text Button
                - Select All Search Matches Text Button (Disabled if there are no active filters, otherwise causes all matching instances to be selected in studio)
            - Instance Scrolling Frame (parent/child relations shown as a slight offset from the left)
                - Instance Template
                    - Instance Type Icon (A different icon for each type of Instance. If an unsupported instance is detected, a fallback icon)
                    - Instance Name Label
                    - Select Button (Selects the instance in studio when clicked)
                    - Show Children Image Button (Arrow Image. Invisible if no children. Toggles if the children of the instance are shown below, and at a slight offset)
            
    Notes:
        - When an Instance is selected and its properties are shown, basically all of its property data is just copied to the Properties page.
            Each filter property can then be activated and/or changed to anything by the user, if they wish.
*/
