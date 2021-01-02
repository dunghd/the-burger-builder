export interface IAuxiliaryProps { };

const aux = (props: React.PropsWithChildren<IAuxiliaryProps>) => props.children as JSX.Element;

export default aux;