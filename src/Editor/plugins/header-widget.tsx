import {Model, Widget} from "./core";
import {WidgetFactory} from "./factory";
import {ReactNode} from "react";
interface Props {

}
class HeaderWidget implements Widget<Props> {
    init(model: Model<Props>, factory: WidgetFactory): void {
    }

    render(): ReactNode {
        return undefined;
    }

}