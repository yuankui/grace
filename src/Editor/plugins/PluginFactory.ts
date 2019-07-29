import Div from "./Div/Div";
import H1 from "./H1/H1";
import {BasePlugin, PluginParam} from "./BasePlugin";

const plugins: {
    [props: string]: any,

} = {
    'div': Div,
    'h1': H1,
};

export function buildPlugin(value: PluginParam<any>): BasePlugin<any, any> {
    let Plugin = plugins[value.type];
    if (Plugin != null) {
       return new Plugin(value);
    }
    throw new Error("plugin not supported:" + value);
}