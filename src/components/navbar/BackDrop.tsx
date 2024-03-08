interface BackDropProps {
  onClick: () => void;
}

const BackDrop: React.FC<BackDropProps> = ({ onClick }) => {
  return (
    <div
      className="z-20 bg-transparent fixed top-0 left-0 w-screen h-screen "
      onClick={onClick}
    />
  );
};

export default BackDrop;
