export interface ActionConfig {
    id: string;
    bias: number;
    activationFunction: (input : number) => number;
    actionFunction : (input : any) => any;
}