import React, { useEffect, useState } from "react";
import Editable from "../Editable/Editable";
import {
  Calendar,
  Check,
  CheckSquare,
  List,
  Tag,
  Trash,
  Type,
  X,
} from "react-feather";
import Modal from "../Modal/Modal";
import "./CardInfo.css";
import Chip from "../Chip/Chip";
export default function CardInfo(props) {
  const colors = [
    "#a8193d",
    "#4fcc25",
    "#1ebffa",
    "#8da377",
    "#9975bd",
    "#cf61a1",
    "#240959",
  ];

  const [activeColor, setActiveColor] = useState("");

  const { title, labels, desc, date, tasks } = props.card;
  //here we are doing destructuring above so that we don't have to write props.item again and again.

  const [values, setValues] = useState({ ...props.card });
  //here we just made copy of card and not only that we desctructured all the values that a card contain inside an object........so that we can just send the object while updating an object

  const calculatePercent = () => {
    if (values.tasks.length === 0) return "0";
    const completed = values.tasks?.filter((item) => item.completed)?.length;
    return (completed / values.tasks?.length) * 100 + "";
  };

  const addLabel = (value, color) => {
    console.log(value);
    const index = values.lables?.findIndex((item) => item.text === value);
    if (index > -1) return;
    const label = {
      text: value,
      color,
    };
    setValues({ ...values, labels: [...values.labels, label] });
    setActiveColor("");
    console.log(value);
  };

  const removeLabel = (text) => {
    const index = values.labels?.findIndex((item) => item.text === text);
    if (index < 0) return; //search for findIndex, if index = -1, means no element is found
    setValues({ ...values, label: values.labels.splice(index, 1) });
  };

  const addTask = (value) => {
    console.log(value);

    const task = {
      id: Date.now() + Math.random(),
      text: value,
      completed: false,
    };
    setValues({
      ...values,
      tasks: [...values.tasks, task],
    });
    console.log(value);
  };
  console.log(values);
  const removeTask = (id) => {
    const index = values.tasks?.findIndex((item) => item.id === id);
    if (index < 0) return;

    const tempTasks = values.tasks?.splice(index, 1);
    setValues({ ...values, tasks: tempTasks });
  };

  const updateTask = (id, completed) => {
    const index = values.tasks?.findIndex((item) => item.id === id);
    if (index < 0) return;

    const tempTasks = [...values.tasks];
    tempTasks[index].completed = completed;
    setValues({ ...values, tasks: tempTasks });
  };

  useEffect(() => {
    props.updateCard(props.card.id, props.boardId, values);
  }, [values]);
  return (
    <Modal onClose={() => props.onClose()}>
      <div className="cardinfo">
        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <Type />
            Title no - 1
          </div>
          <div className="cardinfo_box_body">
            <Editable
              text={values.title} // here we are getting the destructured value
              default={values.title}
              placeholder="Enter title"
              buttonText="Set Title"
              onSubmit={(e) => setValues({ ...values, title: e })}
            />
          </div>
        </div>

        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <List />
            Description
          </div>
          <div className="cardinfo_box_body">
            <Editable
              text={values.desc}
              default={values.desc}
              placeholder="Enter Description"
              buttonText="Set Description"
              onSubmit={(e) => setValues({ ...values, desc: e })}
            />
          </div>
        </div>

        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <Calendar />
            Date
          </div>
          <div className="cardinfo_box_body">
            <input
              type="date"
              defaultValue={
                values.date
                  ? new Date(values.date).toISOString().substring(0, 10)
                  : ""
              }
              onChange={(event) =>
                setValues({ ...values, date: event.target.value })
              }
            />
          </div>
        </div>

        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <Tag />
            Labels
          </div>
          <div className="cardinfo_box_labels">
            {values.labels?.map((item, index) => (
              <Chip
                onClose={() => removeLabel(item.text)}
                key={item.text + index}
                color={item.color}
                text={item.text}
              >
                {item.text}
                <X onClick={() => removeLabel(item)} />
              </Chip>
            ))}
          </div>
          <div className="cardinfo_box_colors">
            {colors.map((item, index) => (
              <li
                key={index}
                style={{ backgroundColor: item }}
                className={item === activeColor ? "active" : ""}
                onClick={() => setActiveColor(item)}
              />
            ))}
          </div>
          <div className="cardinfo_box_body">
            <Editable
              text="Add Label"
              placeholder="Enter Label"
              buttonText="Add"
              onSubmit={(value) => addLabel(value, activeColor)}
            />
          </div>
        </div>
        {/* ********************************* */}
        {/* <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <Tag />
            <p>Labels</p>
          </div>
          <div className="cardinfo_box_labels">
            {values.labels?.map((item, index) => (
              <label
                key={index}
                style={{ backgroundColor: item.color, color: "#fff" }}
              >
                {item.text}
                <X onClick={() => removeLabel(item)} />
              </label>
            ))}
          </div>
          <div className="cardinfo_box_colors">
            {colors.map((item, index) => (
              <li
                key={index + item}
                style={{ backgroundColor: item }}
                className={item === activeColor ? "active" : ""}
                onClick={() => setActiveColor(item)}
              />
            ))}
          </div>
          <div className="cardinfo_box_body">
            <Editable
              text="Add Label"
              placeholder="Enter Label"
              buttonText="Add"
              onSubmit={(value) => addLabel(value, activeColor)}
            />
          </div>
        </div> */}

        {/* ********************************** */}
        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <CheckSquare />
            Tasks
          </div>

          <div className="cardinfo_box_progress_bar">
            <div
              className="cardinfo_box_progress"
              style={{
                width: calculatePercent() + "%",
                backgroundColor: calculatePercent() == "100" ? "limegreen" : "",
              }}
            />
          </div>

          <div className="cardinfo_box_list">
            {values.tasks?.map((item) => {
              return (
                <div key={item.id} className="cardinfo_task">
                  <input
                    type="checkbox"
                    defaultValue={item.completed}
                    onChange={(event) =>
                      updateTask(item.id, event.target.checked)
                    }
                  />
                  <p>{item.text}</p>
                  <Trash onClick={() => removeTask(item.id)} />
                </div>
              );
            })}

            <div className="cardinfo_box_body">
              <Editable
                text="Add new task"
                placeholder="Enter Task"
                buttonText="Add Task"
                // onSubmit={addTask}
                onSubmit={(value) => addTask(value)}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
