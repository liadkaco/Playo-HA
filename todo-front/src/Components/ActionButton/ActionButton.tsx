interface ActionProps {
  func: () => void;
  text: string;
  color: string;
  hoverColor: string;
}

const ActionButton: React.FC<ActionProps> = ({
  text,
  func,
  color,
  hoverColor,
}) => {
  return (
    <button
      onClick={func}
      className={`${color} text-white px-4 py-2 rounded-md hover:${hoverColor} focus:outline-none`}
    >
      {text}
    </button>
  );
};

export default ActionButton;
