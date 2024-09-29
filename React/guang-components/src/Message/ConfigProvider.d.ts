import { PropsWithChildren, RefObject } from "react";
import { MessageRef } from ".";
interface ConfigProviderProps {
    messageRef?: RefObject<MessageRef>;
}
export declare const ConfigContext: import("react").Context<ConfigProviderProps>;
export declare function ConfigProvider(props: PropsWithChildren): import("react/jsx-runtime").JSX.Element;
export {};
