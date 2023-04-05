import React, { useState } from "react";
import DropDown from "../Dropdown/DropDown";
import { CheckSquare, Clock, MoreHorizontal } from "react-feather";
import "./Card.css";
import Chip from "../Chip/Chip";
import CardInfo from "./CardInfo";
export default function Card(props) {
  const [showDropdown, setShowDropDown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {showModal && (
        <CardInfo
          card={props.card}
          onClose={() => setShowModal(false)}
          updateCard={props.updateCard}
          boardId={props.boardId}
        />
      )}
      <div
        className="card"
        draggable
        onDragEnd={() => props.handleDragEnd(props.card?.id, props.boardId)}
        onDragEnter={() => props.handleDragEnter(props.card?.id, props.boardId)}
        onClick={() => setShowModal(true)}
      >
        <div className="card_top">
          <div className="card_top_labels">
            {props.card?.labels?.map((item, index) => (
              <Chip key={index} text={item.text} color={item.color} />
            ))}
          </div>
          <div className="card_top_more" onClick={() => setShowDropDown(true)}>
            <MoreHorizontal />
            {showDropdown && (
              <DropDown onClose={() => setShowDropDown(false)}>
                <div className="card_dropdown">
                  <p
                    onClick={() =>
                      props.removeCard(props.card?.id, props.boardId)
                    }
                  >
                    Delete Card
                  </p>
                </div>
              </DropDown>
            )}
          </div>
        </div>
        <div className="card_title">{props.card.title}</div>
        <div className="card_footer">
          {props.card.date && (
            <p>
              <Clock />
              {props.card.date}
            </p>
          )}
          {props.card?.tasks?.length > 0 && (
            <p>
              <CheckSquare />
              {
                props.card?.tasks?.filter((item) => item.completed).length
              } / {props.card?.tasks?.length}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
