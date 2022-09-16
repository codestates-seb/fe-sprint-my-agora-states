import { useState } from "react";
import Input from "./Input";

function ListForm() {
  const [values, setValues] = useState({
    title: "",
    name: "",
    content: "",
    imgfile: null,
  });

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <form className="ListForm" onSubmit={handleSubmit}>
      <Input name="imgfil" value={values.imgfile} onChange={handleChange} />
      <input
        type="text"
        name="name"
        value={values.name}
        placeholder="Enter your name: "
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="title"
        value={values.title}
        placeholder="Enter your title: "
        onChange={handleInputChange}
      />
      <textarea
        name="content"
        value={values.content}
        placeholder="질문을 작성하세요"
        onChange={handleInputChange}
      />
      <button type="submit">확인</button>
    </form>
  );
}

export default ListForm;
