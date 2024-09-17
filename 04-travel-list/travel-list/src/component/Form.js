import { useState } from "react";

export function Form({ onAddItemList }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;
    // 处理用户输入
    const userInput = {
      id: crypto.randomUUID(),
      description,
      quantity,
      packed: false,
    };

    onAddItemList(userInput);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={(e) => handleSubmit(e)}>
      <h3>你是..不能忘记的..</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => {
          return (
            <option value={num} key={num}>
              {num}
            </option>
          );
        })}
      </select>
      <input
        type="text"
        placeholder="请输入..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>添加</button>
    </form>
  );
}
