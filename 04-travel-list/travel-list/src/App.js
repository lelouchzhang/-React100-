import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];
export default function App() {
  // -------------
  // itemList渲染在PackingList，setItemList完成于Form，所以将这部分内容定义距离在两个组件最近的公共组件中
  const [itemList, setItemList] = useState(initialItems);
  function handleAddItemList(newitem) {
    setItemList((item) => [...item, newitem]);
  }
  function handleDeleteItem(id) {
    setItemList((item) => item.filter((item) => item.id !== id));
  }
  function handleToggleItem(id) {
    setItemList((item) =>
      item.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  // -------------
  return (
    <div className="app">
      <Logo />
      <Form onAddItemList={handleAddItemList} />
      <PackingList
        itemList={itemList}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>👊 备忘录 ✍</h1>;
}

function Form({ onAddItemList }) {
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
// 备忘录列表
function PackingList({ itemList, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {itemList.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
    </div>
  );
}

// 备忘录列表项
function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>共x笔，已打勾y笔</em>
    </footer>
  );
}
