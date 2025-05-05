import { MouseEvent } from 'react';

type ButtonProps = {
  handleMenu: (event: MouseEvent<HTMLButtonElement>) => void;
  texto: string;
};

const Button = ({ handleMenu, texto }: ButtonProps) => (
  <button
    onClick={handleMenu}
    className="bg-gray-500 hover:bg-gray-400 text-white px-2 py-1 rounded font-bold text-base tracking-wide"
  >
    <p className="text-sm">{texto}</p>
  </button>
);

export default Button;
