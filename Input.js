import { useRef } from "react";

//file input은 반드시 비제어 component로 만들어야 함 (보안 상의 문제)
function Input({ name, value, onChange }) {
  const inputRef = useRef();
  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return; //함수 종료

    inputNode.value = "";
    onChange(name, null);
  };

  return (
    <div>
      <input type="file" onChange={handleChange} ref={inputRef} />
      {value && <button onClick={handleClearClick}>X</button>}
    </div>
  );
}

export default Input;
