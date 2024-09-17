import { useState } from "react";
import { Item } from "../App";

// 备忘录列表
export function PackingList({
  itemList,
  onDeleteItem,
  onToggleItem,
  onClearList,
}) {
  // 排序功能
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;
  if (sortBy === "input") sortedItems = itemList;
  if (sortBy === "description") {
    sortedItems = [...itemList].sort((a, b) =>
      a.description.localeCompare(b.description)
    );
  }
  if (sortBy === "packed") {
    sortedItems = itemList
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">按添加时间排序</option>
          <option value="description">按备注排序</option>
          <option value="packed">按是否完成排序</option>
        </select>
        <button onClick={() => onClearList()}>清除所有</button>
      </div>
    </div>
  );
}
